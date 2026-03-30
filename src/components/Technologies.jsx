import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techItems = [
    { name: 'VS Code', icon: '/tech/vscode.svg', classes: 'lg:col-start-5 border border-[#5C5C5C]', corners: ['tl', 'tr', 'br', 'bl'] },
    { name: 'Git', icon: '/tech/git.svg', classes: 'lg:col-start-6 border lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },

    { name: 'Docker', icon: '/tech/docker.svg', classes: 'lg:row-start-2 border lg:border-t-0 border-[#5C5C5C]', corners: ['tl', 'tr', 'br', 'bl'] },
    { name: 'Node.js', icon: '/tech/node.svg', classes: 'lg:row-start-2 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },
    { name: 'Express', icon: '/tech/express.svg', imageClass: 'invert-[0.8] sepia saturate-[5] hue-rotate-[15deg] brightness-[1.2]', classes: 'lg:row-start-2 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },
    { name: 'Tailwind CSS', icon: '/tech/tailwind.svg', classes: 'lg:row-start-2 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },
    { name: 'MongoDB', icon: '/tech/mongodb.svg', imageClass: 'invert brightness-200', classes: 'lg:row-start-2 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },
    { name: 'GSAP', icon: '/tech/gsap.webp', classes: 'lg:row-start-2 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },

    { name: 'React', icon: '/tech/react.svg', classes: 'lg:row-start-3 border lg:border-t-0 border-[#5C5C5C]', corners: ['tl', 'tr', 'br', 'bl'] },
    { name: 'JavaScript', icon: '/tech/javascript.svg', classes: 'lg:row-start-3 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },
    { name: 'Next.js', icon: '/tech/nextjs.svg', imageClass: 'invert', classes: 'lg:row-start-3 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },
    { name: 'MySQL', icon: '/tech/mysql.svg', classes: 'lg:row-start-3 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },
    { name: 'Figma', icon: '/tech/figma.webp', classes: 'lg:row-start-3 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },
    { name: 'Cloudflare', icon: '/tech/cloudflare.svg', imageClass: 'invert brightness-200', classes: 'lg:row-start-3 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },

    { name: 'AWS', icon: '/tech/aws.svg', imageClass: 'invert brightness-200 saturate-0', classes: 'lg:row-start-4 border lg:border-t-0 border-[#5C5C5C]', corners: ['tl', 'tr', 'br', 'bl'] },
    { name: 'Flutter', icon: '/tech/flutter.svg', classes: 'lg:row-start-4 border lg:border-t-0 lg:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br', 'bl'] },
];

const renderCorner = (type) => {
    const baseClasses = "aspect-square border border-[#5C5C5C] absolute w-[3vw] md:w-[0.55vw] bg-[#111] z-[3]";
    switch (type) {
        case 'tl': return <div className={`${baseClasses} top-0 left-0 -translate-x-1/2 -translate-y-1/2`} />;
        case 'tr': return <div className={`${baseClasses} top-0 right-0 translate-x-1/2 -translate-y-1/2`} />;
        case 'br': return <div className={`${baseClasses} bottom-0 right-0 translate-x-1/2 translate-y-1/2`} />;
        case 'bl': return <div className={`${baseClasses} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} />;
        default: return null;
    }
};

const Technologies = () => {
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
                        toggleActions: "play reverse play reverse",
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
        <section className="bg-transparent pt-[15vw] md:pt-[8vw] pb-32 relative z-20 overflow-hidden">
            {/* Unified Header */}
            <div className="container mx-auto px-6 md:px-0 md:pl-[4vw] max-w-[1800px] relative z-20 mb-[10vw] md:mb-0">
                <div className="flex items-center text-white text-[10px] md:text-[min(1.2vw,14px)] font-black tracking-[0.4em] uppercase mb-[4vw] md:mb-[2vw] opacity-80">
                    <span>01 / TECHNOLOGIES</span>
                </div>

                <h2 ref={headingRef} className="text-[clamp(2.4rem,8.5vw,9rem)] leading-[0.85] font-display font-normal text-white uppercase tracking-tighter flex items-center flex-wrap gap-x-2 md:gap-x-4 md:pl-[1vw]">
                    <span className="flex">{splitText('OUR TECH STACK')}</span>
                    <div className="relative inline-block w-[1.1em] md:w-[1.3em] transform -translate-y-1 md:-translate-y-2 letter-anim">
                        <motion.img
                            src="/yo.png"
                            alt="Friendly greeting illustration indicating our expert team approach"
                            className="w-full h-auto object-contain"
                            initial={{ scale: 0, opacity: 0, rotate: -5 }}
                            whileInView={{ scale: 1, opacity: 1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.3 }}
                        />
                    </div>
                </h2>
            </div>

            {/* Responsive Grid Section */}
            <div className="container mx-auto px-4 md:px-0 max-w-[1800px] relative z-[5] md:mt-[-5vw]">
                <div className="flex justify-center md:justify-end md:pr-[4vw] lg:pr-[6vw]">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full lg:w-[94%] xl:w-[90%] border-[#5C5C5C] md:border-0 border">
                        {techItems.map((item, idx) => (
                            <div 
                                key={idx} 
                                className={`aspect-square flex flex-col items-center justify-center relative transition-colors duration-500 cursor-default group overflow-hidden md:overflow-visible
                                    ${item.classes} 
                                    ${idx % 2 === 1 ? 'border-l border-[#5C5C5C] md:border-l-0' : ''}
                                    ${idx >= 2 ? 'border-t border-[#5C5C5C] md:border-t-0' : ''}
                                `}
                            >
                                {/* Background & Hover Overlay */}
                                <div className="absolute inset-0 z-0 bg-[#0f0f0f]"></div>
                                <div className="absolute inset-0 z-0 bg-white/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Corner Decorators (visible on larger screens to match desktop aesthetic) */}
                                <div className="hidden md:block">
                                    {item.corners?.map((c, i) => React.cloneElement(renderCorner(c), { key: i }))}
                                </div>

                                 {/* Content */}
                                <div className="relative z-[2] w-full h-full p-4 sm:p-6 flex flex-col items-center justify-center">
                                    <div className="w-[54%] h-[54%] flex items-center justify-center">
                                        <img 
                                            src={item.icon} 
                                            alt={`${item.name} Development Expertise - Webingix Digital Agency`} 
                                            className={`w-full h-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-[5deg] ${item.imageClass || ''}`} 
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Technologies;

