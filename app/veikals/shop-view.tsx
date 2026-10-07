"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type ShopCategory, type ShopProduct } from "@/lib/shop";
import { ProductCard } from "./product-card";
import styles from "./page.module.css";

type ShopViewProps = {
  activeCategorySlug?: string;
  categories: ShopCategory[];
  products: ShopProduct[];
};

type SortKey = "recommended" | "price_asc" | "price_desc";

const PRODUCTS_PER_PAGE = 20;

const sortLabels: Record<SortKey, string> = {
  recommended: "Ieteicamais",
  price_asc: "Cena: zemākā",
  price_desc: "Cena: augstākā",
};

export function ShopView({
  activeCategorySlug,
  categories,
  products,
}: ShopViewProps) {
  const [sort, setSort] = useState<SortKey>("recommended");
  const [search, setSearch] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [visibleCount, setVisibleCount] =
    useState(PRODUCTS_PER_PAGE);

  const activeCategory = categories.find(
    (category) => category.slug === activeCategorySlug,
  );

  const visibleProducts = useMemo(() => {
    let nextProducts = activeCategorySlug
      ? products.filter((product) =>
          product.categorySlugs.includes(activeCategorySlug),
        )
      : [...products];

    if (search.trim()) {
      const normalizedSearch = search.trim().toLowerCase();

      nextProducts = nextProducts.filter((product) =>
        product.name.toLowerCase().includes(normalizedSearch),
      );
    }

    if (availableOnly) {
      nextProducts = nextProducts.filter(
        (product) => product.stock_status !== "sold_out",
      );
    }

    if (sort === "price_asc") {
      nextProducts.sort(
        (a, b) =>
          (a.price_cents ?? Number.MAX_SAFE_INTEGER) -
          (b.price_cents ?? Number.MAX_SAFE_INTEGER),
      );
    }

    if (sort === "price_desc") {
      nextProducts.sort(
        (a, b) =>
          (b.price_cents ?? -1) -
          (a.price_cents ?? -1),
      );
    }

    return nextProducts;
  }, [
    activeCategorySlug,
    availableOnly,
    products,
    search,
    sort,
  ]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisibleCount(PRODUCTS_PER_PAGE);
    });

    return () => cancelAnimationFrame(frame);
  }, [
    activeCategorySlug,
    availableOnly,
    search,
    sort,
  ]);

  const displayedProducts = visibleProducts.slice(
    0,
    visibleCount,
  );

  const hasMoreProducts =
    visibleCount < visibleProducts.length;

  const nextBatchCount = Math.min(
    PRODUCTS_PER_PAGE,
    visibleProducts.length - visibleCount,
  );

  return (
    <section
      className={styles.shopSection}
      aria-labelledby="shop-title"
    >
      <div className={styles.shopBreadcrumbs}>
        <Link href="/">Sākums</Link>

        <span aria-hidden="true">/</span>

        <Link href="/veikals/">Veikals</Link>

        {activeCategory ? (
          <>
            <span aria-hidden="true">/</span>
            <span>{activeCategory.name}</span>
          </>
        ) : null}
      </div>

      <div className={styles.shopLayout}>
        <aside
          className={styles.shopFilters}
          aria-label="Veikala filtri"
        >
          <form
            className={styles.shopSearch}
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="m13 13 4 4" />
            </svg>

            <input
              aria-label="Meklēt produktus"
              placeholder="Meklēt"
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </form>

          <FilterSection title="Kategorijas">
            <nav className={styles.filterOptions}>
              <Link
                className={`${styles.filterOption} ${
                  !activeCategorySlug
                    ? styles.filterOptionActive
                    : ""
                }`}
                href="/veikals/"
              >
                <span className={styles.filterCheckbox} />
                <span>Visi produkti</span>
              </Link>

              {categories.map((category) => {
                const isActive =
                  category.slug === activeCategorySlug;

                return (
                  <Link
                    className={`${styles.filterOption} ${
                      isActive
                        ? styles.filterOptionActive
                        : ""
                    }`}
                    href={`/veikals/category/${category.slug}/`}
                    key={category.id}
                  >
                    <span
                      className={styles.filterCheckbox}
                    />

                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </nav>
          </FilterSection>

          <FilterSection title="Pieejamība">
            <label className={styles.filterOption}>
              <input
                className={styles.nativeCheckbox}
                type="checkbox"
                checked={availableOnly}
                onChange={(event) =>
                  setAvailableOnly(event.target.checked)
                }
              />

              <span className={styles.filterCheckbox} />

              <span>Rādīt tikai pieejamos</span>
            </label>
          </FilterSection>

          <div className={styles.filterHint}>
            <span>LaLu veikals</span>

            <p>
              Roku darināti darbi, nelielas sērijas un īpaši
              radīti produkti.
            </p>
          </div>
        </aside>

        <div className={styles.shopCatalog}>
          <div className={styles.shopToolbar}>
            <div className={styles.toolbarTitle}>
              <p className={styles.shopEyebrow}>
                Veikals
              </p>

              <h1 id="shop-title">
                {activeCategory?.name ?? "Visi produkti"}
              </h1>
            </div>

            <div className={styles.toolbarControls}>
              <span className={styles.resultCount}>
                {visibleProducts.length}{" "}
                {visibleProducts.length === 1
                  ? "produkts"
                  : "produkti"}
              </span>

              <label className={styles.sortControl}>
                <span className={styles.visuallyHidden}>
                  Kārtot pēc
                </span>

                <select
                  aria-label="Kārtot produktus"
                  value={sort}
                  onChange={(event) =>
                    setSort(
                      event.target.value as SortKey,
                    )
                  }
                >
                  {Object.entries(sortLabels).map(
                    ([value, label]) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {label}
                      </option>
                    ),
                  )}
                </select>

                <svg
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                >
                  <path d="m4 5 3 3 3-3" />
                </svg>
              </label>
            </div>
          </div>

          {visibleProducts.length ? (
            <>
              <div className={styles.productGrid}>
                {displayedProducts.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                  />
                ))}
              </div>

              {hasMoreProducts ? (
                <div className={styles.loadMoreArea}>
                  <button
                    className={styles.loadMoreButton}
                    type="button"
                    onClick={() =>
                      setVisibleCount((current) =>
                        Math.min(
                          current +
                            PRODUCTS_PER_PAGE,
                          visibleProducts.length,
                        ),
                      )
                    }
                  >
                    <span className={styles.loadMoreLabel}>
                      Ielādēt vēl
                    </span>

                    <span
                      className={styles.loadMoreCount}
                    >
                      +{nextBatchCount}
                    </span>
                  </button>

                  <p
                    className={
                      styles.loadMoreProgress
                    }
                  >
                    Parādīti{" "}
                    {displayedProducts.length} no{" "}
                    {visibleProducts.length}
                  </p>
                </div>
              ) : null}
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>
                Neviens produkts neatbilst izvēlētajiem
                filtriem.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setAvailableOnly(false);
                }}
              >
                Notīrīt filtrus
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.filterSection}>
      <div className={styles.filterHeading}>
        <h2>{title}</h2>

        <svg
          viewBox="0 0 14 14"
          aria-hidden="true"
        >
          <path d="m3 9 4-4 4 4" />
        </svg>
      </div>

      {children}
    </div>
  );
}
