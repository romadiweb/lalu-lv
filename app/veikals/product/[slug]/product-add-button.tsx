"use client";

import { BagIcon } from "@/components/icons/bag-icon";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import type { ShopProduct } from "@/lib/shop";
import type { ProductOption } from "@/lib/product-options";
import styles from "./page.module.css";

export function ProductAddButton({ product, option, color }: { product: ShopProduct; option?: ProductOption; color?: string }) {
  const { addItem } = useCart();
  const isSoldOut = (option?.stock_status ?? product.stock_status) === "sold_out";
  const price = option ? option.price_cents : product.price_cents;
  const name = `${option?.name ?? product.name}${color ? ` — ${color}` : ""}`;

  if (price === null) {
    return <Link className={styles.addButton} href={`/pieteikties/?veids=individuals-pasutijums&prece=${encodeURIComponent(name)}`}>Vienoties par pasūtījumu</Link>;
  }

  return (
    <button
      className={styles.addButton}
      type="button"
      disabled={isSoldOut}
      onClick={() =>
        addItem({
          id: option?.id ?? product.id,
          slug: option?.slug ?? product.slug,
          name,
          color,
          price_cents: price,
          currency: product.currency,
          image: option?.images[0] ?? product.image,
        })
      }
    >
      <BagIcon />
      {isSoldOut ? "Izpārdots" : "Pievienot grozam"}
    </button>
  );
}
