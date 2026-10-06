import type { Metadata } from "next";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { getShopData } from "@/lib/shop";
import { ShopView } from "./shop-view";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Veikals | LaLu",
  description: "Roku darinātas rotaļlietas, adījumi, atstarotāji un radošas dāvanas LaLu veikalā.",
};

export default async function VeikalsPage() {
  const { categories, products } = await getShopData();

  return (
    <main className={styles.pageShell}>
      <SiteHeader />
      <ShopView categories={categories} products={products} />
      <SiteFooter />
    </main>
  );
}
