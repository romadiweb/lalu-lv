import Link from "next/link";
import { type ShopCategory, type ShopProduct } from "@/lib/shop";
import { ProductCard } from "./product-card";
import styles from "./page.module.css";

type ShopViewProps = {
  activeCategorySlug?: string;
  categories: ShopCategory[];
  products: ShopProduct[];
};

const sortLabels = {
  recommended: "Ieteicamais",
  price_asc: "Zemākā cena",
  price_desc: "Augstākā cena",
};

function sortProducts(products: ShopProduct[], sort: keyof typeof sortLabels) {
  return [...products].sort((a, b) => {
    if (sort === "price_asc") {
      return (a.price_cents ?? Number.MAX_SAFE_INTEGER) - (b.price_cents ?? Number.MAX_SAFE_INTEGER);
    }

    if (sort === "price_desc") {
      return (b.price_cents ?? -1) - (a.price_cents ?? -1);
    }

    return 0;
  });
}

export function ShopView({ activeCategorySlug, categories, products }: ShopViewProps) {
  const activeCategory = categories.find((category) => category.slug === activeCategorySlug);
  const visibleProducts = activeCategorySlug
    ? products.filter((product) => product.categorySlugs.includes(activeCategorySlug))
    : products;
  const sortedProducts = sortProducts(visibleProducts, "recommended");

  return (
    <section className={styles.shopShell} aria-labelledby="shop-title">
      <aside className={styles.sidebar} aria-label="Produktu kategorijas">
        <form className={styles.searchBox} action="/veikals/" role="search">
          <input aria-label="Meklēt produktus" name="q" placeholder="Meklēt" type="search" />
          <button type="submit" aria-label="Meklēt">
            <svg aria-hidden="true" viewBox="0 0 20 20">
              <path d="m14 14 4 4M8.5 15a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z" />
            </svg>
          </button>
        </form>

        <h2>Pārlūkot</h2>
        <nav className={styles.categoryNav}>
          <Link className={!activeCategorySlug ? styles.activeCategory : undefined} href="/veikals/">
            Visi produkti
          </Link>
          {categories.map((category) => (
            <Link
              className={category.slug === activeCategorySlug ? styles.activeCategory : undefined}
              href={`/veikals/category/${category.slug}/`}
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className={styles.catalog}>
        <div className={styles.toolbar}>
          <div>
            <p>Veikals</p>
            <h1 id="shop-title">{activeCategory?.name ?? "Visi produkti"}</h1>
          </div>

          <label>
            <span>Kārtot pēc</span>
            <select defaultValue="recommended" aria-label="Kārtot produktus">
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.productGrid}>
          {sortedProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
