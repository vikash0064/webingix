import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    { id: 1, name: 'Sarah Connor', role: 'CEO, TechCorp', text: 'WebNginx transformed our digital presence. The 3D integration and animations are mind-blowing!' },
    { id: 2, name: 'James Cameron', role: 'Director', text: 'A truly cinematic experience on the web. Every detail was crafted with care. Highly recommended.' },
    { id: 3, name: 'Ellen Ripley', role: 'CTO, Weyland', text: 'Robust, fast, and visually stunning. The team delivered beyond our expectations on every front.' },
];

const Testimonials = () => {
    const sectionRef = useRef();
    const headerRef = useRef();
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.fromTo(headerRef.current.children,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
                    }
                );
            }

            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: cardsRef.current[0], start: 'top 84%', once: true }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="testimonials" className="py-16 bg-black text-white border-t border-white/10 relative overflow-hidden">
            <div className="absolute right-6 top-10 text-[10rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">06</div>

            <div className="container mx-auto px-6 relative z-10">
                {/* <div ref={headerRef}>
                    <span className="section-label" style={{ opacity: 0 }}>Client Stories</span>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-10 leading-[0.85]" style={{ opacity: 0 }}>
                        What They<br /><span className="text-white/25">Said</span>
                    </h2>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.id}
                            ref={el => (cardsRef.current[i] = el)}
                            className="p-10 bg-black hover:bg-white/[0.04] transition-all duration-300 group"
                            style={{ opacity: 0 }}
                        >
                            {/* Quote mark */}
                            <div className="text-5xl text-white/15 font-serif leading-none mb-4 select-none">"</div>
                            <p className="text-white/70 text-base mb-8 leading-relaxed">{t.text}"</p>
                            <div className="border-t border-white/10 pt-6">
                                <h4 className="text-white font-bold text-base">{t.name}</h4>
                                <span className="text-xs text-white/40 uppercase tracking-widest">{t.role}</span>
                            </div>
                            <div className="mt-4 w-6 h-px bg-white/20 group-hover:w-12 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
