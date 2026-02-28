"use client";
import React from 'react';
import { Search, Shield, Users, ArrowRight, Target, Building2, AlertTriangle } from 'lucide-react';

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

    return (
        <div className="liquid-glass p-0 overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-500 bg-black/20 border-white/5 backdrop-blur-xl rounded-2xl">
            <div className="p-6">
                <h3 className="text-lg font-bold mb-5 flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="flex items-center gap-2 text-white">
                        <Search className="w-5 h-5 text-blue-400" />
                        Cérebro Estratégico (Pesquisa Avançada com IA Grounding)
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-blue-500/10 text-blue-300 border border-blue-500/20 uppercase">Inteligência Competitiva Ativada</span>
                </h3>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-1 bg-black/40 p-5 rounded-2xl border border-white/5 space-y-6">
                        <div>
                            <h4 className="text-[10px] font-black text-indigo-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                                <Shield className="w-3 h-3" /> Sumário Estratégico
                            </h4>
                            <p className="text-slate-300 text-xs leading-relaxed italic border-l-2 border-indigo-500/30 pl-3">
                                {marketSkill.findings.executive_summary_clevel || "Análise executiva indisponível."}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-black text-brand-purple mb-2 uppercase tracking-widest">Nicho Global Detectado</h4>
                            <p className="text-slate-100 font-medium text-sm leading-relaxed">{marketSkill.findings.niche}</p>
                        </div>

                        <div>
                            <h4 className="text-xs font-black text-indigo-400 mb-2 uppercase tracking-widest">O Cliente Ideal Mapeado (ICP)</h4>
                            <p className="text-slate-100 font-medium text-sm leading-relaxed">{marketSkill.findings.target_icp}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 mb-2 border-b border-white/10 pb-2"><Users className="w-4 h-4 text-blue-400" /> Raio-X do Cliente Final (ICP)</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-black/40 p-4 rounded-2xl border border-blue-500/10">
                                <h5 className="text-xs font-black text-blue-400 mb-2 uppercase tracking-widest flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Sonhos e Desejos do ICP</h5>
                                <ul className="space-y-1.5 text-slate-300 text-xs">
                                    {(marketSkill.findings.sonhos_icp || marketSkill.findings.desejos_icp)?.map((dream: string, i: number) => (
                                        <li key={i} className="flex gap-1.5 leading-snug">
                                            <span className="text-blue-500 font-bold">★</span> {dream}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-black/40 p-4 rounded-2xl border border-red-500/10">
                                <h5 className="text-xs font-black text-red-400 mb-2 uppercase tracking-widest flex items-center gap-2"><Target className="w-3 h-3" /> Dores do Cliente Ideal</h5>
                                <ul className="space-y-1.5 text-slate-300 text-xs">
                                    {(marketSkill.findings.dores_icp || marketSkill.findings.pains_icp)?.map((pain: string, i: number) => (
                                        <li key={i} className="flex gap-1.5 leading-snug">
                                            <span className="text-red-500 font-bold">✕</span> {pain}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-500/10 to-transparent p-4 rounded-2xl border border-orange-500/20">
                            <h5 className="text-xs font-black text-orange-400 mb-2 uppercase tracking-widest flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Objeções Comuns do ICP</h5>
                            <ul className="space-y-1.5 text-slate-200 text-xs font-medium">
                                {marketSkill.findings.objecoes_icp?.map((arg: string, i: number) => (
                                    <li key={i} className="flex gap-1.5 leading-snug">
                                        <span className="text-orange-400 font-bold">⚠</span> {arg}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 mt-6 mb-2 border-b border-white/10 pb-2"><Building2 className="w-4 h-4 text-brand-purple" /> Desafios da Empresa e Marketing</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-950/20 p-4 rounded-2xl border border-red-500/20">
                        <h5 className="text-xs font-black text-red-400 mb-2 uppercase tracking-widest flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> Gargalos de Vendas</h5>
                        <ul className="space-y-1.5 text-slate-300 text-xs">
                            {marketSkill.findings.dores_empresa_marketing?.map((pain: string, i: number) => (
                                <li key={i} className="flex gap-1.5 leading-snug">
                                    <span className="text-red-500 font-bold">❗</span> {pain}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-indigo-950/20 p-4 rounded-2xl border border-indigo-500/20">
                        <h5 className="text-xs font-black text-indigo-400 mb-2 uppercase tracking-widest flex items-center gap-2"><Target className="w-3 h-3" /> Desempenho e Aquisição</h5>
                        <ul className="space-y-1.5 text-slate-300 text-xs">
                            {marketSkill.findings.desafios_empresa_marketing?.map((pain: string, i: number) => (
                                <li key={i} className="flex gap-1.5 leading-snug">
                                    <span className="text-indigo-400 font-bold">→</span> {pain}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
