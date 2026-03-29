import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import TextFlip from './animata/text/TextFlip';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AGENCY_NAME = 'Webingix';

const staticProjects = [
    {
        id: '01',
        title: 'RetailCo',
        time: '2 h',
        clientMsg: 'We need a futuristic shopping experience with smooth animations and fast checkout.',
        ourMsg: "Let's build it with React and a fast premium frontend experience.",
        image: '/div.jpg'
    },
    {
        id: '02',
        title: 'TravelMind',
        time: '5 h',
        clientMsg: 'Build an AI-powered app that generates custom travel itineraries for users.',
        ourMsg: 'We can combine AI planning, maps, and a polished user flow.',
        image: '/laptop.webp'
    },
    {
        id: '03',
        title: 'EventPro',
        time: '12 h',
        clientMsg: 'We handle 500 plus events a year. We need a system that can keep up with us.',
        ourMsg: 'Real-time dashboards, ticketing, and analytics will make this scale.',
        image: '/camera.webp'
    },
    {
        id: '04',
        title: 'SmileCare',
        time: '24 h',
        clientMsg: 'We want a premium website that makes patients excited about dentistry.',
        ourMsg: 'We will keep it calm, clean, and confidence-building for patients.',
        image: '/yo.png'
    }
];

const renderCorner = (type) => {
    const baseClasses = 'aspect-square border border-[#5C5C5C] absolute w-[3vw] md:w-[0.55vw] bg-[#0f0f0f] z-[10]';
    switch (type) {
        case 'tl': return <div key="tl" className={`${baseClasses} top-0 left-0 -translate-x-1/2 -translate-y-1/2`} />;
        case 'tr': return <div key="tr" className={`${baseClasses} top-0 right-0 translate-x-1/2 -translate-y-1/2`} />;
        case 'br': return <div key="br" className={`${baseClasses} bottom-0 right-0 translate-x-1/2 translate-y-1/2`} />;
        case 'bl': return <div key="bl" className={`${baseClasses} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} />;
        default: return null;
    }
};

import { useProjects } from '../hooks/useProjects';

const WeBuildBetter = () => {
    const containerRef = useRef();
    const headingRef = useRef(null);
    const { data: projects = staticProjects, isLoading } = useProjects();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current.querySelectorAll('.letter-anim'),
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.04,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: 'top 85%'
                        }
                    }
                );
            }

            const cards = gsap.utils.toArray('.project-card');

            if (cards.length > 0) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.project-cards-stack',
                        start: 'top 0%',
                        end: `+=${cards.length * 80}%`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                    }
                });

                cards.forEach((card, i) => {
                    if (i > 0) {
                        gsap.set(card, { yPercent: 100, filter: 'grayscale(100%)' });

                        tl.to(card, {
                            yPercent: 0,
                            filter: 'grayscale(0%)',
                            duration: 1.2,
                            ease: 'power2.out'
                        }, i - 1);

                        tl.to(cards[i - 1], {
                            scale: 0.95,
                            opacity: 0.5,
                            duration: 0.8
                        }, i - 1);
                    }
                });
            }
            
            // Ensure ScrollTrigger refreshes when dynamic content is ready
            ScrollTrigger.refresh();
        });
        return () => ctx.revert();
    }, [projects]);

    const splitText = (text) => {
        return text.split(' ').map((word, wIdx) => (
            <div key={wIdx} className="word inline-block mr-[0.12em] overflow-hidden align-top">
                {word.split('').map((char, cIdx) => (
                    <span key={cIdx} className="char inline-block letter-anim">
                        {char}
                    </span>
                ))}
            </div>
        ));
    };

    return (
        <section ref={containerRef} className="bg-transparent pt-[2vw] pb-12 relative z-20 overflow-hidden">
            <div className="md:hidden px-4 pt-10">
                <div className="w-full h-px bg-white/20 mb-6" />
                <div className="text-[9px] font-black uppercase tracking-[0.25em] text-white text-left mb-8 opacity-70">
                    02 / WHY YOU NEED US
                </div>
                <div className="relative mb-8">
                    <h2 className="text-[clamp(3.4rem,17vw,6.2rem)] leading-[0.82] font-display font-normal text-white uppercase tracking-tighter">
                        <span className="block">IT'S STORY</span>
                        <span className="block text-right pr-[2vw]">TIME</span>
                    </h2>
                    <img
                        src="/popcorn.webp"
                        alt="popcorn"
                        className="absolute left-[49%] top-[56%] w-[23vw] max-w-[86px] h-auto -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] drop-shadow-xl"
                    />
                </div>

                <div className="space-y-6">
                    {projects.map((project) => (
                        <article key={project.id} className="border border-[#6a6a6a] px-4 pt-4 pb-5 bg-[#0f0f0f]">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-anton text-[10vw] leading-[0.9] text-white tracking-tight">
                                        {project.title}
                                    </h3>
                                </div>
                                {project.link ? (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white/85 text-[2rem] leading-none mt-1 hover:text-[#39FF14] transition-colors">↗</a>
                                ) : (
                                    <span className="text-white/85 text-[2rem] leading-none mt-1">↗</span>
                                )}
                            </div>

                            <div className="mt-4 border border-white/45 p-[6px] bg-[#171717]">
                                <div className="aspect-[1.06] overflow-hidden bg-black">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                </div>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black uppercase tracking-widest text-[#39FF14] mt-2 text-center hover:underline">
                                        Visit Website
                                    </a>
                                )}
                            </div>

                            <div className="mt-5 space-y-5">
                                <div className="flex gap-3">
                                    <div className="flex flex-col items-center flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full border border-white/20 bg-[#1c2d74] flex items-center justify-center">
                                            <span className="text-white font-medium text-[1.65rem] leading-none lowercase">{(project.title || 'P')[0].toLowerCase()}</span>
                                        </div>
                                        <div className="w-px h-11 bg-white/25 mt-1"></div>
                                    </div>
                                    <div className="pt-0.5">
                                        <div className="text-[0.98rem] text-white font-semibold leading-none">
                                            {project.title}
                                            <span className="text-white/55 font-normal"> • {project.time}</span>
                                        </div>
                                        <p className="text-[0.92rem] leading-[1.42] text-white mt-2">
                                            {project.clientMsg}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                        <span className="text-black font-black text-[0.95rem] leading-none">W</span>
                                    </div>
                                    <div className="pt-0.5">
                                        <div className="text-[0.98rem] text-white font-semibold leading-none">
                                            {AGENCY_NAME}
                                            <span className="text-white/55 font-normal"> • {project.time}</span>
                                        </div>
                                        <p className="text-[0.92rem] leading-[1.42] text-white mt-2">
                                            {project.ourMsg}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-0 md:pl-[2vw] max-w-[1800px] relative z-10 pointer-events-none mb-[4vw] md:-mb-[8vw] hidden md:block">
                <div className="flex items-center text-white text-[11px] md:text-[min(1.3vw,15px)] font-medium tracking-[0.3em] uppercase mb-[1vw] md:mb-[2vw]">
                    <span>02 / WHY YOU NEED US</span>
                </div>

                <div ref={headingRef} className="flex justify-center items-center w-full">
                    <h2 className="text-[clamp(2.5rem,12vw,18rem)] leading-[0.85] font-display font-normal text-white uppercase tracking-tighter whitespace-nowrap flex items-center pr-[1.5vw] md:pr-[2vw]">
                        <span className="flex">{splitText('WE BUILD')}</span>
                        <div className="relative inline-block w-[0.8em] md:w-[0.8em] -mx-0.5 md:-mx-1 transform -translate-y-[0.5vw] md:-translate-y-[1vw] z-10 letter-anim">
                            <motion.img
                                src="/popcorn.webp"
                                alt="popcorn"
                                className="w-full h-auto drop-shadow-2xl"
                                initial={{ scale: 0, opacity: 0, rotate: 15 }}
                                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.3 }}
                            />
                        </div>
                    </h2>
                    <div className="letter-anim">
                        <TextFlip
                            words={[
                                { text: 'SMART', className: 'text-[#39ff14]' },
                                { text: 'RIGHT', className: 'text-[#39ff14]' },
                                { text: 'STRONG', className: 'text-[#39ff14]' },
                                { text: 'FAST', className: 'text-[#39ff14]' },
                                { text: 'SMART', className: 'text-[#39ff14]' }
                            ]}
                            animationClass="animate-flip-words-5"
                            className="text-[clamp(2.5rem,12vw,18rem)] leading-[0.85] font-display font-normal uppercase tracking-tighter translate-y-[0.45vw]"
                        />
                    </div>
                </div>
            </div>

            <div className="relative mt-8 md:mt-[15vw] px-[4vw] hidden md:block project-cards-stack h-[100vh] mb-[10vw]">
                <div className="w-full max-w-[1400px] mx-auto relative h-full">
                    {projects.map((project, idx) => (
                        <div
                            key={project.id || idx}
                            style={{
                                top: `calc(${idx * 3.8}vw + 100px)`,
                                zIndex: idx + 1,
                            }}
                            className="w-full bg-[#0f0f0f] border-t border-[#FFFFFF] overflow-hidden min-h-[75vh] pb-[5vw] project-card absolute left-0 will-change-transform"
                        >
                            {['tl', 'tr', 'br', 'bl'].map((corner) => renderCorner(corner))}
                            <div className="section-inner flex justify-between mx-auto md:px-[1vw] pt-[1vw] gap-[10vw]">
                                <div className="card-inner flex gap-[16vw] flex-1 pl-0">
                                    <p className="font-sans font-light text-[min(1.5vw,24px)] text-white">{project.id}</p>
                                    <div className="flex flex-col gap-[2vw]">
                                        <p className="font-anton text-[min(3.5vw,60px)] text-white uppercase origin-top-left">
                                            {project.title}
                                        </p>
                                        <div className="flex flex-col gap-[.75vw]">
                                            <div className="flex gap-[1vw]">
                                                <div className="flex flex-col items-center">
                                                    <div className="rounded-full w-[3vw] aspect-square bg-[#333] overflow-hidden flex items-center justify-center">
                                                        <span className="text-white font-bold">{(project.title || 'P')[0]}</span>
                                                    </div>
                                                    <div className="flex-1 w-px bg-[#454545] mx-auto mt-[.5vw]"></div>
                                                </div>
                                                <div className="mt-[.5vw] pb-[2vw]">
                                                    <div className="flex gap-[.75vw] items-center">
                                                        <p className="font-sans text-[min(1.1vw,18px)] font-bold text-white uppercase">{project.title}</p>
                                                        <span className="w-[.25vw] aspect-square rounded-full bg-[#FFFFFF]"></span>
                                                        <p className="font-sans text-[min(1.1vw,18px)] font-light text-white/80">{project.time}</p>
                                                    </div>
                                                    <p className="font-sans text-[min(1.1vw,18px)] text-white mt-[1vw] leading-[1.5] md:max-w-[40vw]">
                                                        {project.clientMsg}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-[1vw]">
                                                <div className="flex flex-col items-center">
                                                    <div className="rounded-full w-[3vw] aspect-square bg-white overflow-hidden flex items-center justify-center">
                                                        <span className="text-black font-black text-[1.2vw] leading-none">W</span>
                                                    </div>
                                                    <div className="hidden md:block flex-1 w-px bg-transparent mx-auto mt-[.5vw]"></div>
                                                </div>
                                                <div className="mt-[.5vw] pb-[2vw]">
                                                    <div className="flex gap-[.75vw] items-center">
                                                        <p className="font-sans text-[min(1.1vw,18px)] font-bold text-white uppercase">{AGENCY_NAME}</p>
                                                        <span className="w-[.25vw] aspect-square rounded-full bg-[#FFFFFF]"></span>
                                                        <p className="font-sans text-[min(1.1vw,18px)] font-light text-white/80">{project.time}</p>
                                                    </div>
                                                    <p className="font-sans text-[min(1.1vw,18px)] text-white mt-[1vw] leading-[1.5] md:max-w-[40vw]">
                                                        {project.ourMsg}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[27.5%] flex-shrink-0 flex pb-0 relative group">
                                    <div className="w-full h-full border-[8px] border-white aspect-[4/3] overflow-hidden">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    </div>
                                    {project.link && (
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="absolute -bottom-[2.5vw] right-0 bg-[#39FF14] text-black px-[1vw] py-[0.4vw] text-[min(0.8vw,12px)] font-black uppercase tracking-widest hover:bg-white transition-colors pointer-events-auto"
                                        >
                                            Visit Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WeBuildBetter;
