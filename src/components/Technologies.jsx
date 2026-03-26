import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techItems = [
    { name: 'VS Code', icon: '/tech/vscode.svg', type: 'icon', classes: 'md:col-start-5 border md:border-b-0 border-[#5C5C5C]', corners: ['tl', 'tr'] },
    { name: 'Git', icon: '/tech/git.svg', type: 'icon', classes: 'md:col-start-6 border border-l-0 md:border-b-0 border-[#5C5C5C]', corners: ['tr'] },

    { name: 'Docker', icon: '/tech/docker.svg', type: 'icon', classes: 'md:row-start-2 border border-l-0 md:border-l border-[#5C5C5C]', corners: ['tl', 'tr'] },
    { name: 'Node.js', icon: '/tech/node.svg', type: 'icon', classes: 'md:row-start-2 border border-t-0 md:border-t md:border-l-0 border-[#5C5C5C]', corners: ['tr'] },
    { name: 'Express', icon: '/tech/express.svg', type: 'icon', imageClass: 'invert-[0.8] sepia saturate-[5] hue-rotate-[15deg] brightness-[1.2]', classes: 'md:row-start-2 border border-t-0 md:border-t border-l-0 border-[#5C5C5C]', corners: ['tr'] },
    { name: 'Tailwind CSS', icon: '/tech/tailwind.svg', type: 'icon', classes: 'md:row-start-2 border border-t-0 md:border-t border-l-0 border-[#5C5C5C]', corners: ['tr'] },
    { name: 'MongoDB', icon: '/tech/mongodb.svg', type: 'icon', imageClass: 'invert brightness-200', classes: 'md:row-start-2 border border-t-0 md:border-t md:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br'] },
    { name: 'GSAP', icon: '/tech/gsap.webp', type: 'icon', classes: 'md:row-start-2 border border-t-0 md:border-t border-l-0 border-[#5C5C5C]', corners: ['tr'] },

    { name: 'React', icon: '/tech/react.svg', type: 'icon', classes: 'md:row-start-3 border border-t-0 border-l-0 md:border-l border-[#5C5C5C]', corners: ['tl', 'tr', 'br', 'bl'] },
    { name: 'JavaScript', icon: '/tech/javascript.svg', type: 'icon', classes: 'md:row-start-3 border border-t-0 md:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br'] },
    { name: 'Next.js', icon: '/tech/nextjs.svg', type: 'icon', imageClass: 'invert', classes: 'md:row-start-3 border border-t-0 md:border-t border-l-0 border-[#5C5C5C]', corners: ['tr'] },
    { name: 'MySQL', icon: '/tech/mysql.svg', type: 'icon', classes: 'md:row-start-3 border border-t-0 border-l-0 border-[#5C5C5C]', corners: ['tr', 'br'] },
    { name: 'Figma', icon: '/tech/figma.webp', type: 'icon', classes: 'md:row-start-3 border border-t-0 md:border-l-0 border-[#5C5C5C]', corners: ['tr', 'br'] },
    { name: 'Cloudflare', icon: '/tech/cloudflare.svg', type: 'icon', imageClass: 'invert brightness-200', classes: 'md:row-start-3 border border-t-0 border-l-0 border-[#5C5C5C]', corners: ['tr', 'br'] },

    { name: 'AWS', icon: '/tech/aws.svg', type: 'icon', imageClass: 'invert brightness-200 saturate-0', classes: 'md:row-start-4 border md:border-l border-l-0 border-t-0 border-[#5C5C5C]', corners: ['tr', 'br'] },
    { name: 'Flutter', icon: '/tech/flutter.svg', type: 'icon', classes: 'md:row-start-4 border md:border-l-0 border-t-0 border-[#5C5C5C]', corners: ['tr', 'br'] },
];

