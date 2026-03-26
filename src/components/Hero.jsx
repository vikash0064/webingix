import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import DashboardVisual from './DashboardVisual';
import SwapText from './SwapText';
import TextFlip from './animata/text/TextFlip';

const Hero = () => {
    const titleRef = useRef();
    const btnRef = useRef();
    const socialRef = useRef();
    const mobileTitleRef = useRef();
    const [showLaptop, setShowLaptop] = useState(false);

    useEffect(() => {
        // Pop in after load
        const timer = setTimeout(() => setShowLaptop(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();
        
        // Desktop Animation
        if (titleRef.current) {
            tl.fromTo(titleRef.current,
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1.2, ease: "expo.out" }
            );
        }
        
        if (btnRef.current) {
            tl.fromTo(btnRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.6"
            );
        }
        
        if (socialRef.current) {
            tl.fromTo(socialRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                "-=0.4"
            );
        }

        // Mobile Animation
        if (mobileTitleRef.current) {
            gsap.fromTo(mobileTitleRef.current.children,
                { opacity: 0, x: -25 },
                {
                    opacity: 1, x: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "expo.out",
                    delay: 0.2
                }
            );
        }
    }, []);

    const heroLines = ["We are a team of", "Developers", "who build websites"];

    return (
        <section
            className="group/hero relative w-full min-h-[100svh] md:h-screen bg-transparent flex flex-col justify-center overflow-hidden font-sans pt-20"
            id="hero"
        >
            {/* Mobile View */}
            <div className="md:hidden relative z-10 px-7 pt-[31vw] pb-12 w-full min-h-[calc(100svh-5rem)] flex flex-col">
                <div className="max-w-[22rem]">
                    <div ref={mobileTitleRef} className="flex flex-col gap-1">
                        <h1 className="uppercase text-[clamp(2.8rem,14.5vw,5.8rem)] font-display text-white leading-[0.86] tracking-tighter">
                            <span className="block">WE ARE A</span>
                            <span className="block">TEAM OF</span>
                            <div className="block h-[1em]">
                                <TextFlip
                                    words={[{ text: "DESIGNERS", className: "text-[#39FF14]" }, "DEVELOPERS", { text: "DESIGNERS", className: "text-[#39FF14]" }]}
                                    className="uppercase font-display text-white leading-[0.86] tracking-tighter"
                                />
                            </div>
                            <span className="block">AND DEVELOPERS</span>
                            <span className="block">WHO BUILD</span>
                            <div className="relative block pl-[10.2vw] mt-1 shrink-0 h-[1em]">
                                <img
                                    src="/laptop.webp"
                                    alt="Laptop"
                                    className="absolute left-0 bottom-[8%] w-[20vw] max-w-[72px] h-auto grayscale brightness-125"
                                />
                                <TextFlip
                                    words={["WEBSITES", { text: "APPS", className: "text-[#39FF14]" }, "WEBSITES"]}
                                    className="uppercase font-display text-white leading-[0.86] tracking-tighter"
                                />
                            </div>
                        </h1>
                    </div>
                </div>

                <div className="mt-auto flex justify-end pr-1 pt-10">
                    <Link
                        to="/projects"
                        className="group relative inline-flex items-center justify-center pl-5 pr-1.5 py-1.5 rounded-full bg-white text-black uppercase text-[7px] font-black tracking-widest overflow-hidden transition-all duration-500 ease-out hover:bg-zinc-200 min-w-[32vw]"
                    >
                        <span className="relative z-10 transition-transform duration-500 group-hover:scale-95 font-['Urbanist'] font-black text-[0.8rem] tracking-[0.04em] pb-0.5 whitespace-nowrap">LET'S TALK</span>
                        <span className="relative z-10 ml-auto flex items-center justify-center w-6 h-6">
                            <span className="absolute flex items-center justify-center w-2.5 h-2.5 bg-black rounded-full transition-transform duration-500 ease-out group-hover:scale-[3]">
                                <span className="opacity-0 text-white transition-all duration-500 ease-out transform group-hover:opacity-100 group-hover:scale-100 scale-50">
                                    <div className="rotate-[45deg] flex items-center justify-center">
                                        <ArrowUp size={10} strokeWidth={1.5} />
                                    </div>
                                </span>
                            </span>
                        </span>
                    </Link>
                </div>

                <div className="mt-12 w-full">
                    <div className="mb-5 w-full h-px bg-white/25" />
                    <div className="flex gap-5">
                        {['LINKEDIN', 'INSTAGRAM', 'BEHANCE', 'X'].map((link) => (
                            <a
                                key={link}
                                href={`#${link}`}
                                className="text-[9px] font-['Urbanist'] font-black text-white hover:text-white/50 transition-colors tracking-[0.16em]"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="relative z-10 px-8 md:px-20 max-w-[1800px] w-full mx-auto hidden md:grid md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-8 flex flex-col items-start w-full -ml-4 -translate-y-10">
                    <div ref={titleRef} className="w-full flex flex-col">
                        {heroLines.map((line, index) => (
                            <div key={index} className="flex items-center gap-[0.8vw] mb-[0.1vw]">
                                {index === 1 && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "10vw" }}
                                        transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.2, delay: 0.5 }}
                                        className="relative h-[5.5vw] -mt-[1.6vw] overflow-hidden rounded-xl bg-white/5 flex-shrink-0"
                                    >
                                        <img src="/eye.png" alt="Feature" className="w-full h-full object-cover grayscale opacity-90 brightness-110" />
                                    </motion.div>
                                )}
                                <h1 className="uppercase text-[clamp(2.5rem,7.5vw,10rem)] font-display text-white leading-[0.88] tracking-tighter">
                                    {index === 0 ? (
                                        <div className="flex items-center">
                                            <span>WE ARE A TEAM&nbsp;</span>
                                            <div className="relative">
                                                <AnimatePresence>
                                                    {showLaptop && (
                                                        <motion.div
                                                            drag dragMomentum={false}
                                                            initial={{ opacity: 0, scale: 0.5, rotate: 0, y: 10 }}
                                                            animate={{ opacity: 1, scale: 1, rotate: 0, y: -45, x: 10 }}
                                                            className="absolute z-[100] cursor-grab active:cursor-grabbing pointer-events-auto"
                                                        >
                                                            <img src="/laptop.webp" alt="Laptop" className="w-[5vw] h-auto grayscale brightness-125 select-none pointer-events-none" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                <span>OF</span>
                                            </div>
                                        </div>
                                    ) : index === 1 ? (
                                        <TextFlip
                                            words={["DEVELOPERS", { text: "DESIGNERS", className: "text-[#39FF14]" }, "DEVELOPERS"]}
                                            className="uppercase font-display text-white leading-[0.88] tracking-tighter"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-x-[0.8vw] -mt-[0.5vw]">
                                            <span>WHO BUILD</span>
                                            <TextFlip
                                                words={["WEBSITES", { text: "APPS", className: "text-[#39FF14]" }, "WEBSITES"]}
                                                className="uppercase font-display text-white leading-[0.88] tracking-tighter"
                                            />
                                        </div>
                                    )}
                                </h1>
                            </div>
                        ))}
                    </div>

                    <div ref={btnRef} className="mt-8 flex items-center">
                        <Link
                            to="/projects"
                            className="group relative inline-flex items-center justify-center pl-5 pr-1 py-1 rounded-full bg-white text-black uppercase text-[7px] md:text-[10px] font-black tracking-widest overflow-hidden transition-all duration-500 ease-out hover:bg-zinc-200"
                        >
                            <span className="relative z-10 transition-transform duration-500 group-hover:scale-95 font-['Urbanist'] font-black text-[10px] md:text-[12px] tracking-widest pb-0.5">Let's Talk</span>
                            <span className="relative z-10 ml-2.5 flex items-center justify-center w-5 h-5 md:w-7 md:h-7">
                                <span className="absolute flex items-center justify-center w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full transition-transform duration-500 ease-out group-hover:scale-[3]">
                                    <span className="opacity-0 text-white transition-all duration-500 ease-out transform group-hover:opacity-100 group-hover:scale-100 scale-50">
                                        <div className="rotate-[45deg] flex items-center justify-center">
                                            <ArrowUp size={10} strokeWidth={1.5} />
                                        </div>
                                    </span>
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="md:col-span-4 w-full h-full flex justify-end items-center pl-10 transform -translate-y-6 md:-translate-y-12">
                    <DashboardVisual />
                </div>
            </div>

            {/* Social Links Footer */}
            <div className="absolute bottom-4 md:bottom-6 left-8 md:left-20 z-10 w-[calc(100%-64px)] md:w-[calc(100%-160px)] hidden md:block">
                <div className="mb-6 w-full h-[2px] bg-white/40" />
                <div ref={socialRef} className="flex gap-12">
                    {['LINKEDIN', 'INSTAGRAM', 'BEHANCE', 'X'].map((link) => (
                        <a key={link} href={`#${link}`} className="text-[10px] md:text-[11px] font-['Urbanist'] font-black text-white hover:text-white/50 transition-colors tracking-[0.2em]">
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
