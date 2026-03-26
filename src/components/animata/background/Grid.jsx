import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Grid({
    color = "rgba(255, 255, 255, 0.08)",
    size = 45,
    className = "",
    style = {},
    children,
    spotlight = true,
}) {
    const spotlightRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return; // spotlightRef is not directly moved anymore

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update CSS variables for better mask performance
            containerRef.current.style.setProperty('--x', `${x}px`);
            containerRef.current.style.setProperty('--y', `${y}px`);

            // If spotlightRef is still used for an element that needs direct movement, keep this.
            // In the new structure, the spotlight glow uses CSS variables directly,
            // so this gsap.to might be redundant for the glow itself, but could be for other elements.
            // Given the new structure, spotlightRef is used for the *glow* div, which uses CSS vars.
            // So, this gsap.to is likely not needed for the glow itself, but the instruction includes it.
            // Let's keep it as per instruction, assuming spotlightRef might be used for something else or
            // the instruction intends to keep the gsap animation for some reason.
            // However, the new spotlight glow uses CSS variables directly, so gsap.to on spotlightRef
            // for x/y translation is not directly applicable to the *glow effect* anymore.
            // The instruction's provided code snippet for useEffect has `gsap.to(spotlightRef.current, { x: x, y: y, ... })`.
            // This implies spotlightRef *should* still be translated.
            // Let's re-evaluate: The new "Interactive Spotlight Glow" div has `ref={spotlightRef}`.
            // Its `background` style uses `var(--x)` and `var(--y)`.
            // So, `gsap.to(spotlightRef.current, { x: x, y: y, ... })` would translate the *div itself*,
            // while the background *inside* it would still be positioned relative to the div's new position.
            // This is likely not the desired effect. The `gsap.to` should be removed if the spotlight
            // is purely driven by CSS variables.
            // The instruction explicitly includes `gsap.to(spotlightRef.current, { x: x, y: y, ... })`.
            // This is a conflict. The new `style` for the spotlight div is `background: radial-gradient(500px circle at var(--x, 0px) var(--y, 0px), ...)`.
            // This means the `x` and `y` are already handled by CSS variables.
            // Applying `gsap.to` to `spotlightRef.current` for `x` and `y` would move the *entire div*,
            // which would then offset the `var(--x)` and `var(--y)` relative to the div's new position.
            // This is incorrect. The `gsap.to` should be removed.

            // Re-reading the instruction: "Update the `Grid` component to use a more refined spotlight. Layer 1 should be a subtle ambient glow following the cursor. Layer 2 should be a highly-defined 'Active Grid' layer using a `mask-image` to illuminate only the grid lines near the cursor. This creates a sharper, more reactive feel. Use `rgba(255,255,255,0.06)` for the base and a brighter white for the illuminated part. Ensure the mouse position variables (`--x`, `--y`) are updated efficiently."
            // The provided code edit for useEffect *still includes* the gsap.to.
            // This is a direct contradiction with the new spotlight's style using CSS variables for positioning.
            // I must follow the provided code edit faithfully, even if it seems contradictory.
            // The `gsap.to` will animate the `transform: translate(x, y)` of the `spotlightRef` element.
            // The `background` of that element will then be positioned relative to its translated position.
            // This will result in a double translation or an unexpected offset.
            // However, the instruction is to "make the change and return the full contents of the new code document after the change."
            // And "Make sure to incorporate the change in a way so that the resulting file is syntactically correct."
            // The provided code edit *is* syntactically correct.
            // I will include the `gsap.to` as provided in the instruction's code edit.

            gsap.to(spotlightRef.current, {
                x: x,
                y: y,
                duration: 0.6,
                ease: "power3.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [spotlight]); // Added spotlight to dependencies as per instruction

    return (
        <div
            ref={containerRef}
            style={{
                ...style,
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                backgroundColor: "transparent",
            }}
            className={`group/grid ${className}`}
        >
            {/* 1. Base Subtle Grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.2]"
                style={{
                    backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(to right, ${color} 1px, transparent 1px)`,
                    backgroundSize: `${size}px ${size}px`,
                }}
            />

            {/* 2. Interactive Spotlight Glow (Soft Ambient) */}
            {spotlight && (
                <div
                    ref={spotlightRef}
                    className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover/grid:opacity-100"
                    style={{
                        background: `radial-gradient(250px circle at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.05), transparent 80%)`,
                    }}
                />
            )}

            {/* 3. Bright Lit-up Grid Layer (Sharp lines) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)`,
                    backgroundSize: `${size}px ${size}px`,
                    maskImage: "radial-gradient(180px circle at var(--x, 0px) var(--y, 0px), black, transparent)",
                    WebkitMaskImage: "radial-gradient(180px circle at var(--x, 0px) var(--y, 0px), black, transparent)",
                }}
            />

            {/* 4. Large Depth Grid */}
            <div
                className="absolute inset-0 opacity-[0.2]"
                style={{
                    backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
                    backgroundSize: `${size * 4}px ${size * 4}px`,
                }}
            />

            {/* Visual Fade to Bottom */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
        </div>
    );
}
