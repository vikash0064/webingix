import React, { useState, useEffect } from "react";

const SwapText = ({
    initialText,
    finalText,
    className = "",
    supportsHover = true,
    textClassName = "",
    initialTextClassName = "",
    finalTextClassName = "",
    disableClick = false,
    auto = false,
    interval = 3000,
    ...props
}) => {
    const [active, setActive] = useState(false);
    const common = "block transition-all duration-1000 ease-slow";

    useEffect(() => {
        if (!auto) return;
        const timer = setInterval(() => {
            setActive((prev) => !prev);
        }, interval);
        return () => clearInterval(timer);
    }, [auto, interval]);

    return (
        <div {...props} className={`relative overflow-hidden ${className}`}>
            <div
                className={`group cursor-pointer select-none ${textClassName}`}
                onClick={() => !disableClick && setActive((current) => !current)}
            >
                <span
                    className={`${common} ${initialTextClassName} flex flex-col ${active ? "-translate-y-full" : ""
                        } ${supportsHover ? "group-hover:-translate-y-full" : ""}`}
                >
                    {initialText}
                </span>
                <span
                    className={`${common} absolute top-full ${finalTextClassName} ${active ? "-translate-y-full" : ""
                        } ${supportsHover ? "group-hover:-translate-y-full" : ""}`}
                >
                    {finalText}
                </span>
            </div>
        </div>
    );
};

export default SwapText;
