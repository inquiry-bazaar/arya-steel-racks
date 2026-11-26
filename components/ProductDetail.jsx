import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { catalogue, categoryList } from "@/data/products";
import { company } from "@/data/content";
import { getProductDetails } from "@/data/product-source.mjs";
import ProductView from "@/components/ProductView";

export default function ProductDetail({ product }) {
  const category = categoryList.find((c) => c.name === product.category);

  // same-category products first, then fill up from the rest of the catalogue
  const same = catalogue.filter((p) => p.category === product.category && p.slug !== product.slug);
  const others = catalogue.filter((p) => p.category !== product.category);
  const related = [...same, ...others]
    .slice(0, Math.max(4, Math.min(8, same.length)))
    .map((p) => ({ slug: p.slug, title: p.title, image: p.image }));

  const details = getProductDetails(product, company);

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