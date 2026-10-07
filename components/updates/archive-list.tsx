"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/content-types";
import { formatPostDate } from "@/lib/format";
import styles from "./archive-list.module.css";

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="m12.5 12.5 4 4" />
    </svg>
  );
}

export function ArchiveList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLocaleLowerCase("lv");

    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) =>
      [post.title, post.excerpt, post.category]
        .join(" ")
        .toLocaleLowerCase("lv")
        .includes(normalizedQuery),
    );
  }, [deferredQuery, posts]);

  return (
    <section className={styles.section} aria-labelledby="archive-title">
      <header className={styles.header}>
        <h1 id="archive-title">Visas aktualitātes</h1>
        <label className={styles.search}>
          <span className={styles.visuallyHidden}>Meklēt aktualitātēs</span>
          <input
            type="search"
            value={query}
            placeholder="Meklēt aktualitātes…"
            onChange={(event) => setQuery(event.target.value)}
          />
          <SearchIcon />
        </label>
      </header>

      <p className={styles.resultCount} aria-live="polite">
        {filteredPosts.length === posts.length
          ? `${posts.length} aktualitātes`
          : `Atrastas ${filteredPosts.length} aktualitātes`}
      </p>

      <div className={styles.list}>
        {filteredPosts.map((post, index) => (
          <article className={styles.item} key={post.slug}>
            <Link
              aria-label={`Lasīt aktualitāti: ${post.title}`}
              className={`${styles.itemLink} ${post.image_url ? "" : styles.itemLinkNoImage}`}
              href={`/aktualitates/${post.slug}/`}
            >
              <div className={styles.copy}>
                <h2>{post.title}</h2>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
                <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
              </div>
              {post.image_url ? (
                <div className={styles.imageWrap}>
                  <Image
                    alt={post.image_alt ?? post.title}
                    className={styles.image}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 430px) 24vw, (max-width: 720px) 104px, (max-width: 1020px) 136px, 160px"
                    src={post.image_url}
                    style={post.image_position ? { objectPosition: post.image_position } : undefined}
                  />
                </div>
              ) : null}
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <div className={styles.empty}>
          <h2>Nekas netika atrasts</h2>
          <p>Pamēģini citu vārdu vai notīri meklēšanas lauku.</p>
        </div>
      ) : null}
    </section>
  );
}
