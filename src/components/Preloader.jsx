import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onReady }) => {
    useEffect(() => {
        // High-end timing for the brand reveal
        const timer = setTimeout(() => {
            if (onReady) onReady();
        }, 3600); // Optimized for impact and speed

        return () => clearTimeout(timer);
    }, [onReady]);

    const word = "WEBINGIX";
    const subText = "Web & App Development";

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ 
                y: '-100%', 
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden pointer-events-auto"
        >
            {/* Background Tech Accents */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(#39ff14 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
            />

            <div className="relative flex flex-col items-center">
                {/* Official Logo Font Reveal */}
                <div className="overflow-hidden py-4">
                    <div className="flex">
                        {word.split("").map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: 0.05 * index, 
                                    ease: [0.16, 1, 0.3, 1] 
                                }}
                                className={`inline-block font-['Bebas_Neue',_Impact,_sans-serif] font-black text-[clamp(2.5rem,12vw,7.5rem)] tracking-[0.05em] leading-[0.85] ${index === word.length - 1 ? 'text-[#39ff14]' : 'text-white'}`}
                                style={{ textShadow: index === word.length - 1 ? '0 0 30px rgba(57, 255, 20, 0.3)' : 'none' }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Subtext Reveal */}
                <div className="overflow-hidden h-6 mt-4 flex items-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ 
                            duration: 1.2, 
                            delay: 1.2,
                            ease: "easeOut"
                        }}
                        className="text-white text-[10px] md:text-[min(1.1vw,14px)] uppercase font-['Urbanist',_sans-serif] font-black tracking-[0.8em] whitespace-nowrap md:pl-[0.8em]"
                    >
                        {subText}
                    </motion.p>
                </div>

                {/* Loading Line Progress */}
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-[#39ff14] to-transparent mt-12 opacity-40 max-w-[400px] w-[60vw]"
                />
            </div>
        </motion.div>
    );
};

export default Preloader;
