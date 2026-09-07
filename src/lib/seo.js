// Revly — Structured data (JSON-LD) builders, rendered server-side into static HTML.
// Centralised so schema stays consistent across pages and in sync with rendered content.

export const SITE_URL = 'https://revly.io';
export const SITE_NAME = 'Revly';
// Node identifiers. Everything that points at the site or the product references
// these rather than repeating a URL, so the graph stays connected.
export const WEBSITE_ID = `${SITE_URL}#website`;
export const SOFTWARE_ID = `${SITE_URL}#software`;
// Also feeds the Organization and SoftwareApplication schemas, so keep it factual
// and keep it matching how the site itself describes the routing step.
export const SITE_DESCRIPTION =
  'Revly is the review management platform for software companies. Collect reviews with one smart link, monitor every platform, and respond where buyers look.';

// Site-wide schemas — emitted on every page via Base.astro.
// sameAs tells search and answer engines that the Revly here, the Revly on
// LinkedIn and the Revly on YouTube are one entity. Add review-platform profile
// URLs here as they go live -- those are the pages AI engines cite most.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/revly-logo.png` },
  image: `${SITE_URL}/og-image.png`,
  description: SITE_DESCRIPTION,
  email: 'hello@revly.io',
  sameAs: [
    'https://www.linkedin.com/company/revlyhq/',
    'https://www.youtube.com/@revlyhq',
  ],
};

// The site is served from directory indexes, so /pricing 301s to /pricing/.
// Everything that emits a URL runs through this, so canonical, schema and the
// sitemap all name the address that actually returns 200.
export function canonicalUrl(path) {
  if (!path || path === '/') return `${SITE_URL}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean.endsWith('/') ? clean : `${clean}/`}`;
}

// No SearchAction here on purpose. Revly has no public site search, and declaring
// one that does not exist is a false signal.
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: 'en',
};

// Published plan prices, taken from /pricing. These are the annual-billing rates the
// pricing page shows as its headline figures. Agency is quote-only, so it sets no
// highPrice: the highest number here is the highest one Revly actually publishes.
// If /pricing changes, change these in the same commit.
const PLAN_LOW_PRICE = '0';
const PLAN_HIGH_PRICE = '84';

// The product itself. Pass `description` to describe the specific capability a feature
// page covers; omit it and the schema falls back to the site-wide description.
//
// No aggregateRating anywhere in here. Google requires it to reflect reviews collected
// on our own property, and Revly does not display those. A review platform publishing
// an unearned rating is the worst possible place to get this wrong.
export function softwareApplicationSchema(offers, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Review Management Software',
    operatingSystem: 'Web browser',
    description: description ?? SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    publisher: { '@id': `${SITE_URL}#organization` },
    featureList: [
      'Review collection with a pre-ask check-in',
      'AI writing assistance for customer reviews',
      'Smart routing to the right review platform',
      'Unified review dashboard across every connected platform',
      'Slack and email alerts for new reviews',
      'AI-drafted review responses',
      'Embeddable review widgets',
      'Review analytics and rating trends',
    ],
    offers: offers ?? {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: PLAN_LOW_PRICE,
      highPrice: PLAN_HIGH_PRICE,
      offerCount: 4,
      url: canonicalUrl('/pricing'),
    },
  };
}

// Build a FAQPage schema from a [{ q, a }] array (the same data the page renders), so
// the visible answers and the markup cannot drift apart.
//
// Google restricted FAQ rich results to government and health sites in 2023, so the
// Rich Results Test reports this as ineligible. That is expected, not a fault: answer
// engines still parse it, and it is the cleanest statement of what a page answers.
// Pass `path` to attach the block to that page's WebPage node.
export function faqPageSchema(faqs, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(path ? { '@id': `${canonicalUrl(path)}#faq`, isPartOf: { '@id': canonicalUrl(path) } } : {}),
    mainEntity: faqs.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

// WebPage plus its BreadcrumbList, as one @graph so the two can reference each other.
// The trail is Home > this page: there is no intermediate /product listing page on the
// site, and pointing a breadcrumb at a URL that 404s is worse than a shorter trail.
// Blog posts are the exception, so `parent` inserts one real intermediate crumb
// ({ name, path }). Only pass a page that exists and returns 200.
export function webPageSchema({ name, description, path, breadcrumbName, parent }) {
  const url = canonicalUrl(path);
  const trail = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }];
  if (parent) {
    trail.push({ '@type': 'ListItem', position: 2, name: parent.name, item: canonicalUrl(parent.path) });
  }
  trail.push({ '@type': 'ListItem', position: trail.length + 1, name: breadcrumbName ?? name, item: url });
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name,
        description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': SOFTWARE_ID },
        inLanguage: 'en',
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: trail,
      },
    ],
  };
}

// BlogPosting for an article, built from the post module so headline, dates and
// description always match what the page actually renders. Author is the Organization:
// posts are written by the team, and claiming a Person who does not exist is worse
// than claiming nobody.
export function blogPostingSchema(post) {
  const url = canonicalUrl(`/blog/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/og-image.png`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { '@type': 'Organization', name: post.author, url: `${SITE_URL}/` },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/revly-logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en',
    articleSection: post.category,
    keywords: post.keywords,
    ...(post.about ? { about: post.about } : {}),
    ...(post.citation ? { citation: post.citation } : {}),
  };
}

// Blog index — the CollectionPage listing the posts that exist right now.
export function blogIndexSchema(posts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${canonicalUrl('/blog')}#blog`,
    name: `${SITE_NAME} blog`,
    url: canonicalUrl('/blog'),
    publisher: { '@id': `${SITE_URL}#organization` },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      url: canonicalUrl(`/blog/${post.slug}`),
    })),
  };
}
