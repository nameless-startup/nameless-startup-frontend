import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetail from "@/components/products/product-detail";

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  return { title: product ? `${product.name} | گیلانه` : "محصول پیدا نشد | گیلانه", description: product?.description };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();
  return <ProductDetail key={product.id} product={product} related={products.filter((item) => item.id !== id)} />;
}
