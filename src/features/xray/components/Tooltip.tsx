"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="relative inline-block w-full" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute z-[100] bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-slate-900 border border-white/10 text-white text-[11px] font-medium rounded-xl shadow-2xl backdrop-blur-md min-w-[180px] max-w-[240px] text-center"
                    >
                        {text}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
