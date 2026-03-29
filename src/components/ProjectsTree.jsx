import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fallbackProjects = [
    {
        id: '01',
        title: 'HUNAN SQUARE',
        tags: ['Food & Beverage', 'Hospitality', 'Restaurant'],
        desc: 'Modern Asian dining experience',
        image: '/div.jpg'
    },
    {
        id: '02',
        title: 'FEDERATE ONE',
        tags: ['Corporate', 'Enterprise', 'Cybersecurity'],
        desc: 'Secure enterprise systems with a polished digital presence',
        image: '/laptop.webp'
    },
    {
        id: '03',
        title: 'AZURE',
        tags: ['Apartments', 'Realestate'],
        desc: 'Premium real estate showcase for modern apartment living',
        image: '/yo.png'
    },
    {
        id: '04',
        title: 'VAILANKANNI',
        tags: ['Healthcare', 'Clinic', 'Trust'],
        desc: 'Clear and trusted experience for a healthcare-focused brand',
        image: '/vikash.jpeg'
    }
];

const ProjectsTree = () => {
    const sectionRef = useRef();
    const headingImgRef = useRef();
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);

    // Projects will be loaded dynamically (e.g., from admin panel or API)
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                if (data.length > 0) setProjects(data);
                setTimeout(() => ScrollTrigger.refresh(), 150);
                return;
            }
        } catch (error) {
            console.error('Failed to load projects from API', error);
        }

        // Fallback to locally cached projects if API is unreachable
        try {
            const cached = JSON.parse(localStorage.getItem('projects_data') || '[]');
            if (Array.isArray(cached) && cached.length > 0) {
                setProjects(cached);
                setTimeout(() => ScrollTrigger.refresh(), 150);
            }
        } catch (e) {
            console.warn('No cached projects available');
        }
    };

    useEffect(() => {
        fetchProjects();
        const handleUpdate = () => fetchProjects();
        window.addEventListener('webingix:projects_data_updated', handleUpdate);
        window.addEventListener('storage', (e) => {
            if (e.key === 'webingix_cms_last_sync') handleUpdate();
        });
        return () => {
            window.removeEventListener('webingix:projects_data_updated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    const displayProjects = projects.length > 0 ? projects : fallbackProjects;
    const activeProject = displayProjects[activeProjectIndex] || displayProjects[0];

    useEffect(() => {
        if (activeProjectIndex >= displayProjects.length) {
            setActiveProjectIndex(0);
        }
    }, [activeProjectIndex, displayProjects.length]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Main Heading Animation
            const chars = gsap.utils.toArray('.main-heading .char');
            gsap.fromTo(chars,
                { y: '100%' },
                {
                    y: '0%',
                    duration: 0.75,
                    stagger: 0.012,
                    ease: "cubic-bezier(0.8, 0, 0.2, 1)",
                    scrollTrigger: {
                        trigger: '.main-heading',
                        start: 'top 85%'
                    }
                }
            );

            // Floating Ship Image Animation
            gsap.fromTo(headingImgRef.current,
                { x: 50, y: 30, opacity: 0, rotate: 10 },
                {
                    x: 0, y: 0, opacity: 1, rotate: 0, duration: 1.5, ease: "power4.out",
                    scrollTrigger: {
                        trigger: '.main-heading',
                        start: 'top 80%'
                    }
                }
            );

            // Row Divider Animations (Line Draw) - now handled with borders
            // const lines = gsap.utils.toArray('.row-divider');
            // lines.forEach((line) => {
            //     gsap.fromTo(line,
            //         { scaleX: 0 },
            //         {
            //             scaleX: 1,
            //             duration: 1.5,
            //             ease: "cubic-bezier(0.8, 0, 0.2, 1)",
            //             transformOrigin: "left",
            //             scrollTrigger: {
            //                 trigger: line,
            //                 start: "top 90%"
            //             }
            //         }
            //     );
            // });

            // Project Title Reveal Animations
            const items = gsap.utils.toArray('.work-item');
            items.forEach((item) => {
                const itemChars = item.querySelectorAll('.char');
                gsap.fromTo(itemChars,
                    { y: '100%' },
                    {
                        y: '0%',
                        duration: 1,
                        stagger: 0.01,
                        ease: "cubic-bezier(0.8, 0, 0.2, 1)",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%"
                        }
                    }
                );

                // Fade in ID and Tags
                gsap.fromTo([item.querySelector('.project-id'), item.querySelector('.project-tags')],
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1, y: 0, duration: 1, ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%"
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text) => {
        return text.split(' ').map((word, wIdx) => (
            <div key={wIdx} className="word inline-block mr-[0.3em] overflow-hidden align-top text-white">
                {word.split('').map((char, cIdx) => (
                    <div key={cIdx} className="char inline-block">{char}</div>
                ))}
            </div>
        ));
    };

    const previewCopy = activeProject?.desc || activeProject?.clientMsg || 'Project details coming soon';

    return (
        <div ref={sectionRef} className="bg-[#151515] text-[#F1F1F1] relative overflow-hidden font-inter pt-[7vw]">
            <section className="relative px-[6vw] md:px-[4.5vw] py-[5vw] md:py-[4vw]">
                {/* Desktop Ship Overlay */}
                <div className="relative md:w-full">
                    <h1 className="main-heading font-anton text-[15vw] md:text-[min(14vw,280px)] -tracking-[.1vw] leading-[1.05] flex flex-col uppercase z-[0] w-full">
                        <span className="overflow-hidden block">{splitText("SITES WE'VE")}</span>
                        <span className="flex justify-end -mt-[2vw]">
                            <span className="overflow-hidden block">{splitText("SHIPPED")}</span>
                        </span>
                    </h1>
                    {/* Ship image overlays heading on desktop */}
                    <img
                        ref={headingImgRef}
                        src="/ship.webp"
                        alt="Ship"
                        className="absolute hidden md:block right-[7.5%] bottom-[37.5%] w-[12vw] -translate-x-[70%] -translate-y-[10%] z-[1]"
                        style={{ minWidth: '80px', maxWidth: '180px' }}
                    />
                </div>
                {/* Mobile Ship Above Heading */}
                <div className="pt-[2vw] relative md:w-[60%] md:hidden">
                    <img
                        src="/ship.webp"
                        alt="Ship Image"
                        className="heading-img-mobile absolute bottom-0 w-[25vw] left-1/4 translate-x-[35%] -translate-y-[90%] z-[2]"
                        style={{ minWidth: '80px', maxWidth: '180px' }}
                    />
                    <h1 className="main-heading-mobile font-anton -tracking-[.1vw] leading-[1.12] flex flex-col">
                        <span className="overflow-hidden text-[9vw] !inline-flex justify-between">
                            <span>{splitText("SITES")}</span>
                            <span>{splitText("WE'VE")}</span>
                        </span>
                        <span className="overflow-hidden text-[15vw]">
                            {splitText("SHIPPED")}
                        </span>
                    </h1>
                </div>
            </section>

            {/* Projects Container */}
            <section className="mt-[6vw] pb-[8vw]">
                <div className="work-projects-container relative border-t border-[#454545] px-[6vw] md:px-[4.5vw]">
                    <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(24rem,35vw)]">
                        <div className="min-w-0">
                            {displayProjects.map((project, idx) => (
                                <div
                                    key={project.id || String(idx + 1).padStart(2, '0')}
                                    className={`work-item relative z-0 flex-1 pt-[5.5vw] pb-[7vw] px-0 md:pt-[1.75vw] md:pb-[3.5vw] md:px-[3vw] border-t border-[#454545] last:border-b transition-colors duration-300 ease-out cursor-pointer ${activeProjectIndex === idx ? 'bg-white/[0.02] border-t-[#A3A3A3]' : 'hover:border-t-[#A3A3A3]'}`}
                                    onMouseEnter={() => setActiveProjectIndex(idx)}
                                    onFocus={() => setActiveProjectIndex(idx)}
                                    onClick={() => setActiveProjectIndex(idx)}
                                    tabIndex={0}
                                >
                                    <div className="flex flex-col gap-[4vw] md:flex-row md:gap-[5vw]">
                                        <p className="project-id font-light text-[8vw] leading-none md:text-[2.05vw] text-white min-w-fit whitespace-nowrap">
                                            {project.id || String(idx + 1).padStart(2, '0')}
                                        </p>
                                        <div className="min-w-0">
                                            <h3 className="font-anton text-[11vw] md:text-[3.35vw] leading-[0.9] uppercase tracking-tight text-white md:whitespace-nowrap">
                                                {splitText(project.title)}
                                            </h3>
                                            <div className="project-tags flex gap-[2vw] md:gap-[.5vw] flex-wrap mt-[4vw] md:mt-[1vw]">
                                                {(project.tags || []).map((tag, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="rounded-full border-[0.5px] tracking-tight border-white px-[3.5vw] py-[1.6vw] md:px-[.75vw] md:py-[.5vw] font-inter text-[3.3vw] md:text-[0.95vw] text-white whitespace-nowrap"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-[8vw] lg:pt-0 lg:border-l lg:border-[#454545] lg:pl-[2.4vw]">
                            <div className="lg:sticky lg:top-[8.5rem]">
                                <div className="border border-[#6A6A6A] bg-[#171717] p-[3vw] md:p-[1vw]">
                                    <div className="border-[5px] md:border-[6px] border-white bg-zinc-900 aspect-[1.06] overflow-hidden">
                                        {activeProject?.image ? (
                                            <img
                                                src={activeProject.image}
                                                alt={activeProject.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_top,_#404040,_#111111_65%)] px-6 text-center">
                                                <span className="font-anton text-[10vw] md:text-[2.4vw] leading-[0.9] uppercase tracking-tight text-white">
                                                    {activeProject?.title}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-[3vw] md:mt-[1.1vw] text-[6vw] leading-[1.08] md:text-[2.15vw] md:leading-[1.06] tracking-tight text-white">
                                        {previewCopy}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsTree;
