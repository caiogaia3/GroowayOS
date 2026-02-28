"use client";
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ScanningProgressProps {
    progress: number;
    analysisText: string;
}

export const ScanningProgress = ({ progress, analysisText }: ScanningProgressProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full text-center z-10 liquid-glass p-8 mb-8 !rounded-2xl bg-black/40 border-white/5 backdrop-blur-xl"
        >
            <div className="flex flex-col items-center justify-center">
                <div className="relative w-16 h-16 mb-5">
                    <div className="absolute inset-0 border-4 border-brand-purple/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-brand-purple rounded-full border-t-transparent animate-spin"></div>
                    <Loader2 className="w-6 h-6 text-violet-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>

                <h2 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-white">Analisando o Alvo...</h2>
                <p className="text-slate-400 mb-5 font-mono text-xs h-4">
                    {analysisText}
                </p>

                <div className="w-full max-w-md h-2 bg-slate-900/50 rounded-full overflow-hidden border border-slate-800 backdrop-blur-sm relative mb-2">
                    <motion.div
                        className="h-full bg-gradient-to-r from-brand-purple to-indigo-400 rounded-full relative"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-shimmer"></div>
                    </motion.div>
                </div>
                <div className="font-mono font-bold text-xs text-brand-purple drop-shadow-md">
                    {Math.min(Math.round(progress), 100)}% CONCLUÍDO
                </div>
            </div>
        </motion.div>
    );
};
