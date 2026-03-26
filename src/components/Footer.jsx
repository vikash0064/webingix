import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-[#151515] relative overflow-hidden pt-[10vw]">
            <style dangerouslySetInnerHTML={{
                __html: `
                .footer-metallic-text {
                    background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(236,236,236,0.95) 28%, rgba(184,184,184,0.8) 58%, rgba(86,86,86,0.5) 82%, rgba(20,20,20,0.15) 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    text-shadow: 0 0 18px rgba(255, 255, 255, 0.04);
                }
                `
            }} />
            <div className="px-[2vw] pb-0 flex items-center justify-center min-h-[30vh]">
                {/* Massive Branding Watermark - High Visibility (Image Match) */}
                <div className="select-none pointer-events-none w-full transform translate-y-[12%]">
                    <h1 className="footer-metallic-text font-anton text-[28vw] leading-[0.8] uppercase text-center opacity-[0.72] tracking-tighter">
                        WEBINGI<span className="text-[#39ff14] opacity-100 inline-block text-[1.05em] translate-y-[0.02em]">X</span>
                    </h1>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[30vw] bg-[#39ff14]/[0.03] blur-[120px] rounded-full pointer-events-none" />
            {/* Hidden Admin Access */}
            {/* <Link
                to="/admin"
                aria-label="Admin access"
                title="Admin"
                className="absolute bottom-4 right-4 z-20 w-4 h-4 rounded-full bg-[#39ff14] opacity-[0.08] hover:opacity-[0.18] transition-opacity duration-300"
            /> */}
        </footer>
    );
};

export default Footer;
