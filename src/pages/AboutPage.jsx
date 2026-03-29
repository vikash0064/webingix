import React from 'react';
import Team from '../components/Team';
import SEO from '../components/SEO';

const AboutPage = () => {
    return (
        <div className="pt-0">
            <SEO 
                title="Meet the Team | Webingix" 
                description="Discover the creative minds behind Webingix. Our expert team crafts futuristic digital products from New Delhi, India." 
                keywords="Webingix team, agency mission, creative directors New Delhi, web developers India"
            />
            <Team />
        </div>
    );
};

export default AboutPage;
