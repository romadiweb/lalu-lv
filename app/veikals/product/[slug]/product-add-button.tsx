"use client";

import { BagIcon } from "@/components/icons/bag-icon";
import { useCart } from "@/components/cart/cart-provider";
import type { ShopProduct } from "@/lib/shop";
import styles from "./page.module.css";

export function ProductAddButton({ product }: { product: ShopProduct }) {
  const { addItem } = useCart();
  const isSoldOut = product.stock_status === "sold_out";

  return (
    <button
      className={styles.addButton}
      type="button"
      disabled={isSoldOut}
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
      {isSoldOut ? "Izpārdots" : "Pievienot grozam"}
    </button>
  );
}
