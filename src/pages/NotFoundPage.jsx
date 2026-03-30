import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white px-6">
            <SEO 
                title="404 Page Not Found" 
                description="The page you are looking for does not exist. Return to Webingix home page for premium web and app development services." 
                noindex={true}
            />
            <div className="text-center">
                <h1 className="font-display text-[15vw] md:text-[8vw] leading-none mb-4 uppercase tracking-tighter">404</h1>
                <p className="font-urbanist text-xl md:text-2xl opacity-60 mb-8 max-w-md mx-auto">This page seems to have drifted into space.</p>
                <Link 
                    to="/" 
                    className="inline-block px-8 py-3 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-[#39ff14] transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
