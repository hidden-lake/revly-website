// Revly — Structured data (JSON-LD) builders, rendered server-side into static HTML.
// Centralised so schema stays consistent across pages and in sync with rendered content.

export const SITE_URL = 'https://revly.io';
export const SITE_NAME = 'Revly';
// Also feeds the Organization and SoftwareApplication schemas, so keep it factual
// and keep it matching how the site itself describes the routing step.
export const SITE_DESCRIPTION =
  'Revly is the review management platform for software companies. Collect reviews with one smart link, monitor every platform, and respond where buyers look.';

// Site-wide schemas — emitted on every page via Base.astro.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description: SITE_DESCRIPTION,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
};

// The product itself — use on home and pricing. Optional offers array for pricing tiers.
export function softwareApplicationSchema(offers) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: SITE_DESCRIPTION,
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
