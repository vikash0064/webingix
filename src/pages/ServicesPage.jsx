import React from 'react';
import Services from '../components/Services';
import SEO from '../components/SEO';

const ServicesPage = () => {
    const servicesSchema = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Custom Website Development",
        "description": "Tailor-made websites built from scratch using React, Next.js, and modern tech stacks.",
        "provider": { "@type": "Organization", "name": "Webingix" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Business Websites",
        "description": "Professional corporate websites that build trust, showcase your services, and convert visitors.",
        "provider": { "@type": "Organization", "name": "Webingix" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Portfolio & Personal Sites",
        "description": "Showcase your work or personal brand with stunning visuals and smooth interactions.",
        "provider": { "@type": "Organization", "name": "Webingix" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Mobile App Development",
        "description": "Powerful iOS and Android applications designed to provide a seamless mobile experience for your users.",
        "provider": { "@type": "Organization", "name": "Webingix" }
      }
    ];

    return (
        <div className="pt-20">
            <SEO 
                title="Our Performance Digital Services" 
                description="High-end web development, app creation, and digital strategy. We provide the technical muscle to scale your business with premium code." 
                keywords="React development services, custom software, UI/UX agency, business growth digital solutions"
                schemaData={servicesSchema}
            />
            <Services />
        </div>
    );
};

export default ServicesPage;
