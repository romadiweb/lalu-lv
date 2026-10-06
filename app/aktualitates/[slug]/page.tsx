import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { getPostBySlug, posts } from "@/lib/posts";
import styles from "./page.module.css";

type ArticlePageProps = PageProps<"/aktualitates/[slug]">;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | LaLu`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const morePosts = posts.filter((relatedPost) => relatedPost.slug !== post.slug);

  return (
    <main className={styles.pageShell}>
      <SiteHeader />

      <article className={styles.article}>
        <header className={styles.header}>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <dl className={styles.meta}>
            <div>
              <dt>Autors</dt>
              <dd>LaLu darbnīca</dd>
            </div>
            <div>
              <dt>Datums</dt>
              <dd>
                <time dateTime={post.dateTime}>{post.date}</time>
              </dd>
            </div>
          </dl>
        </header>

        <div className={`${styles.heroImage} ${styles[post.tone]}`}>
          <Image
            alt={post.imageAlt}
            fill
            priority
            sizes="(max-width: 760px) calc(100vw - 32px), min(1180px, calc(100vw - 48px))"
            src={post.image}
            style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
          />
        </div>

        <div className={styles.body}>
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <section className={styles.moreSection} aria-labelledby="more-articles-title">
          <div className={styles.moreHeader}>
            <h2 id="more-articles-title">Vairāk rakstu</h2>
            <Link href="/aktualitates/">
              Visi raksti
              <ArrowIcon />
            </Link>
          </div>

          <div className={styles.moreGrid}>
            {morePosts.map((relatedPost) => (
              <article className={styles.moreCard} key={relatedPost.slug}>
                <Link href={`/aktualitates/${relatedPost.slug}/`}>
                  <div className={`${styles.moreImage} ${styles[relatedPost.tone]}`}>
                    <Image
                      alt={relatedPost.imageAlt}
                      fill
                      sizes="(max-width: 760px) 82vw, 360px"
                      src={relatedPost.image}
                      style={
                        relatedPost.imagePosition
                          ? { objectPosition: relatedPost.imagePosition }
                          : undefined
                      }
                    />
                  </div>
                  <span>{relatedPost.category}</span>
                  <h3>{relatedPost.title}</h3>
                  <time dateTime={relatedPost.dateTime}>{relatedPost.date}</time>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
