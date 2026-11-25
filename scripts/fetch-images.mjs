#!/usr/bin/env node
/**
 * Downloads product images from https://www.aryadisplayrack.com/, bundles them
 * into a zip, unpacks the zip into public/images/products and writes
 * data/product-images.json so the site points at the right files.
 *
 *   npm install
 *   npm run fetch:images
 *
 * Output
 *   arya-product-images.zip            (project root, shareable archive)
 *   public/images/products/<slug>.ext  (what the site serves)
 *   data/product-images.json           (slug -> "/images/products/<slug>.ext")
 *   scripts/image-report.txt           (which product got which source image)
 *
 * Needs Node 18+ (built-in fetch). Set SITE_BASE to point at another host
 * (used for testing).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import AdmZip from "adm-zip";
import { raw, slugify } from "../data/product-source.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.env.SITE_BASE || "https://www.aryadisplayrack.com").replace(/\/$/, "");
const OUT_DIR = path.join(ROOT, "public", "images", "products");
const ZIP_PATH = path.join(ROOT, "arya-product-images.zip");
const MANIFEST = path.join(ROOT, "data", "product-images.json");
const REPORT = path.join(ROOT, "scripts", "image-report.txt");
const UA = "Mozilla/5.0 (compatible; arya-image-fetch/1.0)";

const norm = (s) => s.toLowerCase().replace(/&amp;/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
const absolute = (u, pageUrl) => new URL(u.replace(/&amp;/g, "&"), pageUrl).toString();

async function get(url, asBuffer = false) {
  const res = await fetch(url, { headers: { "user-agent": UA, referer: BASE + "/" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return asBuffer ? Buffer.from(await res.arrayBuffer()) : res.text();
}

/** Pull { alt, url } pairs out of a page's <img> tags (handles lazy-load attributes). */
function parseImages(html, pageUrl) {
  const found = [];
  const imgTag = /<img\b[^>]*>/gi;
  let m;
  while ((m = imgTag.exec(html))) {
    const tag = m[0];
    const attr = (name) => (tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i")) || [])[1];
    const alt = attr("alt") || "";
    const srcset = (attr("srcset") || "").split(",")[0].trim().split(/\s+/)[0];
    const src = attr("data-src") || attr("data-original") || attr("data-lazy") || attr("src") || srcset;
    if (!src || src.startsWith("data:")) continue;
    if (!/imimg\.com|aryadisplayrack\.com/i.test(src) && !src.includes(new URL(BASE).host)) continue;
    if (/logo|sprite|icon|trustseal|banner/i.test(src)) continue;
    found.push({ alt, url: absolute(src, pageUrl) });
  }
  return found;
}

/** IndiaMART thumbnails end in -125x125 / -250x250. Prefer the bigger sizes. */
const SIZE_RE = /-(\d{2,4})x(\d{2,4})(\.[a-z]+)$/i;
const sizeOf = (u) => Number((u.match(SIZE_RE) || [])[1] || 0);
const upscale = (u, size) => (SIZE_RE.test(u) ? u.replace(SIZE_RE, `-${size}x${size}$3`) : u);

async function downloadBest(url) {
  // try 500x500, then 250x250, then whatever we found
  const tries = [...new Set([upscale(url, 500), upscale(url, 250), url])];
  let lastErr;
  for (const u of tries) {
    try {
      const buf = await get(u, true);
      if (buf.length > 1500) return { buf, from: u };
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("download failed " + url);
}

async function main() {
  const pages = [...new Set(raw.map((p) => p.page))];
  const byAlt = new Map(); // normalised alt -> url (largest first-seen)
  const byPage = new Map(); // page slug -> first product image url

  for (const slug of pages) {
    const pageUrl = `${BASE}/${slug}.html`;
    try {
      const html = await get(pageUrl);
      const imgs = parseImages(html, pageUrl).sort((a, b) => sizeOf(b.url) - sizeOf(a.url));
      // keep document order for "first image" and only the main (largest) per alt
      const ordered = parseImages(html, pageUrl);
      const mainFirst = ordered.find((i) => sizeOf(i.url) >= 250) || ordered[0];
      if (mainFirst) byPage.set(slug, mainFirst.url);
      for (const img of imgs) {
        const key = norm(img.alt);
        if (key && !byAlt.has(key)) byAlt.set(key, img.url);
      }
      console.log(`✓ ${slug}.html  (${ordered.length} images)`);
    } catch (e) {
      console.warn(`✗ ${slug}.html  ${e.message}`);
    }
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const zip = new AdmZip();
  const report = [];
  const cache = new Map(); // source url -> { buf, ext } so shared images download once
  const resolved = [];

  for (const p of raw) {
    const slug = slugify(p.title);
    let src = null;
    let how = "";
    for (const alt of p.alts) {
      const hit = byAlt.get(norm(alt));
      if (hit) { src = hit; how = `alt "${alt}"`; break; }
    }
    if (!src && byPage.get(p.page)) { src = byPage.get(p.page); how = `category page ${p.page}.html (no exact match)`; }
    if (!src) { report.push(`MISSING  ${p.title}  (no image found)`); continue; }
    resolved.push({ p, slug, src, how });
  }

  for (const { p, slug, src, how } of resolved) {
    try {
      if (!cache.has(src)) {
        const { buf, from } = await downloadBest(src);
        const ext = (path.extname(new URL(from).pathname) || ".jpg").toLowerCase();
        cache.set(src, { buf, ext, from });
      }
      const { buf, ext, from } = cache.get(src);
      zip.addFile(`${slug}${ext}`, buf);
      report.push(`${how.startsWith("alt") ? "OK     " : "FALLBK "}  ${p.title}  <-  ${from}  [${how}]`);
    } catch (e) {
      report.push(`FAILED   ${p.title}  ${e.message}`);
    }
  }

  // 1) write the zip, 2) unpack the zip into public/ so the zip is the source of truth
  zip.writeZip(ZIP_PATH);
  new AdmZip(ZIP_PATH).extractAllTo(OUT_DIR, true);

  const manifest = {};
  for (const f of fs.readdirSync(OUT_DIR)) {
    const slug = path.basename(f, path.extname(f));
    manifest[slug] = `/images/products/${f}`;
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  fs.writeFileSync(REPORT, report.join("\n") + "\n");

  console.log(`\nZip:      ${path.relative(ROOT, ZIP_PATH)}`);
  console.log(`Images:   ${Object.keys(manifest).length}/${raw.length} → public/images/products`);
  console.log(`Manifest: data/product-images.json`);
  console.log(`Report:   scripts/image-report.txt  (check FALLBK / MISSING lines)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
