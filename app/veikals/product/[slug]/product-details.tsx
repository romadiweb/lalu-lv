"use client";

import { useState } from "react";
import Link from "next/link";
import type { ShopProduct } from "@/lib/shop";
import { formatPrice } from "@/lib/format";
import { ProductGallery } from "./product-gallery";
import { ProductAddButton } from "./product-add-button";
import styles from "./page.module.css";

export function ProductDetails({ product, initialOptionId, shareUrl }: { product: ShopProduct; initialOptionId?: string; shareUrl: string }) {
  const options = product.options ?? [];
  const initial = options.find(option => option.id === initialOptionId) ?? options.find(option => !option.giftBox && option.stock_status !== "sold_out") ?? options[0];
  const [optionId, setOptionId] = useState(initial?.id);
  const [color, setColor] = useState(product.colors[0] ?? "");
  const selected = options.find(option => option.id === optionId);
  const colors = Array.from(new Set(options.map(option => option.color).filter((value): value is string => Boolean(value))));
  const packs = Array.from(new Set(options.map(option => option.pack).filter((value): value is string => Boolean(value))));
  const hasGiftBox = options.some(option => option.giftBox);
  const price = selected ? selected.price_cents : product.price_cents;
  const stock = selected?.stock_status ?? product.stock_status;
  const description = selected?.description ?? product.description;
  const images = selected?.images.length ? selected.images : product.images;
  const chosenColor = selected?.color ?? color;

  function chooseColor(value: string) {
    if (!colors.length) { setColor(value); return; }
    const matching = options.filter(option => option.color === value);
    const next = matching.find(option => option.giftBox === Boolean(selected?.giftBox) && option.stock_status !== "sold_out") ?? matching.find(option => option.stock_status !== "sold_out") ?? matching[0];
    if (next) setOptionId(next.id);
  }

  return <div className={styles.productLayout}>
    <ProductGallery key={selected?.id ?? product.id} images={images} name={product.name} />
    <aside className={styles.productSummary}>
      <div className={styles.statusRow}>
        <p className={styles.status}>{stock === "sold_out" ? "Izpārdots" : "Pieejams pasūtīšanai"}</p>
        {product.is_limited_stock && stock === "in_stock" ? <span className={styles.limitedBadge}>Atlikuši pēdējie gabali</span> : null}
        {product.is_top_product ? <span className={styles.topBadge}>Top produkts</span> : null}
        {product.is_washable ? <span className={styles.washableBadge}>Mazgājams</span> : null}
      </div>
      <h1 id="product-title">{product.name}</h1>
      <p className={styles.price} aria-live="polite">{formatPrice(price, product.currency)}</p>
      <p className={styles.intro}>{product.short_description || "Par produkta izmēriem un pasūtīšanas detaļām sazinies ar LaLu."}</p>

      {colors.length || product.colors.length || packs.length || hasGiftBox ? <fieldset className={styles.productOptions}>
        <legend>Izvēlies savu izstrādājumu</legend>
        {colors.length || product.colors.length ? <label className={styles.optionField}>
          <span>Krāsa</span>
          <select value={chosenColor} onChange={event => chooseColor(event.target.value)}>
            {(colors.length ? colors : product.colors).map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </label> : null}
        {packs.length ? <label className={styles.optionField}>
          <span>Komplekts</span>
          <select value={selected?.pack ?? ""} onChange={event => {
            const next = options.find(option => option.pack === event.target.value);
            if (next) setOptionId(next.id);
          }}>{packs.map(pack => <option value={pack} key={pack}>{pack}</option>)}</select>
        </label> : null}
        {hasGiftBox ? <label className={styles.giftBoxOption}>
          <input type="checkbox" checked={Boolean(selected?.giftBox)} disabled={!options.some(option => option.color === selected?.color && option.giftBox !== selected?.giftBox)} onChange={event => {
            const next = options.find(option => option.color === selected?.color && option.giftBox === event.target.checked);
            if (next) setOptionId(next.id);
          }} />
          <span>Dāvanu kastīte{(() => {
            const boxed = options.find(option => option.color === selected?.color && option.giftBox);
            const unboxed = options.find(option => option.color === selected?.color && !option.giftBox);
            return boxed?.price_cents != null && unboxed?.price_cents != null ? ` (+${formatPrice(boxed.price_cents - unboxed.price_cents, product.currency)})` : "";
          })()}</span>
        </label> : null}
      </fieldset> : null}

      <ProductAddButton product={product} option={selected} color={colors.length ? undefined : color || undefined} />
      {description ? <div className={styles.fullDescription}>
        <h2>Par izstrādājumu</h2>
        {description.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div> : null}
      <div className={styles.detailList} aria-label="Produkta detaļas">
        <div><span>Saņemšana</span><p>Omniva, DPD, Latvijas Pasts vai vienojoties darbnīcā.</p></div>
        <div><span>Statuss</span><p>{stock === "sold_out" ? "Šobrīd nav pieejams." : price === null ? "Cena un pasūtījuma detaļas pēc vienošanās." : "Var pievienot grozam."}</p></div>
        <div><span>Attēls un izstrādājums</span><p>Ekrānā redzamais krāsu tonis var nedaudz atšķirties no izstrādājuma faktiskā toņa ierīces ekrāna iestatījumu dēļ. Roku darba izstrādājumiem iespējamas nelielas faktūras un detaļu atšķirības.</p></div>
        <div><span>Individuāls pasūtījums</span><p>Vēlies citu krāsu vai dizainu? <Link href="/pieteikties/?veids=individuals-pasutijums">Piesaki individuālu pasūtījumu</Link>, un vienosimies par iespējām.</p></div>
      </div>
      <div className={styles.shareRow}>
        <a className={styles.facebookShare} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
          <span className={styles.facebookIconRoll} aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5A25 25 0 0 0 15 1c-3 0-5 2-5 5v3H7v4h3v8z" /></svg>
            <svg viewBox="0 0 24 24"><path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5A25 25 0 0 0 15 1c-3 0-5 2-5 5v3H7v4h3v8z" /></svg>
          </span>Dalīties Facebook
        </a>
      </div>
    </aside>
  </div>;
}
