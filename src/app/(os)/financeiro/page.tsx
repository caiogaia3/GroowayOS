"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    ArrowUpCircle,
    ArrowDownCircle,
    Calendar,
    Download,
    Plus,
    Filter
} from 'lucide-react';
import { MetricCard } from '@/features/xray/components/MetricCard';

export default function FinanceDashboard() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter">
                        Dashboard Financeiro
                    </h1>
                    <p className="text-slate-400 font-medium">
                        Visão consolidada do fluxo de caixa e saúde econômica da agência.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="glass-panel px-4 py-2.5 rounded-xl border-white/5 text-slate-400 hover:text-white transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                        <Filter className="w-4 h-4" /> Filtrar Período
                    </button>
                    <button className="bg-cyan px-6 py-2.5 rounded-xl text-black transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95">
                        <Plus className="w-4 h-4" /> Novo Registro
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Saldo Disponível"
                    value="R$ 142.500,00"
                    icon={TrendingUp}
                    variant="success"
                    tooltip="Saldo total em contas correntes e investimentos liquidez diária."
                />
                <MetricCard
                    label="Previsto (Mês)"
                    value="R$ 89.200,00"
                    icon={ArrowUpCircle}
                    tooltip="Total de recebíveis confirmados para o mês atual."
                />
                <MetricCard
                    label="Saídas (Mês)"
                    value="R$ 32.400,00"
                    icon={ArrowDownCircle}
                    variant="warning"
                    tooltip="Total de pagamentos programados para o mês atual."
                />
                <MetricCard
                    label="Pendente Auditoria"
                    value="R$ 4.500,00"
                    icon={Calendar}
                    variant="purple"
                    tooltip="Lançamentos aguardando conciliação ou nota fiscal."
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Flow - Mock for now */}
                <div className="lg:col-span-2 liquid-card p-8 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan/40 to-transparent" />
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[10px] font-black text-cyan uppercase tracking-[0.2em] flex items-center gap-2">
                            Fluxo de Caixa Mensal
                        </h3>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ago/2024 - OUT/2024</span>
                    </div>

                    {/* SVG Chart Placeholder - High Style */}
                    <div className="h-64 flex items-end gap-3 px-2">
                        {[40, 65, 30, 85, 55, 95, 75, 45, 60, 90, 100, 80].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 1 }}
                                className="flex-1 bg-gradient-to-t from-cyan/20 to-cyan/60 rounded-t-lg border-t border-cyan/40 hover:to-cyan transition-all relative group/bar"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-[9px] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                    {(h * 1.5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-between px-2">
                        {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map(m => (
                            <span key={m} className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{m}</span>
                        ))}
                    </div>
                </div>

                {/* Operations Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="liquid-card border-white/5 p-6">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Atalhos Operacionais</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Emitir NF-e', color: 'cyan' },
                                { label: 'Conciliação Bancária', color: 'purple' },
                                { label: 'Relatório DRE', color: 'slate' },
                                { label: 'Enviar Cobrança WhatsApp', color: 'success' }
                            ].map((btn, i) => (
                                <button key={i} className="w-full text-left p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all flex items-center justify-between group">
                                    <span className="text-sm font-bold text-slate-200">{btn.label}</span>
                                    <ArrowUpCircle className="w-4 h-4 text-slate-600 group-hover:text-cyan rotate-45 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
