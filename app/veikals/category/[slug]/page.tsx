import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { getShopData } from "@/lib/shop";
import { ShopView } from "../../shop-view";
import styles from "../../page.module.css";

type CategoryPageProps = PageProps<"/veikals/category/[slug]">;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { categories } = await getShopData();
  const category = categories.find((item) => item.slug === slug);

  return {
    title: category ? `${category.name} | LaLu veikals` : "Veikals | LaLu",
    description: category?.description ?? "LaLu veikala produktu kategorija.",
  };
}

export default async function VeikalsCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { categories, products } = await getShopData();

  if (!categories.some((category) => category.slug === slug)) {
    notFound();
  }

  return (
    <main className={styles.pageShell}>
      <SiteHeader />
      <ShopView activeCategorySlug={slug} categories={categories} products={products} />
      <SiteFooter />
    </main>
  );
}
