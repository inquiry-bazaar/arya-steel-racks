export const categories = [
  "Supermarket & Grocery",
  "Garment & Apparel",
  "Footwear, Beauty & Pharmacy",
  "Electronics, Books & Gifts",
  "Fixtures & Accessories",
  "Counters, Trolleys & Baskets",
];

const [SUPER, GARMENT, SHOE, ELEC, FIX, COUNTER] = categories;

export const raw = [
  // ---- Supermarket & Grocery ------------------------------------------------
  { title: "Supermarket Display Rack", image: "/images/products/supermarket-display-rack_o.png", category: SUPER, subtitle: "Wall-mounted, 6–7 ft", desc: "A supermarket display rack is essential for organizing merchandise and maximizing retail floor space. Designed for durability and visibility, these versatile shelving units showcase products neatly, making shopping effortless for customers. By strategically placing high-demand items at eye level, display racks boost impulse purchases, streamline inventory management, and enhance overall store aesthetics.", page: "supermarket-display-rack", alts: ["Supermarket Display Racks", "7 Feet Supermarket Display Rack"] },
  // { title: "Supermarket Wall Rack", image: "/images/products/supermarket-wall-rack.jpg", category: SUPER, subtitle: "Wall-faced shelving", desc: "Wall-faced rack with back panel, PP moulded beading and stoppers for neat product display.", page: "supermarket-display-rack", alts: ["Wall Display Racks", "Window Display Racks"] },
  // { title: "Supermarket Center Rack (Island Rack)", image: "/images/products/supermarket-center-rack-island-rack.jpg", category: SUPER, subtitle: "Free-standing centre unit", desc: "Free-standing centre rack with smooth, rounded edges and about 60 kg per shelf.", page: "supermarket-display-rack", alts: ["Supermarket Center Display Rack", "Center Display Rack", "Supermarket Center Rack"] },
  // { title: "Gondola Display Rack", image: "/images/products/gondola-display-rack.jpg", category: SUPER, subtitle: "Modular gondola unit", desc: "Modular gondola shelving for aisles, easy to assemble and reconfigure as ranges change.", page: "gondola-unit", alts: ["Retail Gondola Unit", "Center Gondola Racks"] },
  // { title: "Double Sided Display Rack", image: "/images/products/double-sided-display-rack.jpg", category: SUPER, subtitle: "Two-sided centre rack", desc: "Two-sided mild steel rack that doubles display area on the shop floor, about 250 kg capacity.", page: "double-side-display-rack", alts: ["Double Sided Display Rack", "Departmental Store Racks Supplier In Lucknow"] },
  // { title: "Gondola End Cap Rack", image: "/images/products/gondola-end-cap-rack.jpg", category: SUPER, subtitle: "Aisle-end promo display", desc: "End-of-aisle gondola display for promotions and impulse buys.", page: "gondola-unit", alts: ["Retail Gondola Unit"] },
  // { title: "Corner Display Rack", image: "/images/products/corner-display-rack.jpeg", category: SUPER, subtitle: "Space-saving corner unit", desc: "Corner shelving that turns unused corners into productive display space.", page: "supermarket-display-rack", alts: ["Single Sided Supermarket Display Rack"] },
  // { title: "Grocery Store Rack", image: "/images/products/grocery-store-rack.jpg", category: SUPER, subtitle: "Up to 600 kg load", desc: "Free-standing grocery rack, 6 ft high with 5–6 shelves, built for heavy daily loads.", page: "supermarket-display-rack", alts: ["Grocery Display Rack", "MS Grocery Store Rack"] },
  // { title: "Kirana Store Rack", image: "/images/products/kirana-store-rack.jpg", category: SUPER, subtitle: "Compact & affordable", desc: "Compact, budget-friendly shelving sized for kirana and neighbourhood stores.", page: "departmental-store-rack", alts: ["Kirana Store Rack Supplier In Lucknow"] },
  // { title: "Departmental Store Rack", image: "/images/products/departmental-store-rack.jpg", category: SUPER, subtitle: "6 shelves, 250 kg", desc: "Spacious, abrasion-resistant racks for departmental stores, supermarkets and marts.", page: "supermarket-display-rack", alts: ["Departmental Store Rack"] },
  // { title: "Hypermarket Display Rack", image: "/images/products/hypermarket-display-rack.jpg", category: SUPER, subtitle: "High-volume retail", desc: "Sturdy iron and mild steel racking for high-traffic, high-volume hypermarket floors.", page: "super-market-racks", alts: ["Iron Supermarket Display Racks", "Super Market Display Racks In Delhi"] },
  // { title: "Retail Display Rack", image: "/images/products/retail-display-rack.jpg", category: SUPER, subtitle: "Mild steel, 4 shelves", desc: "All-round retail display rack in mild steel for shops and stores of every size.", page: "retail-display-rack", alts: ["Retail Display Rack", "Retail Store Display"] },
  // { title: "Pillar Display Rack", image: "/images/products/pillar-display-rack.jpg", category: SUPER, subtitle: "Pillar-wrap display", desc: "Display fixture that wraps around store pillars to put products where customers already look.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Perforated Display Rack with Hooks", image: "/images/products/perforated-display-rack-with-hooks.jpeg", category: SUPER, subtitle: "Perforated panel & hooks", desc: "Perforated back panel with hooks for hanging small, packaged and promotional items.", page: "occupational-therapy-equipment", alts: ["Peg Hooks Display"] },
  // { title: "Wall Channel Display Rack", image: "/images/products/wall-channel-display-rack.jpg", category: SUPER, subtitle: "Channel-mounted shelving", desc: "Wall channel system with adjustable brackets and shelves for flexible layouts.", page: "wall-display-racks", alts: ["Wall Display Racks"] },
  // { title: "Round / Revolving Display Rack", image: "/images/products/round-revolving-display-rack.jpg", category: SUPER, subtitle: "Merry-go-round style", desc: "Round and revolving display stand that shows products from every angle.", page: "merry-go-round", alts: ["Center Gondola Racks"] },
  // { title: "Wire Mesh / Basket Display Rack", image: "/images/products/wire-mesh-basket-display-rack.jpg", category: SUPER, subtitle: "Wire rack, 7 ft", desc: "Powder-coated wire display rack with 1-year warranty, ideal for snacks and packaged goods.", page: "supermarket-display-rack", alts: ["SS Snacks Display Rack"] },
  // { title: "MS (Mild Steel) Display Rack", image: "/images/products/ms-mild-steel-display-rack.jpeg", category: SUPER, subtitle: "Up to 8 ft, 250 kg", desc: "Mild steel display rack up to 8 ft tall with 7 shelves and powder-coated finish.", page: "supermarket-display-rack", alts: ["MS Display Rack", "MS Supermarket Display Rack"] },
  // { title: "SS (Stainless Steel) Display Rack", image: "/images/products/ss-stainless-steel-display-rack.jpg", category: SUPER, subtitle: "Stainless steel, 350 kg", desc: "Stainless steel retail rack with paint-coated finish and about 350 kg load capacity.", page: "supermarket-display-rack", alts: ["SS Retail Display Rack"] },
  // { title: "Wooden Display Rack", image: "/images/products/wooden-display-rack.jpg", category: SUPER, subtitle: "Wall & free-standing", desc: "Wooden display racks for boutique and premium retail, wall-mounted or free-standing.", page: "wall-display-racks", alts: ["Wooden Display Rack", "wall free wooden display rack"] },
  // { title: "Glass Display Rack", image: "/images/products/glass-display-rack.jpeg", category: SUPER, subtitle: "Glass shelving", desc: "Glass-shelf display rack for showcasing premium, delicate and gift items.", page: "cash-counter", alts: ["Crockery Display Rack"] },
  // { title: "Fruit & Vegetable Rack", image: "/images/products/fruit-and-vegetable-rack.jpg", category: SUPER, subtitle: "MS vegetable rack", desc: "Open-front mild steel rack for fresh produce, built for easy loading and customer access.", page: "vegetable-racks", alts: ["Fruit And Vegetables Display Rack", "MS Vegetable Rack"] },
  // { title: "Bakery Display Rack", image: "/images/products/bakery-display-rack.jpg", category: SUPER, subtitle: "Bread & bakery display", desc: "Display rack for bread, biscuits and bakery items with open, easy-access shelves.", page: "supermarket-display-rack", alts: ["SS Snacks Display Rack"] },
  // { title: "Snacks & Chips Display Rack", image: "/images/products/snacks-and-chips-display-rack.jpg", category: SUPER, subtitle: "Stainless steel, 7 ft", desc: "Wire snacks rack, 7 ft high and 2 ft wide, for chips and packaged snacks.", page: "supermarket-display-rack", alts: ["SS Snacks Display Rack"] },
  // { title: "Chocolate Display Stand", image: "/images/products/chocolate-display-stand.jpg", category: SUPER, subtitle: "Counter & floor stand", desc: "Compact stand for chocolates and confectionery, placed near billing for impulse sales.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Impulse Rack (Cash Counter Rack)", image: "/images/products/impulse-rack-cash-counter-rack.jpeg", category: SUPER, subtitle: "Billing-counter rack", desc: "Small rack beside the cash counter for last-minute add-on purchases.", page: "cash-counter", alts: ["Cash Counter Top 4 feet"] },
  // { title: "Broom Display Stand", image: "/images/products/broom-display-stand.jpg", category: SUPER, subtitle: "Stainless steel stand", desc: "Stainless steel stand that keeps brooms and long-handled items upright and tidy.", page: "stainless-steel-broom-stand", alts: ["Stainless Steel Broom Stand"] },

  // ---- Garment & Apparel ----------------------------------------------------
  { title: "Garment Display Rack", image: "/images/products/garment-display-rack_.png", category: GARMENT, subtitle: "Mild steel", desc: "Mild steel garment rack for clothing stores, sturdy and easy to keep neat.", page: "garment-display-rack", alts: ["Mild Steel Display Rack"] },
  // { title: "Garment Hanging Stand", image: "/images/products/garment-display-rack.jpg", category: GARMENT, subtitle: "Adjustable height", desc: "Hanging stand with adjustable height for shirts, kurtas and dresses.", page: "adjustable-garment-rack", alts: ["Adjustable Garment Rack"] },
  // { title: "2-Way / 4-Way Garment Stand", image: "/images/products/2-way-4-way-garment-stand.jpg", category: GARMENT, subtitle: "SS four-way stand", desc: "Two-way and four-way stainless steel cloth stands that display more garments per square foot.", page: "garment-display-rack", alts: ["SS Four Way Cloth Display Stand"] },
  // { title: "Garment Nesting Table", image: "/images/products/garment-nesting-table.jpeg", category: GARMENT, subtitle: "Wooden table stand", desc: "Nesting display tables for folded garments, stackable and quick to rearrange.", page: "wooden-table", alts: ["Garments Table Stand ( Without Glass)"] },
  // { title: "Wall Mounted Garment Rack", image: "/images/products/wall-mounted-garment-rack.jpeg", category: GARMENT, subtitle: "Wall-mount", desc: "Wall-mounted garment rack that frees up floor space in boutiques and showrooms.", page: "garment-display-rack", alts: ["Wall Mount Garments Rack"] },
  // { title: "Saree Display Rack", image: "/images/products/saree-display-rack.jpg", category: GARMENT, subtitle: "Saree showcase", desc: "Display rack designed to show sarees and long fabrics clearly and without creasing.", page: "garment-display-rack", alts: ["Mild Steel Display Rack"] },
  // { title: "Garment Center Rack", image: "/images/products/garment-display-rack.jpg", category: GARMENT, subtitle: "Centre-floor rack", desc: "Centre-floor rack for apparel stores with adjustable hanging arms.", page: "adjustable-garment-rack", alts: ["Adjustable Garment Rack"] },

  // ---- Footwear, Beauty & Pharmacy ------------------------------------------
  { title: "Shoe Display Rack", image: "/images/products/shoe-display-rack.jpg", category: SHOE, subtitle: "Footwear shelving", desc: "Tiered rack for shoes, sandals and slippers with angled display shelves.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Wall Mounted Shoe Rack", image: "/images/products/wall-mounted-shoe-rack.jpg", category: SHOE, subtitle: "Wall-mount", desc: "Wall-mounted shoe rack for compact footwear stores and showrooms.", page: "wall-display-racks", alts: ["Wall Display Racks"] },
  // { title: "Cosmetic Display Rack", image: "/images/products/cosmetic-display-rack.jpg", category: SHOE, subtitle: "Beauty & personal care", desc: "Display rack for cosmetics and personal-care products with shallow, easy-to-view shelves.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Pharmacy / Medical Store Rack", image: "/images/products/pharmacy-medical-store-rack.png", category: SHOE, subtitle: "Medicine rack", desc: "Medicine display rack for pharmacies and medical stores.", page: "pharmacy-rack", alts: ["Pharmacy Medicine Rack"] },
  // { title: "Medicine Rack with Drawers", image: "/images/products/medicine-rack-with-drawers.jpg", category: SHOE, subtitle: "Wooden, with drawers", desc: "Rack with built-in drawers to organise strips, bottles and loose stock.", page: "wooden-chest-drawer", alts: ["Wooden Rack with Drawers"] },

  // ---- Electronics, Books & Gifts -------------------------------------------
  { title: "Electronics Display Rack", image: "/images/products/electronics-display-rack.jpg", category: ELEC, subtitle: "Electronics showroom", desc: "Display rack for electronic goods and accessories.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "LCD / LED TV Display Rack", image: "/images/products/lcd-led-tv-display-rack.jpg", category: ELEC, subtitle: "TV display stand", desc: "Sturdy rack and stand for showing LCD and LED televisions.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Mobile Shop Display Rack", image: "/images/products/mobile-shop-display-rack.jpg", category: ELEC, subtitle: "Mobile & accessories", desc: "Compact racks and counters for phones, chargers and accessories.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Home Appliance Display Rack", image: "/images/products/home-appliance-display-rack.jpg", category: ELEC, subtitle: "Appliance showroom", desc: "Heavy-duty racks for home and kitchen appliances.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Book Rack / Library Rack", image: "/images/products/book-rack-library-rack.jpg", category: ELEC, subtitle: "MS book rack", desc: "Mild steel book display racks, 4 shelves, with 1-year warranty.", page: "supermarket-display-rack", alts: ["MS Book Display Racks"] },
  // { title: "Stationery Display Rack", image: "/images/products/stationery-display-rack.jpg", category: ELEC, subtitle: "Stationery & school supplies", desc: "Display racks for pens, notebooks and school and office stationery.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Crockery Display Rack", image: "/images/products/crockery-display-rack.jpeg", category: ELEC, subtitle: "Crockery showcase", desc: "Display rack for crockery, glassware and kitchenware.", page: "cash-counter", alts: ["Crockery Display Rack"] },
  // { title: "Toy Display Rack", image: "/images/products/toy-display-rack.jpg", category: ELEC, subtitle: "Toy store shelving", desc: "Colourful, easy-reach shelving for toys and games.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Sports Goods Display Rack", image: "/images/products/sports-goods-display-rack.jpg", category: ELEC, subtitle: "Sports & fitness", desc: "Racks and hooks for sports and fitness goods.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Gift & Fancy Store Rack", image: "/images/products/gift-and-fancy-store-rack.jpg", category: ELEC, subtitle: "Gifts & novelties", desc: "Display rack for gifts, fancy items and novelty products.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Optical Showcase Rack", image: "/images/products/optical-showcase-rack.jpg", category: ELEC, subtitle: "Eyewear display", desc: "Showcase rack for spectacles, frames and sunglasses.", page: "retail-display-rack", alts: ["Retail Display Rack"] },

  // ---- Fixtures & Accessories -----------------------------------------------
  { title: "Slatwall Display Rack / Panel", image: "/images/products/slatwall-display-rack-panel.jpeg", category: FIX, subtitle: "Slatwall panels", desc: "Slatwall panels that take hooks, shelves and brackets for a flexible wall display.", page: "occupational-therapy-equipment", alts: ["Peg Hooks Display"] },
  // { title: "Peg Hooks, Pegboard & Brackets", image: "/images/products/peg-hooks-pegboard-and-brackets.jpeg", category: FIX, subtitle: "Hooks & accessories", desc: "Peg hooks, pegboards and brackets for hanging products in any layout.", page: "occupational-therapy-equipment", alts: ["Peg Hooks Display"] },
  // { title: "Promotional Display Stand", image: "/images/products/promotional-display-stand.jpg", category: FIX, subtitle: "Offers & launches", desc: "Free-standing promotional stand for offers, launches and seasonal campaigns.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  // { title: "Custom Branded Display Rack", image: "/images/products/custom-branded-display-rack.jpg", category: FIX, subtitle: "Made to your brand", desc: "Display racks made to your size, colour and branding, with all sizes available on request.", page: "supermarket-display-rack", alts: ["Display Rack Supplier"] },

  // ---- Counters, Trolleys & Baskets -----------------------------------------
  { title: "Cash / Checkout Counter", image: "/images/products/cash-checkout-counter.jpg", category: COUNTER, subtitle: "Supermarket checkout", desc: "Checkout counters for supermarkets and retail stores, built to your size.", page: "super-market-racks", alts: ["Supermarket Checkout Counter", "Cash Counter Top 4 feet"] },
  // { title: "Glass Display Counter", image: "/images/products/glass-display-counter.jpeg", category: COUNTER, subtitle: "Glass-top counter", desc: "Glass display counter for jewellery, accessories and small high-value items.", page: "cash-counter", alts: ["Cash Counter Top 4 feet"] },
  // { title: "Pharmacy / Service Counter", image: "/images/products/pharmacy-service-counter.jpg", category: COUNTER, subtitle: "L-shaped, with drawers", desc: "L-shaped counter with drawers for pharmacies and service desks.", page: "cash-counter", alts: ["L Shaped Cash Counter Electronic Italian Top Drawer"] },
  // { title: "Shopping Trolley", image: "/images/products/shopping-trolley.jpg", category: COUNTER, subtitle: "Four-wheel, 60 kg", desc: "Stainless steel four-wheel shopping trolley with up to 60 kg load capacity.", page: "shopping-trolley", alts: ["Four-Wheel Supermarket Shopping Trolley", "Four Wheels Shopping Trolley"] },
  // { title: "Shopping Basket", image: "/images/products/shopping-basket.jpg", category: COUNTER, subtitle: "Hand & wheeled baskets", desc: "Hand and wheeled shopping baskets for supermarkets and stores.", page: "plastic-basket", alts: ["Supermarket Hand Basket", "Plastic Shopping Basket With Wheel"] },
  // { title: "Wire Bin Basket / Dump Bin", image: "/images/products/wire-bin-basket-dump-bin.jpg", category: COUNTER, subtitle: "Promo dump bin", desc: "Wire dump bin for bulk, discounted and promotional items.", page: "shopping-trolley", alts: ["Shopping Basket Trolley"] },
];



export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const SPECS = {
  "supermarket-display-rack": { height: "1800 – 2100 mm", length: "1200 mm", depth: "450 / 600 mm", shelves: "4 / 5 / 6", load: "" },
  "supermarket-wall-rack": { height: "1800 – 2100 mm", length: "1200 mm", depth: "450 mm", shelves: "4 / 5 / 6", load: "" },
  "supermarket-center-rack-island-rack": { height: "1500 – 1800 mm", length: "1200 mm", depth: "900 mm", shelves: "4 / 5 / Custom", load: "60 kg per shelf" },
  "gondola-display-rack": { height: "1600 mm", length: "1200 mm", depth: "900 mm", shelves: "4 / 5 / Custom", load: "" },
  "double-sided-display-rack": { height: "1600 mm", length: "1200 mm", depth: "900 mm", shelves: "4 / 5 / Custom", load: "250 kg" },
  "gondola-end-cap-rack": { height: "1600 mm", length: "900 mm", depth: "450 mm", shelves: "4 / 5", load: "" },
  "corner-display-rack": { height: "1800 mm", length: "900 mm", depth: "450 mm", shelves: "5 / 6", load: "" },
  "grocery-store-rack": { height: "1830 mm", length: "1200 mm", depth: "450 / 600 mm", shelves: "5 / 6", load: "600 kg" },
  "kirana-store-rack": { height: "1500 mm", length: "900 mm", depth: "300 / 450 mm", shelves: "4 / 5", load: "" },
  "departmental-store-rack": { height: "1800 mm", length: "1200 mm", depth: "450 / 600 mm", shelves: "6", load: "250 kg" },
  "hypermarket-display-rack": { height: "2100 mm", length: "1200 / 1500 mm", depth: "600 / 900 mm", shelves: "5 / 6 / Custom", load: "" },
  "retail-display-rack": { height: "1500 – 1800 mm", length: "1200 mm", depth: "450 mm", shelves: "4", load: "" },
  "pillar-display-rack": { height: "1500 mm", length: "As per pillar", depth: "300 mm", shelves: "3 / 4", load: "" },
  "perforated-display-rack-with-hooks": { height: "1800 mm", length: "1200 mm", depth: "300 mm", shelves: "Hooks / Custom", load: "" },
  "wall-channel-display-rack": { height: "2100 mm", length: "1200 mm", depth: "400 mm", shelves: "Adjustable", load: "" },
  "round-revolving-display-rack": { height: "1500 mm", length: "Ø 900 mm", depth: "Ø 900 mm", shelves: "3 / 4 tiers", load: "" },
  "wire-mesh-basket-display-rack": { height: "2130 mm", length: "900 mm", depth: "450 mm", shelves: "5 / 6", load: "" },
  "ms-mild-steel-display-rack": { height: "Up to 2440 mm", length: "1200 mm", depth: "450 / 600 mm", shelves: "Up to 7", load: "250 kg" },
  "ss-stainless-steel-display-rack": { height: "1800 mm", length: "1200 mm", depth: "450 / 600 mm", shelves: "4 / 5", load: "350 kg" },
  "wooden-display-rack": { height: "1800 mm", length: "1200 mm", depth: "400 mm", shelves: "4 / 5", load: "" },
  "glass-display-rack": { height: "1800 mm", length: "900 mm", depth: "400 mm", shelves: "4 / 5", load: "" },
  "fruit-and-vegetable-rack": { height: "1200 mm", length: "1500 mm", depth: "750 mm", shelves: "2 / 3", load: "" },
  "bakery-display-rack": { height: "1800 mm", length: "1200 mm", depth: "450 mm", shelves: "4 / 5", load: "" },
  "snacks-and-chips-display-rack": { height: "2130 mm", length: "610 mm", depth: "450 mm", shelves: "5 / 6", load: "" },
  "chocolate-display-stand": { height: "1200 mm", length: "450 mm", depth: "350 mm", shelves: "3 / 4", load: "" },
  "impulse-rack-cash-counter-rack": { height: "900 mm", length: "450 mm", depth: "300 mm", shelves: "2 / 3", load: "" },
  "broom-display-stand": { height: "1500 mm", length: "600 mm", depth: "300 mm", shelves: "Hooks / Custom", load: "" },
  "garment-display-rack": { height: "1500 – 1800 mm", length: "1200 mm", depth: "450 mm", shelves: "Rails / Custom", load: "" },
  "garment-hanging-stand": { height: "1000 – 1700 mm", length: "900 mm", depth: "450 mm", shelves: "Adjustable", load: "" },
  "2-way-4-way-garment-stand": { height: "1500 mm", length: "900 mm", depth: "900 mm", shelves: "2 / 4 arms", load: "" },
  "garment-nesting-table": { height: "750 mm", length: "900 mm", depth: "600 mm", shelves: "Set of 2 / 3", load: "" },
  "wall-mounted-garment-rack": { height: "1800 mm", length: "1200 mm", depth: "450 mm", shelves: "Rails / Custom", load: "" },
  "saree-display-rack": { height: "1800 mm", length: "1200 mm", depth: "600 mm", shelves: "4 / 5", load: "" },
  "garment-center-rack": { height: "1600 mm", length: "1200 mm", depth: "600 mm", shelves: "Adjustable arms", load: "" },
  "shoe-display-rack": { height: "1500 mm", length: "1200 mm", depth: "450 mm", shelves: "5 / 6", load: "" },
  "wall-mounted-shoe-rack": { height: "1800 mm", length: "1200 mm", depth: "300 mm", shelves: "5 / 6", load: "" },
  "cosmetic-display-rack": { height: "1500 mm", length: "1000 mm", depth: "300 mm", shelves: "4 / 5", load: "" },
  "pharmacy-medical-store-rack": { height: "2100 mm", length: "1200 mm", depth: "300 mm", shelves: "6 / 7", load: "" },
  "medicine-rack-with-drawers": { height: "1800 mm", length: "1200 mm", depth: "400 mm", shelves: "5 + drawers", load: "" },
  "electronics-display-rack": { height: "1800 mm", length: "1200 mm", depth: "450 mm", shelves: "4 / 5", load: "" },
  "lcd-led-tv-display-rack": { height: "1500 mm", length: "1200 mm", depth: "600 mm", shelves: "2 / 3", load: "" },
  "mobile-shop-display-rack": { height: "1800 mm", length: "1000 mm", depth: "300 mm", shelves: "4 / 5", load: "" },
  "home-appliance-display-rack": { height: "1800 mm", length: "1500 mm", depth: "750 mm", shelves: "2 / 3", load: "" },
  "book-rack-library-rack": { height: "1500 mm", length: "900 mm", depth: "300 mm", shelves: "4", load: "" },
  "stationery-display-rack": { height: "1500 mm", length: "1000 mm", depth: "350 mm", shelves: "4 / 5", load: "" },
  "crockery-display-rack": { height: "1800 mm", length: "1000 mm", depth: "450 mm", shelves: "4 / 5", load: "" },
  "toy-display-rack": { height: "1200 mm", length: "1200 mm", depth: "450 mm", shelves: "3 / 4", load: "" },
  "sports-goods-display-rack": { height: "1800 mm", length: "1200 mm", depth: "450 mm", shelves: "3 / 4", load: "" },
  "gift-and-fancy-store-rack": { height: "1800 mm", length: "1000 mm", depth: "350 mm", shelves: "4 / 5", load: "" },
  "optical-showcase-rack": { height: "1500 mm", length: "1000 mm", depth: "300 mm", shelves: "Display tiers", load: "" },
  "slatwall-display-rack-panel": { height: "1200 / 2400 mm", length: "1200 mm", depth: "18 – 25 mm", shelves: "Slats / Custom", load: "" },
  "peg-hooks-pegboard-and-brackets": { height: "As per layout", length: "As per layout", depth: "As per hook", shelves: "Hooks / Custom", load: "" },
  "promotional-display-stand": { height: "1500 mm", length: "600 mm", depth: "450 mm", shelves: "3 / 4", load: "" },
  "custom-branded-display-rack": { height: "Custom", length: "Custom", depth: "Custom", shelves: "Custom", load: "" },
  "cash-checkout-counter": { height: "900 – 1000 mm", length: "1200 – 1800 mm", depth: "600 mm", shelves: "Shelf / Drawer", load: "" },
  "glass-display-counter": { height: "950 mm", length: "1200 / 1500 mm", depth: "600 mm", shelves: "2 glass shelves", load: "" },
  "pharmacy-service-counter": { height: "900 mm", length: "1800 mm (L-shaped)", depth: "600 mm", shelves: "With drawers", load: "" },
  "shopping-trolley": { height: "950 mm", length: "900 mm", depth: "550 mm", shelves: "Basket + tray", load: "60 kg" },
  "shopping-basket": { height: "300 mm", length: "450 mm", depth: "300 mm", shelves: "Single basket", load: "" },
  "wire-bin-basket-dump-bin": { height: "800 mm", length: "900 mm", depth: "600 mm", shelves: "Single bin", load: "" },
};

/* ------------------------------------------------------------------ */
/* Category defaults                                                   */
/* ------------------------------------------------------------------ */
const RACK_SIZES = ["900 mm", "1200 mm", "1500 mm", "1800 mm"];

const DEFAULT_COLORS = [
  { name: "Blue", hex: "#1d4ed8" },
  { name: "White", hex: "#f3f4f6" },
  { name: "Grey", hex: "#4b5563" },
  { name: "Orange", hex: "#f97316" },
];

const F = {
  area: { icon: "cart", label: "High Display Area" },
  double: { icon: "layers", label: "Double-Sided Design" },
  durable: { icon: "shield", label: "Durable & Sturdy" },
  space: { icon: "maximize", label: "Space Optimized" },
  assembly: { icon: "wrench", label: "Easy Assembly" },
  custom: { icon: "layers", label: "Custom Built" },
};

const CATEGORY = {
  "Supermarket & Grocery": {
    shelfLabel: "No. of Shelves",
    features: [F.area, F.assembly, F.durable, F.space],
    applications: [
      { icon: "cart", label: "Supermarkets" },
      { icon: "basket", label: "Grocery Stores" },
      { icon: "bag", label: "Retail Outlets" },
      { icon: "package", label: "Department Stores" },
    ],
    // free Unsplash photo used in the round overview image (replace with your own store photo)
    scene: "https://unsplash.com/photos/2Vl1JZFmtOw/download?force=true&w=1000",
  },
  "Garment & Apparel": {
    shelfLabel: "Configuration",
    features: [F.area, F.assembly, F.durable, F.space],
    applications: [
      { icon: "shirt", label: "Clothing Stores" },
      { icon: "bag", label: "Boutiques" },
      { icon: "store", label: "Showrooms" },
      { icon: "package", label: "Department Stores" },
    ],
  },
  "Footwear, Beauty & Pharmacy": {
    shelfLabel: "No. of Shelves",
    features: [F.area, F.assembly, F.durable, F.space],
    applications: [
      { icon: "shoe", label: "Footwear Stores" },
      { icon: "sparkles", label: "Cosmetic Stores" },
      { icon: "pill", label: "Pharmacies" },
      { icon: "bag", label: "Retail Outlets" },
    ],
  },
  "Electronics, Books & Gifts": {
    shelfLabel: "No. of Shelves",
    features: [F.area, F.assembly, F.durable, F.space],
    applications: [
      { icon: "tv", label: "Electronics Stores" },
      { icon: "book", label: "Book Shops" },
      { icon: "gift", label: "Gift Shops" },
      { icon: "store", label: "Showrooms" },
    ],
  },
  "Fixtures & Accessories": {
    shelfLabel: "Configuration",
    features: [F.custom, F.assembly, F.durable, F.space],
    applications: [
      { icon: "bag", label: "Retail Outlets" },
      { icon: "megaphone", label: "Promotions" },
      { icon: "store", label: "Showrooms" },
      { icon: "cart", label: "Supermarkets" },
    ],
  },
  "Counters, Trolleys & Baskets": {
    shelfLabel: "Configuration",
    features: [F.custom, F.assembly, F.durable, F.space],
    applications: [
      { icon: "cart", label: "Supermarkets" },
      { icon: "pill", label: "Pharmacies" },
      { icon: "gem", label: "Jewellery Shops" },
      { icon: "headset", label: "Service Desks" },
    ],
  },
};

const FALLBACK = CATEGORY["Supermarket & Grocery"];

/* ------------------------------------------------------------------ */
/* Per-product overrides (all optional)                                */
/* ------------------------------------------------------------------ */
const TWO_SIDED = [F.area, F.double, F.durable, F.space];

const OVERRIDES = {
  "double-sided-display-rack": { features: TWO_SIDED },
  "gondola-display-rack": { features: TWO_SIDED },
  "gondola-end-cap-rack": { features: TWO_SIDED },
  "supermarket-center-rack-island-rack": { features: TWO_SIDED },

  "round-revolving-display-rack": { sizes: ["Ø 750 mm", "Ø 900 mm", "Ø 1200 mm"] },
  "garment-nesting-table": { sizes: ["Set of 2", "Set of 3", "Set of 4"] },
  "chocolate-display-stand": { sizes: ["450 mm", "600 mm", "900 mm"] },
  "impulse-rack-cash-counter-rack": { sizes: ["450 mm", "600 mm", "900 mm"] },
  "broom-display-stand": { sizes: ["450 mm", "600 mm", "900 mm"] },
  "slatwall-display-rack-panel": { sizes: ["1200 mm", "2400 mm"] },
  "peg-hooks-pegboard-and-brackets": { sizes: ["100 mm", "150 mm", "200 mm", "300 mm"] },
  "custom-branded-display-rack": { sizes: ["Custom size"] },
  "pillar-display-rack": { sizes: ["Custom size"] },
  "shopping-trolley": { sizes: ["Standard", "Large"] },
  "shopping-basket": { sizes: ["Small", "Medium", "Large"] },
  "wire-bin-basket-dump-bin": { sizes: ["Small", "Medium", "Large"] },
};

export function getProductDetails(product, company = {}) {
  const key = product.slug || slugify(product.title);
  const cat = CATEGORY[product.category] || FALLBACK;
  const over = OVERRIDES[key] || {};
  const own = product.details || {};
  const spec = { ...(SPECS[key] || {}), ...(own.specs || {}) };

  const load = spec.load || "";

  const gallery =
    Array.isArray(product.gallery) && product.gallery.length
      ? product.gallery.map((src, i) => ({ src, crop: 0, key: i }))
      : [0, 1, 2, 3].map((crop) => ({ src: product.image, crop, key: crop }));

  const faqs = own.faqs || [
    { q: `What is a ${product.title}?`, a: product.desc },
    {
      q: "What materials are used in this product?",
      a: `${product.title} is made with high-quality raw material and finished for strength, smoothness and rust resistance, and every range is tested in our own unit before dispatch.`,
    },
    {
      q: "Can the size and color be customized?",
      a: "Yes. Sizes, shelf count and colour can be customized to suit your store. Share your requirement by call or WhatsApp and we will quote accordingly.",
    },
    {
      q: "Is it suitable for heavy products?",
      a: load
        ? `Yes. It is built for heavy daily use with a load capacity of ${load}.`
        : "Yes. It is made to carry normal retail stock and is tested for strength. Tell us your load requirement and we will configure it accordingly.",
    },
    {
      q: "Do you provide installation support?",
      a: "Our products are designed for easy assembly on site, and we deliver by road across India in about 7 to 10 days. Contact us if you need help with setup.",
    },
  ];

  return {
    sizes: own.sizes || over.sizes || RACK_SIZES,
    colors: own.colors || over.colors || DEFAULT_COLORS,
    features: own.features || over.features || cat.features,
    applications: own.applications || over.applications || cat.applications,
    overview:
      own.overview ||
      `${product.desc} Made by ${company.name || "us"} with high-quality raw material and a powder-coated or perfect finish. Sizes, shelf count and colour can be customized to your store.`,
    specs: {
      height: spec.height || "Custom",
      length: spec.length || "Custom",
      depth: spec.depth || "Custom",
      shelves: spec.shelves || "Custom",
      load,
      shelfLabel: cat.shelfLabel,
    },
    gallery,
    // view360: product.view360 || [],
    scene: own.scene || over.scene || cat.scene || null,
    video: product.video || null,
    brochure: product.brochure || company.brochure || "/brochure.pdf",
    faqs,
  };
}

