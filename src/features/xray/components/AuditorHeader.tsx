import React from 'react';
import { motion } from 'framer-motion';
import { Users, History } from 'lucide-react';

interface AuditorHeaderProps {
    onOpenHistory?: () => void;
}

export function AuditorHeader({ onOpenHistory }: AuditorHeaderProps) {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-4xl font-black tracking-tighter text-white mb-2 leading-none uppercase">
                    Decoder <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#06B6D4] neon-text-purple">Estratégico</span>
                </h2>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Mapeamento de DNA de Mercado v2.1</p>
            </motion.div>

            <div className="flex items-center gap-4">
                {onOpenHistory && (
                    <button
                        onClick={onOpenHistory}
                        className="text-[10px] font-black uppercase tracking-widest text-[#06B6D4] hover:text-white transition-all bg-[#06B6D4]/5 hover:bg-[#06B6D4]/20 px-5 py-2.5 rounded-2xl border border-[#06B6D4]/20 hover:border-[#06B6D4]/50 flex items-center gap-2"
                    >
                        <History className="w-3.5 h-3.5" /> Histórico
                    </button>
                )}
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group hover:border-[#A855F7]/50 transition-all cursor-pointer shadow-lg shadow-black/20">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#A855F7] animate-pulse shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
                </div>
            </div>
        </header>
    );
}
