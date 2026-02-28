import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function AuditorHeader() {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
                    Raio-X <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-indigo-400">Digital 360°</span>
                </h1>
                <p className="text-slate-400 font-medium max-w-md italic">A inteligência operacional da Agência Grooway.</p>
            </motion.div>
            <div className="flex items-center gap-4">
                <a
                    href="/leads"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10"
                >
                    <Users className="w-3 h-3" /> Dashboard
                </a>
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-brand-purple animate-pulse" />
                </div>
            </div>
        </header>
    );
}
