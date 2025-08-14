import { Tool } from '@/data/tools';

const BASE_URL = 'https://toollab.dev';

export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'url': BASE_URL,
  'name': 'Toollab',
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${BASE_URL}/tools?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Toollab',
  'url': BASE_URL,
  'logo': `${BASE_URL}/placeholder.svg`,
});

export const getBreadcrumbSchema = (items: { name: string, path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': `${BASE_URL}${item.path}`,
  })),
});

export const getToolSchema = (tool: Tool) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': tool.name,
  'applicationCategory': 'Utilities',
  'operatingSystem': 'Any (Web-based)',
  'description': tool.description,
  'url': `${BASE_URL}${tool.path}`,
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD',
  },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.8',
    'reviewCount': '250',
  },
});