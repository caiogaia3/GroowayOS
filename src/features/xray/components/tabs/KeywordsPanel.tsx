"use client";
import React from 'react';
import { KeyRound, BarChart3 } from 'lucide-react';
import { AdsData } from '@/core/types/diagnostic';
import { MetricCard } from '../MetricCard';

interface KeywordsPanelProps {
    keywordSkill: {
        score: number;
        findings: AdsData & {
            keywords_analyzed: any[];
            related_queries: any[];
            paid_competition_map: { paid_count: number }[];
            strategic_readiness: string;
            top_10_keywords_regiao: { keyword: string; volume_estimado: string; intencao: string }[];
        };
    };
    getScoreBadge: (score: number) => React.ReactNode;
}

export const KeywordsPanel = ({ keywordSkill, getScoreBadge }: KeywordsPanelProps) => {
    if (!keywordSkill || !keywordSkill.findings) return null;

    return (
        <div className="bg-gradient-to-br from-blue-900/30 to-black p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-100"><KeyRound className="w-5 h-5 text-blue-400" /> Inteligência de Busca e Oportunidades</span>
                {getScoreBadge(keywordSkill.score)}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    label="Variações"
                    value={keywordSkill.findings.keywords_analyzed?.length || 0}
                    variant="blue"
                    tooltip="Variações de busca."
                />
                <MetricCard
                    label="Relacionados"
                    value={keywordSkill.findings.related_queries?.length || 0}
                    tooltip="Termos relacionados."
                />
                <MetricCard
                    label="Concorrência Paga"
                    value={`${keywordSkill.findings.paid_competition_map?.reduce((sum: number, p: any) => sum + (p.paid_count || 0), 0) || 0} ads`}
                    variant="warning"
                    tooltip="Anúncios ativos."
                />
                <MetricCard
                    label="Status"
                    value={keywordSkill.findings.strategic_readiness || 'Analisando'}
                    status={keywordSkill.findings.strategic_readiness?.includes('Dominação')}
                    tooltip="Maturidade estratégica."
                />
            </div>

            {keywordSkill.findings.top_10_keywords_regiao && (
                <div className="mb-6 bg-blue-950/20 p-5 rounded-2xl border border-blue-500/10">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4 uppercase tracking-wide border-b border-blue-500/20 pb-2">
                        <BarChart3 className="w-4 h-4 text-blue-400" /> Top 10 Keywords na Região
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-xs text-blue-300 uppercase tracking-widest border-b border-blue-500/20">
                                    <th className="text-left py-2 px-3 w-8">#</th>
                                    <th className="text-left py-2 px-3">Palavra-Chave</th>
                                    <th className="text-center py-2 px-3">Volume</th>
                                    <th className="text-center py-2 px-3">Intenção</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keywordSkill.findings.top_10_keywords_regiao.map((kw: any, idx: number) => (
                                    <tr key={idx} className="border-b border-zinc-800/50 hover:bg-blue-950/30 transition-colors">
                                        <td className="py-2.5 px-3 text-blue-400 font-black">{idx + 1}</td>
                                        <td className="py-2.5 px-3 text-slate-200 font-semibold">{kw.keyword}</td>
                                        <td className="py-2.5 px-3 text-center">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${kw.volume_estimado === 'Alto' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-300'}`}>{kw.volume_estimado}</span>
                                        </td>
                                        <td className="py-2.5 px-3 text-center">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300`}>{kw.intencao}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
