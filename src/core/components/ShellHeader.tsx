"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export function ShellHeader() {
    const pathname = usePathname();

    // Simple title mapping based on route
    const getTitle = () => {
        if (pathname.includes('/hub')) return { main: 'HUB de', accent: 'Ferramentas' };
        if (pathname.includes('/auditor')) return { main: 'Decoder', accent: 'Estratégico' };
        if (pathname.includes('/leads')) return { main: 'Gestão de', accent: 'Leads' };
        return { main: 'Agência', accent: 'OS' };
    };

    const title = getTitle();

    return (
        <header className="h-24 px-12 flex items-center justify-between z-30 shrink-0">
            <div className="flex flex-col">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    {title.main} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#06B6D4] neon-text-purple">{title.accent}</span>
                </h1>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-1">Agency Management OS v2.0</p>
            </div>

            <div className="flex items-center gap-8">
                {/* Active Nodes Indicator */}
                <div className="hidden md:flex items-center gap-3 px-6 py-2.5 bg-white/5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nodos Ativos: 03</span>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="text-right">
                        <p className="text-sm font-bold text-white group-hover:text-[#A855F7] transition-colors">Caio Gaia</p>
                        <p className="text-[10px] text-[#06B6D4] uppercase font-black tracking-tighter neon-text-cyan">Admin Master</p>
                    </div>
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl border-2 border-[#A855F7]/30 p-0.5 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:border-[#A855F7] transition-all">
                            <div className="w-full h-full bg-slate-800 rounded-[10px] flex items-center justify-center text-xs font-bold text-white">CG</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
