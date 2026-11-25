# Arya Display Rack – Website

Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Swiper.js

Company details come from https://www.aryadisplayrack.com/ (profile, contact and reviews pages).

## Run

```bash
npm install
npm run fetch:images   # downloads product images, makes arya-product-images.zip, unpacks to public/images/products
npm run dev            # http://localhost:3000
```

## Products

Only the 60 approved products are listed, in `data/product-source.mjs`.
`npm run fetch:images` finds each product's image on aryadisplayrack.com and writes:

- `arya-product-images.zip` – all images in one archive
- `public/images/products/<slug>.<ext>` – unpacked from that zip
- `data/product-images.json` – slug → file path used by the site
- `scripts/image-report.txt` – OK / FALLBK / MISSING per product

Products the website does not list (e.g. Toy, Optical, Cosmetic racks) reuse the closest
category image (FALLBK). Replace them by dropping a file named `<slug>.jpg` into
`public/images/products/` and deleting the slug from `data/product-images.json`.

## Edit content

Company info, FAQs, reviews and store types: `data/content.js`. Products: `data/product-source.mjs`.
