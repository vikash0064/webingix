import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef();
    const labelRef = useRef();
    const titleRef = useRef();
    const textRef = useRef();
    const card1Ref = useRef();
    const card2Ref = useRef();
    const lineRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Label + title slide up
            gsap.timeline({
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
            })
                .fromTo(labelRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                )
                .fromTo(titleRef.current,
                    { opacity: 0, y: 60, skewY: 3 },
                    { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'power4.out' },
                    '-=0.3'
                )
                .fromTo(lineRef.current,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 0.7, ease: 'power3.inOut', transformOrigin: 'left' },
                    '-=0.5'
                )
                .fromTo(textRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
                    '-=0.4'
                )
                .fromTo([card1Ref.current, card2Ref.current],
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
                    '-=0.4'
                );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="py-16 bg-black text-white relative overflow-hidden border-t border-white/10">
            {/* Decorative large number */}
            <div className="absolute right-6 top-10 text-[10rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">
                01
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <span ref={labelRef} className="section-label" style={{ opacity: 0 }}>Who We Are</span>

                <h2 ref={titleRef}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-3 leading-[0.85]"
                    style={{ opacity: 0 }}
                >
                    About<br /><span className="text-white/25">WebNginx</span>
                </h2>

                <div ref={lineRef} className="h-px bg-white/20 max-w-[80px] mb-8" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} />

                <p ref={textRef}
                    className="text-lg text-white/70 mb-8 leading-relaxed max-w-2xl"
                    style={{ opacity: 0 }}
                >
                    We are <span className="font-bold text-white">WebNginx</span>, a forward-thinking digital studio
                    dedicated to crafting stunning, high-performance websites that empower businesses with real growth.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                    <div ref={card1Ref}
                        className="p-10 bg-black hover:bg-white/[0.04] transition-all duration-500 group"
                        style={{ opacity: 0 }}
                    >
                        <div className="text-xs text-white/40 uppercase tracking-widest mb-4 group-hover:text-white/70 transition-colors">Our Vision</div>
                        <p className="text-white/75 text-lg leading-relaxed">
                            To be the catalyst for your digital success, providing innovative web solutions
                            that set you apart in the digital landscape.
                        </p>
                        <div className="mt-8 w-8 h-px bg-white/20 group-hover:w-16 transition-all duration-500" />
                    </div>
                    <div ref={card2Ref}
                        className="p-10 bg-black hover:bg-white/[0.04] transition-all duration-500 group"
                        style={{ opacity: 0 }}
                    >
                        <div className="text-xs text-white/40 uppercase tracking-widest mb-4 group-hover:text-white/70 transition-colors">Our Approach</div>
                        <p className="text-white/75 text-lg leading-relaxed">
                            Client-first, transparent, and quality-driven. We believe in building partnerships,
                            not just websites. Your satisfaction is our top priority.
                        </p>
                        <div className="mt-8 w-8 h-px bg-white/20 group-hover:w-16 transition-all duration-500" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
