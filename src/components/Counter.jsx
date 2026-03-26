import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ end, duration = 2, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to({ value: 0 }, {
                value: end,
                duration: duration,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: countRef.current,
                    start: "top 85%",
                    once: true, // Only run once
                },
                onUpdate: function () {
                    setCount(Math.floor(this.targets()[0].value));
                }
            });
        }, countRef);

        return () => ctx.revert();
    }, [end, duration]);

    return (
        <span ref={countRef}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

export default Counter;
