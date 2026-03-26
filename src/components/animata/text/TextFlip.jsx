import React, { useEffect, useRef } from "react";

export default function TextFlip({ words, className = "text-blue-400", animationClass = "animate-flip-words" }) {
    // Find the longest word to act as an invisible placeholder
    const longestItem = words.reduce((longest, current) => {
        const currentText = typeof current === 'string' ? current : current.text;
        const longestText = typeof longest === 'string' ? longest : longest.text;
        return currentText.length > longestText.length ? current : longest;
    }, words[0]);

    const longestText = typeof longestItem === 'string' ? longestItem : longestItem.text;
    const longestClass = typeof longestItem === 'string' ? '' : (longestItem.className || '');

    return (
        <div className={`relative overflow-hidden inline-flex flex-col ${className}`}>
            {/* Invisible placeholder determines exact height and width dynamically and prevents wrapping */}
            <span className={`invisible block whitespace-nowrap ${longestClass}`}>
                {longestText}
            </span>

            {/* The animated flex column */}
            <div className="absolute top-0 left-0 w-full flex flex-col pointer-events-none">
                {words.map((item, index) => {
                    const content = typeof item === 'string' ? item : (item.node || item.text);
                    const extraClass = typeof item === 'string' ? '' : (item.className || '');
                    return (
                        <span key={index} className={`${animationClass} block whitespace-nowrap ${extraClass}`}>
                            {content}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
