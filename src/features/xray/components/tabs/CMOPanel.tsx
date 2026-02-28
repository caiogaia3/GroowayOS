"use client";
import React from 'react';
import { Briefcase, XCircle, CheckCircle2 } from 'lucide-react';

interface CMOPanelProps {
    cmoSkill: {
        score: number;
        findings: {
            pontos_negativos_consolidados?: string[];
            pontos_positivos_consolidados?: string[];
            cmo_verdict?: string;
        };
    };
    getScoreBadge: (score: number) => React.ReactNode;
}

export const CMOPanel = ({ cmoSkill, getScoreBadge }: CMOPanelProps) => {
    if (!cmoSkill || !cmoSkill.findings) return null;

    return (
        <div className="bg-gradient-to-br from-indigo-950/40 via-purple-900/10 to-transparent p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-3xl border border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.08)] relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-white flex items-center gap-3 drop-shadow-sm">
                        <span className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                            <Briefcase className="w-6 h-6 text-fuchsia-400" />
                        </span>
                        O Veredito Final (Boss)
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-2 px-1">
                        O CMO cruzou todos os dados técnicos e formulou o diagnóstico comercial definitivo.
                    </p>
                </div>
                {getScoreBadge(cmoSkill.score)}
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-6 bg-black/40 p-6 rounded-xl border border-zinc-800 mb-6 font-medium">
                <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-red-400 mb-4 uppercase tracking-wide border-b border-red-500/20 pb-2">
                        <XCircle className="w-4 h-4" /> Pontos Negativos Consolidados
                    </h4>
                    <ul className="space-y-3">
                        {cmoSkill.findings.pontos_negativos_consolidados?.map((item: string, idx: number) => (
                            <li key={idx} className="flex gap-3 text-sm text-zinc-300 items-start">
                                <span className="text-red-500 font-bold mt-0.5">✕</span>
                                <span>{item.replace(/❌|✅/g, '').trim()}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-spring-green-400 mb-4 uppercase tracking-wide border-b border-spring-green-500/20 pb-2">
                        <CheckCircle2 className="w-4 h-4" /> Pontos Fortes e Brechas
                    </h4>
                    <ul className="space-y-3 mb-6">
                        {cmoSkill.findings.pontos_positivos_consolidados?.map((item: string, idx: number) => (
                            <li key={idx} className="flex gap-3 text-sm text-zinc-300 items-start">
                                <span className="text-spring-green-500 font-bold mt-0.5">✓</span>
                                <span>{item.replace(/❌|✅/g, '').trim()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {cmoSkill.findings.cmo_verdict && (
                <div className="relative z-10 mt-6 bg-indigo-950/50 border border-indigo-500/40 p-6 rounded-2xl text-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    <h4 className="text-xs font-black text-indigo-400 mb-3 uppercase tracking-widest font-bold">Pitch de Fechamento</h4>
                    <p className="text-white text-lg sm:text-xl font-bold italic leading-relaxed max-w-4xl mx-auto">&quot;{cmoSkill.findings.cmo_verdict}&quot;</p>
                </div>
            )}
        </div>
    );
};
