import type { StoreCategory } from "@/lib/site-map";

type CategoryIconProps = {
  tone: StoreCategory["tone"];
};

export function CategoryIcon({ tone }: CategoryIconProps) {
  return (
    <span className={`category-icon category-icon-${tone}`} aria-hidden="true">
      <svg viewBox="0 0 28 28">
        <path className="icon-thread" d="M7 17.6c4-6.2 8.8-8.6 14.2-7.4" />
        <path className="icon-thread icon-thread-alt" d="M6.8 10.8c3.4 1 6.8 3.9 10.2 8.6" />
        <circle cx="9" cy="18.8" r="2.8" />
        <circle cx="19.2" cy="9.4" r="2.6" />
      </svg>
    </span>
  );
}
