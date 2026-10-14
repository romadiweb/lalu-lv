import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type {
  BlogPost,
  FlowerGallery,
  FlowerGalleryItem,
  Workshop,
  WorkshopFeatureCard,
  HomepageReview,
} from "@/lib/content-types";

const fallbackHomepageReviews: HomepageReview[] = [
  { id: "jolanta-g", name: "Jolanta G.", quote: "Ļoti jauka vieta, burvīgas pašdarinātas lellītes un arī ļoti interesanta senlietu kolekcija.", rating: 5, source_label: "Google atsauksme" },
  { id: "liga-z", name: "Līga Z.", quote: "Burvīga, ideju pilna un radoša vieta Aizputē.", rating: 5, source_label: "Google atsauksme" },
  { id: "diana-d", name: "Diana D.", quote: "Ļoti silta sagaidīšana. Interesanta prezentācija un ļoti laba fantāzija.", rating: 5, source_label: "Google atsauksme" },
  { id: "sandija-a", name: "Sandija A.", quote: "Ļoti skaista vieta, fantastiski pasniegts stāstījums un jauka, sirsnīga vadītāja.", rating: 5, source_label: "Google atsauksme" },
  { id: "mara-v", name: "Māra V.", quote: "Iesaku ģimenēm. Jauniešiem var pieteikt radošās darbnīcas.", rating: 5, source_label: "Google atsauksme" },
  { id: "sandra-k", name: "Sandra K.", quote: "Bērniem patika atrakcijas, interesantā pasaku taka un izveidotais namiņš.", rating: 5, source_label: "Google atsauksme" },
  { id: "ivars-l", name: "Ivars L.", quote: "Izcili skaista vieta!", rating: 5, source_label: "Google atsauksme" },
  { id: "oksana-h", name: "Oksana H.", quote: null, rating: 5, source_label: "Google atsauksme" },
  { id: "gunita-b", name: "Gunita B.", quote: null, rating: 5, source_label: "Google atsauksme" },
];

export async function getHomepageReviews() {
  noStore();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("homepage_reviews")
    .select("id, name, quote, rating, source_label")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    if (error.code === "42P01" || error.code === "PGRST205") {
      return fallbackHomepageReviews;
    }

    throw new Error(error.message);
  }

  return (data ?? []) as HomepageReview[];
}

export async function getBlogPosts() {
  noStore();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, category, excerpt, body, author_name, published_at, image_url, image_alt, image_position, tone",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  noStore();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, category, excerpt, body, author_name, published_at, image_url, image_alt, image_position, tone",
    )
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as BlogPost | null;
}

export async function getWorkshopsPageData() {
  noStore();

  const supabase = await createClient();
  const [workshopsResponse, featureCardsResponse] = await Promise.all([
    supabase
      .from("workshops")
      .select(
        "id, slug, title, intro, details, duration_label, price_label, travel_label, image_url, image_alt, cta_label, cta_href",
      )
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true }),
    supabase
      .from("workshop_feature_cards")
      .select("id, title, text, image_url, image_alt")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true }),
  ]);

  if (workshopsResponse.error) {
    throw new Error(workshopsResponse.error.message);
  }

  if (featureCardsResponse.error) {
    throw new Error(featureCardsResponse.error.message);
  }

  return {
    workshops: (workshopsResponse.data ?? []) as Workshop[],
    featureCards: (featureCardsResponse.data ?? []) as WorkshopFeatureCard[],
  };
}

export async function getPublishedWorkshopOptions() {
  noStore();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workshops")
    .select("id, title")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((workshop) => ({
    id: String(workshop.id),
    title: String(workshop.title),
  }));
}

export async function getFlowerGalleryBySlug(slug: string) {
  noStore();

  const supabase = await createClient();
  const { data: gallery, error: galleryError } = await supabase
    .from("flower_galleries")
    .select("id, slug, title, description, cover_image_url, cover_image_alt")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (galleryError) {
    throw new Error(galleryError.message);
  }

  if (!gallery) {
    return null;
  }

  const { data: items, error: itemsError } = await supabase
    .from("flower_gallery_items")
    .select("id, gallery_id, title, description, image_url, image_alt, image_position")
    .eq("status", "published")
    .eq("gallery_id", gallery.id)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  return {
    gallery: gallery as FlowerGallery,
    items: (items ?? []) as FlowerGalleryItem[],
  };
}
