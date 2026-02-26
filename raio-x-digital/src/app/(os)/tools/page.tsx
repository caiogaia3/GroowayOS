"use client";

import { useState } from 'react';
import { Target, Search, BarChart3, Mail, MessageSquare, ArrowRight, Zap, Settings, BookOpen, Database, Briefcase, Lock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ToolsHubPage() {
    const tools = [
        {
            id: 'diagnostico',
            name: 'Diagnóstico Estratégico',
            description: 'Auditoria profunda de presença digital, tráfego, SEO e vendas usando IA (Deep Research).',
            icon: Target,
            color: 'text-brand-purple',
            bg: 'bg-brand-purple/10',
            border: 'border-brand-purple/20',
            href: '/auditor',
            status: 'Ativo'
        },
        {
            id: 'scraper',
            name: 'Scraper B2B de Leads',
            description: 'Extração massiva de leads qualificados do Google Maps com validação de contato.',
            icon: Database,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            href: '/scraper',
            status: 'Ativo'
        },
        {
            id: 'crm',
            name: 'Pipeline & CRM',
            description: 'Gestão visual de negociações, contratos e follow-ups da agência.',
            icon: Briefcase,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            href: '/pipeline',
            status: 'Ativo'
        },
        {
            id: 'social',
            name: 'Análise de Concorrentes',
            description: 'Monitoramento contínuo de redes sociais e anúncios dos concorrentes.',
            icon: Search,
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            href: '#',
            status: 'Em Breve'
        },
        {
            id: 'email',
            name: 'Cold Mail AI',
            description: 'Disparador de emails frios super-personalizados treinados com a oferta da agência.',
            icon: Mail,
            color: 'text-rose-400',
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/20',
            href: '#',
            status: 'Em Breve'
        },
        {
            id: 'copy',
            name: 'Gerador de Propostas',
            description: 'Criação de PDFs e propostas comerciais automáticas com base nos diagnósticos.',
            icon: FileText,
            color: 'text-indigo-400',
            bg: 'bg-indigo-500/10',
            border: 'border-indigo-500/20',
            href: '#',
            status: 'Em Breve'
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 p-8 pt-12 relative overflow-hidden flex flex-col items-center">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-hero-glow opacity-20 pointer-events-none" />

            <div className="max-w-6xl w-full z-10">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-indigo-300">
                        Hub de Ferramentas
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Selecione um dos motores de inteligência abaixo para iniciar a sua operação de vendas ou auditoria.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={tool.id}
                        >
                            <Link href={tool.href} className={`block p-6 rounded-2xl border ${tool.border} bg-black/40 hover:bg-black/60 transition-all group relative overflow-hidden h-full flex flex-col`}>
                                {/* Glow Effect */}
                                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full ${tool.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />

                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className={`p-3 rounded-xl ${tool.bg} ${tool.color}`}>
                                        <tool.icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${tool.status === 'Ativo'
                                        ? 'bg-spring-green-400/10 text-spring-green-400 border-spring-green-400/20'
                                        : 'bg-slate-800 text-slate-400 border-slate-700'
                                        }`}>
                                        {tool.status}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-brand-cyan transition-colors">
                                    {tool.name}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10 flex-grow">
                                    {tool.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-sm font-semibold text-slate-300 group-hover:text-white transition-colors relative z-10">
                                    {tool.status === 'Ativo' ? (
                                        <span className="flex items-center gap-2">Abrir Ferramenta <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                                    ) : (
                                        <span className="flex items-center gap-2 opacity-50"><Lock className="w-4 h-4" /> Indisponível</span>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

