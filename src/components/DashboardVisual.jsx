import React from 'react';

const DashboardVisual = () => {
    return (
        <div className="hidden md:flex w-full h-full min-h-[500px] items-end justify-end pr-0 pb-4 translate-x-12">
            {/* The main container - exactly like the image structure */}
            <div className="demo-grid relative" style={{ "--column-size": "clamp(25px, 3vw, 42px)" }}>

                {/* --- THE STAIRCASE GRID LINES (Top Right) --- */}
                <div className="flex flex-col items-end">
                    {/* row 1: 3 squares */}
                    <div className="flex">
                        <div className="w-[--column-size] h-[--column-size] border-b border-white/20" aria-hidden="true"></div>
                        <div className="w-[--column-size] h-[--column-size] border-b border-l border-white/20" aria-hidden="true"></div>
                        <div className="w-[--column-size] h-[--column-size] border-b border-l border-white/20" aria-hidden="true"></div>
                    </div>
                    {/* row 2: 4 squares */}
                    <div className="flex">
                        <div className="w-[--column-size] h-[--column-size] border-b border-white/20" aria-hidden="true"></div>
                        <div className="w-[--column-size] h-[--column-size] border-b border-l border-white/20" aria-hidden="true"></div>
                        <div className="w-[--column-size] h-[--column-size] border-b border-l border-white/20" aria-hidden="true"></div>
                        <div className="w-[--column-size] h-[--column-size] border-b border-l border-white/20" aria-hidden="true"></div>
                    </div>
                    {/* row 3: 4 squares (vertical lines only) */}
                    <div className="flex">
                        <div className="w-[--column-size] h-[--column-size] border-l border-white/20" aria-hidden="true"></div>
                        <div className="w-[--column-size] h-[--column-size] border-l border-white/20" aria-hidden="true"></div>
                        <div className="w-[--column-size] h-[--column-size] border-l border-white/20" aria-hidden="true"></div>
                        <div className="w-[--column-size] h-[--column-size] border-l border-white/20" aria-hidden="true"></div>
                    </div>
                </div>

                {/* --- THE MAIN DASHBOARD AREA --- */}
                <div className="relative ml-[--column-size] w-[calc(9.5*var(--column-size))] aspect-[45/48] border border-white/20 border-r-0 bg-[#111] rounded-tl-xl overflow-hidden shadow-2xl">

                    {/* Internal Dashboard Content */}
                    <div className="absolute inset-0 p-3 flex flex-col">
                        <div className="flex items-center gap-2.5 mb-4 opacity-40">
                            <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-white">Production</span>
                            <div className="h-[1px] flex-1 bg-white/20"></div>
                        </div>

                        {/* 6 Cards - Clean and Monochrome White */}
                        <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                            {[
                                { name: 'app-backend', status: 'Available', type: 'service' },
                                { name: 'app-worker', status: 'Healthy', type: 'worker' },
                                { name: 'app-database', status: 'Available', type: 'db' },
                                { name: 'app-redis', status: 'Healthy', type: 'db' },
                                { name: 'app-api', status: 'Deploying', type: 'service' },
                                { name: 'app-frontend', status: 'Healthy', type: 'service' }
                            ].map((service, idx) => (
                                <div key={idx} className="bg-black border border-white/10 rounded p-2 flex flex-col justify-between group hover:border-white/20 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-sm bg-black border border-white/10 flex items-center justify-center">
                                                <div className="w-0.5 h-0.5 rounded-full bg-white/20 group-hover:bg-white transition-colors"></div>
                                            </div>
                                            <span className="text-[7.5px] font-bold text-white/50 uppercase tracking-widest whitespace-nowrap">{service.name}</span>
                                        </div>
                                        <div className="flex items-center gap-0.5 font-bold text-[7.5px] uppercase tracking-tighter">
                                            {service.status === 'Deploying' ? (
                                                <div className="flex items-center gap-0.5 text-white/30">
                                                    <div className="w-0.5 h-0.5 rounded-full bg-white/40 animate-pulse"></div>
                                                    <span>Deploy</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-0.5">
                                                    <span className={service.status === 'Available' ? 'text-emerald-500/80' : 'text-white/60'}>
                                                        {service.status}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="h-6 w-full relative">
                                        <svg className="w-full h-full" preserveAspectRatio="none">
                                            <path d={`M0 ${idx % 3 === 0 ? '25 L20 15 L40 20 L60 10 L80 15 L100 5' : idx % 3 === 1 ? '5 L25 25 L50 3 L75 20 L100 10' : '15 L40 20 L80 5 L100 15'}`}
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="0.8"
                                                strokeOpacity="0.4" />
                                        </svg>
                                    </div>
                                    <div className="flex justify-between text-[5.5px] uppercase tracking-[0.15em] text-white/30 font-bold mt-1.5 pt-1.5 border-t border-white/10">
                                        <span>72ms</span>
                                        <span>42MB</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- THE TERMINAL TOOLTIP (Clean White) --- */}
                <div className="absolute top-[18%] left-[2%] z-50">
                    <div className="bg-white text-black font-mono text-[9px] px-3 py-1.5 rounded shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center gap-1.5 border border-white">
                        <span className="opacity-40 font-bold">$</span>
                        <span className="font-bold tracking-tight">git push</span>
                        <div className="w-1 h-3 bg-black animate-pulse ml-0.5"></div>
                    </div>
                    {/* The specific vertical line (now white type) */}
                    <div className="absolute top-full left-[18%] w-[1px] h-12 bg-white/40"></div>
                </div>

                {/* --- DECORATIVE BLOCKS (Monochrome Top Right) --- */}
                <div className="absolute top-0 right-0 z-10 flex flex-col items-end opacity-90 scale-75 origin-top-right">
                    <div className="w-[--column-size] h-[--column-size] bg-white/40"></div>
                    <div className="flex">
                        <div className="w-[--column-size] h-[calc(var(--column-size)*0.3)] bg-white/70"></div>
                        <div className="w-[--column-size] h-[calc(var(--column-size)*0.3)] bg-white/20"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardVisual;
