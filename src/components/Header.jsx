import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Logo = () => {
    return (
        <svg width="244" height="52" viewBox="0 0 350 100" xmlns="http://www.w3.org/2000/svg" className="w-[35vw] h-auto md:w-[14vw]">
            <defs>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
            </defs>

            {/* Tech Frame Design */}
            <rect x="8" y="12" width="334" height="76" fill="none" stroke="#ffffff" strokeWidth="1" />
            
            {/* Corners */}
            <rect x="5" y="9" width="6" height="6" fill="#000" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="339" y="9" width="6" height="6" fill="#000" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="5" y="85" width="6" height="6" fill="#000" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="339" y="85" width="6" height="6" fill="#000" stroke="#ffffff" strokeWidth="0.8" />

            {/* Mid markers */}
            <rect x="172" y="9" width="6" height="6" fill="#000" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="172" y="85" width="6" height="6" fill="#000" stroke="#ffffff" strokeWidth="0.8" />

            <text x="50%" y="54%"
                fontFamily="'Bebas Neue', Impact, 'Arial Narrow', sans-serif"
                fontSize="92" fontWeight="900"
                dominantBaseline="middle"
                textAnchor="middle"
                letterSpacing="1"
                textLength="310"
                lengthAdjust="spacingAndGlyphs">
                <tspan fill="#ffffff">WEBINGI</tspan><tspan fill="#39ff14">X</tspan>
            </text>
        </svg>
    );
}

const Header = () => {
    const navigate = useNavigate();

    const navItems = [
        { name: 'Team', href: '/about' },
        { name: 'Work', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-[100] bg-transparent">
            <div className="relative z-10 px-[5vw] md:px-[3vw] py-[5vw] md:pb-[2.5vw] md:pt-[1vw] max-w-[1800px] w-full mx-auto flex justify-between items-start md:items-center">
                {/* Logo */}
                <div
                    className="flex items-center cursor-pointer select-none pointer-events-auto"
                    onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
                >
                    <Logo />
                </div>

                {/* Nav */}
                <nav className="flex flex-col md:flex-row items-end md:items-center gap-1.5 md:gap-[1vw]">
                    <ul className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-[.8vw] font-inter uppercase font-medium text-[10px] md:text-[min(1.2vw,18px)] text-[#F1F1F1] pointer-events-auto">
                        {navItems.map((item) => (
                            <li key={item.name} className="relative group">
                                <Link
                                    to={item.href}
                                    className="relative flex items-center leading-none py-[1vw] md:py-0 font-bold hover:text-white/70 transition-colors"
                                >
                                    {item.name},
                                </Link>
                            </li>
                        ))}
                        <li className="md:hidden">
                            <a
                                href="https://wa.me/918153929447"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#6ADC01] font-bold py-[1vw]"
                            >
                                WhatsApp
                            </a>
                        </li>
                    </ul>
                    
                    {/* Desktop WhatsApp */}
                    <a
                        href="https://wa.me/918153929447"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex text-[#6ADC01] text-[min(1.2vw,18px)] font-bold uppercase pointer-events-auto hover:opacity-80 transition-opacity"
                    >
                        WhatsApp
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;

