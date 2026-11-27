import { catalogue, categoryList } from "@/data/products";
import { company } from "@/data/content";
import { getProductDetails } from "@/data/product-source.mjs";
import ProductView from "@/components/ProductView";

export default function ProductDetail({ product }) {
  const category = categoryList.find((c) => c.name === product.category);
  const details = getProductDetails(product, company);

  // same-category products first, then fill up from the rest of the catalogue
  const same = catalogue.filter((p) => p.category === product.category && p.slug !== product.slug);
  const others = catalogue.filter((p) => p.category !== product.category);
  const automatic = [...same, ...others]
    .slice(0, Math.max(4, Math.min(8, same.length)))
    .map((p) => ({ slug: p.slug, title: p.title, image: p.image }));

  // a product's own related list wins; names with no product page yet get no link
  const related = details.relatedProducts
    ? details.relatedProducts.map((title) => {
        const match = catalogue.find((p) => p.title === title);
        return { slug: match?.slug || null, title, image: match?.image || null };
      })
    : automatic;

  return (
    <main>
      <ProductView
        product={{
          slug: product.slug,
          title: product.title,
          subtitle: product.subtitle,
          desc: product.desc,
          image: product.image,
          category: product.category,
        }}
        category={category ? { name: category.name, slug: category.slug } : { name: product.category, slug: "products" }}
        related={related}
        details={details}
        waNumber={company.phoneHref.replace("+", "")}
      />
    </main>
  );
}