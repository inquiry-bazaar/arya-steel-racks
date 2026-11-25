import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { catalogue, categoryList } from "@/data/products";
import { company } from "@/data/content";
import Category from "@/components/Category";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...catalogue.map((p) => ({ slug: p.slug })), ...categoryList.map((c) => ({ slug: c.slug }))];
}

const find = (slug) => ({
  product: catalogue.find((p) => p.slug === slug),
  category: categoryList.find((c) => c.slug === slug),
});

export function generateMetadata({ params }) {
  const { product, category } = find(params.slug);
  if (product) {
    return {
      title: `${product.title} | ${company.name}, New Delhi`,
      description: `${product.desc} Manufactured by ${company.name}, New Delhi. Custom sizes available.`,
    };
  }
  if (category) {
    return {
      title: `${category.name} | ${company.name}, New Delhi`,
      description: `${category.count} products in ${category.name} by ${company.name}, New Delhi.`,
    };
  }
  return {};
}

export default function SlugPage({ params }) {
  const { product, category } = find(params.slug);
  if (product) return <ProductDetail product={product} />;
  if (category) return <Category category={category} />;
  notFound();
}