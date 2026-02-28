"use client";
import React from 'react';
import { Smartphone, Activity, FileText, AlertTriangle } from 'lucide-react';
import { SEOData } from '@/core/types/diagnostic';
import { MetricCard } from '../MetricCard';

interface PerformancePanelProps {
    performanceSkill: {
        score: number;
        load_time_seconds?: number;
        findings: SEOData & {
            is_mobile_responsive_ui: boolean;
            has_h1: boolean;
            has_meta_desc: boolean;
            images_without_alt: number;
            has_contact_form: boolean;
            has_blog: boolean;
            cta_buttons_count: number;
            cta_examples?: string[];
            ui_clinical_analysis?: string;
            blog_exploration_sample?: string;
        };
        critical_pains?: string[];
    };
    getScoreBadge: (score: number) => React.ReactNode;
}

export const PerformancePanel = ({ performanceSkill, getScoreBadge }: PerformancePanelProps) => {
    if (!performanceSkill || !performanceSkill.findings || Object.keys(performanceSkill.findings).length === 0) {
        return (
            <div className="liquid-glass p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 bg-black/20 border-white/5 backdrop-blur-xl rounded-2xl">
                <Smartphone className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg font-semibold">Dados de UX/SEO não disponíveis</p>
                <p className="text-slate-500 text-sm mt-2">O agente de performance não conseguiu analisar a página.</p>
            </div>
        );
    }

    return (
        <div className="liquid-glass p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-black/20 border-white/5 backdrop-blur-xl rounded-2xl">
            <h3 className="text-lg font-bold mb-5 flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2 text-slate-100"><Smartphone className="w-5 h-5 text-emerald-400" /> Interface & Performance P/ Conversão</span>
                {getScoreBadge(performanceSkill.score ?? 0)}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    label="Responsividade"
                    value={performanceSkill.findings.is_mobile_responsive_ui ? 'OTIMIZADO' : 'QUEBRADO'}
                    status={performanceSkill.findings.is_mobile_responsive_ui}
                    tooltip="A UI se adapta corretamente a celulares? Sites não responsivos são penalizados severamente pelo Google."
                />
                <MetricCard
                    label="TTFB / Load"
                    value={`${performanceSkill.load_time_seconds ?? 'N/A'}s`}
                    variant="blue"
                    tooltip="Time to First Byte: O tempo que o servidor leva para começar a enviar os dados. Essencial para SEO."
                />
                <MetricCard
                    label="Busca (H1)"
                    value={performanceSkill.findings.has_h1 ? 'OK' : 'FALHA'}
                    status={performanceSkill.findings.has_h1}
                    tooltip="A tag H1 é o título principal que diz ao Google sobre o que é sua página."
                />
                <MetricCard
                    label="Copy (Meta)"
                    value={performanceSkill.findings.has_meta_desc ? 'OK' : 'FALHA'}
                    status={performanceSkill.findings.has_meta_desc}
                    tooltip="Meta Description: O texto que aparece no Google e convence o usuário a clicar no seu link."
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    label="Imagens S/ Alt"
                    value={performanceSkill.findings.images_without_alt ?? 0}
                    variant={(performanceSkill.findings.images_without_alt ?? 0) > 5 ? "warning" : "default"}
                    tooltip="Imagens sem o atributo 'alt' são invisíveis para o Google e dificultam a acessibilidade."
                />
                <MetricCard
                    label="Lead Form"
                    value={performanceSkill.findings.has_contact_form ? 'DETETADO' : 'AUSENTE'}
                    status={performanceSkill.findings.has_contact_form}
                    tooltip="Presença de formulário de contato. É o principal canal de geração de leads do site."
                />
                <MetricCard
                    label="Hub Conteúdo"
                    value={performanceSkill.findings.has_blog ? 'ATIVO' : 'AUSENTE'}
                    status={performanceSkill.findings.has_blog}
                    tooltip="Ter um blog ou hub de conteúdo é a estratégia #1 para autoridade orgânica a longo prazo."
                />
                <MetricCard
                    label="Total CTAs"
                    value={performanceSkill.findings.cta_buttons_count ?? 0}
                    variant={(performanceSkill.findings.cta_buttons_count ?? 0) > 0 ? "success" : "error"}
                    tooltip="Call to Action: Botões que convidam o usuário a realizar uma ação comercial."
                />
            </div>

            {(performanceSkill.findings.cta_examples?.length ?? 0) > 0 && (
                <div className="bg-indigo-950/10 p-3.5 rounded-xl border border-indigo-500/10 mb-4">
                    <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-1">Exemplos de CTAs:</p>
                    <p className="text-sm text-slate-300 font-mono">{performanceSkill.findings.cta_examples?.join(' • ')}</p>
                </div>
            )}

            {performanceSkill.findings.ui_clinical_analysis && (
                <div className="mt-4 mb-4 bg-fuchsia-500/10 border-l-4 border-fuchsia-500 p-5 rounded-r-2xl shadow-lg shadow-fuchsia-500/5">
                    <h4 className="text-xs font-black text-fuchsia-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-4 h-4 animate-pulse" /> Análise Clínica de UI
                    </h4>
                    <p className="text-sm text-slate-100 leading-relaxed font-semibold italic">{performanceSkill.findings.ui_clinical_analysis}</p>
                </div>
            )}

            {performanceSkill.findings.blog_exploration_sample && (
                <div className="mt-4 mb-4 bg-blue-500/5 border-l-2 border-blue-500 p-4 rounded-r-xl">
                    <h4 className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Amostra Tática P/ Blog (IA)
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium italic">{performanceSkill.findings.blog_exploration_sample}</p>
                </div>
            )}

            {(performanceSkill.critical_pains?.length ?? 0) > 0 && (
                <div className="mt-5 bg-red-900/10 border-l-2 border-red-500 p-4 rounded-r-xl">
                    <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-2 uppercase tracking-wider text-xs">
                        <AlertTriangle className="w-4 h-4" /> Pontos Críticos de Atrito
                    </h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-sm">
                        {performanceSkill.critical_pains?.map((pain: string, idx: number) => (
                            <li key={idx} className="leading-snug">{pain}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
