// Revly — Structured data (JSON-LD) builders, rendered server-side into static HTML.
// Centralised so schema stays consistent across pages and in sync with rendered content.

export const SITE_URL = 'https://revly.io';
export const SITE_NAME = 'Revly';
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
  url: SITE_URL,
  logo: `${SITE_URL}/assets/revly-logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description: SITE_DESCRIPTION,
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

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
};

// The product itself — use on home and pricing. Optional offers array for pricing tiers.
// Pass `description` to describe the specific capability a feature page covers;
// omit it and the schema falls back to the site-wide description.
export function softwareApplicationSchema(offers, description) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: description ?? SITE_DESCRIPTION,
    url: SITE_URL,
  };
  schema.offers = offers ?? { '@type': 'Offer', price: '0', priceCurrency: 'USD' };
  return schema;
}

// Build a FAQPage schema from a [{ q, a }] array (the same data the page renders).
export function faqPageSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
export function webPageSchema({ name, description, path, breadcrumbName }) {
  const url = canonicalUrl(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name,
        description,
        isPartOf: { '@id': `${SITE_URL}/` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumbName ?? name, item: url },
        ],
      },
    ],
  };
}
