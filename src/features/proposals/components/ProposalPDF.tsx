"use client";

import React from 'react';
import { Shield, Target, CheckCircle2, Star, Zap, DollarSign, ArrowRight } from 'lucide-react';

interface ProposalPDFProps {
    reportData: any;
    designSkill: any;
    commercialPlan: any;
}

export const ProposalPDF: React.FC<ProposalPDFProps> = ({ reportData, designSkill, commercialPlan }) => {
    if (!reportData) return null;
    const proposalDidactic = designSkill?.findings?.proposal_didactic || {};

    return (
        <div id="proposal-pdf-content" className="p-16 bg-[#020617] text-slate-50 font-sans min-h-[297mm] w-[210mm] mx-auto hidden print:block relative overflow-hidden">
            {/* Background Texture / Industrial Accents */}
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px]" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />

            {/* Side Branding Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-brand-purple via-indigo-600 to-fuchsia-600" />

            {/* Header */}
            <div className="flex justify-between items-start mb-20 relative">
                <div className="max-w-[70%]">
                    <div className="inline-flex items-center gap-2 bg-brand-purple px-4 py-1.5 rounded-sm mb-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Documento Estratégico Especializado</span>
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter leading-[0.9] mb-4">
                        PROPOSTA DE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-indigo-300 to-fuchsia-400 uppercase">Aceleração</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-white/20" />
                        <p className="text-slate-400 font-mono text-xs tracking-widest uppercase">
                            Preparado Exclusivamente Para: {reportData.company_name || 'Alvo Estratégico'}
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl">
                        <Shield className="w-12 h-12 text-brand-purple" />
                    </div>
                    <div className="absolute -inset-2 bg-brand-purple/20 blur-xl -z-10 rounded-full" />
                </div>
            </div>

            {/* Core Intervention Section */}
            <div className="mb-16">
                <h2 className="text-xs font-black text-brand-purple uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-brand-purple/30" />
                    O Plano de Intervenção
                </h2>
                <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-10 rounded-[40px] backdrop-blur-md relative group">
                    <Zap className="absolute -top-4 -left-4 w-10 h-10 text-fuchsia-500 fill-fuchsia-500/20" />
                    <p className="text-2xl text-slate-100 leading-relaxed font-semibold italic">
                        "{proposalDidactic.solucao_imediata || 'Estruturando solução de alto impacto para desbloqueio de escala...'}"
                    </p>
                </div>
            </div>

            {/* Strategic Details - Grid */}
            <div className="grid grid-cols-2 gap-10 mb-16">
                {/* ROI Section */}
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Projeção de ROI
                    </h3>
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                        <p className="text-slate-300 text-[15px] leading-relaxed font-medium">
                            {proposalDidactic.ganho_esperado || 'Calculando janelas de oportunidade e ganhos operacionais...'}
                        </p>
                    </div>
                </div>

                {/* Path Forward */}
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> Canal de Ativação
                    </h3>
                    <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/20">
                        <p className="text-slate-200 text-[15px] font-bold">
                            {proposalDidactic.o_proximo_passo || 'Agende sua Reunião de Viabilidade com nossos estrategistas.'}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-brand-purple font-black text-[10px] uppercase">
                            Ativar Protocolo <ArrowRight className="w-3" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended Packages from Commercial Plan */}
            {commercialPlan && (
                <div className="mb-16">
                    <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-8 text-center">Configurações de Serviço Recomendadas</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {commercialPlan.servicos_recomendados?.slice(0, 4).map((srv: any, idx: number) => (
                            <div key={idx} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-start gap-4">
                                <div className="text-brand-purple font-black text-xl opacity-30 mt-1">0{idx + 1}</div>
                                <div>
                                    <h4 className="text-sm font-black text-indigo-200 mb-2 uppercase">{srv.nome_servico}</h4>
                                    <p className="text-[10px] text-slate-400 leading-relaxed font-medium line-clamp-2">{srv.por_que_vender}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pillars of Global Authority */}
            <div className="mt-auto">
                <div className="grid grid-cols-4 gap-6 pt-12 border-t border-white/5">
                    {['Autoridade Industrial', 'Protocolo de Dados', 'Escala Preditiva', 'Dominação Local'].map((pilar) => (
                        <div key={pilar} className="text-center group">
                            <Star className="w-5 h-5 text-brand-purple/40 mx-auto mb-3 transition-colors group-hover:text-brand-purple" />
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{pilar}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security Footer */}
            <div className="mt-12 text-center">
                <p className="text-[9px] font-mono tracking-[0.4em] text-slate-600 uppercase">
                    Validade Tática: 48 Horas • Codinome: GROOWAY-STRAT-ALCHMY
                </p>
            </div>
        </div>
    );
};
