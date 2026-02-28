"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScanSearch, FilePlus, Database, ArrowRight, Zap } from 'lucide-react';

const hubFeatures = [
    {
        id: 'auditor',
        title: 'Auditor de Presença',
        description: 'Análise completa de presença digital, SEO, GMB e redes sociais com IA.',
        icon: ScanSearch,
        href: '/auditor',
        color: 'from-purple-500 to-indigo-600',
        active: true
    },
    {
        id: 'proposals',
        title: 'Gerador de Propostas',
        description: 'Crie propostas comerciais industriais de alto impacto em segundos.',
        icon: FilePlus,
        href: '/proposals/new',
        color: 'from-blue-500 to-cyan-600',
        active: true
    },
    {
        id: 'scraper',
        title: 'Scraper B2B Leads',
        description: 'Extração inteligente de leads B2B baseada em perfis ideais de clientes.',
        icon: Database,
        href: '/scraper',
        color: 'from-slate-700 to-slate-800',
        active: true,
        comingSoon: false
    }
];

export default function HubPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-12 py-10">
            {/* Header (Already handled by ShellHeader in layout, but we can add page-specific intro) */}
            <div className="text-center space-y-2 mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.4em]"
                >
                    Ferramentas Operacionais
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 font-medium max-w-2xl mx-auto"
                >
                    Acesse os motores de inteligência para processar dados de mercado em tempo real.
                </motion.p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {hubFeatures.map((feature, idx) => {
                    const isPurple = feature.id === 'auditor' || feature.id === 'scraper';
                    return (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="h-full"
                        >
                            <Link
                                href={feature.href}
                                className={`liquid-card ${isPurple ? 'glow-purple-neon' : 'glow-cyan-neon'} group flex flex-col h-full !p-10`}
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`w-16 h-16 rounded-3xl bg-opacity-20 flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 ${isPurple ? 'bg-[#A855F7] border-[#A855F7]/30' : 'bg-[#06B6D4] border-[#06B6D4]/30'}`}>
                                        <feature.icon className={`w-8 h-8 ${isPurple ? 'text-[#A855F7] neon-text-purple' : 'text-[#06B6D4] neon-text-cyan'}`} />
                                    </div>
                                    <div className="ativa-badge">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        Ativa
                                    </div>
                                </div>

                                <h3 className="text-4xl font-black text-white mb-4 tracking-tight uppercase">
                                    {feature.id === 'auditor' ? 'Decoder' : feature.id === 'proposals' ? 'Compiler' : 'Crawler'}
                                </h3>

                                <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                                    {feature.description}
                                </p>

                                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            {feature.id === 'auditor' ? 'Performance' : feature.id === 'proposals' ? 'Conversão' : 'Volume'}
                                        </p>
                                        <div className="flex items-end gap-1 h-8">
                                            {[...Array(6)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-1 rounded-full bg-gradient-to-t ${isPurple ? 'from-[#A855F7]/20 to-[#A855F7]' : 'from-[#06B6D4]/20 to-[#06B6D4]'}`}
                                                    style={{ height: `${20 + Math.random() * 80}%` }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className={`px-6 py-3 bg-opacity-10 border rounded-2xl font-bold text-sm transition-all group-hover:bg-opacity-100 group-hover:text-white ${isPurple ? 'bg-[#A855F7] border-[#A855F7]/20 text-[#A855F7] group-hover:bg-[#A855F7]' : 'bg-[#06B6D4] border-[#06B6D4]/20 text-[#06B6D4] group-hover:bg-[#06B6D4]'}`}>
                                        Acessar
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Background Glow */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
        </div>
    );
}