const mobileTechItems = [
    { name: 'Figma', icon: '/tech/figma.webp' },
    { name: 'Git', icon: '/tech/git.svg' },
    { name: 'Express', icon: '/tech/express.svg', imageClass: 'invert-[0.8] sepia saturate-[5] hue-rotate-[15deg] brightness-[1.2]' },
    { name: 'PS', icon: '/tech/vscode.svg' },
    { name: 'AI', icon: '/tech/javascript.svg' },
    { name: 'Tailwind', icon: '/tech/tailwind.svg' },
    { name: 'React', icon: '/tech/react.svg' },
    { name: 'GSAP', icon: '/tech/gsap.webp' },
    { name: 'Next.js', icon: '/tech/nextjs.svg', imageClass: 'invert' },
    { name: 'Node', icon: '/tech/node.svg' },
    { name: 'AWS', icon: '/tech/aws.svg', imageClass: 'invert brightness-200 saturate-0' },
    { name: 'Mongo', icon: '/tech/mongodb.svg', imageClass: 'invert brightness-200' },
];

const renderCorner = (type) => {
    const baseClasses = "aspect-square border border-[#5C5C5C] absolute w-[3vw] md:w-[0.55vw] bg-[#111] z-[3]";
    switch (type) {
        case 'tl': return <div className={`${baseClasses} top-0 left-0 -translate-x-1/2 -translate-y-1/2`} />;
        case 'tr': return <div className={`${baseClasses} top-0 right-0 translate-x-1/2 -translate-y-1/2`} />;
        case 'br': return <div className={`${baseClasses} bottom-0 right-0 translate-x-1/2 translate-y-1/2`} />;
        case 'bl': return <div className={`${baseClasses} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} />;
        case 'hidden_tl': return <div className="md:hidden"><div className={`${baseClasses} top-0 left-0 -translate-x-1/2 -translate-y-1/2`} /></div>;
        case 'hidden_bl': return <div className="md:hidden"><div className={`${baseClasses} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} /></div>;
        default: return null;
    }
};

