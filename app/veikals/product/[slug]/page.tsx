import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { getShopProductBySlug } from "@/lib/shop";
import { publicSiteUrl } from "@/lib/public-site-url";
import { ProductDetails } from "./product-details";
import styles from "./page.module.css";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getShopProductBySlug(slug);

  if (!product) {
    return {
      title: "Produkts nav atrasts | LaLu",
    };
  }

  const description = product.short_description?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || "LaLu roku darināts produkts.";
  const url = publicSiteUrl(`/veikals/product/${encodeURIComponent(product.slug)}/`);
  return {
    title: `${product.name} | LaLu veikals`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website", locale: "lv_LV", siteName: "LaLu", url,
      title: product.name, description,
      images: product.image ? [{ url: publicSiteUrl(product.image.url), alt: product.image.alt ?? product.name }] : [],
    },
    twitter: { card: "summary_large_image", title: product.name, description,
      images: product.image ? [publicSiteUrl(product.image.url)] : [] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getShopProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className={styles.pageShell}>
      <SiteHeader />
      <section className={styles.productShell} aria-labelledby="product-title">
        <div className={styles.breadcrumbs}>
          <Link href="/veikals/">Veikals</Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </div>

        <ProductDetails product={product} initialOptionId={product.initialOptionId} shareUrl={publicSiteUrl(`/veikals/product/${encodeURIComponent(product.slug)}/`)} />

      </section>
      <SiteFooter />
    </main>
  );
}
