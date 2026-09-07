// Revly — Blog registry.
//
// The seven-post blog that used to live here was removed in August 2026 because six of
// the seven rendered an identical placeholder body; those slugs are gone deliberately
// and must not come back.
//
// Each post module exports `meta`, `blocks` and `faqs`. `meta` feeds the cards, the
// article header, the <head> tags and the BlogPosting schema, so the values here are
// the single source of truth for all four.
import { meta as g2CapterraMeta, blocks as g2CapterraBlocks, faqs as g2CapterraFaqs } from '../content/post-g2-capterra-acquisition.js';
import { meta as howManyMeta, blocks as howManyBlocks, faqs as howManyFaqs } from '../content/post-how-many-g2-reviews.js';
import { meta as alternativesMeta, blocks as alternativesBlocks, faqs as alternativesFaqs } from '../content/post-g2-alternatives.js';
import { meta as badgesMeta, blocks as badgesBlocks, faqs as badgesFaqs } from '../content/post-g2-badges-explained.js';

export const POSTS = [
  { ...g2CapterraMeta, blocks: g2CapterraBlocks, faqs: g2CapterraFaqs },
  { ...howManyMeta, blocks: howManyBlocks, faqs: howManyFaqs },
  { ...alternativesMeta, blocks: alternativesBlocks, faqs: alternativesFaqs },
  { ...badgesMeta, blocks: badgesBlocks, faqs: badgesFaqs },
];

// Newest first on the index. Sorting on the ISO date rather than the display string.
export const POSTS_BY_DATE = [...POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug);
}

// "Keep learning" shows two posts, chosen by topic rather than by date. Each post names
// its own pair in `meta.related`, closest topic first, because with a handful of posts
// an editorial pick beats a keyword score. Anything missing or misspelled falls back to
// the newest other posts, so the block never renders short.
export function relatedPosts(post, count = 2) {
  const named = (post.related ?? [])
    .map((slug) => POSTS.find((p) => p.slug === slug))
    .filter((p) => p && p.slug !== post.slug);

  const filler = POSTS_BY_DATE.filter(
    (p) => p.slug !== post.slug && !named.some((n) => n.slug === p.slug),
  );

  return [...named, ...filler].slice(0, count);
}

// Card metadata only — the article bodies are large and the index never renders them.
export function postCard(post) {
  const { slug, title, excerpt, category, readTime, dateDisplay, cover, coverAlt, author } = post;
  return { slug, title, excerpt, category, readTime, dateDisplay, cover, coverAlt, author };
}
