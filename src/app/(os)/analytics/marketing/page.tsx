"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    ArrowUpRight,
    PieChart,
    DollarSign,
    Target,
    Users,
    MousePointer2
} from 'lucide-react';
import { MetricCard } from '@/features/xray/components/MetricCard';

const CHANNEL_PERFORMANCE = [
    { name: 'Google Ads', spend: 'R$ 15.000', leads: 450, roi: '4.2x', conversion: '12.5%' },
    { name: 'Instagram Ads', spend: 'R$ 8.000', leads: 320, roi: '3.8x', conversion: '15.2%' },
    { name: 'Linked-in Ads', spend: 'R$ 5.000', leads: 85, roi: '2.1x', conversion: '4.8%' },
    { name: 'E-mail Marketing', spend: 'R$ 1.200', leads: 120, roi: '12.5x', conversion: '22.1%' },
];

export default function ROIMarketing() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-purple-400" />
                        ROI Marketing & Atribuição
                    </h1>
                    <p className="text-slate-400 font-medium">
                        Rastreamento de conversão por canal e eficiência do investimento publicitário.
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-slate-400">AGO 2024</div>
                    <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-slate-400">SET 2024</div>
                    <div className="px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-[10px] font-black text-purple-400 font-black">OUT 2024</div>
                </div>
            </div>

            {/* Core KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="ROI Médio Global"
                    value="4.8x"
                    icon={Target}
                    variant="purple"
                    tooltip="Retorno sobre investimento total em todos os canais."
                />
                <MetricCard
                    label="CPL (Custo Lead)"
                    value="R$ 18,40"
                    icon={Users}
                    status={true}
                    tooltip="Valor médio pago por lead qualificado."
                />
                <MetricCard
                    label="Volume Conversões"
                    value="1.240"
                    icon={MousePointer2}
                    tooltip="Total de ações de conversão rastreadas."
                />
                <MetricCard
                    label="Budget Total"
                    value="R$ 29.200"
                    icon={DollarSign}
                    tooltip="Investimento em mídia paga no período."
                />
            </div>

            {/* Channel Performance Table */}
            <div className="liquid-card border-white/5 p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[120px]" />
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Performance por Canal</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Fonte de Tráfego</th>
                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Investimento</th>
                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Leads</th>
                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Conv %</th>
                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">ROI Estratégico</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {CHANNEL_PERFORMANCE.map((ch, i) => (
                                <tr key={i} className="group hover:bg-white/[0.01] transition-all">
                                    <td className="py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                            <span className="text-sm font-bold text-white">{ch.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 text-center text-sm font-medium text-slate-300">{ch.spend}</td>
                                    <td className="py-6 text-center text-sm font-black text-white">{ch.leads}</td>
                                    <td className="py-6 text-center">
                                        <span className="px-2 py-1 rounded bg-white/[0.03] text-[10px] font-black text-slate-100 border border-white/5">{ch.conversion}</span>
                                    </td>
                                    <td className="py-6 text-right">
                                        <span className="text-sm font-black text-purple-400 flex items-center justify-end gap-1">
                                            {ch.roi} <ArrowUpRight className="w-3 h-3" />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Attribution Model Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-8 rounded-[2rem] border-white/5 bg-white/[0.01]">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Modelo de Atribuição: IA Logic</h4>
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 border-l-2 border-l-purple-500">
                        <p className="text-sm text-slate-300 font-medium leading-relaxed italic">
                            &ldquo;Detectamos uma correlação cruzada alta entre o primeiro toque no Instagram e conversão direta no Google Search. Recomendamos manter o budget de Awareness no Meta para alimentar o fundo de funil de pesquisa.&rdquo;
                        </p>
                    </div>
                </div>

                <div className="liquid-card border-white/5 p-8 flex flex-col justify-center text-center">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Lead Score Médio</p>
                    <div className="text-6xl font-black text-white tracking-tighter">8.4</div>
                    <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mt-2">Altamente Qualificado</p>
                </div>
            </div>
        </div>
    );
}
