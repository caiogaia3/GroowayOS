"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/core/lib/supabase';
import { Shield, Zap, DollarSign, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { trackViewAction } from '@/features/xray/actions/track-view';

export default function PublicProposalPage() {
    const params = useParams();
    const id = params.id as string;

    const [proposal, setProposal] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProposal() {
            if (!id) return;
            const { data, error } = await supabase
                .from('proposals')
                .select(`
                    *,
                    leads (company_name, target_url)
                `)
                .eq('id', id)
                .single();

            if (data) {
                setProposal(data);
                // Track usage asynchronously
                trackViewAction({ id, type: 'proposal' });
            }
            setLoading(false);
        }
        fetchProposal();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!proposal) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
            <h1 className="text-2xl font-black text-center px-4">Proposta não encontrada ou acesso restrito.<br /><span className="text-indigo-400 text-sm font-medium">Contate seu estrategista Grooway.</span></h1>
        </div>
    );

    const data = proposal.content_json;
    const companyName = proposal.leads?.company_name || 'Seu Negócio';

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Abstract Backgrounds */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 sm:py-24 relative z-10 space-y-24">
                {/* Header Section */}
                <header className="space-y-8 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 px-4 py-1.5 rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Proposta de Valor Exclusiva</span>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                            {data.titulo_proposta || 'Estratégia de Aceleração'}
                        </h1>
                        <p className="text-slate-400 font-mono text-xs tracking-[0.4em] uppercase">
                            Preparado para: {companyName}
                        </p>
                    </div>
                </header>

                {/* Presentation / Current Scenario */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <h2 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Diagnóstico & Contexto
                        </h2>
                        <p className="text-lg text-slate-300 leading-relaxed font-medium">
                            {data.bloco1_apresentacao}
                        </p>
                        <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[32px] backdrop-blur-3xl italic">
                            <p className="text-slate-400 leading-relaxed">
                                {data.bloco2_cenario_atual}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {/* Intervention Plan */}
                        <div className="space-y-6">
                            <h2 className="text-xs font-black text-brand-purple uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Plano de Intervenção
                            </h2>
                            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-10 rounded-[40px] shadow-2xl shadow-indigo-600/20">
                                <p className="text-xl text-white leading-relaxed font-bold">
                                    {data.bloco3_estrategia}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ROI & Next Steps */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[40px] space-y-4">
                        <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2 text-center md:text-left justify-center md:justify-start">
                            <DollarSign className="w-4 h-4" /> Ganhos Esperados
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed font-medium text-center md:text-left">
                            {data.bloco6_resultados}
                        </p>
                    </div>

                    <div className="p-10 bg-indigo-500/5 border border-indigo-500/20 rounded-[40px] space-y-4 flex flex-col justify-center items-center md:items-start">
                        <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Próximo Passo
                        </h3>
                        <p className="text-white text-xl font-black text-center md:text-left">
                            {data.o_proximo_passo || 'Consulte seu estrategista Grooway.'}
                        </p>
                        <button className="mt-8 group flex items-center gap-3 bg-white text-slate-900 font-black py-4 px-10 rounded-full text-sm hover:bg-slate-200 transition-all uppercase tracking-widest">
                            Ativar Protocolo <ArrowRight className="w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </section>

                {/* Pillars Section */}
                <footer className="pt-24 border-t border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {['Autoridade', 'Tecnologia', 'Resultados', 'Escala'].map(pilar => (
                            <div key={pilar} className="text-center space-y-3">
                                <Star className="w-6 h-6 text-indigo-500/40 mx-auto" />
                                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{pilar}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-24 text-center opacity-30">
                        <p className="text-[10px] font-mono tracking-[0.5em] uppercase">Documento Gerado via GroowayOS • 2026</p>
                    </div>
                </footer>
            </div>
        </main>
    );
}
