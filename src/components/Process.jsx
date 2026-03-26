import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: 'Requirement Discussion',
        desc: 'We listen to your ideas, understand your goals, and outline the project scope clearly.',
        num: '01'
    },
    {
        title: 'Planning & Design',
        desc: 'We create a detailed roadmap and visual prototypes that perfectly align with your brand.',
        num: '02'
    },
    {
        title: 'Development',
        desc: 'Our developers build your site using the latest, cleaner and faster technologies.',
        num: '03'
    },
    {
        title: 'Testing & Review',
        desc: 'We rigorously test for performance and bugs, ensuring everything works flawlessly.',
        num: '04'
    },
    {
        title: 'Launch & Support',
        desc: 'We launch your site and provide ongoing support for sustained long-term success.',
        num: '05'
    }
];

const renderStepArt = (num) => {
    const baseClass = 'w-full h-full';

    if (num === '01') {
        return (
            <svg viewBox="0 0 320 200" className={baseClass} xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="200" fill="#0f0f0f" />
                <rect x="26" y="40" width="122" height="80" rx="10" fill="none" stroke="#39ff14" strokeWidth="2" />
                <rect x="172" y="74" width="122" height="80" rx="10" fill="none" stroke="#fff" strokeWidth="2" />
                <path d="M100 120 L86 137 L108 129" fill="none" stroke="#39ff14" strokeWidth="2" />
                <path d="M244 154 L258 171 L236 163" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="64" cy="80" r="6" fill="#39ff14" />
                <circle cx="96" cy="80" r="6" fill="#39ff14" />
                <circle cx="128" cy="80" r="6" fill="#39ff14" />
                <line x1="190" y1="112" x2="276" y2="112" stroke="#fff" strokeWidth="2" />
                <line x1="190" y1="128" x2="252" y2="128" stroke="#fff" strokeWidth="2" />
            </svg>
        );
    }

    if (num === '02') {
        return (
            <svg viewBox="0 0 320 200" className={baseClass} xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="200" fill="#0f0f0f" />
                <rect x="30" y="28" width="260" height="144" rx="10" fill="none" stroke="#fff" strokeWidth="2" />
                <line x1="30" y1="64" x2="290" y2="64" stroke="#39ff14" strokeWidth="2" />
                <line x1="116" y1="64" x2="116" y2="172" stroke="#39ff14" strokeWidth="2" />
                <rect x="46" y="80" width="52" height="26" rx="4" fill="#39ff14" fillOpacity="0.2" stroke="#39ff14" />
                <rect x="132" y="84" width="66" height="10" rx="3" fill="#fff" fillOpacity="0.85" />
                <rect x="132" y="100" width="92" height="8" rx="3" fill="#fff" fillOpacity="0.45" />
                <path d="M228 124 L266 86" stroke="#39ff14" strokeWidth="3" />
                <circle cx="228" cy="124" r="6" fill="#39ff14" />
                <circle cx="266" cy="86" r="6" fill="#39ff14" />
            </svg>
        );
    }

    if (num === '03') {
        return (
            <svg viewBox="0 0 320 200" className={baseClass} xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="200" fill="#0f0f0f" />
                <rect x="26" y="26" width="268" height="148" rx="10" fill="none" stroke="#fff" strokeWidth="2" />
                <rect x="26" y="26" width="268" height="26" rx="10" fill="#181818" />
                <circle cx="44" cy="39" r="4" fill="#39ff14" />
                <circle cx="60" cy="39" r="4" fill="#39ff14" fillOpacity="0.6" />
                <circle cx="76" cy="39" r="4" fill="#39ff14" fillOpacity="0.35" />
                <text x="42" y="90" fill="#39ff14" fontSize="22" fontFamily="monospace">&lt;/&gt;</text>
                <line x1="110" y1="86" x2="270" y2="86" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
                <line x1="110" y1="106" x2="252" y2="106" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
                <line x1="110" y1="126" x2="228" y2="126" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />
            </svg>
        );
    }

    if (num === '04') {
        return (
            <svg viewBox="0 0 320 200" className={baseClass} xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="200" fill="#0f0f0f" />
                <path d="M160 36 L250 70 V116 C250 146 226 162 160 180 C94 162 70 146 70 116 V70 Z" fill="none" stroke="#fff" strokeWidth="2" />
                <path d="M118 108 L148 136 L206 82" fill="none" stroke="#39ff14" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="92" cy="56" r="4" fill="#39ff14" />
                <circle cx="228" cy="56" r="4" fill="#39ff14" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 320 200" className={baseClass} xmlns="http://www.w3.org/2000/svg">
            <rect width="320" height="200" fill="#0f0f0f" />
            <path d="M78 142 L168 54 L200 54 L146 108 L192 108 L94 168 Z" fill="none" stroke="#39ff14" strokeWidth="3" />
            <path d="M176 146 C202 140 220 126 234 100 C246 78 254 66 276 58 C262 78 254 98 260 116 C266 132 280 144 296 152 C270 152 246 152 224 152" fill="none" stroke="#fff" strokeWidth="2" />
            <line x1="56" y1="166" x2="286" y2="166" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
        </svg>
    );
};

const renderCorner = (type) => {
    const baseClasses = "aspect-square border border-[#5C5C5C] absolute w-[3vw] md:w-[0.55vw] bg-[#151515] z-[3]";
    switch (type) {
        case 'tl': return <div className={`${baseClasses} top-0 left-0 -translate-x-1/2 -translate-y-1/2`} />;
        case 'tr': return <div className={`${baseClasses} top-0 right-0 translate-x-1/2 -translate-y-1/2`} />;
        case 'br': return <div className={`${baseClasses} bottom-0 right-0 translate-x-1/2 translate-y-1/2`} />;
        case 'bl': return <div className={`${baseClasses} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} />;
        default: return null;
    }
};

const Process = () => {
    const containerRef = useRef();
    const headingRef = useRef();

    useEffect(() => {
        if (headingRef.current) {
            gsap.fromTo(headingRef.current.querySelectorAll('.letter-anim'),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.6,
                    stagger: 0.04,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );
        }
    }, []);

    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="inline-block letter-anim">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <section ref={containerRef} className="bg-transparent pt-[6vw] pb-[4vw] relative z-20 overflow-hidden font-sans">
            {/* Header Section */}
            <div className="container mx-auto px-6 md:px-[4vw] max-w-[1800px] relative z-10 pointer-events-none mb-[8vw]">
                <div className="flex items-center text-white text-[11px] md:text-[min(1.3vw,15px)] font-medium tracking-[0.3em] uppercase mb-[2vw]">
                    <span>04 / HOW WE WORK</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-[1vw]">
                    <h2 ref={headingRef} className="text-[clamp(2rem,7.2vw,8.5rem)] leading-[0.85] font-display font-medium text-white uppercase tracking-tighter whitespace-nowrap flex">
                        {splitText('OUR PROCESS')}
                    </h2>
                </div>
            </div>

            {/* Premium Process Layout */}
            <div className="container mx-auto px-6 md:px-[4vw] max-w-[1800px] relative z-[5]">
                <div className="w-full flex flex-col border-t border-[#333]">
                    {steps.map((item, idx) => (
                        <div key={idx} className="group relative border-b border-[#333] flex flex-col md:flex-row items-start md:items-stretch transition-all duration-700 bg-[#151515] hover:bg-[#1a1a1a]">

                            {/* Decorative Corners */}
                            {idx === 0 && renderCorner('tl')}
                            {renderCorner('tr')}
                            {renderCorner('bl')}
                            {idx === steps.length - 1 && renderCorner('br')}

                            {/* Number & Progress Line container */}
                            <div className="md:w-[20%] lg:w-[15%] flex-shrink-0 flex items-center md:items-start p-[4vw] md:p-[2vw] md:border-r border-[#333] relative overflow-hidden">
                                <span className="font-anton text-[4rem] md:text-[clamp(4rem,6vw,8rem)] leading-none text-transparent transition-all duration-500 group-hover:text-white"
                                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                                    {item.num}
                                </span>

                                <div className="absolute left-0 bottom-0 w-full h-0 bg-[#39ff14] transition-all duration-700 group-hover:h-[4px]"></div>
                            </div>

                            {/* Content container */}
                            <div className="flex-1 flex flex-col justify-center p-[4vw] md:p-[3vw] gap-[2vw]">
                                <div className="flex justify-between items-center w-full">
                                    <h3 className="font-display font-medium text-[clamp(1.8rem,3vw,4rem)] text-white uppercase tracking-tight group-hover:text-[#39ff14] transition-colors duration-500">
                                        {item.title}
                                    </h3>
                                    <div className="hidden md:flex opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 items-center justify-center w-12 h-12 rounded-full bg-[#1c1c1c] border border-[#333]">
                                        <span className="text-white text-xl rotate-45">↗</span>
                                    </div>
                                </div>

                                <p className="font-sans font-light text-[clamp(1rem,1.1vw,1.2rem)] md:w-[60%] lg:w-[50%] text-[#8A8A8A] group-hover:text-white/90 leading-relaxed transition-colors duration-500">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Image Reveal (Optional Premium Touch) */}
                            <div className="absolute right-[4vw] top-1/2 -translate-y-1/2 w-[16vw] h-[10vw] z-0 pointer-events-none opacity-0 scale-y-0 origin-top bg-[#151515] overflow-hidden group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-700 hidden lg:block border border-[#333]">
                                {renderStepArt(item.num)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
