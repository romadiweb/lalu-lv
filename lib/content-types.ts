export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  author_name: string;
  published_at: string;
  image_url: string | null;
  image_alt: string | null;
  image_position: string | null;
  tone: "lavender" | "warm" | "neutral";
};

export type Workshop = {
  id: string;
  slug: string;
  title: string;
  intro: string;
  details: string[];
  duration_label: string;
  price_label: string;
  travel_label: string;
  image_url: string;
  image_alt: string;
  cta_label: string | null;
  cta_href: string | null;
};

export type WorkshopFeatureCard = {
  id: string;
  title: string;
  text: string;
  image_url: string;
  image_alt: string;
};

export type FlowerGallery = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
};

export type FlowerGalleryItem = {
  id: string;
  gallery_id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  image_alt: string;
  image_position: string | null;
};
