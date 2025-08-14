import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
}

const Seo = ({ title, description, keywords, canonicalPath, ogImage, ogType = 'website', schema }: SeoProps) => {
  const siteName = 'Toollab';
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = 'https://toollab.dev';
  const finalCanonicalUrl = `${baseUrl}${canonicalPath || ''}`;
  const finalOgImage = ogImage || `${baseUrl}/placeholder.svg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={finalCanonicalUrl} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={finalOgImage} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* JSON-LD Schema */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default Seo;