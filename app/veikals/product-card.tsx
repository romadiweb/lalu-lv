"use client";

import Image from "next/image";
import Link from "next/link";
import { BagIcon } from "@/components/icons/bag-icon";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { type ShopProduct } from "@/lib/shop";
import styles from "./page.module.css";

export function ProductCard({
  product,
}: {
  product: ShopProduct;
}) {
  const { addItem } = useCart();

  const isSoldOut =
    product.stock_status === "sold_out";

  return (
    <article className={styles.productCard}>
      <div className={styles.productMedia}>
        <Link
          className={styles.productImage}
          href={`/veikals/product/${product.slug}/`}
        >
          {product.image ? (
            <Image
              src={product.image.url}
              alt={
                product.image.alt ?? product.name
              }
              width={480}
              height={560}
              sizes="
                (max-width: 600px) 50vw,
                (max-width: 900px) 33vw,
                (max-width: 1180px) 25vw,
                220px
              "
            />
          ) : (
            <span className={styles.imageFallback}>
              LaLu
            </span>
          )}
        </Link>

        <button
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
        </button>

        {isSoldOut ? (
          <span className={styles.productBadge}>
            Izpārdots
          </span>
        ) : null}
      </div>

      <div className={styles.productInfo}>
        <Link
          className={styles.productName}
          href={`/veikals/product/${product.slug}/`}
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