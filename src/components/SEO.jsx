import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({
  title,
  description,
  keywords = "web design, mobile app development, UI/UX design, custom software, digital agency India, Webingix",
  image = "https://www.webingix.dev/logo_cgdtgo.png",
  type = "website",
  schemaType = "Organization",
  schemaData = null,
  noindex = false
}) => {
  const { pathname } = useLocation();
  const siteUrl = "https://www.webingix.dev";
  const fullUrl = `${siteUrl}${pathname === '/' ? '' : pathname}`;
  
  // TASK 2: Specific titles
  const isHome = pathname === '/' || pathname === '/home';
  const displayTitle = isHome 
    ? "Webingix – Premium Web Design & Development Agency India" 
    : `${title} | Webingix`;
  
  // TASK 2 & 3: Meta description (exactly 160 chars)
  const homeDescription = "Webingix builds premium, fast websites for businesses in India and worldwide. Custom web design, development & SEO that drives real results. High end solutions.";
  const displayDescription = isHome ? homeDescription : (description || homeDescription).substring(0, 160);

  // Core Structured Data (TASK 3)
  const jsonLd = [];

  if (isHome) {
    // 1. Organization Schema
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Webingix",
      "url": siteUrl,
      "logo": "https://www.webingix.dev/logo_cgdtgo.png",
      "description": "Premium web design and development agency",
      "address": { 
        "@type": "PostalAddress",
        "addressCountry": "IN" 
      },
      "sameAs": [
        "https://linkedin.com/company/webingix",
        "https://github.com/webingix",
        "https://x.com/webingix",
        "https://instagram.com/webingix"
      ]
    });

    // 2. WebSite Schema with SearchAction
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": siteUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });

    // 3. LocalBusiness Schema
    jsonLd.push({
      "@context": "https://schema.org",
      "@id": `${siteUrl}/#localbusiness`,
      "@type": "ProfessionalService",
      "name": "Webingix",
      "serviceArea": "India, Worldwide",
      "priceRange": "$$",
      "image": "https://www.webingix.dev/logo_cgdtgo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "addressCountry": "IN"
      }
    });
  }

  // 4. Custom Page Schema (Service, Breadcrumb, etc.)
  if (schemaData) {
    if (Array.isArray(schemaData)) {
      schemaData.forEach(s => jsonLd.push(s));
    } else {
      jsonLd.push(schemaData);
    }
  }

  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Basic Meta Tags */}
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Robots: Index/Follow vs Noindex/Nofollow (TASK 2) */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data Scripts */}
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
