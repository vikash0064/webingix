import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Custom Website Development',
        desc: 'Tailor-made websites built from scratch. Every pixel crafted for your unique business needs.',
        num: '01',
    },
    {
        title: 'Business Websites',
        desc: 'Professional corporate websites that build trust, showcase your services, and convert visitors.',
        num: '02',
    },
    {
        title: 'Portfolio & Personal Sites',
        desc: 'Showcase your work or personal brand with stunning visuals and smooth interactions.',
        num: '03',
    },
    {
        title: 'Mobile App Development',
        desc: 'Powerful iOS and Android applications designed to provide a seamless mobile experience for your users.',
        num: '04',
    }
];

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

const Services = () => {
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
        <section ref={containerRef} className="bg-transparent pt-20 md:pt-32 pb-20 md:pb-32 relative z-[30] overflow-hidden">
            {/* Header Section */}
            <div className="container mx-auto px-6 md:px-0 md:pl-[2vw] max-w-[1800px] relative z-10 pointer-events-none mb-12 md:mb-16">
                <div className="flex items-center text-white text-[11px] md:text-[min(1.3vw,15px)] font-medium tracking-[0.3em] uppercase mb-[2vw]">
                    <span>03 / OUR SERVICES</span>
                </div>

                <div ref={headingRef} className="flex flex-col md:flex-row md:items-end gap-[1vw] md:pl-[2vw]">
                    <h2 className="text-[clamp(1.5rem,7.2vw,8.5rem)] leading-[0.85] font-display font-normal text-white uppercase tracking-tighter whitespace-nowrap flex">
                        {splitText('WHAT WE BUILD')}
                    </h2>
                    <span className="text-[clamp(0.8rem,2.4vw,2.5rem)] leading-none font-display font-medium text-[#39ff14] uppercase tracking-tighter mb-[0.8vw] flex mt-2 md:mt-0">
                        {splitText('/ OUR EXPERTISE')}
                    </span>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-6 md:px-0 max-w-[1800px] relative z-[5] mt-12 md:mt-20">
                <div className="grid grid-cols-1 md:grid-cols-4 w-full border-t border-[#5C5C5C]">
                    {services.map((item, idx) => (
                        <div key={idx} className={`relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#5C5C5C] last:border-r-0 group bg-[#151515] hover:bg-[#1a1a1a] transition-colors duration-500`}>
                            {/* Corner dots logic */}
                            {idx === 0 && renderCorner('tl')}
                            {idx === 0 && renderCorner('bl')}
                            {renderCorner('tr')}
                            {renderCorner('br')}
                            {idx === 3 && renderCorner('bl')}

                            <div className="flex flex-col h-full relative z-10">
                                <span className="text-[#5C5C5C] text-lg font-medium mb-8 group-hover:text-white transition-colors duration-300">
                                    {item.num}
                                </span>

                                <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white group-hover:text-[#39ff14] transition-colors duration-300 uppercase leading-[0.9]">
                                    {item.title}
                                </h3>

                                <p className="text-white/40 text-sm md:text-base leading-relaxed mb-12 max-w-[90%] group-hover:text-white/70 transition-colors duration-300">
                                    {item.desc}
                                </p>

                                <div className="mt-auto pt-4 flex items-center gap-3 text-xs uppercase tracking-widest text-[#5C5C5C] group-hover:text-white transition-all duration-300">
                                    <span className="font-bold">Learn More</span>
                                    <div className="w-8 h-[1px] bg-[#5C5C5C] group-hover:w-12 group-hover:bg-white transition-all duration-500"></div>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>

                            {/* Hover Backdrop Glow Effect */}
                            <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-[#39ff14]/[0.05] to-transparent group-hover:h-1/2 transition-all duration-700 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
