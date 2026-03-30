import React from 'react';

const Logo = ({ className = "w-[35vw] h-auto md:w-[14vw]" }) => {
    return (
        <svg 
            width="400" 
            height="110" 
            viewBox="0 0 400 110" 
            xmlns="http://www.w3.org/2000/svg" 
            className={`transition-all duration-300 hover:scale-[1.03] active:scale-95 ${className}`}
        >
            <rect x="25" y="15" width="350" height="85" fill="black" stroke="white" strokeWidth="1.2" />
            
            {/* Corner Nodes */}
            <rect x="22" y="12" width="6" height="6" fill="black" stroke="white" strokeWidth="0.8" />
            <rect x="197" y="12" width="6" height="6" fill="black" stroke="white" strokeWidth="0.8" />
            <rect x="372" y="12" width="6" height="6" fill="black" stroke="white" strokeWidth="0.8" />
            <rect x="22" y="97" width="6" height="6" fill="black" stroke="white" strokeWidth="0.8" />
            <rect x="197" y="97" width="6" height="6" fill="black" stroke="white" strokeWidth="0.8" />
            <rect x="372" y="97" width="6" height="6" fill="black" stroke="white" strokeWidth="0.8" />

            <text x="200" y="58"
                fontFamily="'Bebas Neue', Gadget, sans-serif"
                fontSize="92" fontWeight="900"
                dominantBaseline="middle"
                textAnchor="middle"
                textLength="340"
                lengthAdjust="spacingAndGlyphs">
                <tspan fill="white">WEBINGI</tspan><tspan fill="#0aff00">X</tspan>
            </text>
        </svg>
    );
};

export default Logo;
