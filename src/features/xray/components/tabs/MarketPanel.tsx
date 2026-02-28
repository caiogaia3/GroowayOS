"use client";
import React from 'react';
import { Search, Shield, Users, ArrowRight, Target, Building2, AlertTriangle, Lightbulb, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketPanelProps {
    marketSkill: {
        score: number;
        findings: {
            executive_summary_clevel?: string;
            niche: string;
            target_icp: string;
            sonhos_icp?: string[];
            desejos_icp?: string[];
            dores_icp?: string[];
            pains_icp?: string[];
            objecoes_icp?: string[];
            dores_empresa_marketing?: string[];
            desafios_empresa_marketing?: string[];
        };
    };
}

export const MarketPanel = ({ marketSkill }: MarketPanelProps) => {
    if (!marketSkill) return null;

    const { findings } = marketSkill;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter">
                        <Compass className="w-6 h-6 text-blue-400" />
                        Cérebro Estratégico & Pesquisa de Mercado
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">
                        Inteligência competitiva baseada em IA Grounding e mapeamento de ICP.
                    </p>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest">
                    Competitive Intelligence Active
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Executive Summary Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="liquid-card border-[#A855F7]/10 p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
                        <h4 className="text-[10px] font-black text-[#A855F7] mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Tese Executiva (C-Level)
                        </h4>
                        <p className="text-base text-white font-bold leading-relaxed italic tracking-tight">
                            &ldquo;{findings.executive_summary_clevel || "Análise de mercado indisponível no momento."}&rdquo;
                        </p>

                        <div className="mt-8 space-y-6 pt-6 border-t border-white/5">
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Nicho Identificado</span>
                                <p className="text-sm text-slate-100 font-bold">{findings.niche}</p>
                            </div>
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Perfil ICP</span>
                                <p className="text-sm text-slate-100 font-bold">{findings.target_icp}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ICP Deep Dive */}
                <div className="lg:col-span-2 space-y-6">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                        <Users className="w-4 h-4" /> Raio-X do Cliente Ideal (ICP)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dreams/Wants */}
                        <div className="glass-panel p-6 rounded-[2rem] border-blue-500/10">
                            <h5 className="text-[10px] font-black text-blue-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" /> Sonhos e Aspirações
                            </h5>
                            <ul className="space-y-3">
                                {(findings.sonhos_icp || findings.desejos_icp)?.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-xs text-slate-300 font-medium items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pains/Fears */}
                        <div className="glass-panel p-6 rounded-[2rem] border-rose-500/10">
                            <h5 className="text-[10px] font-black text-rose-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Target className="w-4 h-4" /> Dores e Impedimentos
                            </h5>
                            <ul className="space-y-3">
                                {(findings.dores_icp || findings.pains_icp)?.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-xs text-slate-300 font-medium items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Objections */}
                    <div className="glass-panel p-6 rounded-[2rem] border-orange-500/10">
                        <h5 className="text-[10px] font-black text-orange-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Objeções de Venda
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            {findings.objecoes_icp?.map((arg, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-2xl bg-orange-500/5 border border-orange-500/10 text-xs text-slate-200 font-bold">
                                    {arg}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Corporate Challenges Section */}
            <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Desafios Organizacionais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="liquid-card border-white/5 p-6 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/20 group-hover:bg-rose-500 transition-all" />
                        <h5 className="text-[10px] font-black text-rose-400 mb-4 uppercase tracking-widest">Gargalos Financeiros/Vendas</h5>
                        <ul className="space-y-3">
                            {findings.dores_empresa_marketing?.map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-300 font-bold italic">
                                    <ArrowRight className="w-3.5 h-3.5 text-rose-500 mt-1 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="liquid-card border-white/5 p-6 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/20 group-hover:bg-blue-500 transition-all" />
                        <h5 className="text-[10px] font-black text-blue-400 mb-4 uppercase tracking-widest">Desafios de Aquisição</h5>
                        <ul className="space-y-3">
                            {findings.desafios_empresa_marketing?.map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-300 font-bold italic">
                                    <ArrowRight className="w-3.5 h-3.5 text-blue-500 mt-1 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
