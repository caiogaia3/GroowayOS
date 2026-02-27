"use client";

import React from 'react';
import { Shield, Target, CheckCircle2, Star, Zap, DollarSign } from 'lucide-react';

interface ProposalPDFProps {
    reportData: any;
    designSkill: any;
    commercialPlan: any;
}

export const ProposalPDF: React.FC<ProposalPDFProps> = ({ reportData, designSkill, commercialPlan }) => {
    if (!reportData) return null;
    const proposalDidactic = designSkill?.findings?.proposal_didactic || {};

    return (
        <div id="proposal-pdf-content" className="p-12 bg-[#020617] text-slate-50 font-sans min-h-[297mm] w-[210mm] mx-auto hidden print:block">
            {/* Visual background elements (emulated for print) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -z-10" />

            {/* Header */}
            <div className="flex justify-between items-start mb-16">
                <div>
                    <div className="bg-purple-600 text-white px-4 py-1 text-xs font-black uppercase tracking-widest mb-4 inline-block rounded-sm">
                        Proposta de Valor
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter leading-none mb-2">SOLUÇÃO<br /><span className="text-purple-400">ESTRATÉGICA</span></h1>
                    <p className="text-slate-400 font-mono text-sm tracking-widest">GROOWAYOS • PREPARADO PARA: {reportData.company_name?.toUpperCase()}</p>
                </div>
                <Shield className="w-16 h-16 text-purple-500" />
            </div>

            {/* Solution Section */}
            <div className="mb-12">
                <h2 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> O Plano de Intervenção
                </h2>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                    <p className="text-xl text-slate-200 leading-relaxed font-medium">
                        "{proposalDidactic.solucao_imediata || 'Desenvolvendo solução personalizada...'}"
                    </p>
                </div>
            </div>

            {/* ROI / Ganho Section */}
            <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20">
                    <h3 className="text-xs font-black text-purple-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" /> Retorno de Investimento
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {proposalDidactic.ganho_esperado || 'Calculando projeções de lucro...'}
                    </p>
                </div>
                <div className="p-6 rounded-3xl border border-white/10 flex flex-col justify-center">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-spring-green-400" /> Próximo Passo
                    </h3>
                    <p className="text-slate-200 font-bold">
                        {proposalDidactic.o_proximo_passo || 'Consulte seu estrategista Grooway.'}
                    </p>
                </div>
            </div>

            {/* Pillars of Authority */}
            <div className="mt-12">
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Protocolo de Onipresença Grooway</h2>
                <div className="grid grid-cols-4 gap-4">
                    {['Autoridade', 'Clareza', 'Dados', 'Escala'].map((pilar) => (
                        <div key={pilar} className="text-center p-4 border border-white/5 rounded-2xl">
                            <Star className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{pilar}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Footer */}
            <div className="mt-auto pt-16 text-center opacity-50">
                <p className="text-[10px] font-mono tracking-widest text-slate-500">
                    ESTA PROPOSTA EXPIIRA EM 48 HORAS • TODOS OS DIREITOS RESERVADOS À GROOWAYOS
                </p>
            </div>
        </div>
    );
};
