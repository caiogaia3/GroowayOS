"use client";

import React from 'react';
import { Target, Smartphone, Database, MapPin, KeyRound, CheckCircle2, AlertTriangle, Shield, Activity } from 'lucide-react';

interface DiagnosticPDFProps {
    reportData: any;
    designSkill: any;
}

export const DiagnosticPDF: React.FC<DiagnosticPDFProps> = ({ reportData, designSkill }) => {
    if (!reportData) return null;
    const didactic = designSkill?.findings?.diagnostic_didactic || {};

    return (
        <div id="diagnostic-pdf-content" className="p-16 bg-white text-slate-900 font-sans min-h-[297mm] w-[210mm] mx-auto hidden print:block relative overflow-hidden">
            {/* Technical Border Accents */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-600 via-brand-purple to-indigo-600" />
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-slate-100" />

            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-slate-900/10 pb-10 mb-12 relative">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Protocolo de Diagnóstico 360°</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">Dossiê <span className="text-cyan-600">Digital</span></h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">GroowayOS • Unidade de Inteligência</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Sujeito Analisado</p>
                    <p className="text-2xl font-black text-slate-900 uppercase tracking-tight">{reportData.company_name || 'Alvo Estratégico'}</p>
                    <p className="text-[10px] font-mono text-cyan-600 mt-1 font-bold">{reportData.target_url}</p>
                </div>
            </div>

            {/* Health Pulse Score */}
            <div className="bg-slate-50 p-10 rounded-[40px] mb-12 border border-slate-100 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500" />
                <div className="relative z-10">
                    <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Eficácia Digital Consolidada</h2>
                    <p className="text-slate-600 max-w-sm text-sm leading-relaxed font-medium">
                        Este índice quantifica a maturidade tática da sua empresa na atração, retenção e conversão de clientes via canais digitais.
                    </p>
                </div>
                <div className="text-right border-l border-slate-200 pl-12">
                    <div className="text-8xl font-black text-slate-950 tracking-tighter">{reportData.score || 0}<span className="text-3xl text-slate-300 antialiased">/100</span></div>
                    <div className="flex items-center gap-1.5 justify-end mt-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-[10px] font-black text-cyan-700 uppercase tracking-widest">Health Score Ativo</span>
                    </div>
                </div>
            </div>

            {/* Analysis Pillars - Scientific Layout */}
            <div className="space-y-12">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.5em] mb-8 text-center flex items-center justify-center gap-4">
                    <span className="h-px w-full bg-slate-100" /> Detalhamento Tático <span className="h-px w-full bg-slate-100" />
                </h3>

                <div className="grid grid-cols-1 gap-10">
                    {/* Pilar 1: Local */}
                    <div className="flex gap-8 group">
                        <div className="relative h-fit">
                            <div className="bg-cyan-50 p-5 rounded-3xl border border-cyan-100">
                                <MapPin className="w-8 h-8 text-cyan-600" />
                            </div>
                            <div className="absolute -right-2 -bottom-2 w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white italic">01</div>
                        </div>
                        <div className="pt-2">
                            <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight mb-3">Presença Local & Autoridade Google</h3>
                            <div className="p-6 bg-slate-50 rounded-2xl border-l-[6px] border-cyan-600 italic">
                                <p className="text-slate-700 leading-relaxed font-medium">"{didactic.presenca_local || 'Otimização de ficha e geolocalização estratégica em processamento...'}"</p>
                            </div>
                        </div>
                    </div>

                    {/* Pilar 2: Performance */}
                    <div className="flex gap-8">
                        <div className="relative h-fit">
                            <div className="bg-brand-purple/10 p-5 rounded-3xl border border-brand-purple/20">
                                <Smartphone className="w-8 h-8 text-brand-purple" />
                            </div>
                            <div className="absolute -right-2 -bottom-2 w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white italic">02</div>
                        </div>
                        <div className="pt-2">
                            <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight mb-3">Infraestrutura, SEO & UX</h3>
                            <div className="p-6 bg-slate-50 rounded-2xl border-l-[6px] border-brand-purple italic">
                                <p className="text-slate-700 leading-relaxed font-medium">"{didactic.infraestrutura_site || 'Análise de performance, compressão de ativos e rastreabilidade orgânica...'}"</p>
                            </div>
                        </div>
                    </div>

                    {/* Pilar 3: Tracking */}
                    <div className="flex gap-8">
                        <div className="relative h-fit">
                            <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
                                <Database className="w-8 h-8 text-indigo-600" />
                            </div>
                            <div className="absolute -right-2 -bottom-2 w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white italic">03</div>
                        </div>
                        <div className="pt-2">
                            <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight mb-3">Pixel Intelligence & Rastreio</h3>
                            <div className="p-6 bg-slate-50 rounded-2xl border-l-[6px] border-indigo-600 italic">
                                <p className="text-slate-700 leading-relaxed font-medium">"{didactic.rastreio_leads || 'Verificação de ecossistema de dados e tags de conversão ativas...'}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Professional Footer */}
            <div className="mt-auto pt-16 flex justify-between items-end border-t border-slate-100">
                <div>
                    <div className="flex items-center gap-1.5 mb-2">
                        <Shield className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Grooway Certified Analysis</span>
                    </div>
                    <p className="text-slate-400 text-[9px] font-medium uppercase tracking-[0.2em]">Sigilo Estratégico • Propriedade da Agência</p>
                </div>
                <div className="text-right flex flex-col items-end">
                    <div className="h-6 w-32 bg-slate-100 rounded-sm mb-2 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1/2 h-full bg-cyan-500/20" />
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black font-mono text-slate-300">GH-UUID-X94827</div>
                    </div>
                    <p className="text-[8px] font-mono text-slate-400">TIMESTAMP: {new Date().toISOString()}</p>
                </div>
            </div>
        </div>
    );
};
