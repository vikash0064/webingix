/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                neon: {
                    cyan: '#00f3ff',
                    pink: '#bc13fe',
                    green: '#0aff00',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['"Bebas Neue"', 'Anton', 'sans-serif'],
            },
            transitionTimingFunction: {
                slow: "cubic-bezier(.405, 0, .025, 1)",
                "minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)",
            },
            keyframes: {
                "flip-words": {
                    "0%, 40%": { transform: "translateY(0%)" },
                    "50%, 90%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(-200%)" },
                },
                "flip-words-5": {
                    "10%": { transform: "translateY(-102%)" },
                    "25%": { transform: "translateY(-100%)" },
                    "35%": { transform: "translateY(-202%)" },
                    "50%": { transform: "translateY(-200%)" },
                    "60%": { transform: "translateY(-302%)" },
                    "75%": { transform: "translateY(-300%)" },
                    "85%": { transform: "translateY(-402%)" },
                    "100%": { transform: "translateY(-400%)" },
                },
            },
            animation: {
                "flip-words": "flip-words 4s infinite",
                "flip-words-5": "flip-words-5 8s infinite",
            },
        },
    },
    plugins: [],
}