const Technologies = () => {
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
        <section ref={containerRef} className="bg-transparent pt-[8vw] pb-32 relative z-20 overflow-hidden">
            <div className="md:hidden px-4 relative z-10">
                <div className="w-full h-px bg-white/20 mb-8" />
                <div className="text-[8px] font-black uppercase tracking-[0.14em] text-white mb-7 text-center">
                    01/TECHNOLOGIES
                </div>
                <div className="mb-8">
                    <div className="text-[clamp(3rem,15vw,5.7rem)] leading-[0.84] font-display font-normal text-white uppercase tracking-tighter">
                        <div>TOOLS OF</div>
                        <div className="flex items-end gap-2">
                            <span>OUR</span>
                            <img
                                src="/pencil.webp"
                                alt="Pencil"
                                className="w-[16vw] max-w-[58px] h-auto translate-y-[-8%] shrink-0"
                            />
                            <span>TRADE</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 border border-[#454545]">
                    {mobileTechItems.map((item, idx) => (
                        <div key={idx} className="aspect-square border-r border-b border-[#454545] last:border-r-0 [&:nth-child(3n)]:border-r-0 flex flex-col items-center justify-center gap-2 px-2 py-3">
                            <div className="w-[38%] h-[38%] flex items-center justify-center">
                                <img src={item.icon} alt={item.name} className={`w-full h-full object-contain ${item.imageClass || ''}`} />
                            </div>
                            <span className="text-[8px] uppercase tracking-[0.16em] text-white/55 text-center leading-tight">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Header Section (Independent) */}
            <div className="container mx-auto px-6 md:px-0 md:pl-[2vw] max-w-[1800px] relative z-10 pointer-events-none mb-[8vw] md:-mb-[8vw] hidden md:block">
                <div className="flex items-center text-white text-[11px] md:text-[min(1.3vw,15px)] font-medium tracking-[0.3em] uppercase mb-[2vw]">
                    <span>01 / TECHNOLOGIES</span>
                </div>

                <h2 ref={headingRef} className="text-[clamp(1.5rem,7.2vw,8.5rem)] leading-[0.85] font-display font-normal text-white uppercase tracking-tighter whitespace-nowrap flex items-center md:pl-[2vw]">
                    <span className="flex">{splitText('OUR TECH STACK')}</span>
                    <div className="relative inline-block w-[1.2em] md:w-[1.5em] -ml-2 md:-ml-4 transform -translate-y-1 md:-translate-y-2 letter-anim">
                        <motion.img
                            src="/yo.png"
                            alt="yo image"
                            className="w-full h-auto object-contain"
                            initial={{ scale: 0, opacity: 0, rotate: -5 }}
                            whileInView={{ scale: 1, opacity: 1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.3 }}
                        />
                    </div>
                </h2>
            </div>

            {/* Exactly Match Reference Grid */}
            <div className="container mx-auto px-6 md:px-0 max-w-[1800px] relative z-[5] hidden md:block">
                <div className="flex justify-end md:pr-[2vw] lg:pr-[4vw] xl:pr-[6vw]">
                    <div className="grid grid-cols-2 lg:grid-cols-6 w-full max-w-[95%] lg:w-[95%] xl:w-[92%] 2xl:w-[90%]">
                        {techItems.map((item, idx) => (
                            <div key={idx} className={`aspect-square flex flex-col items-center justify-center relative transition-colors duration-300 cursor-default ${item.classes}`}>
                                {/* Corner Decorators */}
                                {item.corners && item.corners.map((c, i) => React.cloneElement(renderCorner(c), { key: i }))}

                                {/* Background */}
                                <div className="absolute inset-0 z-0 bg-[#151515]"></div>

                                {/* Content */}
                                <div className="relative z-[2] w-full h-full p-3 sm:p-4 flex flex-col items-center justify-center">
                                    {item.type === 'icon' ? (
                                        <div className="w-full h-full flex items-center justify-center p-[20%]">
                                            <img src={item.icon} alt={item.name} className={`w-full h-full object-contain transition-transform duration-300 hover:scale-110 ${item.imageClass || ''}`} />
                                        </div>
                                    ) : item.type === 'adobe' ? (
                                        <div className="border-[2px] border-current px-2 py-0.5 text-[min(1.4vw,20px)] font-black leading-none bg-[#111]" style={{ color: item.color }}>
                                            {item.initial}
                                        </div>
                                    ) : item.type === 'serif-text' ? (
                                        <span className="text-[min(1.8vw,24px)] font-serif lowercase italic text-white/90 tracking-tight">
                                            {item.name}
                                        </span>
                                    ) : item.type === 'serif-text-bold' ? (
                                        <span className="text-[min(1.6vw,22px)] font-serif italic font-bold text-white/95 tracking-tight">
                                            {item.name}
                                        </span>
                                    ) : item.type === 'logo-text' ? (
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="w-[1.2vw] h-[1.2vw] min-w-[12px] min-h-[12px] rounded-[2px] flex-shrink-0" style={{ backgroundColor: item.color + '44', border: `1px solid ${item.color}` }}></div>
                                            <span className="text-[min(1.3vw,18px)] font-bold text-white/90 tracking-tighter whitespace-nowrap">{item.name}</span>
                                        </div>
                                    ) : item.type === 'icon-bottom-text' ? (
                                        <div className="flex flex-col items-center gap-1.5 w-full">
                                            <div className="w-[1.6vw] h-[1.6vw] min-w-[16px] min-h-[16px] flex items-center justify-center" style={{ color: item.color }}>
                                                <div className="w-full h-full rounded-[4px] border-[1.5px] border-current opacity-70"></div>
                                            </div>
                                            <span className="text-[min(0.7vw,10px)] font-black uppercase tracking-[0.15em] text-white/30 text-center">
                                                {item.name}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-[min(1.3vw,18px)] font-bold text-white/95 tracking-tight">{item.name}</span>
                                    )}
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
