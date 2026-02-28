"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Settings2,
    TrendingUp,
    ArrowUpRight,
    Clock,
    Users,
    Image as ImageIcon,
    Radio
} from 'lucide-react';

const PROJECTS = [
    { name: 'Nexus Cloud Branding', phase: 'Fase de Finalização', time: '10:00 – 12:30', progress: 80, color: 'bg-[#A855F7]', icon: Settings2 },
    { name: 'EcoTech Landing Page', phase: 'Desenvolvimento Frontend', time: '14:00 – 16:00', progress: 33, color: 'bg-cyan', icon: ImageIcon },
];

const TEAM_MEMBERS = [
    { name: 'Ana Costa', role: 'DESIGN LEAD', avatar: '🎨' },
    { name: 'Carlos B.', role: 'DEV SENIOR', avatar: '💻' },
    { name: 'Julia M.', role: 'MARKETING', avatar: '📊' },
];

const CHART_DATA = [
    { label: 'Seg', a: 45, b: 30 },
    { label: 'Ter', a: 60, b: 40 },
    { label: 'Qua', a: 35, b: 55 },
    { label: 'Qui', a: 80, b: 50 },
    { label: 'Sex', a: 65, b: 70 },
    { label: 'Sáb', a: 50, b: 35 },
    { label: 'Dom', a: 90, b: 60 },
];

export default function Dashboard() {
    const score = 94;
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                    Painel Principal
                </h1>
                <p className="text-lg font-bold text-[#A855F7] tracking-tight mt-1">Agência OS</p>
                <p className="text-slate-400 text-sm font-medium mt-2">
                    Seu ecossistema digital está operando em alta performance.
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Health Score - Col Span 2 */}
                <div className="lg:col-span-2 liquid-card border-white/5 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#A855F7]/10 blur-[80px]" />
                    <div className="flex items-center justify-between w-full mb-6">
                        <div>
                            <h3 className="text-lg font-black text-white">Visão Geral</h3>
                            <p className="text-[10px] font-black text-[#A855F7] uppercase tracking-[0.2em]">Health Score</p>
                        </div>
                        <Settings2 className="w-5 h-5 text-slate-600" />
                    </div>

                    {/* SVG Ring */}
                    <div className="relative w-52 h-52 my-4">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                            <motion.circle
                                cx="100" cy="100" r="90"
                                fill="none"
                                stroke="url(#scoreGradient)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#A855F7" />
                                    <stop offset="100%" stopColor="#06B6D4" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                className="text-5xl font-black text-white tracking-tighter"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                {score}%
                            </motion.span>
                            <span className="text-[9px] font-black text-[#A855F7] uppercase tracking-[0.3em] mt-1">Excellent</span>
                        </div>
                    </div>

                    {/* Sub-metrics */}
                    <div className="flex gap-8 mt-6 w-full justify-center">
                        <div className="text-center">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Retenção</p>
                            <p className="text-xl font-black text-emerald-400 mt-1">+12%</p>
                        </div>
                        <div className="w-px bg-white/5" />
                        <div className="text-center">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Churn</p>
                            <p className="text-xl font-black text-rose-400 mt-1">1.2%</p>
                        </div>
                    </div>
                </div>

                {/* Project Flow - Col Span 3 */}
                <div className="lg:col-span-3 liquid-card border-white/5 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-white">Fluxo de Projetos</h3>
                            <p className="text-xs text-slate-500 font-medium">Acompanhamento em tempo real</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Live</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {PROJECTS.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${project.color}/10 flex items-center justify-center`}>
                                    <project.icon className={`w-5 h-5 ${project.color === 'bg-[#A855F7]' ? 'text-[#A855F7]' : 'text-cyan'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{project.name}</p>
                                    <p className="text-[10px] text-slate-500 font-medium">{project.phase}</p>
                                    <div className="mt-3 h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full rounded-full ${project.color}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.progress}%` }}
                                            transition={{ delay: 0.5 + i * 0.3, duration: 1.5 }}
                                        />
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                                        <Clock className="w-3 h-3" />
                                        {project.time}
                                    </div>
                                    <p className={`text-lg font-black mt-1 ${project.progress >= 70 ? 'text-emerald-400' : 'text-cyan'}`}>
                                        {project.progress}%
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Grid: Metrics + Team */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Metrics */}
                <div className="lg:col-span-2 liquid-card border-white/5 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-white">Métricas de Performance</h3>
                            <p className="text-xs text-slate-500 font-medium">Fluxo de conversão por canal operacional</p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Últimos 7 dias
                        </div>
                    </div>

                    <div className="flex items-end justify-between gap-4 h-48 px-2">
                        {CHART_DATA.map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                                <div className="flex gap-1 w-full h-full items-end justify-center">
                                    <motion.div
                                        className="w-3 bg-[#A855F7] rounded-t"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${bar.a}%` }}
                                        transition={{ delay: i * 0.08, duration: 1 }}
                                    />
                                    <motion.div
                                        className="w-3 bg-cyan rounded-t"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${bar.b}%` }}
                                        transition={{ delay: i * 0.08 + 0.1, duration: 1 }}
                                    />
                                </div>
                                <span className="text-[9px] font-black text-slate-600 uppercase">{bar.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Online */}
                <div className="lg:col-span-1 liquid-card border-white/5 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-black text-white">Equipe</h3>
                            <p className="text-xs text-slate-500 font-medium">Talentos ativos agora</p>
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-[10px] font-black text-emerald-400">{TEAM_MEMBERS.length} ATIVOS</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {TEAM_MEMBERS.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.15 }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#A855F7]/10 flex items-center justify-center text-xl">
                                    {member.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{member.name}</p>
                                    <p className="text-[9px] font-black text-[#A855F7] uppercase tracking-widest">{member.role}</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Storage Indicator */}
            <div className="liquid-card border-white/5 p-6 flex items-center gap-6">
                <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Armazenamento</p>
                    <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#A855F7] to-cyan rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '62%' }}
                            transition={{ duration: 2 }}
                        />
                    </div>
                </div>
                <span className="text-sm font-black text-white">62%</span>
                <span className="text-[10px] text-slate-500 font-medium">de 100 GB</span>
            </div>
        </div>
    );
}
