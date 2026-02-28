"use client";
import React from 'react';
import { Smartphone, Activity, FileText, AlertTriangle, Search, MousePointer2, Gauge } from 'lucide-react';
import { SEOData } from '@/core/types/diagnostic';
import { MetricCard } from '../MetricCard';
import { motion } from 'framer-motion';

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
            <div className="liquid-card p-12 text-center">
                <Smartphone className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400 text-lg font-bold">Dados de Performance Ausentes</p>
                <p className="text-slate-500 text-sm mt-2 font-medium">O agente de UX/SEO não conseguiu processar esta página.</p>
            </div>
        );
    }

    const { findings } = performanceSkill;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter">
                        <Gauge className="w-6 h-6 text-cyan" />
                        Interface & UX Clinical
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">
                        Avaliação de performance técnica e experiência do usuário p/ conversão.
                    </p>
                </div>
                {getScoreBadge(performanceSkill.score ?? 0)}
            </div>

            {/* Metrics Groups */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Technical UX Group */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5" /> Technical UX
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard
                            label="Mobile Ready"
                            value={findings.is_mobile_responsive_ui ? 'OTIMIZADO' : 'QUEBRADO'}
                            status={findings.is_mobile_responsive_ui}
                            tooltip="A UI se adapta corretamente a celulares?"
                        />
                        <MetricCard
                            label="Load Time"
                            value={`${performanceSkill.load_time_seconds ?? 'N/A'}s`}
                            variant="cyan"
                            tooltip="Velocidade de carregamento inicial (TTFB)."
                        />
                    </div>
                </div>

                {/* Authority SEO Group */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                        <Search className="w-3.5 h-3.5" /> Authority (SEO)
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard
                            label="Título (H1)"
                            value={findings.has_h1 ? 'OK' : 'FALHA'}
                            status={findings.has_h1}
                            tooltip="Presença da tag de título principal H1."
                        />
                        <MetricCard
                            label="Meta Tags"
                            value={findings.has_meta_desc ? 'OK' : 'FALHA'}
                            status={findings.has_meta_desc}
                            tooltip="Snippet de conversão nos buscadores."
                        />
                    </div>
                </div>

                {/* Conversion Logic Group */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                        <MousePointer2 className="w-3.5 h-3.5" /> Conversion
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard
                            label="Lead Funnel"
                            value={findings.has_contact_form ? 'ATIVO' : 'AUSENTE'}
                            status={findings.has_contact_form}
                            tooltip="Presença de formulários de captura."
                        />
                        <MetricCard
                            label="CTAs Totais"
                            value={findings.cta_buttons_count ?? 0}
                            variant={(findings.cta_buttons_count ?? 0) > 0 ? "success" : "error"}
                            tooltip="Contagem de botões de Call To Action."
                        />
                    </div>
                </div>
            </div>

            {/* Semantic Content Section */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="liquid-card border-white/5 p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
                    <h4 className="text-xs font-black text-primary mb-6 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Análise Clínica de UI
                    </h4>
                    <p className="text-lg text-white font-bold leading-relaxed italic tracking-tight">
                        &rdquo;{findings.ui_clinical_analysis}&rdquo;
                    </p>

                    {findings.cta_examples && findings.cta_examples.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-3">Copy de Conversão (CTAs)</span>
                            <div className="flex flex-wrap gap-2">
                                {findings.cta_examples.map((cta, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                                        {cta}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {findings.blog_exploration_sample && (
                        <div className="glass-panel p-6 rounded-[2rem] border-blue-500/10">
                            <h4 className="text-[10px] font-black text-blue-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Blog Strategy (IA)
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                {findings.blog_exploration_sample}
                            </p>
                        </div>
                    )}

                    {(performanceSkill.critical_pains?.length ?? 0) > 0 && (
                        <div className="glass-panel p-6 rounded-[2rem] border-rose-500/10">
                            <h4 className="text-[10px] font-black text-rose-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Pontos de Atrito
                            </h4>
                            <ul className="space-y-3">
                                {performanceSkill.critical_pains?.map((pain: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-xs text-slate-400 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40 mt-1.5 shrink-0" />
                                        <span>{pain}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
