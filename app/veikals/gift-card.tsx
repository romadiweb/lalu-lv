"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { type ShopProduct } from "@/lib/shop";
import { formatPrice } from "@/lib/format";
import styles from "./gift-card.module.css";

export function GiftCard({ products }: { products: ShopProduct[] }) {
  const { addItem } = useCart();

  const options = products
    .filter(
      (product) =>
        product.price_cents !== null &&
        product.price_cents > 0 &&
        product.currency === "EUR" &&
        product.stock_status !== "sold_out",
    )
    .sort((a, b) => a.price_cents! - b.price_cents!);

  const [selectedId, setSelectedId] = useState(
    () =>
      options.find((product) => product.price_cents === 2500)?.id ??
      options[0]?.id ??
      "",
  );

  const selectedProduct =
    options.find((product) => product.id === selectedId) ?? options[0];

  const amount = selectedProduct
    ? formatPrice(selectedProduct.price_cents, selectedProduct.currency)
    : "—";

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    addItem({
      id: selectedProduct.id,
      slug: selectedProduct.slug,
      name: selectedProduct.name,
      price_cents: selectedProduct.price_cents,
      currency: selectedProduct.currency,
      image: selectedProduct.image,
    });
  };

  return (
    <section
      className={styles.giftCard}
      aria-labelledby="gift-card-title"
    >
      <div className={styles.visual}>
        <div
          className={styles.preview}
          aria-label={`LaLu dāvanu karte ${amount} vērtībā`}
        >
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.grain} aria-hidden="true" />

          <div className={styles.previewTop}>
            <span className={styles.brand}>LaLu</span>

            <span className={styles.cardType}>
              Dāvanu karte
            </span>
          </div>

          <div className={styles.previewCenter}>
            <span className={styles.previewLabel}>Dāvanu kartes vērtība</span>
            <strong className={styles.amount}>{amount}</strong>
          </div>

          <div className={styles.previewBottom}>
            <span>Ar rokām radīts, ar sirdi dāvāts!</span>

            <div className={styles.mark} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className={styles.visualCaption}>
          <span className={styles.captionDot} />
          Izvēlies vērtību, kas vislabāk der dāvanai
        </div>
      </div>

      <div className={styles.copy}>

        <h2 id="gift-card-title">
          Dāvini iespēju izvēlēties un piedzīvot
        </h2>

        <div className={styles.description}>
          <p>
            Dāvanu karti vari izmantot, lai iepirktos, izvēlētos radošu
            piedzīvojumu vai izmēģinātu ko jaunu.
          </p>

          <p>
            Dāvini ne tikai lietu, bet arī emocijas, jaunus iespaidus un
            skaistas atmiņas.
          </p>
        </div>

        <div className={styles.purchasePanel}>
          <div className={styles.field}>
            <label htmlFor="gift-amount">
              Izvēlies dāvanu kartes summu
            </label>

            <div className={styles.selectWrap}>
              <select
                id="gift-amount"
                className={styles.select}
                value={selectedProduct?.id ?? ""}
                disabled={!options.length}
                onChange={(event) => setSelectedId(event.target.value)}
              >
                {options.map((product) => (
                  <option key={product.id} value={product.id}>
                    {formatPrice(
                      product.price_cents,
                      product.currency,
                    )}
                  </option>
                ))}
              </select>

              <svg
                className={styles.selectIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className={styles.purchaseSummary}>
            <div>
              <span className={styles.summaryLabel}>Izvēlētā vērtība</span>
              <strong>{amount}</strong>
            </div>

            <span className={styles.available}>
              <span />
              Pieejama
            </span>
          </div>

          <button
            className={styles.addButton}
            type="button"
            disabled={!selectedProduct}
            onClick={handleAddToCart}
          >
            <span>
              {selectedProduct
                ? "Pievienot grozam"
                : "Dāvanu kartes šobrīd nav pieejamas"}
            </span>

            {selectedProduct && (
              <>
                <span className={styles.buttonDivider} />

                <strong>{amount}</strong>

                <svg
                  className={styles.buttonArrow}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 9H14M10 5L14 9L10 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}