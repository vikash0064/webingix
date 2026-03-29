import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
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
    { id: 'RF04', name: 'Geethesh Nair', title: 'Front-end Developer', tags: ['React', 'Tailwind', 'GSAP'], photo: '' },
    { id: 'RF01', name: 'Koko', title: "I'm the director of happiness", tags: ['Cuteness', 'Barkitect'], photo: '' }
];

const Team = () => {
    // ELITE CLOUD SYNC: Accessing prefetched data instantly from the TanStack cache
    const { data: team = [] } = useQuery({ queryKey: ['team'], queryFn: async () => (await fetch('/api/team')).json() });
    const { data: logos = [] } = useQuery({ queryKey: ['logos'], queryFn: async () => (await fetch('/api/logos')).json() });
    const { data: gallery = [] } = useQuery({ queryKey: ['gallery'], queryFn: async () => (await fetch('/api/gallery')).json() });
    
    const normalizeMember = (member, idx = 0) => {
        const fallback = defaultMembers[idx % defaultMembers.length] || {};
        const name = (member.name || fallback.name || `Member ${idx + 1}`).toString();
        const id = (member.id || fallback.id || `RF${String(idx + 1).padStart(2, '0')}`).toString();
        const title = (member.title || member.role || fallback.title || 'Team Member').toString();

        let tags = member.tags;
        if (typeof tags === 'string') {
            tags = tags.split(/[,|]/).map(t => t.trim()).filter(Boolean);
        }
        if (!Array.isArray(tags) || tags.length === 0) tags = fallback.tags || [];

        return {
            _id: member._id || id,
            id,
            name,
            title,
            tags,
            photo: member.photo || member.image || ''
        };
    };

    const teamMembers = React.useMemo(() => {
        return team.length ? team.map((m, i) => normalizeMember(m, i)) : [];
    }, [team]);

    const displayLogos = React.useMemo(() => {
        const l = [...logos];
        const minSlots = Math.max(6, Math.ceil(l.length / 6) * 6);
        while (l.length < minSlots) l.push({ id: `placeholder-${l.length}`, url: null });
        return l;
    }, [logos]);

    const imageRef = useRef();
    const titleRef = useRef();
    const rocketRef = useRef();
    const globeRef = useRef();
    const cameraRef = useRef();
    const popcornRef = useRef();
    const containerRef = useRef();

    const splitText = (text) => {
        return text.split(' ').map((word, wIdx) => (
            <div key={wIdx} className="word inline-block mr-[0.12em] overflow-hidden align-top whitespace-nowrap">
                {word.split('').map((char, cIdx) => (
                    <span key={cIdx} className="char inline-block letter-anim">
                        {char}
                    </span>
                ))}
            </div>
        ));
    };

    React.useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const revealElements = gsap.utils.toArray('.reveal-text');
            revealElements.forEach((el) => {
                gsap.fromTo(el.querySelectorAll('.letter-anim'),
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.012,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        }
                    }
                );
            });

            if (titleRef.current) {
                gsap.fromTo(titleRef.current.querySelectorAll('.letter-anim'),
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.012, ease: "power3.out", delay: 0.2 }
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
                        scrollTrigger: { trigger: rocketRef.current, start: "top 85%", toggleActions: "play none none none" }
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
                        scrollTrigger: { trigger: globeRef.current.closest('h2'), start: "top 85%", toggleActions: "play none none none" },
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
                        scrollTrigger: { trigger: cameraRef.current, start: "top 85%", toggleActions: "play none none none" }
                    }
                );
            }
        }, containerRef);

        window.scrollTo(0, 0);

        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { scale: 0.5, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.5 }
            );
        }

        return () => ctx.revert();
    }, [teamMembers]);

    return (
        <div ref={containerRef} className="bg-[#0f0f0f] text-[#F1F1F1] min-h-screen pt-32 selection:bg-white selection:text-black">
            {/* Hero Section */}
            <section className="px-6 md:px-[3vw] pt-12 md:pt-6 pb-20 relative">
                <h1 ref={titleRef} className="font-display text-[10vw] md:text-[min(8.5vw,160px)] tracking-[-0.02em] leading-[0.9] flex flex-col justify-center uppercase overflow-hidden">
                    <span className="flex overflow-hidden items-center flex-nowrap whitespace-nowrap">
                        {splitText('We Design the ')}
                        <span className="char inline-block align-baseline ml-2">
                            <SwapText auto initialText="Business." finalText="Business." finalTextClassName="text-[#39ff14]" />
                        </span>
                    </span>
                    <span className="flex overflow-hidden items-center flex-nowrap whitespace-nowrap">
                        {splitText('We Develop the ')}
                        <span className="char inline-block align-baseline ml-2">
                            <SwapText auto initialText="Experience." finalText="Experience." finalTextClassName="text-[#39ff14]" />
                        </span>
                    </span>
                    <span className="flex overflow-hidden items-center flex-nowrap whitespace-nowrap">
                        {splitText('We Deliver the ')}
                        <span className="char inline-block align-baseline ml-2">
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
                        <span className="flex overflow-hidden whitespace-nowrap flex-nowrap">{splitText('BRANDS THAT HAVE')}</span>
                        <span className="flex overflow-hidden whitespace-nowrap flex-nowrap">{splitText('SUCCESSFULLY')}</span>
                        <span className="flex items-center flex-wrap overflow-hidden whitespace-nowrap flex-nowrap">
                            {splitText('GONE LIVE')}
                            <img ref={globeRef} src="/globe.png" alt="Globe" className="h-auto object-contain inline-block w-0 opacity-0 scale-0 mx-2" />
                            {splitText('WITH US')}
                        </span>
                    </h2>
                    <div className="mt-[15vw] md:mt-[4vw] grid grid-cols-2 md:grid-cols-6 border-l border-t border-[#5C5C5C]">
                        {displayLogos.map((logo, idx) => (
                            <div key={logo._id || idx} className="aspect-square border-r border-b border-[#5C5C5C] flex items-center justify-center relative group bg-[#0f0f0f]">
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
                        <span className="flex overflow-hidden whitespace-nowrap flex-nowrap">{splitText('MEET OUR')}</span>
                        <img ref={rocketRef} src="/rocket.webp" alt="Rocket" className="h-auto object-contain inline-block w-0 opacity-0 mx-4" />
                        <span className="flex overflow-hidden whitespace-nowrap flex-nowrap">{splitText('TEAM')}</span>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-20 md:border-t md:border-l border-[#D0D0D0]">
                        {(teamMembers.length > 0 ? teamMembers : [{
                            id: 'Add your team',
                            name: 'No team members yet',
                            title: 'Add team in admin panel',
                            tags: ['Admin', 'CMS'],
                            photo: ''
                        }]).map((member, idx) => (
                            <div key={member._id || idx} className={`border-r border-b border-[#D0D0D0] relative p-[3vw] md:p-[1.25vw] min-h-[340px] md:min-h-[400px] flex flex-col bg-transparent`}>
                                <div className="flex justify-between items-start">
                                    <div className="w-[45%] aspect-[3/4] overflow-hidden">
                                        {member.photo ? (
                                            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center text-[10px] text-white/20 uppercase font-bold italic">No Photo</div>
                                        )}
                                    </div>
                                    <p className="text-[14px] md:text-[16px] font-bold text-white tracking-tight">{member.id}</p>
                                </div>

                                <div className="mt-[12vw] md:mt-[2.5vw]">
                                    <h3 className="text-[32px] md:text-[52px] font-display font-black uppercase tracking-tight leading-[0.9] text-white">
                                        {member.name}
                                    </h3>
                                    <div className="text-[15px] md:text-[21px] text-white mt-[2vw] md:mt-[1vw] leading-tight font-medium opacity-90">
                                        {member.title}
                                    </div>
                                    <div className="flex gap-[1.5vw] md:gap-[.25vw] flex-wrap mt-[6vw] md:mt-[4vw] pb-[.5vw]">
                                        {member.tags?.map((tag, i) => (
                                            <div key={i} className="rounded-full border-[.5px] border-[#F1F1F1] px-[2.5vw] md:px-[.6vw] py-[1vw] md:py-[.3vw] text-[11px] md:text-[13px] text-white hover:bg-white hover:text-black transition-all cursor-default uppercase font-bold tracking-tight">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                        <span className="flex overflow-hidden whitespace-nowrap flex-nowrap">{splitText('DAY IN LIFE')}</span>
                        <img ref={cameraRef} src="/camera.webp" alt="Camera" className="h-auto object-contain inline-block w-0 opacity-0 scale-0 mx-4" />
                        <span className="flex overflow-hidden whitespace-nowrap flex-nowrap">{splitText('REAL')}</span>
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-12">
                        {Array.from({ length: 9 }).map((_, i) => {
                            if (i === 1 || i === 5 || i === 6) {
                                let src = i === 1 ? "/laptop.webp" : i === 5 ? "/code.png" : "/yo.png";
                                return <div key={i} className="aspect-square flex items-center justify-center bg-transparent border border-[#5C5C5C] p-[25%]"><img src={src} className="w-full h-full object-contain transition-transform hover:scale-110" /></div>
                            }
                            const photo = gallery[[0, 2, 3, 4, 7, 8].indexOf(i)];
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
