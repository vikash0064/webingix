import React, { useEffect, useRef } from 'react';

const BackgroundGrid = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                // Modifying transform directly for 60fps performance without React re-renders
                glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // 30 columns * 40 rows = 1200 cells is enough to cover a 1080p screen smoothly
    const totalCells = 1200;

    return (
        <div className="fixed inset-0 w-full h-full z-0 hidden md:block pointer-events-none overflow-hidden bg-[#111]">
            {/* The Mouse Glow Blob: MUST be behind the grid boxes */}
            <div
                ref={glowRef}
                className="absolute rounded-full bg-[#ffffff] opacity-[0.2]"
                style={{
                    width: '120px',
                    height: '120px',
                    filter: 'blur(40px)',
                    zIndex: 0,
                    top: 0,
                    left: 0,
                    transform: 'translate(-100px, -100px) translate(-50%, -50%)',
                    willChange: 'transform' // hints browser for GPU acceleration
                }}
            />

            {/* The Grid Container - exactly like artworksit */}
            <div
                className="absolute inset-0 z-[1] w-[105vw] -left-[2.5vw] -top-[2.5vw] h-[105vh]"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(30, 1fr)',
                    gap: '1px' // The gap color will be #111 (from parent) unless glow is behind it
                }}
            >
                {Array.from({ length: totalCells }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#111] aspect-square rounded-[2px]"
                    />
                ))}
            </div>
        </div>
    );
};

export default BackgroundGrid;
