import React from 'react';
import Services from '../components/Services';
import SEO from '../components/SEO';

const ServicesPage = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="Our Digital Services | Webingix" 
                description="High-end web development, app creation, and digital strategy. We provide the technical muscle to scale your business." 
                keywords="React development services, custom software, UI/UX agency, business growth digital solutions"
            />
            <Services />
        </div>
    );
};

export default ServicesPage;
