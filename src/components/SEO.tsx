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
  
  const defaultTitle = 'MyPrompt - AI Prompt Optimization Expert';
  const defaultDescription = language === 'en' 
    ? 'MyPrompt - AI Prompt Optimization Expert: Collect, optimize, and manage your ChatGPT prompts with our prompt generator and engineering tips. Learn how to write better AI prompts.'
    : 'MyPrompt - AI指令优化专家：收集、优化并管理您的ChatGPT提示词，提供prompt生成器和工程技巧，帮助您编写更好的AI提示词。';
  
  const defaultKeywords = 'AI提示词,AI指令,提示词优化,prompt optimization,AI assistant,开发者工具,collect prompt,AI prompts,ChatGPT prompts,prompt generator,how to write better AI prompts,prompt engineering tips,manage prompt,my prompt';
  
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  
  // 构建完整URL
  const baseUrl = 'https://mypromptdoctor.com';
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
    "keywords": pageKeywords.split(',').map(keyword => keyword.trim()),
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
      <meta name="robots" content="index, follow, max-image-preview:large" />
      
      {/* Open Graph Meta 标签 */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : 'zh_CN'} />
      <meta property="og:site_name" content="MyPrompt" />
      
      {/* Twitter Card Meta 标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lovable_dev" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* 其他SEO标签 */}
      <meta name="application-name" content="MyPrompt" />
      <meta name="apple-mobile-web-app-title" content="MyPrompt" />
      
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
