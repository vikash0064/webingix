import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ completion }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Minimum time for the loader to show (ArtWorks style)
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (completion) completion();
        }, 3200);

        return () => clearTimeout(timer);
    }, [completion]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
                    }}
                    className="fixed inset-0 z-[9999] bg-[#FFFFFF] flex items-center justify-center overflow-hidden"
                >
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                y: 0,
                                transition: { duration: 0.8, ease: "easeOut" }
                            }}
                            className="flex flex-col items-center"
                        >
                            {/* The Branded Text with Letter Stagger */}
                            <motion.h1 
                                className="text-black font-['Arial_Black',_sans-serif] font-black text-[clamp(2.5rem,8vw,6rem)] tracking-[-0.05em] leading-none text-center px-6"
                            >
                                {"WEBINGIX".split("").map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: 0.1 * index, 
                                            ease: [0.215, 0.61, 0.355, 1] 
                                        }}
                                        className="inline-block"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.h1>
                            
                            {/* Subtle line reveal */}
                            <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                                className="h-[3px] bg-black mt-2 w-full origin-left"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 1.2 }}
                            className="absolute -bottom-24 text-black/40 text-[10px] uppercase font-bold tracking-[0.5em]"
                        >
                            Establishing Connectivity
                        </motion.div>
                    </div>

                    {/* Background Subtle Grid (Optional Premium Touch) */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
