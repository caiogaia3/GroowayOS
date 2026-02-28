"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    BarChart3,
    Target,
    Zap,
    ArrowRight,
    Star,
    Sparkles
} from 'lucide-react';
import { MetricCard } from '@/features/xray/components/MetricCard';

export default function AnalyticsQ4() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Predictive Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-cyan animate-pulse" />
                        Previsão Estratégica Q4
                    </h1>
                    <p className="text-slate-400 font-medium">
                        Modelagem preditiva baseada em performance histórica e tendências de mercado.
                    </p>
                </div>
                <div className="px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[10px] font-black uppercase tracking-[0.2em]">
                    IA Engine: Active Analysis
                </div>
            </div>

            {/* Prediction KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Faturamento Estimado"
                    value="R$ 485.000,00"
                    icon={TrendingUp}
                    variant="success"
                    tooltip="Projeção baseada na taxa de crescimento atual."
                />
                <MetricCard
                    label="Probabilidade Meta"
                    value="92%"
                    icon={Target}
                    status={true}
                    tooltip="Confiança algorítmica de atingir os OKRs do trimestre."
                />
                <MetricCard
                    label="Volume de Leads"
                    value="+48.5%"
                    icon={Zap}
                    variant="purple"
                    tooltip="Crescimento projetado no pipeline de vendas."
                />
                <MetricCard
                    label="CAC Projetado"
                    value="R$ 142,00"
                    icon={BarChart3}
                    tooltip="Custo de Aquisição de Cliente estimado."
                />
            </div>

            {/* Core Strategy Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Projection Table */}
                <div className="lg:col-span-2 liquid-card p-8 border-white/5 flex flex-col justify-between">
                    <div>
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Escalabilidade de Funil</h3>
                        <div className="space-y-8">
                            {[
                                { step: 'Atração (Topo)', val: 100, color: 'cyan' },
                                { step: 'Conversão (Meio)', val: 65, color: 'purple' },
                                { step: 'Fechamento (Fundo)', val: 28, color: 'emerald' }
                            ].map((row, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>{row.step}</span>
                                        <span className="text-white">{row.val}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${row.val}%` }}
                                            transition={{ delay: i * 0.2, duration: 1.5 }}
                                            className={`h-full bg-${row.color} shadow-[0_0_10px_rgba(6,182,212,0.3)]`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-cyan/5 rounded-[2rem] border border-cyan/10 flex items-start gap-4">
                        <Star className="w-5 h-5 text-cyan shrink-0" />
                        <p className="text-sm text-slate-300 font-medium leading-relaxed">
                            <span className="text-cyan font-black block mb-1 uppercase text-[10px]">Insight da IA</span>
                            Identificamos um gargalo na etapa de conversão de leads frios. Recomenda-se aumentar a cadência de follow-up automatizado via WhatsApp para elevar a conversão em 12%.
                        </p>
                    </div>
                </div>

                {/* Tactical Actions Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="liquid-card border-[#A855F7]/10 p-8 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl" />
                        <h3 className="text-[10px] font-black text-[#A855F7] mb-6 uppercase tracking-[0.2em]">Plano de Ação Q4</h3>
                        <ul className="space-y-4">
                            {[
                                'Expandir Verba Google Ads (+25%)',
                                'Lançar Nova Landing Page de Produto',
                                'Implementar Chatbot de Qualificação',
                                'Treinamento de SDRs: Social Selling'
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 items-start group cursor-pointer">
                                    <div className="w-5 h-5 rounded bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7] text-[10px] font-black shrink-0 border border-[#A855F7]/20 group-hover:bg-[#A855F7] group-hover:text-black transition-colors">
                                        {i + 1}
                                    </div>
                                    <span className="text-sm text-slate-200 font-bold group-hover:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-8 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                            Ver Pipeline Completo <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
