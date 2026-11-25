import { catalogue } from "./products";

// Source: https://www.aryadisplayrack.com/ (home, profile, testimonial pages)
export const company = {
  name: "Arya Display Rack",
  tagline: "Manufacturer of Supermarket Display Racks & Shopping Trolleys",
  established: 2021,
  nature: "Manufacturer, Factory / Wholesale",
  ceo: "Sandeep Kumar",
  address: "Ground Floor, Plot No-42, Block-B, Maharani Enclave, Hastsal, New Delhi - 110059, Delhi, India",
  phone: "+91 7942647738",
  phoneHref: "+917942647738",
  email: "rvpariwar@yahoo.com",
  gst: "07BTWPM5031P1ZV",
  website: "https://www.aryadisplayrack.com/",
  employees: "11 to 25 people",
  rating: "4.5/5 from 72 users",
  about:
    "Established in 2021, Arya Display Rack is a manufacturer of supermarket display racks, shopping trolleys and retail display fixtures. Our racks are made from high-quality raw material and are appreciated for sturdy construction, perfect finish and durability, with customization available to suit your store.",
  goal: "Our display systems are imaginatively designed for maximum product exposure. The goal is good product merchandising.",
  machines: [
    "CRC Turret Punch Press",
    "NC Press Brakes",
    "Tank Phosphating & Powder Coating Plant",
    "Complete Welding Shop",
    "Postforming & PVC Edging Machines",
  ],
  qualityTests: ["Rust resistance", "Finishing", "Strength", "Smoothness"],
};

export const media = {
  heroImage: "/hero.webp",
  heroVideo: "/bg_main_enhanced_.mp4",
  whyPoster: "/hero.webp",
  whyVideo: "/bg_main_enhanced_.mp4",
  whyCorner: "/hero.webp",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", dropdown: true },
  { label: "About Us", href: "/why" },
  { label: "Contact Us", href: "/contact" },
];

const FEATURED = [
  "Supermarket Display Rack",
  "Supermarket Center Rack (Island Rack)",
  "Gondola Display Rack",
  "Double Sided Display Rack",
  "Grocery Store Rack",
  "Garment Display Rack",
  "Pharmacy / Medical Store Rack",
  "Shopping Trolley",
];

export const products = FEATURED.map((t) => catalogue.find((p) => p.title === t)).filter(Boolean);

// icon names are matched in components/WhyChooseUs.jsx
export const features = [
  { label: "Quality-Tested Products", icon: "gem" },
  { label: "Customizable Designs", icon: "settings" },
  { label: "Competitive Pricing", icon: "zap" },
  { label: "Pan-India Supply", icon: "headset" },
];

// icon names are matched in components/Process.jsx
export const steps = [
  { title: "Share Your Requirements", icon: "message" },
  { title: "Get a Custom Design", icon: "ruler" },
  { title: "Manufacturing & Quality Check", icon: "wrench" },
  { title: "Delivery by Road", icon: "truck" },
];

const count = (cat) => catalogue.filter((p) => p.category === cat).length;

// Store types we supply, with counts taken from the real catalogue
export const industries = [
  { name: "Supermarkets & Grocery", image: "/industries/supermarket.jpg", desc: "Gondola, wall and centre racks for every aisle.", cat: "Supermarket & Grocery" },
  { name: "Garment & Apparel", image: "/industries/garment.jpg", desc: "Hanging stands, saree racks and nesting tables.", cat: "Garment & Apparel" },
  { name: "Footwear, Beauty & Pharmacy", image: "/industries/pharmacy.jpg", desc: "Shoe, cosmetic and medicine racks.", cat: "Footwear, Beauty & Pharmacy" },
  { name: "Electronics, Books & Gifts", image: "/industries/electronics.jpg", desc: "Display racks for electronics, books and gifts.", cat: "Electronics, Books & Gifts" },
  { name: "Fixtures & Accessories", image: "/industries/fixtures.jpg", desc: "Slatwall, pegboards and custom branded stands.", cat: "Fixtures & Accessories" },
  { name: "Counters, Trolleys & Baskets", image: "/industries/counters.jpg", desc: "Checkout counters, trolleys and baskets.", cat: "Counters, Trolleys & Baskets" },
].map(({ cat, ...i }) => ({
  ...i,
  stats: [
    { icon: "briefcase", value: String(count(cat)), label: "products" },
    { icon: "shield", value: "100%", label: "made in India" },
    { icon: "chart", value: "Custom", label: "sizes on request" },
  ],
}));

// Real reviewers from the site's Ratings & Reviews page (only one left a written comment).
export const testimonials = [
  {
    name: "Vineet Mishra",
    place: "New Delhi",
    project: "Supermarket Display Rack",
    rating: 5,
    gif: "/testimonials/guy-1.gif",
    review: "Thank you Arya Display Rack, good behaviour and best material.",
    say: "Vineet from New Delhi gave our Supermarket Display Rack five stars and said: good behaviour and best material. Thank you, {name}!",
  },
  {
    name: "Sanjib Debbarma",
    place: "Sonamura, Tripura",
    project: "Supermarket Display Rack",
    rating: 5,
    gif: "/testimonials/guy-2.gif",
    review: "Rated 5 out of 5 for the Supermarket Display Rack.",
    say: "Sanjib from Tripura rated our Supermarket Display Rack 5 out of 5. Thank you, {name}!",
  },
  {
    name: "Sudip Chowdhury",
    place: "Bardhaman, West Bengal",
    project: "Grocery Store Rack",
    rating: 5,
    gif: "/testimonials/guy-3.gif",
    review: "Rated 5 out of 5 for the Grocery Store Rack.",
    say: "Sudip from West Bengal rated our Grocery Store Rack 5 out of 5. Thank you, {name}!",
  },
  {
    name: "Santosh",
    place: "Talegaon Dabhade, Maharashtra",
    project: "Wall Display Racks",
    rating: 5,
    gif: "/testimonials/guy-3.gif",
    review: "Rated 5 out of 5 for the Wall Display Racks.",
    say: "Santosh from Maharashtra rated our Wall Display Racks 5 out of 5. Thank you, {name}!",
  },
];

export const faqs = [
  {
    question: "What types of display racks do you offer?",
    answer:
      "We manufacture supermarket, gondola, grocery, garment, pharmacy, shoe, book and other display racks, plus counters, shopping trolleys and baskets. Browse the full list in our products section.",
  },
  {
    question: "Can the racks be customized?",
    answer:
      "Yes. We offer customization on the range as per your requirements, including size, shelf count and colour. Custom branded display racks are available on request.",
  },
  {
    question: "What are the racks made of?",
    answer:
      "Most racks are mild steel with a powder-coated finish. We also make stainless steel, iron, wooden and wire racks. Every product is tested for rust resistance, finishing, strength and smoothness.",
  },
  {
    question: "What is the minimum order and delivery time?",
    answer:
      "Minimum order quantity depends on the product, commonly 5 to 15 pieces for display racks. Typical delivery time listed for our racks is 7 to 10 days, and shipments go by road.",
  },
  {
    question: "Do you supply outside Delhi?",
    answer:
      "Yes. We are based in New Delhi and supply customers across India, including Uttar Pradesh, Assam, Tripura, West Bengal and Maharashtra.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Click Get a Quote, call +91 7942647738 or message us on WhatsApp with your requirement and store size, and we will send you the price.",
  },
];
