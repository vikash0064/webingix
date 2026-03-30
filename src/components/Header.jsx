import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const LogoComponent = () => {
    return (
        <Logo className="w-[35vw] h-auto md:w-[14vw] transition-all duration-300 hover:scale-[1.03] active:scale-95" />
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
                    <LogoComponent />
                </div>

                {/* Nav */}
                <nav className="flex flex-col md:flex-row items-end md:items-center gap-1.5 md:gap-[1.5vw]">
                    <ul className="flex flex-col md:flex-row md:items-center items-end gap-1 md:gap-[1vw] font-inter uppercase font-medium text-[clamp(11px,3.4vw,16px)] text-[#F1F1F1] pointer-events-auto">
                        {navItems.map((item) => (
                            <li key={item.name} className="relative group">
                                <Link
                                    to={item.href}
                                    className="relative flex items-center leading-none py-1 md:py-0 font-bold hover:text-white/70 transition-colors uppercase"
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
                                className="text-[#39ff14] font-bold py-1 uppercase"
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
                        className="hidden md:flex text-[#39ff14] text-[min(1.2vw,18px)] font-bold uppercase pointer-events-auto hover:opacity-80 transition-opacity"
                    >
                        WhatsApp
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;

