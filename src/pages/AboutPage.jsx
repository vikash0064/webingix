import React from 'react';
import Team from '../components/Team';
import SEO from '../components/SEO';

const AboutPage = () => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.webingix.dev/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.webingix.dev/about" }
      ]
    };

    return (
        <div className="pt-0">
            <SEO 
                title="Our Creative Tech Team" 
                description="Discover the creative minds behind Webingix. Our expert team from New Delhi, India crafts high-performance digital products for global brands." 
                keywords="Webingix team, agency mission, creative directors New Delhi, web developers India"
                schemaData={breadcrumbSchema}
            />
            <Team />
        </div>
    );
};

export default AboutPage;
