"use client";

import Image from "next/image";
import Link from "next/link";
import { BagIcon } from "@/components/icons/bag-icon";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { type ShopProduct } from "@/lib/shop";
import styles from "./page.module.css";

const portraitProductSlugs = new Set([
  "skaista-roku-darinata-lalu-lelle-ar-sominu-milumam-priekam-skaistiem-mirkliem",
  "zaku-meitenite-kosa-kleitina",
  "adita-miega-pele-pelu-puika-bikses",
  "tamborets-rotalu-lacis-pekainis",
  "raibs-tamborets-kakis-ar-baltu-purninu-un-asti",
]);

function productImageClass(product: ShopProduct) {
  if (portraitProductSlugs.has(product.slug)) {
    return `${styles.productImage} ${styles.productImagePortrait}`;
  }

  if (product.slug === "grabulis-gliemezitis") {
    return `${styles.productImage} ${styles.productImageContain}`;
  }

  if (product.slug === "engelisi") {
    return `${styles.productImage} ${styles.productImageAngels}`;
  }

  if (product.slug === "atstarotajs-ar-tautisku-lentiti") {
    return `${styles.productImage} ${styles.productImageReflectors}`;
  }

  return styles.productImage;
}

function productImagePosition(product: ShopProduct) {
  const focalPositions: Record<string, string> = {
    "skaista-roku-darinata-lalu-lelle-ar-sominu-milumam-priekam-skaistiem-mirkliem": "center 37%",
    "zaku-meitenite-kosa-kleitina": "center 15%",
    "adita-miega-pele-pelu-puika-bikses": "center 30%",
    "tamborets-rotalu-lacis-pekainis": "center 24%",
    "raibs-tamborets-kakis-ar-baltu-purninu-un-asti": "center 25%",
  };

  return focalPositions[product.slug];
}

function shouldUseOriginalImage(product: ShopProduct) {
  return Boolean(
    product.image?.url.startsWith("/images/legacy-products/") ||
    [
      "grabulis-gliemezitis",
      "engelisi",
      "atstarotajs-ar-tautisku-lentiti",
      "rokasspradze-patriots-tautiska-lente",
    ].includes(product.slug),
  );
}

export function ProductCard({
  product,
  onNavigate,
}: {
  product: ShopProduct;
  onNavigate?: () => void;
}) {
  const { addItem } = useCart();

  const isSoldOut =
    product.stock_status === "sold_out";

  return (
    <article className={styles.productCard} id={`shop-product-${product.id}`}>
      <div className={styles.productMedia}>
        <Link
          className={productImageClass(product)}
          href={`/veikals/product/${product.slug}/`}
          onNavigate={onNavigate}
        >
          {product.image ? (
            <Image
              src={product.image.url}
              alt={
                product.image.alt ?? product.name
              }
              width={480}
              height={560}
              quality={95}
              unoptimized={shouldUseOriginalImage(product)}
              style={{ objectPosition: productImagePosition(product) }}
              sizes="
                (max-width: 760px) 46vw,
                (max-width: 1050px) 30vw,
                (max-width: 1320px) 23vw,
                240px
              "
            />
          ) : (
            <span className={styles.imageFallback}>
              LaLu
            </span>
          )}
        </Link>

        {product.price_cents === null || product.options?.length || product.colors.length ? <Link className={styles.addToBagButton} href={`/veikals/product/${product.slug}/`} onNavigate={onNavigate} aria-label={`Izvēlēties iespējas: ${product.name}`}><BagIcon /></Link> : <button
          className={styles.addToBagButton}
          type="button"
          disabled={isSoldOut}
          aria-label={`Pievienot grozam: ${product.name}`}
          onClick={() =>
            addItem({
              id: product.id,
              slug: product.slug,
              name: product.name,
              price_cents: product.price_cents,
              currency: product.currency,
              image: product.image,
            })
          }
        >
          <BagIcon />
        </button>}

        {isSoldOut ? (
          <span className={styles.productBadge}>
            Izpārdots
          </span>
        ) : null}

        {product.is_limited_stock && product.stock_status === "in_stock" ? (
          <span className={`${styles.productFlag} ${styles.productFlagLimited}`}>Atlikuši pēdējie gabali</span>
        ) : null}
        {product.is_top_product ? (
          <span className={`${styles.productFlag} ${styles.productFlagTop}`}>
            Top produkts
          </span>
        ) : null}

        {product.is_washable ? (
          <span className={`${styles.productFlag} ${styles.productFlagWashable}`}>
            Mazgājams
          </span>
        ) : null}
      </div>

      <div className={styles.productInfo}>
        <Link
          className={styles.productName}
          href={`/veikals/product/${product.slug}/`}
          onNavigate={onNavigate}
        >
          {product.name}
        </Link>

        <span className={styles.productMeta}>
          {isSoldOut
            ? "Nav pieejams"
            : formatPrice(
                product.price_cents,
                product.currency,
              )}
        </span>
      </div>
    </article>
  );
}
