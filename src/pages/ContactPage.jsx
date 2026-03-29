import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#151515]">
            <SEO 
                title="Contact Us | Webingix" 
                description="Ready to build your next big idea? Reach out to Webingix for a free consultation and project quote." 
                keywords="contact Webingix, hire web developers, digital agency consultation"
            />
            <Contact isContactPage={true} />
            <Footer />
        </div>
    );
};

export default ContactPage;
