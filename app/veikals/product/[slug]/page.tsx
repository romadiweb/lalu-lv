import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { formatPrice, getShopProductBySlug } from "@/lib/shop";
import { ProductAddButton } from "./product-add-button";
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

  return {
    title: `${product.name} | LaLu veikals`,
    description: product.short_description ?? "LaLu roku darināts produkts.",
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

        <div className={styles.productLayout}>
          <div className={styles.galleryStack}>
            <div className={styles.galleryPanel}>
              {product.image ? (
                <Image
                  src={product.image.url}
                  alt={product.image.alt ?? product.name}
                  width={840}
                  height={980}
                  sizes="(max-width: 900px) 100vw, 54vw"
                  priority
                />
              ) : (
                <span>LaLu</span>
              )}
            </div>

            {product.images.length > 1 ? (
              <div className={styles.thumbnailGrid} aria-label="Produkta attēli">
                {product.images.map((image, index) => (
                  <div className={styles.thumbnail} key={`${image.url}-${index}`}>
                    <Image
                      src={image.url}
                      alt={image.alt ?? product.name}
                      width={220}
                      height={220}
                      sizes="120px"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <aside className={styles.productSummary}>
            <div className={styles.statusRow}>
              <p className={styles.status}>
                {product.stock_status === "sold_out" ? "Izpārdots" : "Pieejams pasūtīšanai"}
              </p>
              {product.is_top_product ? <span className={styles.topBadge}>Top produkts</span> : null}
              {product.is_washable ? <span className={styles.washableBadge}>Mazgājams</span> : null}
            </div>
            <h1 id="product-title">{product.name}</h1>
            <p className={styles.price}>{formatPrice(product.price_cents, product.currency)}</p>
            <p className={styles.intro}>
              Produkta aprakstu, izmērus un pasūtīšanas detaļas pievienosim nākamajā solī.
            </p>

            <ProductAddButton product={product} />

            <div className={styles.detailList} aria-label="Produkta detaļas">
              <div>
                <span>Saņemšana</span>
                <p>Omniva, DPD, Latvijas Pasts vai vienojoties darbnīcā.</p>
              </div>
              <div>
                <span>Statuss</span>
                <p>{product.stock_status === "sold_out" ? "Šobrīd nav pieejams." : "Var pievienot grozam."}</p>
              </div>
              <div>
                <span>Roku darbs</span>
                <p>Katrs darbs var nedaudz atšķirties pēc rakstura un faktūras.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
