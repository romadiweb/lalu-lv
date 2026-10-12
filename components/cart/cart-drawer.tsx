"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { useCart } from "./cart-provider";

export function CartDrawer() {
  const { clearCart, closeCart, isCartOpen, itemCount, items, removeItem, setItemQuantity } = useCart();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const totalCents = items.reduce((total, item) => total + (item.price_cents ?? 0) * item.quantity, 0);

  async function startCheckout() {
    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/paysera/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await response.json()) as { paymentUrl?: string; error?: string };

      if (!response.ok || !data.paymentUrl) {
        throw new Error(data.error ?? "Neizdevās sākt apmaksu.");
      }

      clearCart();
      window.location.assign(data.paymentUrl);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Neizdevās sākt apmaksu.");
      setIsCheckingOut(false);
    }
  }

  return (
    <>
      <button
        className={`cart-backdrop${isCartOpen ? " is-open" : ""}`}
        type="button"
        aria-label="Aizvērt grozu"
        onClick={closeCart}
      />
      <aside className={`cart-drawer${isCartOpen ? " is-open" : ""}`} aria-hidden={!isCartOpen}>
        <div className="cart-drawer-header">
          <div>
            <p>Grozs</p>
            <h2>{itemCount ? `${itemCount} prece${itemCount === 1 ? "" : "s"}` : "Tavs grozs"}</h2>
          </div>
          <button type="button" aria-label="Aizvērt grozu" onClick={closeCart}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m4 4 8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {items.length ? (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <Link className="cart-item-image" href={`/veikals/product/${item.slug}/`} onClick={closeCart}>
                    {item.image ? (
                      <Image src={item.image.url} alt={item.image.alt ?? item.name} width={120} height={150} sizes="72px" />
                    ) : (
                      <span>LaLu</span>
                    )}
                  </Link>
                  <div className="cart-item-body">
                    <Link href={`/veikals/product/${item.slug}/`} onClick={closeCart}>
                      {item.name}
                    </Link>
                    <span>{formatPrice(item.price_cents, item.currency)}</span>
                    <div className="cart-quantity">
                      <button type="button" aria-label="Samazināt daudzumu" onClick={() => setItemQuantity(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label="Palielināt daudzumu" onClick={() => setItemQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button className="cart-remove" type="button" onClick={() => removeItem(item.id)}>
                    Noņemt
                  </button>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Kopā</span>
                <strong>{formatPrice(totalCents, "EUR")}</strong>
              </div>
              <button type="button" onClick={startCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? "Pārsūtām uz Paysera..." : "Apmaksāt ar Paysera"}
              </button>
              {checkoutError ? <p className="cart-error">{checkoutError}</p> : null}
              <p>Apmaksa notiek drošā Paysera logā ārpus šīs lapas.</p>
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <p>Grozs vēl ir tukšs.</p>
            <Link href="/veikals/" onClick={closeCart}>
              Apskatīt veikalu
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
