import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title = "Webingix | Premium Digital Agency", 
  description = "Webingix: We craft futuristic digital solutions, premium websites, and custom apps designed to drive real business growth.",
  keywords = "Webingix, web design, app development, digital marketing, React development, New Delhi agency"
}) => {
  const location = useLocation();

  useEffect(() => {
    // Dynamic Title Management
    document.title = title;
    
    // Description Update
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = description;

    // Keywords Update
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.content = keywords;

    // Canonical Link Update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://www.webingix.dev${location.pathname === '/' ? '' : location.pathname}`;

    // Schema.org JSON-LD Structured Data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebAgency",
      "name": "Webingix",
      "url": "https://www.webingix.dev",
      "logo": "https://www.webingix.dev/logo_cgdtgo.png",
      "description": description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New Delhi",
        "addressCountry": "IN"
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schemaData);

  }, [title, description, keywords, location.pathname]);

  return null;
};

export default SEO;
