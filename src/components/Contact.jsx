import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ isContactPage = false }) => {
    const containerRef = useRef();
    const headingImgRef = useRef();
    const [name, setName] = useState('');
    const [contactMethod, setContactMethod] = useState('Phone');
    const [phone, setPhone] = useState('8153929447');
    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('Website');
    const [timeline, setTimeline] = useState('2 weeks');
    const [extraDetails, setExtraDetails] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const contactLabel = isContactPage ? "05 / LET'S COLLABORATE" : "03 / LET'S COLLABORATE";

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const desktopChars = gsap.utils.toArray('.contact-main-heading .char');
            gsap.fromTo(desktopChars,
                { y: '100%' },
                {
                    y: '0%',
                    duration: 0.75,
                    stagger: 0.012,
                    ease: "cubic-bezier(0.8, 0, 0.2, 1)",
                    scrollTrigger: {
                        trigger: '.contact-main-heading',
                        start: 'top 85%'
                    }
                }
            );

            const mobileChars = gsap.utils.toArray('.contact-main-heading-mobile .char');
            gsap.fromTo(mobileChars,
                { y: '100%' },
                {
                    y: '0%',
                    duration: 0.75,
                    stagger: 0.012,
                    ease: "cubic-bezier(0.8, 0, 0.2, 1)",
                    scrollTrigger: {
                        trigger: '.contact-main-heading-mobile',
                        start: 'top 88%'
                    }
                }
            );

            const secondaryChars = gsap.utils.toArray('.contact-secondary-heading .letter-anim');
            gsap.fromTo(secondaryChars,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.04,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.contact-secondary-heading',
                        start: 'top 85%',
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );

            if (headingImgRef.current) {
                gsap.fromTo(headingImgRef.current,
                    { x: 50, y: 30, opacity: 0, rotate: 10 },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        duration: 1.5,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: '.contact-heading-wrap',
                            start: 'top 80%'
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text, wordClassName = 'text-[#F1F1F1]') => {
        return text.split(' ').map((word, wIdx) => (
            <div key={wIdx} className={`word inline-block mr-[0.3em] overflow-hidden align-top ${wordClassName}`}>
                {word.split('').map((char, cIdx) => (
                    <div key={cIdx} className="char inline-block">{char}</div>
                ))}
            </div>
        ));
    };

    const splitAnimatedLetters = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="inline-block overflow-hidden align-top text-[#F1F1F1]">
                <span className="inline-block letter-anim">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));
    };
    return (
        <section ref={containerRef} className="bg-[#151515] pt-[2vw] pb-32 relative z-20 overflow-hidden">
            {/* Add Handwriting Font */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Anton&display=swap');
                .font-handwriting { font-family: 'Caveat', cursive; }
                .font-anton { font-family: 'Anton', sans-serif; }
                .form-input::placeholder { font-family: 'Caveat', cursive; opacity: 0.35; }
                .form-input { font-family: 'Caveat', cursive; font-size: 1.25em; color: #39ff14; }
                .mobile-contact-label { font-family: 'Urbanist', sans-serif; font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
                .mobile-contact-heading { font-family: 'Anton', sans-serif; letter-spacing: -0.03em; line-height: 0.92; }
                .mobile-contact-copy { font-family: 'Urbanist', sans-serif; color: rgba(255,255,255,0.9); }
                .mobile-contact-field-label { font-family: 'Urbanist', sans-serif; font-size: 0.62rem; letter-spacing: 0.08em; color: rgba(255,255,255,0.88); }
                .mobile-contact-line {
                    width: 100%;
                    border: 0;
                    border-bottom: 1px solid rgba(255,255,255,0.22);
                    background: transparent;
                    color: #f1f1f1;
                    font-family: 'Caveat', cursive;
                    font-size: 1rem;
                    line-height: 1.2;
                    padding: 0.35rem 0;
                    outline: none;
                }
                .mobile-contact-line::placeholder { color: rgba(255,255,255,0.24); }
                .mobile-contact-pill {
                    border: 1px solid rgba(255,255,255,0.18);
                    border-radius: 999px;
                    padding: 0.35rem 0.7rem;
                    font-family: 'Urbanist', sans-serif;
                    font-size: 0.62rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.78);
                    background: rgba(255,255,255,0.03);
                    transition: all 0.25s ease;
                }
                .mobile-contact-pill.active {
                    border-color: rgba(57,255,20,0.55);
                    color: #39ff14;
                    background: rgba(57,255,20,0.08);
                }
                .select-custom { 
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 15 5 5 5-5'/%3E%3Cpath d='m7 9 5-5 5-5'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.5rem center;
                    padding-right: 1.5rem;
                }
            `}} />

            {isContactPage && (
                <div className="px-[6vw] md:px-[4.5vw] pt-[15vw] pb-[8vw] md:pb-[6vw] md:pt-[10vw]">
                    <div className="relative text-[#F1F1F1] contact-heading-wrap w-full max-w-[1500px] mx-auto">
                        
                        {/* Desktop & Tablet */}
                        <div className="relative md:w-full hidden md:flex flex-col">
                            <div className="w-full flex justify-start pl-[6vw]">
                                <h1 className="contact-main-heading font-anton text-[min(15vw,220px)] -tracking-[.02em] leading-[0.85] uppercase">
                                    <span className="overflow-hidden block">{splitText("LET'S WORK")}</span>
                                </h1>
                            </div>
                            <div className="w-full flex justify-end pr-[4vw] relative md:mt-[1vw]">
                                <div className="relative inline-flex">
                                    <span className="absolute left-[-22%] top-[-42%] z-[10] flex items-center justify-center pointer-events-none">
                                        <img
                                            ref={headingImgRef}
                                            src="/logo/phone.webp"
                                            alt="phone"
                                            className="heading-img w-[11vw] min-w-[80px] max-w-[170px] h-auto -rotate-[15deg] drop-shadow-2xl"
                                            style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))' }}
                                        />
                                    </span>
                                    <h1 className="contact-main-heading font-anton text-[min(15vw,220px)] -tracking-[.02em] leading-[0.85] uppercase">
                                        <span className="overflow-hidden block">{splitText("TOGETHER")}</span>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Mobile */}
                        <div className="relative md:hidden flex flex-col pt-[8vw]">
                            <div className="w-full flex justify-start pl-[2vw]">
                                <h1 className="contact-main-heading-mobile font-anton text-[19vw] -tracking-[.02em] leading-[0.85] uppercase">
                                    <span className="overflow-hidden block">{splitText("LET'S WORK")}</span>
                                </h1>
                            </div>
                            <div className="w-full flex justify-end pr-[2vw] relative mt-[8vw]">
                                <div className="relative inline-flex">
                                    <span className="absolute left-[-25%] top-[-45%] z-[10] flex items-center justify-center pointer-events-none">
                                        <img
                                            src="/logo/phone.webp"
                                            alt="phone"
                                            className="heading-img-mobile w-[22vw] min-w-[50px] max-w-[100px] h-auto -rotate-[15deg] drop-shadow-2xl"
                                            style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))' }}
                                        />
                                    </span>
                                    <h1 className="contact-main-heading-mobile font-anton text-[19vw] -tracking-[.02em] leading-[0.85] uppercase">
                                        <span className="overflow-hidden block">{splitText("TOGETHER")}</span>
                                    </h1>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <div className={`container mx-auto px-6 md:px-0 md:pl-[2vw] max-w-[1800px] relative z-10 ${isContactPage ? 'mt-[8vw] md:mt-[15vw]' : ''}`}>
                <div className="flex flex-col md:flex-row gap-[15vw] md:gap-[0vw]">
                    {/* Left Column: Breadcrumbs and Socials */}
                    <div className={`md:w-[39%] ${isContactPage ? 'md:pt-0' : 'md:pt-[2vw]'}`}>
                        <div className="breadcrumbs flex items-center text-white text-[3.4vw] md:text-[min(1.3vw,15px)] font-medium tracking-[0.12em] md:tracking-[0.3em] uppercase mb-[3vw] md:mb-[2vw] pl-[4vw] md:pl-[3vw] whitespace-nowrap border-t border-white/20 pt-[3vw] md:border-t-0 md:pt-0">
                            <span>{contactLabel}</span>
                        </div>

                        <div className="pl-[4vw] md:pl-[6vw] mb-[12vw] md:mb-[6vw] mt-[6vw] md:mt-[4vw] contact-secondary-heading">
                            <h2 className="font-anton text-[18vw] md:text-[min(16vw,100px)] uppercase tracking-[0.02em] text-[#F1F1F1] flex flex-col gap-0 reveal-text leading-[0.9]">
                                <span className="flex overflow-hidden leading-[1]">{splitAnimatedLetters("LET'S GET")}</span>
                                <span className="flex overflow-hidden leading-[1] pl-[28vw] md:pl-[8.5vw]">{splitAnimatedLetters("IN TOUCH")}</span>
                            </h2>
                        </div>

                        {/* Staggered Social Grid (3x3 Logic from Code) */}
                        <div id="socials" className="mt-[3vw] md:mt-[4vw] pl-[0vw] md:pl-[6vw]">
                            <div className="grid grid-cols-3 w-max mx-auto md:mx-0 translate-x-0 md:translate-x-0">
                                {/* Row 1 */}
                                <div className="col-start-2">
                                    <SocialLink
                                        href="https://x.com/"
                                        hoverColor="#ffffff"
                                        icon={<img src="/logo/x.png" alt="X" className="w-[40%] object-contain brightness-0 invert opacity-70 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />}
                                    />
                                </div>
                                <div className="col-start-3">
                                    <SocialLink
                                        href="tel:+918153929447"
                                        hoverColor="#0156A4"
                                        icon={<img src="/logo/call.png" alt="Call" className="w-[40%] object-contain brightness-0 invert opacity-70 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />}
                                    />
                                </div>
                                {/* Row 2 */}
                                <div className="row-start-2">
                                    <SocialLink
                                        href="https://facebook.com/"
                                        hoverColor="#1877F2"
                                        icon={<img src="/logo/facebook.png" alt="Facebook" className="w-[40%] object-contain brightness-0 invert opacity-70 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />}
                                    />
                                </div>
                                <div className="row-start-2">
                                    <SocialLink
                                        href="https://linkedin.com/"
                                        hoverColor="#0A66C2"
                                        icon={<img src="/logo/linkdin.png" alt="LinkedIn" className="w-[40%] object-contain brightness-0 invert opacity-70 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />}
                                    />
                                </div>
                                <div className="row-start-2">
                                    <SocialLink
                                        href="mailto:contact@webingix.com"
                                        hoverColor="#DA483A"
                                        icon={<img src="/logo/email.png" alt="Email" className="w-[40%] object-contain brightness-0 invert opacity-70 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />}
                                    />
                                </div>
                                {/* Row 3 */}
                                <div className="row-start-3">
                                    <SocialLink
                                        href="https://wa.me/"
                                        hoverColor="#25D366"
                                        icon={<img src="/logo/whatsapp.png" alt="WhatsApp" className="w-[40%] object-contain brightness-0 invert opacity-70 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />}
                                    />
                                </div>
                                <div className="row-start-3">
                                    <SocialLink
                                        href="https://instagram.com/"
                                        hoverColor="#E1306C"
                                        icon={<img src="/logo/instagram.png" alt="Instagram" className="w-[40%] object-contain brightness-0 invert opacity-70 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sentence Form */}
                    <div className="hidden md:block w-px self-stretch bg-white/20"></div>
                    <div className={`md:flex-1 md:pl-[6vw] md:pr-[10vw] ${isContactPage ? 'pt-[16.5vw] md:pt-[4.75vw]' : 'pt-[21vw] md:pt-[8vw]'}`}>
                        {isSubmitted ? (
                            <div className="flex flex-col justify-center h-full min-h-[40vh] animate-fade-in text-white/90" style={{ animation: 'fadeIn 1s ease-out' }}>
                                <h3 className="text-3xl md:text-4xl font-display font-medium mb-6 text-white flex items-center flex-wrap gap-2">
                                    <span>Hi</span>
                                    <span className="font-handwriting text-[#39ff14] text-[1.4em] translate-y-1">
                                        {name || '[Client Name]'}
                                    </span>,
                                </h3>
                                <p className="text-lg md:text-xl leading-relaxed mb-6 text-white/80">
                                    Thank you for reaching out to Webingix<br />
                                    We’ve received your request and will contact you shortly.
                                </p>
                                <p className="text-lg md:text-xl font-bold mt-8 text-white">
                                    Best regards,<br />
                                    Webingix Team
                                </p>
                            </div>
                        ) : (
                            <>
                                <form className="md:hidden flex flex-col gap-6 px-[4vw]" onSubmit={handleSubmit}>
                                    <div className="space-y-5 pt-2">
                                        <div>
                                            <div className="mobile-contact-field-label">My name is</div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Your name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="mobile-contact-line"
                                            />
                                        </div>

                                        <div>
                                            <div className="mobile-contact-field-label">What can I help you for</div>
                                            <div className="flex gap-2 pt-2 flex-wrap">
                                                {['Phone', 'Email'].map((item) => (
                                                    <button
                                                        key={item}
                                                        type="button"
                                                        className={`mobile-contact-pill ${contactMethod === item ? 'active' : ''}`}
                                                        onClick={() => setContactMethod(item)}
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mobile-contact-field-label">My business or project is called</div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Your business name"
                                                value={projectName}
                                                onChange={(e) => setProjectName(e.target.value)}
                                                className="mobile-contact-line"
                                            />
                                        </div>

                                        <div>
                                            <div className="mobile-contact-field-label">I'm looking for</div>
                                            <div className="flex gap-2 pt-2 flex-wrap">
                                                {['Website', 'E-commerce', 'UI/UX'].map((item) => (
                                                    <button
                                                        key={item}
                                                        type="button"
                                                        className={`mobile-contact-pill ${projectType === item ? 'active' : ''}`}
                                                        onClick={() => setProjectType(item)}
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mobile-contact-field-label">I'm aiming to launch by</div>
                                            <div className="flex gap-2 pt-2 flex-wrap">
                                                {['2 weeks', '1-2 months', '3+ months'].map((item) => (
                                                    <button
                                                        key={item}
                                                        type="button"
                                                        className={`mobile-contact-pill ${timeline === item ? 'active' : ''}`}
                                                        onClick={() => setTimeline(item)}
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mobile-contact-field-label">You can reach me at</div>
                                            <input
                                                required
                                                type="text"
                                                placeholder={contactMethod === 'Phone' ? 'Phone number' : 'Email address'}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="mobile-contact-line"
                                            />
                                        </div>

                                        <div>
                                            <div className="mobile-contact-field-label">Here's more about what I have in mind</div>
                                            <textarea
                                                rows="2"
                                                placeholder="Anything else"
                                                value={extraDetails}
                                                onChange={(e) => setExtraDetails(e.target.value)}
                                                className="mobile-contact-line resize-none"
                                            />
                                        </div>

                                        <div className="mobile-contact-copy text-[0.7rem] uppercase tracking-[0.18em] text-white/55 pt-2">
                                            Cheers,
                                        </div>
                                    </div>

                                    <div className="flex justify-center pt-4">
                                        <button
                                            type="submit"
                                            className="group relative inline-flex items-center justify-center pl-8 pr-2 py-2 rounded-full bg-white text-black uppercase text-[9px] font-black tracking-[0.24em] overflow-hidden transition-all duration-500 ease-out hover:bg-zinc-200 min-w-[78vw]"
                                        >
                                            <span className="relative z-10 transition-transform duration-500 group-hover:scale-95 font-['Urbanist'] font-black text-[0.72rem] tracking-[0.22em] pb-0.5 whitespace-nowrap">SEND MESSAGE</span>

                                            <span className="relative z-10 ml-auto flex items-center justify-center w-8 h-8">
                                                <span className="absolute flex items-center justify-center w-2.5 h-2.5 bg-black rounded-full transition-transform duration-500 ease-out group-hover:scale-[3]">
                                                    <span className="opacity-0 text-white transition-all duration-500 ease-out transform group-hover:opacity-100 group-hover:scale-100 scale-50">
                                                        <div className="rotate-[45deg] flex items-center justify-center">
                                                            <ArrowUp size={10} strokeWidth={1.5} />
                                                        </div>
                                                    </span>
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </form>

                                <form className="hidden md:flex md:flex-col gap-[2.5vw]" onSubmit={handleSubmit}>
                                    <p className="font-display text-[min(1.5vw,26px)] leading-[1.4] text-white">
                                    <span className="block font-bold mb-3">Hi Webingix team,</span>

                                    <span> I, </span>
                                    <span className="inline-block relative">
                                        <input required type="text" placeholder=" Your name here " value={name} onChange={(e) => setName(e.target.value)} className="form-input bg-transparent border-b border-white/25 focus:border-[#39ff14] outline-none px-2 min-w-[15vw] placeholder:text-white/25 transition-colors" />
                                    </span>
                                    <span> want help kicking off a project. You can reach me via </span>
                                    <span className="inline-block relative">
                                        <select value={contactMethod} onChange={(e) => setContactMethod(e.target.value)} className="form-input select-custom bg-transparent border-b border-white/25 focus:border-[#39ff14] outline-none pr-8 cursor-pointer transition-colors mx-2">
                                            <option className="bg-[#1a1a1a]" value="Phone">Phone</option>
                                            <option className="bg-[#1a1a1a]" value="Email">Email</option>
                                        </select>
                                    </span>
                                    <span> &nbsp; at &nbsp; </span>
                                    <span className="inline-block relative">
                                        <input required type="tel" placeholder=" 8153929447 " value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input bg-transparent border-b border-white/25 focus:border-[#39ff14] outline-none px-2 min-w-[20vw] placeholder:text-white/25 transition-colors" />
                                    </span>

                                    <br />
                                    <span> My business or project is called </span>
                                    <span className="inline-block relative">
                                        <input required type="text" placeholder=" Business/project name " value={projectName} onChange={(e) => setProjectName(e.target.value)} className="form-input bg-transparent border-b border-white/25 focus:border-[#39ff14] outline-none px-2 min-w-[25vw] placeholder:text-white/25 transition-colors" />
                                    </span>
                                    <span>. I'm looking for </span>
                                    <span className="inline-block relative">
                                        <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="form-input select-custom bg-transparent border-b border-white/25 focus:border-[#39ff14] outline-none pr-8 cursor-pointer transition-colors mx-2">
                                            <option className="bg-[#1a1a1a]" value="Website">Website</option>
                                            <option className="bg-[#1a1a1a]" value="E-commerce">E-commerce</option>
                                            <option className="bg-[#1a1a1a]" value="UI/UX">UI/UX Design</option>
                                        </select>
                                    </span>
                                    <span> and I'm aiming to launch by </span>
                                    <span className="inline-block relative">
                                        <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="form-input select-custom bg-transparent border-b border-white/25 focus:border-[#39ff14] outline-none pr-8 cursor-pointer transition-colors mx-2">
                                            <option className="bg-[#1a1a1a]" value="2 weeks">2 weeks</option>
                                            <option className="bg-[#1a1a1a]" value="1-2 months">1-2 months</option>
                                            <option className="bg-[#1a1a1a]" value="3+ months">3+ months</option>
                                        </select>
                                    </span>

                                    <br />
                                    <span> And here's more about what I have in mind </span>
                                    <span className="inline-block relative">
                                        <input required type="text" placeholder=" Anything else " value={extraDetails} onChange={(e) => setExtraDetails(e.target.value)} className="form-input bg-transparent border-b border-white/25 focus:border-[#39ff14] outline-none px-2 min-w-[35vw] placeholder:text-white/25 transition-colors" />
                                    </span>
                                    <span>. </span>

                                    <br />
                                    <span className="block mt-4 font-bold">
                                        Cheers,
                                        <span className={`block font-handwriting text-[1.4em] mt-1 translate-x-2 text-[#39ff14] min-h-[1.5em]`}>
                                            {name}
                                        </span>
                                    </span>
                                    </p>

                                    <div className="flex justify-end mt-[4vw] md:mt-[3vw] md:mr-[4vw]">
                                        <button
                                            type="submit"
                                            className="group relative inline-flex items-center justify-center pl-6 pr-1.5 py-1.5 rounded-full bg-white text-black uppercase text-[8px] md:text-xs font-black tracking-widest overflow-hidden transition-all duration-500 ease-out hover:bg-zinc-200"
                                        >
                                            <span className="relative z-10 transition-transform duration-500 group-hover:scale-95 font-['Urbanist'] font-black text-xs md:text-sm tracking-widest pb-0.5 whitespace-nowrap">SEND MESSAGE</span>

                                            <span className="relative z-10 ml-3 flex items-center justify-center w-6 h-6 md:w-8 md:h-8">
                                                <span className="absolute flex items-center justify-center w-2 h-2 md:w-2.5 md:h-2.5 bg-black rounded-full transition-transform duration-500 ease-out group-hover:scale-[3]">
                                                    <span className="opacity-0 text-white transition-all duration-500 ease-out transform group-hover:opacity-100 group-hover:scale-100 scale-50">
                                                        <div className="rotate-[45deg] flex items-center justify-center">
                                                            <ArrowUp size={12} strokeWidth={1.5} />
                                                        </div>
                                                    </span>
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Subtle glow */}
            <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#39ff14]/[0.01] blur-[150px] rounded-full pointer-events-none" />
        </section>
    );
};

const SocialLink = ({ href, icon, hoverColor }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-transparent hover:bg-white border-[.5px] border-[#5C5C5C] w-[20.5vw] h-[20.5vw] md:w-[7.5vw] md:h-[7.5vw] flex justify-center items-center relative transition-all duration-500 hover:z-20 -ml-[0.5px] -mt-[0.5px]"
    >
        <span className="duration-500 transition-colors w-full h-full flex items-center justify-center p-2" style={{ '--hover-color': hoverColor }}>
            {React.cloneElement(icon, {
                className: `${icon.props.className} group-hover:text-[var(--hover-color)] transition-colors duration-500`
            })}
        </span>
    </a>
);

export default Contact;
