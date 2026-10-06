"use client";

import { BagIcon } from "@/components/icons/bag-icon";
import { useCart } from "./cart-provider";

export function CartToggle({ className }: { className: string }) {
  const { itemCount, openCart } = useCart();

  return (
    <button className={className} type="button" aria-label="Atvērt grozu" onClick={openCart}>
      <BagIcon />
      {itemCount ? <span className="bag-count">{itemCount}</span> : null}
    </button>
  );
}
