"use client";

import { BagIcon } from "@/components/icons/bag-icon";
import { useCart } from "./cart-provider";

export function CartToggle({ className, onOpen }: { className: string; onOpen?: () => void }) {
  const { itemCount, openCart } = useCart();

  const handleOpen = () => {
    onOpen?.();
    openCart();
  };

  return (
    <button className={className} type="button" aria-label="Atvērt grozu" onClick={handleOpen}>
      <BagIcon />
      {itemCount ? <span className="bag-count">{itemCount}</span> : null}
    </button>
  );
}
