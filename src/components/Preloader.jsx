import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onReady }) => {
    useEffect(() => {
        // High-end timing for the multi-phrase reveal
        const timer = setTimeout(() => {
            if (onReady) onReady();
        }, 4000); // Slightly longer to allow both brand and description to breathe

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
            className="fixed inset-0 z-[9999] bg-[#FFFFFF] flex items-center justify-center overflow-hidden pointer-events-auto"
        >
            <div className="relative flex flex-col items-center">
                {/* Phase 1: Brand Name (Smaller, Bold Inter) */}
                <div className="overflow-hidden py-2">
                    <div className="flex">
                        {word.split("").map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: 0.1 * index, 
                                    ease: [0.16, 1, 0.3, 1] 
                                }}
                                className="inline-block text-black font-['Inter'] font-black text-[clamp(2rem,6.5vw,4.5rem)] tracking-[-0.04em] leading-tight"
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Phase 2: Description (Web & App Development) */}
                <div className="h-[2px] bg-black/10 w-[80%] my-3" />
                
                <div className="overflow-hidden h-6 mt-1 flex items-center">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 1.6, // Fire after WEBINGIX is complete
                            ease: "easeOut"
                        }}
                        className="text-black/50 text-[10px] md:text-[13px] uppercase font-['Urbanist'] font-black tracking-[0.5em] whitespace-nowrap"
                    >
                        {subText}
                    </motion.p>
                </div>
            </div>

            {/* Subtle Grid Accent */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '60px 60px' }} 
            />
        </motion.div>
    );
};

export default Preloader;
