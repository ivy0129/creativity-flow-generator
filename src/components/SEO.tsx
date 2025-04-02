
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = 'https://lovable.dev/opengraph-image-p98pqg.png',
  url,
  type = 'website',
  keywords,
  canonical
}) => {
  const { t, language } = useLanguage();
  const location = useLocation();
  
  const defaultTitle = 'MyPrompt - AI指令优化专家';
  const defaultDescription = 'MyPrompt - AI指令优化专家，帮助开发者创建更好的AI提示词，提高AI交互质量';
  const defaultKeywords = 'AI提示词,AI指令,提示词优化,prompt optimization,AI assistant,开发者工具';
  
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  
  // 构建完整URL
  const baseUrl = 'https://myprompt.ai';
  const pageUrl = url || `${baseUrl}${location.pathname}`;
  const pageCanonical = canonical || pageUrl;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MyPrompt",
    "description": pageDescription,
    "url": pageUrl,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "inLanguage": language,
    "image": image
  };

  return (
    <Helmet>
      {/* 基础 Meta 标签 */}
      <html lang={language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph Meta 标签 */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : 'zh_CN'} />
      
      {/* Twitter Card Meta 标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lovable_dev" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageCanonical} />
      
      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
