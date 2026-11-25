// Plain ES module (no imports) so both Next.js and scripts/fetch-images.mjs can read it.
// Edit the product list here.
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
  { title: "Supermarket Display Rack", category: SUPER, subtitle: "Wall-mounted, 6–7 ft", desc: "Heavy-duty mild steel supermarket racking with adjustable shelves and powder-coated finish.", page: "supermarket-display-rack", alts: ["Supermarket Display Racks", "7 Feet Supermarket Display Rack"] },
  { title: "Supermarket Wall Rack", category: SUPER, subtitle: "Wall-faced shelving", desc: "Wall-faced rack with back panel, PP moulded beading and stoppers for neat product display.", page: "supermarket-display-rack", alts: ["Wall Display Racks", "Window Display Racks"] },
  { title: "Supermarket Center Rack (Island Rack)", category: SUPER, subtitle: "Free-standing centre unit", desc: "Free-standing centre rack with smooth, rounded edges and about 60 kg per shelf.", page: "supermarket-display-rack", alts: ["Supermarket Center Display Rack", "Center Display Rack", "Supermarket Center Rack"] },
  { title: "Gondola Display Rack", category: SUPER, subtitle: "Modular gondola unit", desc: "Modular gondola shelving for aisles, easy to assemble and reconfigure as ranges change.", page: "gondola-unit", alts: ["Retail Gondola Unit", "Center Gondola Racks"] },
  { title: "Double Sided Display Rack", category: SUPER, subtitle: "Two-sided centre rack", desc: "Two-sided mild steel rack that doubles display area on the shop floor, about 250 kg capacity.", page: "double-side-display-rack", alts: ["Double Sided Display Rack", "Departmental Store Racks Supplier In Lucknow"] },
  { title: "Gondola End Cap Rack", category: SUPER, subtitle: "Aisle-end promo display", desc: "End-of-aisle gondola display for promotions and impulse buys.", page: "gondola-unit", alts: ["Retail Gondola Unit"] },
  { title: "Corner Display Rack", category: SUPER, subtitle: "Space-saving corner unit", desc: "Corner shelving that turns unused corners into productive display space.", page: "supermarket-display-rack", alts: ["Single Sided Supermarket Display Rack"] },
  { title: "Grocery Store Rack", category: SUPER, subtitle: "Up to 600 kg load", desc: "Free-standing grocery rack, 6 ft high with 5–6 shelves, built for heavy daily loads.", page: "supermarket-display-rack", alts: ["Grocery Display Rack", "MS Grocery Store Rack"] },
  { title: "Kirana Store Rack", category: SUPER, subtitle: "Compact & affordable", desc: "Compact, budget-friendly shelving sized for kirana and neighbourhood stores.", page: "departmental-store-rack", alts: ["Kirana Store Rack Supplier In Lucknow"] },
  { title: "Departmental Store Rack", category: SUPER, subtitle: "6 shelves, 250 kg", desc: "Spacious, abrasion-resistant racks for departmental stores, supermarkets and marts.", page: "supermarket-display-rack", alts: ["Departmental Store Rack"] },
  { title: "Hypermarket Display Rack", category: SUPER, subtitle: "High-volume retail", desc: "Sturdy iron and mild steel racking for high-traffic, high-volume hypermarket floors.", page: "super-market-racks", alts: ["Iron Supermarket Display Racks", "Super Market Display Racks In Delhi"] },
  { title: "Retail Display Rack", category: SUPER, subtitle: "Mild steel, 4 shelves", desc: "All-round retail display rack in mild steel for shops and stores of every size.", page: "retail-display-rack", alts: ["Retail Display Rack", "Retail Store Display"] },
  { title: "Pillar Display Rack", category: SUPER, subtitle: "Pillar-wrap display", desc: "Display fixture that wraps around store pillars to put products where customers already look.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Perforated Display Rack with Hooks", category: SUPER, subtitle: "Perforated panel & hooks", desc: "Perforated back panel with hooks for hanging small, packaged and promotional items.", page: "occupational-therapy-equipment", alts: ["Peg Hooks Display"] },
  { title: "Wall Channel Display Rack", category: SUPER, subtitle: "Channel-mounted shelving", desc: "Wall channel system with adjustable brackets and shelves for flexible layouts.", page: "wall-display-racks", alts: ["Wall Display Racks"] },
  { title: "Round / Revolving Display Rack", category: SUPER, subtitle: "Merry-go-round style", desc: "Round and revolving display stand that shows products from every angle.", page: "merry-go-round", alts: ["Center Gondola Racks"] },
  { title: "Wire Mesh / Basket Display Rack", category: SUPER, subtitle: "Wire rack, 7 ft", desc: "Powder-coated wire display rack with 1-year warranty, ideal for snacks and packaged goods.", page: "supermarket-display-rack", alts: ["SS Snacks Display Rack"] },
  { title: "MS (Mild Steel) Display Rack", category: SUPER, subtitle: "Up to 8 ft, 250 kg", desc: "Mild steel display rack up to 8 ft tall with 7 shelves and powder-coated finish.", page: "supermarket-display-rack", alts: ["MS Display Rack", "MS Supermarket Display Rack"] },
  { title: "SS (Stainless Steel) Display Rack", category: SUPER, subtitle: "Stainless steel, 350 kg", desc: "Stainless steel retail rack with paint-coated finish and about 350 kg load capacity.", page: "supermarket-display-rack", alts: ["SS Retail Display Rack"] },
  { title: "Wooden Display Rack", category: SUPER, subtitle: "Wall & free-standing", desc: "Wooden display racks for boutique and premium retail, wall-mounted or free-standing.", page: "wall-display-racks", alts: ["Wooden Display Rack", "wall free wooden display rack"] },
  { title: "Glass Display Rack", category: SUPER, subtitle: "Glass shelving", desc: "Glass-shelf display rack for showcasing premium, delicate and gift items.", page: "cash-counter", alts: ["Crockery Display Rack"] },
  { title: "Fruit & Vegetable Rack", category: SUPER, subtitle: "MS vegetable rack", desc: "Open-front mild steel rack for fresh produce, built for easy loading and customer access.", page: "vegetable-racks", alts: ["Fruit And Vegetables Display Rack", "MS Vegetable Rack"] },
  { title: "Bakery Display Rack", category: SUPER, subtitle: "Bread & bakery display", desc: "Display rack for bread, biscuits and bakery items with open, easy-access shelves.", page: "supermarket-display-rack", alts: ["SS Snacks Display Rack"] },
  { title: "Snacks & Chips Display Rack", category: SUPER, subtitle: "Stainless steel, 7 ft", desc: "Wire snacks rack, 7 ft high and 2 ft wide, for chips and packaged snacks.", page: "supermarket-display-rack", alts: ["SS Snacks Display Rack"] },
  { title: "Chocolate Display Stand", category: SUPER, subtitle: "Counter & floor stand", desc: "Compact stand for chocolates and confectionery, placed near billing for impulse sales.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Impulse Rack (Cash Counter Rack)", category: SUPER, subtitle: "Billing-counter rack", desc: "Small rack beside the cash counter for last-minute add-on purchases.", page: "cash-counter", alts: ["Cash Counter Top 4 feet"] },
  { title: "Broom Display Stand", category: SUPER, subtitle: "Stainless steel stand", desc: "Stainless steel stand that keeps brooms and long-handled items upright and tidy.", page: "stainless-steel-broom-stand", alts: ["Stainless Steel Broom Stand"] },

  // ---- Garment & Apparel ----------------------------------------------------
  { title: "Garment Display Rack", category: GARMENT, subtitle: "Mild steel", desc: "Mild steel garment rack for clothing stores, sturdy and easy to keep neat.", page: "garment-display-rack", alts: ["Mild Steel Display Rack"] },
  { title: "Garment Hanging Stand", category: GARMENT, subtitle: "Adjustable height", desc: "Hanging stand with adjustable height for shirts, kurtas and dresses.", page: "adjustable-garment-rack", alts: ["Adjustable Garment Rack"] },
  { title: "2-Way / 4-Way Garment Stand", category: GARMENT, subtitle: "SS four-way stand", desc: "Two-way and four-way stainless steel cloth stands that display more garments per square foot.", page: "garment-display-rack", alts: ["SS Four Way Cloth Display Stand"] },
  { title: "Garment Nesting Table", category: GARMENT, subtitle: "Wooden table stand", desc: "Nesting display tables for folded garments, stackable and quick to rearrange.", page: "wooden-table", alts: ["Garments Table Stand ( Without Glass)"] },
  { title: "Wall Mounted Garment Rack", category: GARMENT, subtitle: "Wall-mount", desc: "Wall-mounted garment rack that frees up floor space in boutiques and showrooms.", page: "garment-display-rack", alts: ["Wall Mount Garments Rack"] },
  { title: "Saree Display Rack", category: GARMENT, subtitle: "Saree showcase", desc: "Display rack designed to show sarees and long fabrics clearly and without creasing.", page: "garment-display-rack", alts: ["Mild Steel Display Rack"] },
  { title: "Garment Center Rack", category: GARMENT, subtitle: "Centre-floor rack", desc: "Centre-floor rack for apparel stores with adjustable hanging arms.", page: "adjustable-garment-rack", alts: ["Adjustable Garment Rack"] },

  // ---- Footwear, Beauty & Pharmacy ------------------------------------------
  { title: "Shoe Display Rack", category: SHOE, subtitle: "Footwear shelving", desc: "Tiered rack for shoes, sandals and slippers with angled display shelves.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Wall Mounted Shoe Rack", category: SHOE, subtitle: "Wall-mount", desc: "Wall-mounted shoe rack for compact footwear stores and showrooms.", page: "wall-display-racks", alts: ["Wall Display Racks"] },
  { title: "Cosmetic Display Rack", category: SHOE, subtitle: "Beauty & personal care", desc: "Display rack for cosmetics and personal-care products with shallow, easy-to-view shelves.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Pharmacy / Medical Store Rack", category: SHOE, subtitle: "Medicine rack", desc: "Medicine display rack for pharmacies and medical stores.", page: "pharmacy-rack", alts: ["Pharmacy Medicine Rack"] },
  { title: "Medicine Rack with Drawers", category: SHOE, subtitle: "Wooden, with drawers", desc: "Rack with built-in drawers to organise strips, bottles and loose stock.", page: "wooden-chest-drawer", alts: ["Wooden Rack with Drawers"] },

  // ---- Electronics, Books & Gifts -------------------------------------------
  { title: "Electronics Display Rack", category: ELEC, subtitle: "Electronics showroom", desc: "Display rack for electronic goods and accessories.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "LCD / LED TV Display Rack", category: ELEC, subtitle: "TV display stand", desc: "Sturdy rack and stand for showing LCD and LED televisions.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Mobile Shop Display Rack", category: ELEC, subtitle: "Mobile & accessories", desc: "Compact racks and counters for phones, chargers and accessories.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Home Appliance Display Rack", category: ELEC, subtitle: "Appliance showroom", desc: "Heavy-duty racks for home and kitchen appliances.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Book Rack / Library Rack", category: ELEC, subtitle: "MS book rack", desc: "Mild steel book display racks, 4 shelves, with 1-year warranty.", page: "supermarket-display-rack", alts: ["MS Book Display Racks"] },
  { title: "Stationery Display Rack", category: ELEC, subtitle: "Stationery & school supplies", desc: "Display racks for pens, notebooks and school and office stationery.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Crockery Display Rack", category: ELEC, subtitle: "Crockery showcase", desc: "Display rack for crockery, glassware and kitchenware.", page: "cash-counter", alts: ["Crockery Display Rack"] },
  { title: "Toy Display Rack", category: ELEC, subtitle: "Toy store shelving", desc: "Colourful, easy-reach shelving for toys and games.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Sports Goods Display Rack", category: ELEC, subtitle: "Sports & fitness", desc: "Racks and hooks for sports and fitness goods.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Gift & Fancy Store Rack", category: ELEC, subtitle: "Gifts & novelties", desc: "Display rack for gifts, fancy items and novelty products.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Optical Showcase Rack", category: ELEC, subtitle: "Eyewear display", desc: "Showcase rack for spectacles, frames and sunglasses.", page: "retail-display-rack", alts: ["Retail Display Rack"] },

  // ---- Fixtures & Accessories -----------------------------------------------
  { title: "Slatwall Display Rack / Panel", category: FIX, subtitle: "Slatwall panels", desc: "Slatwall panels that take hooks, shelves and brackets for a flexible wall display.", page: "occupational-therapy-equipment", alts: ["Peg Hooks Display"] },
  { title: "Peg Hooks, Pegboard & Brackets", category: FIX, subtitle: "Hooks & accessories", desc: "Peg hooks, pegboards and brackets for hanging products in any layout.", page: "occupational-therapy-equipment", alts: ["Peg Hooks Display"] },
  { title: "Promotional Display Stand", category: FIX, subtitle: "Offers & launches", desc: "Free-standing promotional stand for offers, launches and seasonal campaigns.", page: "retail-display-rack", alts: ["Retail Display Rack"] },
  { title: "Custom Branded Display Rack", category: FIX, subtitle: "Made to your brand", desc: "Display racks made to your size, colour and branding, with all sizes available on request.", page: "supermarket-display-rack", alts: ["Display Rack Supplier"] },

  // ---- Counters, Trolleys & Baskets -----------------------------------------
  { title: "Cash / Checkout Counter", category: COUNTER, subtitle: "Supermarket checkout", desc: "Checkout counters for supermarkets and retail stores, built to your size.", page: "super-market-racks", alts: ["Supermarket Checkout Counter", "Cash Counter Top 4 feet"] },
  { title: "Glass Display Counter", category: COUNTER, subtitle: "Glass-top counter", desc: "Glass display counter for jewellery, accessories and small high-value items.", page: "cash-counter", alts: ["Cash Counter Top 4 feet"] },
  { title: "Pharmacy / Service Counter", category: COUNTER, subtitle: "L-shaped, with drawers", desc: "L-shaped counter with drawers for pharmacies and service desks.", page: "cash-counter", alts: ["L Shaped Cash Counter Electronic Italian Top Drawer"] },
  { title: "Shopping Trolley", category: COUNTER, subtitle: "Four-wheel, 60 kg", desc: "Stainless steel four-wheel shopping trolley with up to 60 kg load capacity.", page: "shopping-trolley", alts: ["Four-Wheel Supermarket Shopping Trolley", "Four Wheels Shopping Trolley"] },
  { title: "Shopping Basket", category: COUNTER, subtitle: "Hand & wheeled baskets", desc: "Hand and wheeled shopping baskets for supermarkets and stores.", page: "plastic-basket", alts: ["Supermarket Hand Basket", "Plastic Shopping Basket With Wheel"] },
  { title: "Wire Bin Basket / Dump Bin", category: COUNTER, subtitle: "Promo dump bin", desc: "Wire dump bin for bulk, discounted and promotional items.", page: "shopping-trolley", alts: ["Shopping Basket Trolley"] },
];

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

