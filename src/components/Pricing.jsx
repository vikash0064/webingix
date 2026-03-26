import React, { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
    {
        name: 'Basic Website',
        price: '₹5,999 – ₹9,999',
        desc: 'Perfect for personal portfolios and a simple, clean online presence.',
        features: ['Responsive Design', '3–5 Pages', 'Contact Form', 'Basic SEO', '1 Month Support'],
    },
    {
        name: 'Business Website',
        price: '₹14,999 – ₹39,999',
        desc: 'Ideal for small to medium businesses looking to grow their digital footprint.',
        features: ['Custom Premium Design', '8–12 Pages', 'CMS Integration', 'Advanced SEO', 'Social Media Integration', '3 Months Support'],
        popular: true
    },
];

const Pricing = () => {
    const sectionRef = useRef();
    const headerRef = useRef();
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
                }
            );
            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 60, scale: 0.97 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.18, ease: 'power3.out',
                    scrollTrigger: { trigger: cardsRef.current[0], start: 'top 84%', once: true }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="pricing" className="py-16 bg-[#080808] text-white border-t border-white/10 relative overflow-hidden">
            <div className="absolute right-6 top-10 text-[10rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">08</div>

            <div className="container mx-auto px-6 relative z-10">
                <div ref={headerRef}>
                    <span className="section-label" style={{ opacity: 0 }}>Pricing</span>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-10 leading-[0.85]" style={{ opacity: 0 }}>
                        Transparent<br /><span className="text-white/25">Pricing</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 max-w-4xl mx-auto">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            ref={el => (cardsRef.current[i] = el)}
                            className="relative bg-[#080808] p-10 hover:bg-white/[0.04] transition-all duration-300 group"
                            style={{ opacity: 0 }}
                        >
                            {plan.popular && (
                                <div className="absolute top-6 right-6 border border-white/30 text-white/60 text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}
                            <div className="text-xs text-white/30 uppercase tracking-widest mb-4 font-mono">0{i + 1}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="text-3xl font-black text-white mb-3">{plan.price}</div>
                            <p className="text-white/55 text-sm mb-8 leading-relaxed">{plan.desc}</p>

                            <ul className="space-y-3 mb-10">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-3">
                                        <Check size={14} className="text-white/50 flex-shrink-0" />
                                        <span className="text-white/70 text-sm">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/#contact"
                                className={`block w-full text-center py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300 ${plan.popular
                                    ? 'bg-white text-black hover:bg-white/90'
                                    : 'border border-white/30 text-white hover:border-white hover:bg-white hover:text-black'
                                    }`}
                            >
                                Choose Plan
                            </Link>
                        </div>
                    ))}
                </div>

                <p className="text-center text-white/30 mt-12 text-xs uppercase tracking-widest">
                    * Prices vary on requirements · Contact us for an exact quote
                </p>
            </div>
        </section>
    );
};

export default Pricing;
