import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { formatPrice, getShopProductBySlug } from "@/lib/shop";
import { publicSiteUrl } from "@/lib/public-site-url";
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
              {product.is_limited_stock && product.stock_status === "in_stock" ? <span className={styles.limitedBadge}>Atlikuši pēdējie gabali</span> : null}
              {product.is_top_product ? <span className={styles.topBadge}>Top produkts</span> : null}
              {product.is_washable ? <span className={styles.washableBadge}>Mazgājams</span> : null}
            </div>
            <h1 id="product-title">{product.name}</h1>
            <p className={styles.price}>{formatPrice(product.price_cents, product.currency)}</p>
            <p className={styles.intro}>
              {product.short_description || "Par produkta izmēriem un pasūtīšanas detaļām sazinies ar LaLu."}
            </p>

            <ProductAddButton product={product} />

            <div className={styles.detailList} aria-label="Produkta detaļas">
              {product.colors.length ? <div><span>Krāsas</span><p>{product.colors.join(", ")}</p></div> : null}
              <div>
                <span>Saņemšana</span>
                <p>Omniva, DPD, Latvijas Pasts vai vienojoties darbnīcā.</p>
              </div>
              <div>
                <span>Statuss</span>
                <p>{product.stock_status === "sold_out" ? "Šobrīd nav pieejams." : "Var pievienot grozam."}</p>
              </div>
              <div>
                <span>Attēls un izstrādājums</span>
                <p>Ekrānā redzamais krāsu tonis var nedaudz atšķirties no izstrādājuma faktiskā toņa ierīces ekrāna iestatījumu dēļ. Roku darba izstrādājumiem iespējamas nelielas faktūras un detaļu atšķirības.</p>
              </div>
              <div>
                <span>Individuāls pasūtījums</span>
                <p>Vēlies citu krāsu vai dizainu? <Link href="/veikals/category/pasutijumi/">Piesaki individuālu pasūtījumu</Link>, un vienosimies par iespējām.</p>
              </div>
            </div>
        <div className={styles.shareRow}>
          <a className={styles.facebookShare} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicSiteUrl(`/veikals/product/${encodeURIComponent(product.slug)}/`))}`} target="_blank" rel="noopener noreferrer">
            <span className={styles.facebookIconRoll} aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5A25 25 0 0 0 15 1c-3 0-5 2-5 5v3H7v4h3v8z" /></svg>
              <svg viewBox="0 0 24 24"><path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5A25 25 0 0 0 15 1c-3 0-5 2-5 5v3H7v4h3v8z" /></svg>
            </span>
            Dalīties Facebook
          </a>
        </div>
          </aside>
        </div>

      </section>
      <SiteFooter />
    </main>
  );
}
