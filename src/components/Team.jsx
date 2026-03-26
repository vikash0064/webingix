import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Contact from './Contact';
import SwapText from './SwapText';

gsap.registerPlugin(ScrollTrigger);

const defaultMembers = [
    { id: 'RF00', name: 'Ashwin D', title: 'Director of Miscellaneous Things', tags: ['Finance', 'Accounts', 'Marketing', 'Sales', 'Development', 'HR'], photo: '' },
    { id: 'RF07', name: 'Uday Rathore', title: 'Creative Director', tags: ['Art Director', 'Design Critique'], photo: '' },
    { id: 'RF16', name: 'Sushma Jois', title: 'Crafting pixels with Figma magic!', tags: ['UI/UX Designer', 'Figma', 'Photoshop', 'Illustrator', 'Xd'], photo: '' },
    { id: 'RF20', name: 'Vinayak Dev', title: 'I feel the need.. The need for code', tags: ['Back-end Developer', 'Laravel', 'PHP'], photo: '' },
    { id: 'RF04', name: 'Geethesh Nair', title: 'Tailwind is better than bootstrap', tags: ['Front-end Developer', 'Tailwind CSS', 'JS', 'GSAP'], photo: '' },
    { id: 'RF01', name: 'Koko', title: "I'm the director of happiness", tags: ['Cuteness Overload', 'Tail Wags', 'Zoomies', 'Barkitect'], photo: '' }
];

