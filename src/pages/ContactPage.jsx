import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.webingix.dev/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.webingix.dev/contact" }
      ]
    };

    return (
        <div className="bg-[#151515]">
            <SEO 
                title="Get in Touch with Our Experts" 
                description="Ready to build your next big idea? Reach out to Webingix for a free consultation and project quote for your web or mobile app." 
                keywords="contact Webingix, hire web developers, digital agency consultation"
                schemaData={breadcrumbSchema}
            />
            <Contact isContactPage={true} />
            <Footer />
        </div>
    );
};

export default ContactPage;
