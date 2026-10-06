"use client";

import Image from "next/image";
import Link from "next/link";
import { BagIcon } from "@/components/icons/bag-icon";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { type ShopProduct } from "@/lib/shop";
import styles from "./page.module.css";

export function ProductCard({ product }: { product: ShopProduct }) {
  const { addItem } = useCart();

  return (
    <article className={styles.productCard}>
      <Link className={styles.productLink} href={`/veikals/product/${product.slug}/`}>
        <span className={styles.productImage}>
          {product.image ? (
            <Image
              src={product.image.url}
              alt={product.image.alt ?? product.name}
              width={520}
              height={680}
              sizes="(max-width: 760px) 50vw, (max-width: 1180px) 33vw, 260px"
            />
          ) : (
            <span className={styles.imageFallback}>LaLu</span>
          )}
        </span>
        <span className={styles.productName}>{product.name}</span>
      </Link>
      <span className={styles.productMeta}>
        {product.stock_status === "sold_out" ? "Izpārdots" : formatPrice(product.price_cents, product.currency)}
      </span>
      <button
        className={styles.addToBagButton}
        type="button"
        disabled={product.stock_status === "sold_out"}
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
      </button>
    </article>
  );
}