const Team = () => {
    const [teamMembers] = useState(() => {
        const saved = localStorage.getItem('team_members');
        return saved ? JSON.parse(saved) : defaultMembers;
    });

    const [clientLogos] = useState(() => {
        const saved = localStorage.getItem('client_logos');
        return saved ? JSON.parse(saved) : [];
    });

    const [galleryImages] = useState(() => {
        const saved = localStorage.getItem('gallery_images');
        return saved ? JSON.parse(saved) : [];
    });

    const [projects] = useState(() => {
        const saved = localStorage.getItem('projects_data');
        return saved ? JSON.parse(saved) : [];
    });

    const imageRef = useRef();
    const titleRef = useRef();
    const rocketRef = useRef();
    const globeRef = useRef();
    const cameraRef = useRef();
    const popcornRef = useRef();

    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="inline-block letter-anim">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const revealElements = gsap.utils.toArray('.reveal-text');
        revealElements.forEach((el) => {
            gsap.fromTo(el.querySelectorAll('.letter-anim'),
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.015,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    }
                }
            );
        });

        if (titleRef.current) {
            gsap.fromTo(titleRef.current.querySelectorAll('.letter-anim'),
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.015, ease: "power3.out", delay: 0.2 }
            );
            gsap.fromTo(titleRef.current.querySelector('.from-line'),
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.8 }
            );
        }

        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { scale: 0.5, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.5 }
            );
        }

        if (rocketRef.current) {
            const isMobile = window.innerWidth < 768;
            gsap.fromTo(rocketRef.current,
                { width: 0, scale: 0, opacity: 0 },
                {
                    width: isMobile ? "19vw" : "11vw",
                    scale: 1,
                    opacity: 1,
                    marginLeft: isMobile ? "-1.5vw" : "-0.7vw",
                    marginRight: isMobile ? "-0.8vw" : "-0.3vw",
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: { trigger: rocketRef.current, start: "top 85%", toggleActions: "play none none reverse" }
                }
            );
        }

        if (globeRef.current) {
            const isMobile = window.innerWidth < 768;
            gsap.fromTo(globeRef.current,
                { width: 0, scale: 0, opacity: 0 },
                {
                    width: isMobile ? "15vw" : "9vw",
                    scale: 1,
                    opacity: 1,
                    marginLeft: isMobile ? "-2vw" : "-2.5vw",
                    marginRight: isMobile ? "-2vw" : "-2.5vw",
                    duration: 1.0,
                    ease: "power3.out",
                    scrollTrigger: { trigger: globeRef.current.closest('h2'), start: "top 85%", toggleActions: "play reverse play reverse" },
                    delay: 1.1
                }
            );
        }

        if (cameraRef.current) {
            const isMobile = window.innerWidth < 768;
            gsap.fromTo(cameraRef.current,
                { width: 0, scale: 0, opacity: 0 },
                {
                    width: isMobile ? "12vw" : "7vw",
                    scale: 1,
                    opacity: 1,
                    marginLeft: isMobile ? "1vw" : "0.5vw",
                    marginRight: isMobile ? "1vw" : "0.5vw",
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: { trigger: cameraRef.current, start: "top 85%", toggleActions: "play none none reverse" }
                }
            );
        }

        if (popcornRef.current) {
            const isMobile = window.innerWidth < 768;
            gsap.fromTo(popcornRef.current,
                { width: 0, scale: 0, opacity: 0 },
                {
                    width: isMobile ? "12vw" : "7vw",
                    scale: 1,
                    opacity: 1,
                    marginLeft: isMobile ? "1vw" : "0.5vw",
                    marginRight: isMobile ? "1vw" : "0.5vw",
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: { trigger: popcornRef.current, start: "top 85%", toggleActions: "play none none reverse" }
                }
            );
        }
    }, [teamMembers, clientLogos, galleryImages, projects]);

    const displayLogos = [...clientLogos];
    const minSlots = Math.max(6, Math.ceil(displayLogos.length / 6) * 6);
    while (displayLogos.length < minSlots) {
        displayLogos.push({ id: `placeholder-${displayLogos.length}`, url: null });
    }

    return (
        <div className="bg-[#151515] text-[#F1F1F1] min-h-screen pt-32 selection:bg-white selection:text-black">
            {/* Hero Section */}
            <section className="px-6 md:px-[3vw] pt-12 md:pt-6 pb-20 relative">
                <h1 ref={titleRef} className="font-display text-[10vw] md:text-[min(8.5vw,160px)] tracking-[-0.02em] leading-[0.9] flex flex-col justify-center uppercase overflow-hidden">
                    <span className="flex overflow-hidden items-center flex-wrap">
                        {splitText('We Design the ')}
                        <span className="letter-anim inline-block align-baseline">
                            <SwapText auto initialText="Business." finalText="Business." finalTextClassName="text-[#39ff14]" />
                        </span>
                    </span>
                    <span className="flex overflow-hidden items-center flex-wrap">
                        {splitText('We Develop the ')}
                        <span className="letter-anim inline-block align-baseline">
                            <SwapText auto initialText="Experience." finalText="Experience." finalTextClassName="text-[#39ff14]" />
                        </span>
                    </span>
                    <span className="flex overflow-hidden items-center flex-wrap">
                        {splitText('We Deliver the ')}
                        <span className="letter-anim inline-block align-baseline">
                            <SwapText auto initialText="Brand." finalText="Brand." finalTextClassName="text-[#39ff14]" />
                        </span>
                    </span>
                    <span className="flex md:justify-end text-left md:text-right pr-0 md:pr-10 w-full mt-4 md:mt-0 items-center md:items-end from-line">
                        <span className="text-[#5C5C5C] mr-4 md:mr-6">FROM</span>
                        <div className="flex items-center gap-2">INDIA <img src="/india.webp" alt="India" className="w-6 h-auto md:w-8" /></div>
                    </span>
                </h1>
                <div className="flex justify-end mt-4 md:mt-2 md:pr-10 font-sans font-bold text-sm md:text-2xl">( NEW DELHI, INDIA )</div>
                <div ref={imageRef} className="md:absolute md:-bottom-16 md:left-[2vw] w-[70%] md:w-[22%] mt-12 md:mt-0 z-20">
                    <img src="/code.png" alt="Illustration" className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
                </div>
            </section>

            <div className="px-6 md:px-[1.5vw]"><div className="border-t-[0.5px] border-[#FFFFFF] border-opacity-50"></div></div>

            {/* Clients */}
            <section className="pt-[20vw] pb-[20vw] md:pt-[6vw] md:pb-0 relative overflow-hidden">
                <div className="px-6 md:px-[3vw]">
                    <div className="flex gap-[0.5vw] text-[14px] md:text-[17px] font-bold uppercase tracking-widest mb-8 text-[#5C5C5C]">01 / OUR ESTEEMED CLIENTS</div>
                    <h2 className="font-display text-[15vw] md:text-[7.5vw] tracking-[-0.02em] leading-[1.12] uppercase reveal-text">
                        <span className="flex overflow-hidden">{splitText('BRANDS THAT HAVE')}</span>
                        <span className="flex overflow-hidden">{splitText('SUCCESSFULLY')}</span>
                        <span className="flex items-center flex-wrap overflow-hidden">
                            {splitText('GONE LIVE')}
                            <img ref={globeRef} src="/globe.png" alt="Globe" className="h-auto object-contain inline-block w-0 opacity-0 scale-0" />
                            {splitText('WITH US')}
                        </span>
                    </h2>
                    <div className="mt-[15vw] md:mt-[4vw] grid grid-cols-2 md:grid-cols-6 border-l border-t border-[#5C5C5C]">
                        {displayLogos.map((logo) => (
                            <div key={logo.id} className="aspect-square border-r border-b border-[#5C5C5C] flex items-center justify-center relative group bg-[#151515]">
                                {logo.url ? <img src={logo.url} alt="Brand" className="w-[75%] h-auto object-contain" /> : <span className="text-[#5C5C5C] text-[10px] font-bold uppercase tracking-widest italic">Very Soon</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="pt-[25vw] pb-[5vw] md:pt-[8vw] md:pb-[3vw] relative overflow-hidden">
                <div className="px-6 md:px-[4vw]">
                    <div className="flex gap-[0.5vw] text-[14px] md:text-[17px] font-bold uppercase tracking-widest text-[#5C5C5C]">02 / A LI'L ABOUT US</div>
                    <h1 className="font-display text-[19vw] md:text-[min(12vw,220px)] tracking-[-0.02em] leading-[1.12] uppercase reveal-text flex flex-wrap justify-center mt-4">
                        <span className="flex overflow-hidden">{splitText('MEET OUR')}</span>
                        <img ref={rocketRef} src="/rocket.webp" alt="Rocket" className="h-auto object-contain inline-block w-0 opacity-0" />
                        <span className="flex overflow-hidden">{splitText('TEAM')}</span>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-20 md:border-t md:border-l border-[#D0D0D0]">
                        {[
                            // Mapping members to explicit grid slots to match the requested asymmetrical layout
                            { member: teamMembers[0], slot: 1 }, // Row 1, Col 1
                            { empty: true, slot: 2 },           // Row 1, Col 2 (Empty)
                            { member: teamMembers[1], slot: 3 }, // Row 1, Col 3
                            { empty: true, slot: 4 },           // Row 2, Col 1 (Empty)
                            { member: teamMembers[2], slot: 5 }, // Row 2, Col 2
                            { member: teamMembers[3], slot: 6 }, // Row 2, Col 3
                            { member: teamMembers[4], slot: 7 }, // Row 3, Col 1
                            { empty: true, slot: 8 },           // Row 3, Col 2 (Empty)
                            { member: teamMembers[5], slot: 9 }  // Row 3, Col 3
                        ].map((item, idx) => (
                            <div key={idx} className={`border-r border-b border-[#D0D0D0] relative p-[3vw] md:p-[1.25vw] min-h-[340px] md:min-h-[400px] flex flex-col ${item.empty || !item.member ? 'hidden md:block bg-transparent' : 'bg-transparent'}`}>
                                {!item.empty && item.member && (
                                    <>
                                        <div className="flex justify-between items-start">
                                            <div className="w-[45%] aspect-[3/4] overflow-hidden">
                                                {item.member.photo ? (
                                                    <img src={item.member.photo} alt={item.member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center text-[10px] text-white/20 uppercase font-bold italic">No Photo</div>
                                                )}
                                            </div>
                                            <p className="text-[14px] md:text-[16px] font-bold text-white tracking-tight">{item.member.id}</p>
                                        </div>

                                        <div className="mt-[12vw] md:mt-[2.5vw]">
                                            <h3 className="text-[32px] md:text-[52px] font-display font-black uppercase tracking-tight leading-[0.9] text-white">
                                                {item.member.name}
                                            </h3>
                                            <div className="text-[15px] md:text-[21px] text-white mt-[2vw] md:mt-[1vw] leading-tight font-medium opacity-90">
                                                {item.member.title}
                                            </div>
                                            <div className="flex gap-[1.5vw] md:gap-[.25vw] flex-wrap mt-[6vw] md:mt-[4vw] pb-[.5vw]">
                                                {item.member.tags?.map((tag, i) => (
                                                    <div key={i} className="rounded-full border-[.5px] border-[#F1F1F1] px-[2.5vw] md:px-[.6vw] py-[1vw] md:py-[.3vw] text-[11px] md:text-[13px] text-white hover:bg-white hover:text-black transition-all cursor-default uppercase font-bold tracking-tight">
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Behind the Scenes */}
            <section className="pt-[25vw] pb-[20vw] md:pt-[8vw] md:pb-[6vw] relative overflow-hidden">
                <div className="px-6 md:px-[4vw]">
                    <div className="flex gap-[0.5vw] text-[14px] md:text-[17px] font-bold uppercase tracking-widest text-[#5C5C5C]">03 / BEHIND THE SCENES</div>
                    <h1 className="font-display text-[19vw] md:text-[min(12vw,220px)] tracking-[-0.02em] leading-[1.12] uppercase reveal-text flex flex-wrap justify-center mt-4">
                        <span className="flex overflow-hidden">{splitText('DAY IN LIFE')}</span>
                        <img ref={cameraRef} src="/camera.webp" alt="Camera" className="h-auto object-contain inline-block w-0 opacity-0 scale-0" />
                        <span className="flex overflow-hidden">{splitText('REAL')}</span>
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-12">
                        {Array.from({ length: 9 }).map((_, i) => {
                            if (i === 1 || i === 5 || i === 6) {
                                let src = i === 1 ? "/laptop.webp" : i === 5 ? "/code.png" : "/yo.png";
                                return <div key={i} className="aspect-square flex items-center justify-center bg-transparent border border-[#5C5C5C] p-[25%]"><img src={src} className="w-full h-full object-contain transition-transform hover:scale-110" /></div>
                            }
                            const photo = galleryImages[[0, 2, 3, 4, 7, 8].indexOf(i)];
                            return <div key={i} className="aspect-square flex items-center justify-center bg-[#2A2A2A] border border-[#5C5C5C] overflow-hidden">{photo ? <img src={photo.url} className="w-full h-full object-cover transition-transform hover:scale-110" /> : <span className="text-[10px] text-[#5C5C5C] font-bold uppercase italic tracking-widest">Awaiting Shot</span>}</div>
                        })}
                    </div>
                </div>
            </section>


            <Contact />
        </div>
    );
};

export default Team;
