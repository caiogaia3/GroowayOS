"use client";
import React from 'react';
import { Tooltip } from './Tooltip';

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
    variant?: "default" | "success" | "warning" | "error" | "purple" | "blue" | "fuchsia",
    icon?: any
}) => {
    const variants = {
        default: "bg-black/40 border-white/5",
        success: "bg-emerald-500/5 border-emerald-500/20",
        warning: "bg-orange-500/5 border-orange-500/20",
        error: "bg-red-500/5 border-red-500/20",
        purple: "bg-brand-purple/5 border-brand-purple/20",
        blue: "bg-blue-500/5 border-blue-500/20",
        fuchsia: "bg-fuchsia-500/5 border-fuchsia-500/20",
    };

    return (
        <Tooltip text={tooltip}>
            <div className={`p-4 rounded-2xl border ${variants[variant]} text-center transition-all hover:bg-white/5 active:scale-95 cursor-help group flex flex-col justify-center h-44 w-full`}>
                <p className="text-slate-500 text-[10px] uppercase mb-1.5 font-black tracking-widest flex items-center justify-center gap-1.5 group-hover:text-slate-300 transition-colors">
                    {Icon && <Icon className="w-3 h-3 opacity-60" />}
                    {label}
                </p>
                <div className="flex flex-col items-center gap-0.5">
                    <span className={`text-xl font-black tracking-tight ${status === true ? 'text-emerald-400' :
                        status === false ? 'text-red-400' :
                            variant === 'purple' ? 'text-brand-purple' :
                                variant === 'blue' ? 'text-blue-400' :
                                    variant === 'fuchsia' ? 'text-fuchsia-400' : 'text-slate-200'
                        }`}>
                        {value}
                    </span>
                    {subValue && <p className="text-[10px] text-slate-500 font-mono opacity-80 mt-1 line-clamp-2">{subValue}</p>}
                </div>
            </div>
        </Tooltip>
    );
};
