# SteelMax Racking Solutions – Home Page

Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Swiper.js

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to put your images and videos

Drop files into `public/images` and `public/videos` using these names
(or change the paths in `data/content.js` → `media` and `products`). Missing files show a
neat placeholder, so the layout never breaks.

| Section | File |
|---|---|
| Hero image (right) | `public/images/hero-racks.png` |
| Hero "Watch Video" | `public/videos/hero-video.mp4` |
| Gondola card | `public/images/gondola-rack.png` |
| Storage card | `public/images/storage-rack.png` |
| Display card | `public/images/display-rack.png` |
| Heavy duty card | `public/images/heavy-duty-rack.png` |
| Supermarket card (extra slide) | `public/images/supermarket-rack.png` |
| Wall rack card (extra slide) | `public/images/wall-rack.png` |
| Why-us video poster | `public/images/why-warehouse.png` |
| Why-us video | `public/videos/why-video.mp4` |
| Why-us corner rack image | `public/images/rack-corner.png` |

## Animations

- **Hero**: staggered text reveal, image slide/scale in, floating glass badges, pulsing play button, animated scroll-down mouse
- **Products**: Swiper slider (autoplay, pagination dots, responsive), cards lift on hover
- **Why Choose Us**: video card slides in, feature icons pop in one by one
- **Process ("Sequential step animation")**: steps appear 1 → 2 → 3 → 4 with connector lines drawing between them (`components/Process.jsx`, tweak `GAP`)
- **FAQ**: animated accordion with rotating plus icon

## Edit content

Text, nav links, products, steps and FAQs all live in `data/content.js`.
