// ---------------------------------------------------------------------------
// Product catalogue — ONLY the products approved for this project.
// The list itself lives in ./product-source.mjs.
//
// Images: run `npm run fetch:images`. It downloads them from
// https://www.aryadisplayrack.com/, zips them (arya-product-images.zip),
// unpacks the zip into public/images/products and writes
// ./product-images.json (slug -> real file path) used below.
// ---------------------------------------------------------------------------
import manifest from "./product-images.json";
import { categories, raw, slugify } from "./product-source.mjs";

export { categories };

export const catalogue = raw.map((p) => {
  const slug = slugify(p.title);
  return { ...p, slug, image: manifest[slug] || `/images/products/${slug}.jpg` };
});


// Categories with URL slugs (/category/<slug>), counts and a cover image
export const categoryList = categories.map((name) => {
  const items = raw.filter((p) => p.category === name);
  const first = items[0] ? slugify(items[0].title) : "";
  return {
    name,
    slug: slugify(name),
    count: items.length,
    image: manifest[first] || `/images/products/${first}.jpg`,
  };
});