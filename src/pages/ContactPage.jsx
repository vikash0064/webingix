import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#151515]">
            <Contact isContactPage={true} />
            <Footer />
        </div>
    );
};

export default ContactPage;
