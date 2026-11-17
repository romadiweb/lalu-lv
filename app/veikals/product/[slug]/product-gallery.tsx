"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShopProduct } from "@/lib/shop";
import styles from "./page.module.css";

export function ProductGallery({ images, name }: { images: ShopProduct["images"]; name: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex];
  const useOriginalImage = selected?.url.startsWith("/images/legacy-products/");

  return <div className={styles.galleryStack}>
    <div className={styles.galleryPanel}>
      {selected ? <Image
        className={styles.galleryImage}
        src={selected.url}
        alt={selected.alt ?? name}
        fill
        quality={95}
        unoptimized={useOriginalImage}
        sizes="(max-width: 560px) calc(100vw - 20px), (max-width: 900px) min(calc(100vw - 28px), 620px), 620px"
        priority
      /> : <span>LaLu</span>}
    </div>
    {images.length > 1 ? <div className={styles.thumbnailGrid} aria-label="Produkta attēli">
      {images.map((image, index) => <button className={styles.thumbnail} type="button" key={`${image.url}-${index}`} aria-label={`Skatīt attēlu: ${image.alt ?? `${name}, ${index + 1}`}`} aria-pressed={index === selectedIndex} onClick={() => setSelectedIndex(index)}>
        <Image src={image.url} alt="" width={100} height={100} sizes="80px" />
      </button>)}
    </div> : null}
  </div>;
}
