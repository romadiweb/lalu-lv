"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShopProduct } from "@/lib/shop";
import styles from "./page.module.css";

export function ProductGallery({ images, name }: { images: ShopProduct["images"]; name: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex];

  return <div className={styles.galleryStack}>
    <div className={styles.galleryPanel}>
      {selected ? <Image src={selected.url} alt={selected.alt ?? name} width={840} height={980} sizes="(max-width: 900px) 100vw, 54vw" priority /> : <span>LaLu</span>}
    </div>
    {images.length > 1 ? <div className={styles.thumbnailGrid} aria-label="Produkta attēli">
      {images.map((image, index) => <button className={styles.thumbnail} type="button" key={`${image.url}-${index}`} aria-label={`Skatīt attēlu: ${image.alt ?? `${name}, ${index + 1}`}`} aria-pressed={index === selectedIndex} onClick={() => setSelectedIndex(index)}>
        <Image src={image.url} alt="" width={100} height={100} sizes="80px" />
      </button>)}
    </div> : null}
  </div>;
}
