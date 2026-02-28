"use client";
import React from 'react';
import { Instagram, Activity, Shield, Target } from 'lucide-react';
import { MetricCard } from '../MetricCard';

interface SocialPanelProps {
    socialSkill: {
        score: number;
        findings: {
            followers?: string | number;
            posts_count?: string | number;
            bio_has_link: boolean;
            engagement_estimate?: string | number;
            sales_alignment?: string;
            authority_triggers?: string;
            content_ideas?: string[];
        };
    };
    getScoreBadge: (score: number) => React.ReactNode;
}

export const SocialPanel = ({ socialSkill, getScoreBadge }: SocialPanelProps) => {
    if (!socialSkill) return null;

    return (
        <div className="liquid-glass p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-black/20 border-white/5 backdrop-blur-xl rounded-2xl">
            <h3 className="text-lg font-bold mb-5 flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2 text-slate-100"><Instagram className="w-5 h-5 text-fuchsia-400" /> Inteligência de Posicionamento Frio</span>
                {getScoreBadge(socialSkill.score)}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    label="Base Endossada"
                    value={socialSkill.findings.followers ?? '???'}
                    tooltip="Volume de seguidores: Representa o alcance potencial direto e a prova social imediata do perfil."
                />
                <MetricCard
                    label="Acervo Visual"
                    value={socialSkill.findings.posts_count ?? '???'}
                    tooltip="Total de publicações: Indica a consistência histórica e o volume de conteúdo disponível para o público."
                />
                <MetricCard
                    label="Motor Inbound"
                    value={socialSkill.findings.bio_has_link ? 'BIO COM LINK' : 'SEM ROTA DE FUGA'}
                    status={socialSkill.findings.bio_has_link}
                    tooltip="Presença de link na bio: O canal crítico para transformar seguidores em leads ou clientes."
                />
                <MetricCard
                    label="Engajamento IA"
                    value={socialSkill.findings.engagement_estimate ?? socialSkill.score}
                    variant="purple"
                    tooltip="Estimativa de engajamento da IA."
                />
            </div>

            <div className="mt-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-brand-purple/10 to-transparent rounded-xl border border-brand-purple/20">
                    <h4 className="text-xs font-black text-brand-purple mb-2 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Alinhamento Comercial
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {socialSkill.findings.sales_alignment || "Análise das legendas indisponível."}
                    </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-transparent rounded-xl border border-blue-500/20">
                    <h4 className="text-xs font-black text-blue-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Autoridade (IA)
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {socialSkill.findings.authority_triggers || "Análise de autoridade indisponível."}
                    </p>
                </div>
            </div>

            {(socialSkill.findings.content_ideas?.length ?? 0) > 0 && (
                <div className="mt-4 mb-6 bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 p-5 rounded-2xl">
                    <h4 className="text-sm font-black text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Target className="w-4 h-4" /> Plano Tático de Conteúdo
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {socialSkill.findings.content_ideas?.map((idea: string, idx: number) => (
                            <div key={idx} className="bg-black/40 p-3 rounded-xl border border-white/5 flex gap-3 items-start">
                                <span className="text-blue-500 font-black text-lg leading-none mt-0.5">{idx + 1}.</span>
                                <p className="text-slate-300 text-sm leading-relaxed">{idea}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
