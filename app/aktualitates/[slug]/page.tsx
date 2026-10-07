import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { formatPostDate } from "@/lib/format";
import styles from "./page.module.css";

type ArticlePageProps = PageProps<"/aktualitates/[slug]">;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

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
  const [post, posts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);

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
              <dd>{post.author_name}</dd>
            </div>
            <div>
              <dt>Datums</dt>
              <dd>
                <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
              </dd>
            </div>
          </dl>
        </header>

        <div className={`${styles.heroImage} ${styles[post.tone]}`}>
          <Image
            alt={post.image_alt}
            fill
            priority
            sizes="(max-width: 760px) calc(100vw - 32px), min(1180px, calc(100vw - 48px))"
            src={post.image_url}
            style={post.image_position ? { objectPosition: post.image_position } : undefined}
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
                      alt={relatedPost.image_alt}
                      fill
                      sizes="(max-width: 760px) 82vw, 360px"
                      src={relatedPost.image_url}
                      style={
                        relatedPost.image_position
                          ? { objectPosition: relatedPost.image_position }
                          : undefined
                      }
                    />
                  </div>
                  <span>{relatedPost.category}</span>
                  <h3>{relatedPost.title}</h3>
                  <time dateTime={relatedPost.published_at}>{formatPostDate(relatedPost.published_at)}</time>
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
