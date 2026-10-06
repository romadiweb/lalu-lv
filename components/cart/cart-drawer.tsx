"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useCart } from "./cart-provider";

export function CartDrawer() {
  const { closeCart, isCartOpen, itemCount, items, removeItem, setItemQuantity } = useCart();
  const totalCents = items.reduce((total, item) => total + (item.price_cents ?? 0) * item.quantity, 0);

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
              <button type="button">Turpināt pasūtījumu</button>
              <p>Pasūtījuma noformēšanu pievienosim nākamajā solī.</p>
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
