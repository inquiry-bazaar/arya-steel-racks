import { categories, raw, slugify } from "./product-source.mjs";

export { categories };

export const catalogue = raw.map((p) => ({ ...p, slug: slugify(p.title) }));

export const categoryList = categories.map((name) => {
  const items = raw.filter((p) => p.category === name);
  return {
    name,
    slug: slugify(name),
    count: items.length,
    image: items[0]?.image,
  };
});