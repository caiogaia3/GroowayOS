"use client";
import React from 'react';
import { Tooltip } from './Tooltip';
import { motion } from 'framer-motion';

export const MetricCard = ({
    label,
    value,
    status,
    tooltip,
    subValue,
    variant = "default",
    icon: Icon
}: {
    label: string,
    value: React.ReactNode,
    status?: boolean,
    tooltip: string,
    subValue?: string,
    variant?: "default" | "success" | "warning" | "error" | "purple" | "blue" | "fuchsia" | "cyan",
    icon?: any
}) => {
    const variants = {
        default: "border-white/5 bg-[#020204]/40 hover:border-white/10 hover:bg-[#020204]/60",
        success: "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]",
        warning: "border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.05)]",
        error: "border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.05)]",
        purple: "border-[#A855F7]/20 bg-[#A855F7]/5 hover:bg-[#A855F7]/10 shadow-[0_0_25px_rgba(168,85,247,0.1)]",
        blue: "border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.05)]",
        fuchsia: "border-fuchsia-500/20 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 shadow-[0_0_20px_rgba(217,70,239,0.05)]",
        cyan: "border-[#06B6D4]/20 bg-[#06B6D4]/5 hover:bg-[#06B6D4]/10 shadow-[0_0_25px_rgba(6,182,212,0.1)]",
    };

    const textColors = {
        default: "text-slate-200",
        success: "text-emerald-400 drop-shadow-[0_0_8px_#10b981]",
        warning: "text-orange-400 drop-shadow-[0_0_8px_#f97316]",
        error: "text-rose-400 drop-shadow-[0_0_8px_#f43f5e]",
        purple: "text-[#A855F7] neon-text-purple",
        blue: "text-blue-400 drop-shadow-[0_0_8px_#3b82f6]",
        fuchsia: "text-fuchsia-400 drop-shadow-[0_0_8px_#d946ef]",
        cyan: "text-[#06B6D4] neon-text-cyan",
    };

    return (
        <Tooltip text={tooltip}>
            <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`p-6 rounded-[2rem] border backdrop-blur-xl ${variants[variant]} text-center transition-all cursor-help group flex flex-col justify-center h-48 w-full`}
            >
                <p className="text-slate-500 text-[9px] uppercase mb-4 font-black tracking-[0.2em] flex items-center justify-center gap-2 group-hover:text-slate-300 transition-colors">
                    {Icon && <Icon className="w-3.5 h-3.5 opacity-60" />}
                    {label}
                </p>

                <div className="flex flex-col items-center gap-1">
                    <span className={`text-2xl font-black tracking-tighter ${status === true ? textColors.success :
                            status === false ? textColors.error :
                                textColors[variant] || textColors.default
                        }`}>
                        {value}
                    </span>

                    {subValue && (
                        <div className="mt-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{subValue}</p>
                        </div>
                    )}
                </div>

                {/* Micro-glow pulse on active */}
                <div className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none ${variant === 'purple' ? 'bg-[#A855F7]' :
                        variant === 'cyan' ? 'bg-[#06B6D4]' :
                            'bg-white'
                    }`} />
            </motion.div>
        </Tooltip>
    );
};
