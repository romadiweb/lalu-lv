"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { type ShopCategory, type ShopProduct } from "@/lib/shop";
import { GiftCard } from "./gift-card";
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

function getCategorySlugsForFilter(categories: ShopCategory[], activeSlug?: string) {
  if (!activeSlug) {
    return [];
  }

  const activeCategory = categories.find((category) => category.slug === activeSlug);

  if (!activeCategory) {
    return [activeSlug];
  }

  const childSlugs = categories
    .filter((category) => category.parent_id === activeCategory.id)
    .map((category) => category.slug);

  return [activeSlug, ...childSlugs];
}

export function ShopView({
  activeCategorySlug,
  categories,
  products,
}: ShopViewProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedSort = searchParams.get("sort");
  const sort: SortKey = requestedSort === "price_asc" || requestedSort === "price_desc" ? requestedSort : "recommended";
  const search = searchParams.get("q") ?? "";
  const availableOnly = searchParams.get("available") === "1";
  const requestedCount = Number(searchParams.get("loaded"));
  const visibleCount = Number.isSafeInteger(requestedCount) ? Math.max(PRODUCTS_PER_PAGE, requestedCount) : PRODUCTS_PER_PAGE;

  function updateView(values: Record<string, string | null>, resetCount = true) {
    const params = new URLSearchParams(searchParams.toString());
    if (resetCount) params.delete("loaded");
    for (const [key, value] of Object.entries(values)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    window.history.replaceState(null, "", `${pathname}${query ? `?${query}` : ""}`);
  }

  function rememberProduct(productId: string) {
    const card = document.getElementById(`shop-product-${productId}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const offset = Math.max(96, Math.min(rect.top, window.innerHeight - Math.min(rect.height, 400) - 24));
    try {
      sessionStorage.setItem(`lalu:shop-return:${window.location.pathname}${window.location.search}`, JSON.stringify({ productId, offset }));
    } catch { /* The URL still preserves the loaded products if storage is unavailable. */ }
  }

  useEffect(() => {
    const key = `lalu:shop-return:${window.location.pathname}${window.location.search}`;
    let saved: { productId: string; offset: number };
    try {
      const value = sessionStorage.getItem(key);
      if (!value) return;
      saved = JSON.parse(value);
    } catch { return; }
    // Restore after the router's own scroll handling and after the expanded grid exists.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const card = document.getElementById(`shop-product-${saved.productId}`);
        if (!card || !Number.isFinite(saved.offset)) return;
        window.scrollTo({ top: window.scrollY + card.getBoundingClientRect().top - saved.offset, behavior: "instant" });
        try { sessionStorage.removeItem(key); } catch { /* Storage can be disabled. */ }
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, searchParams]);

  const activeCategory = categories.find(
    (category) => category.slug === activeCategorySlug,
  );

  const categoryGroups = useMemo(
    () =>
      categories
        .filter((category) => !category.parent_id)
        .map((category) => ({
          ...category,
          children: categories.filter((child) => child.parent_id === category.id),
        })),
    [categories],
  );

  const activeCategorySlugs = useMemo(
    () => getCategorySlugsForFilter(categories, activeCategorySlug),
    [activeCategorySlug, categories],
  );

  const visibleProducts = useMemo(() => {
    const catalogProducts = products.filter((product) => !product.categorySlugs.includes("davanu-kartes"));
    let nextProducts = activeCategorySlug
      ? catalogProducts.filter((product) =>
          product.categorySlugs.some((slug) => activeCategorySlugs.includes(slug)),
        )
      : [...catalogProducts];

    if (search.trim()) {
      const normalizedSearch = search.trim().toLowerCase();

      nextProducts = nextProducts.filter((product) =>
        [product.name, ...product.colors, ...(product.options ?? []).map(option => option.name)].some(value => value.toLowerCase().includes(normalizedSearch)),
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
    activeCategorySlugs,
    availableOnly,
    products,
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
                updateView({ q: event.target.value })
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

              {categoryGroups.map((category) => {
                const isActive =
                  category.slug === activeCategorySlug;
                const hasChildren = category.children.length > 0;
                const isChildActive = category.children.some(
                  (child) => child.slug === activeCategorySlug,
                );

                return (
                  <div className={styles.categoryGroup} key={category.id}>
                    <Link
                      className={`${styles.filterOption} ${
                        isActive || isChildActive
                          ? styles.filterOptionActive
                          : ""
                      } ${hasChildren ? styles.filterOptionParent : ""}`}
                      href={`/veikals/category/${category.slug}/`}
                    >
                      <span className={styles.filterCheckbox} />

                      <span>{category.name}</span>
                    </Link>

                    {hasChildren ? (
                      <div className={styles.subcategoryOptions}>
                        {category.children.map((child) => (
                          <Link
                            className={`${styles.filterOption} ${
                              child.slug === activeCategorySlug
                                ? styles.filterOptionActive
                                : ""
                            } ${styles.subcategoryOption}`}
                            href={`/veikals/category/${child.slug}/`}
                            key={child.id}
                          >
                            <span className={styles.filterCheckbox} />
                            <span>{child.name}</span>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
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
                  updateView({ available: event.target.checked ? "1" : null })
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

            <div className={styles.toolbarControls} hidden={activeCategorySlug === "davanu-kartes" && visibleProducts.length === 0}>
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
                    updateView({ sort: event.target.value === "recommended" ? null : event.target.value })
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

          {activeCategorySlug === "pasutijumi" ? (
            <div className={styles.customOrderIntro}>
              <p>Vēlies darinājumu savās krāsās vai īpašu dizainu? Pastāsti par savu ieceri, un vienosimies par iespējām, cenu un izgatavošanas laiku.</p>
              <Link href="/pieteikties/?veids=individuals-pasutijums">Pieteikt individuālu pasūtījumu</Link>
            </div>
          ) : null}
          {(activeCategorySlug === "davanu-kartes") && !search.trim() ? <GiftCard products={products.filter((product) => product.categorySlugs.includes("davanu-kartes"))} /> : null}
          {activeCategorySlug === "davanu-kartes" && !search.trim() && visibleProducts.length === 0 ? null : visibleProducts.length ? (
            <>
              <div className={styles.productGrid}>
                {displayedProducts.map((product) => (
                  <ProductCard
                    product={product}
                    onNavigate={() => rememberProduct(product.id)}
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
                      updateView({ loaded: String(Math.min(visibleCount + PRODUCTS_PER_PAGE, visibleProducts.length)) }, false)
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
                  updateView({ q: null, available: null });
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
