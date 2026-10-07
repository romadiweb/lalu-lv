import type { ReactNode } from "react";
import type { AdminResource } from "@/lib/admin/resources";

const paths: Record<AdminResource["icon"], ReactNode> = {
  article: <><path d="M5 3.5h7l3 3v10H5z" /><path d="M12 3.5v3h3M8 10h4M8 13h4" /></>,
  tag: <><path d="M3.5 9V4h5l7.5 7.5-4.5 4.5z" /><path d="M7 7h.01" /></>,
  workshop: <><path d="m5 15 8-8M10.5 5.5l2-2 4 4-2 2M4 12l4 4H4z" /></>,
  cards: <><rect x="3.5" y="5" width="11" height="11" rx="2" /><path d="M6 2.5h8.5a2 2 0 0 1 2 2V13" /></>,
  gallery: <><rect x="3" y="3.5" width="14" height="13" rx="2" /><circle cx="7" cy="7.5" r="1.2" /><path d="m5 14 3.5-3.5 2.5 2 2-2 2 3.5" /></>,
  image: <><path d="M10 17c4 0 6-2.5 6-5.5S13.5 4 10 3c-3.5 1-6 5.5-6 8.5S6 17 10 17Z" /><path d="M7 13c1.5-2.5 3.5-4 6-5" /></>,
  store: <><path d="M3 7.5h14l-1.5-4h-11zM4.5 7.5v9h11v-9" /><path d="M8 16.5v-5h4v5" /></>,
  product: <><path d="m4 7 6-3.5L16 7v7l-6 3-6-3z" /><path d="m4 7 6 3 6-3M10 10v7" /></>,
};

export function ResourceIcon({ icon }: { icon: AdminResource["icon"] }) {
  return (
    <svg className="admin-resource-icon" viewBox="0 0 20 20" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}
