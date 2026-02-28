"use client";
import React from 'react';
import { Target, Star, MessageSquare, AlertTriangle, ArrowRight } from 'lucide-react';
import { GMBData } from '@/core/types/diagnostic';
import { MetricCard } from '../MetricCard';

interface GMBPanelProps {
    gmbSkill: {
        score: number;
        findings: GMBData & {
            estimated_rating: string | number;
            reviews_volume: string | number;
            profile_effectiveness_pct: number;
            missing_for_100_pct: { item: string; description: string }[];
            reviews_list_raw: { stars: number; text: string }[];
            optimization_tips: string[];
        };
    };
    getScoreBadge: (score: number) => React.ReactNode;
}

export const GMBPanel = ({ gmbSkill, getScoreBadge }: GMBPanelProps) => {
    if (!gmbSkill || !gmbSkill.findings) return null;

    return (
        <div className="bg-gradient-to-br from-emerald-900/30 to-black p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-2xl border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-100"><Target className="w-5 h-5 text-emerald-400" /> Auditoria de Presença Local (Maps/GMB)</span>
                {getScoreBadge(gmbSkill.score)}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    label="Autoridade"
                    value={gmbSkill.findings.estimated_rating}
                    variant="success"
                    tooltip="Nota média de estrelas."
                />
                <MetricCard
                    label="Avaliações"
                    value={gmbSkill.findings.reviews_volume}
                    tooltip="Quantidade total de reviews."
                />
                <MetricCard
                    label="Acervo Fotos"
                    value={gmbSkill.findings.photos_count || 0}
                    variant={(gmbSkill.findings.photos_count || 0) >= 20 ? "success" : "warning"}
                    tooltip="Quantidade de fotos."
                />
                <MetricCard
                    label="Eficácia Ficha"
                    value={`${gmbSkill.findings.profile_effectiveness_pct || 0}%`}
                    status={(gmbSkill.findings.profile_effectiveness_pct || 0) >= 80}
                    tooltip="Grooway Health Score."
                />
            </div>

            {gmbSkill.findings.missing_for_100_pct && gmbSkill.findings.missing_for_100_pct.length > 0 && (
                <div className="mb-6 bg-orange-950/20 border-l-4 border-orange-500 p-5 rounded-r-xl">
                    <h4 className="text-sm font-bold text-orange-400 flex items-center gap-2 mb-3 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4" /> O Que Falta Para 100% de Eficácia
                    </h4>
                    <div className="space-y-2">
                        {gmbSkill.findings.missing_for_100_pct.map((item: any, idx: number) => (
                            <div key={`miss-${idx}`} className="flex items-start gap-3 p-2.5 bg-orange-950/20 rounded-lg">
                                <span className="text-orange-500 font-bold mt-0.5">•</span>
                                <div>
                                    <span className="text-sm font-bold text-orange-200">{item.item}</span>
                                    <p className="text-xs text-orange-300/60 mt-0.5">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {gmbSkill.findings.reviews_list_raw && gmbSkill.findings.reviews_list_raw.length > 0 && (
                <div className="mb-6 bg-black/40 p-5 rounded-xl border border-zinc-800">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4 uppercase tracking-wide border-b border-zinc-700 pb-2">
                        <MessageSquare className="w-4 h-4 text-blue-400" /> Avaliações dos Clientes
                    </h4>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                        {gmbSkill.findings.reviews_list_raw.map((review: any, idx: number) => (
                            <div key={`rev-${idx}`} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} className={`w-3 h-3 ${star <= review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">{review.text || "Avaliação sem texto"}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {gmbSkill.findings.optimization_tips && (
                <div className="mb-6">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-400 mb-4 uppercase tracking-wide">
                        <ArrowRight className="w-4 h-4" /> Ações Corretivas
                    </h4>
                    <ul className="space-y-2">
                        {gmbSkill.findings.optimization_tips.map((tip: string, idx: number) => (
                            <li key={idx} className="flex gap-3 text-sm text-zinc-300 items-start bg-black/20 p-3 rounded-lg border border-zinc-800/50">
                                <span className="text-emerald-500 font-bold mt-0.5 min-w-5 text-center">{idx + 1}</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
