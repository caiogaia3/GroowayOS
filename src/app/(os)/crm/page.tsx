"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Plus,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock,
    AlertCircle,
    UserPlus,
    X,
    Building2,
    DollarSign,
    Target,
    User,
    ChevronRight
} from 'lucide-react';

const CLIENTS = [
    {
        id: 'brisa-laser',
        name: 'Brisa Laser',
        segment: 'ESTÉTICA',
        size: '10-20 FUNC.',
        health: 3,
        kpi: 99,
        deadline: true,
        status: 'ATIVO',
        color: 'text-emerald-400',
        monthlySpend: 'R$ 15.000',
        leads: 342
    },
];

export default function GestaoClientesPage() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter leading-none grayscale-[0.5]">
                        Gestão de <span className="text-white">Clientes</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse"></span>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">
                            DASHBOARD / <span className="text-[#A855F7]">RELAÇÕES COMERCIAIS</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input
                            placeholder="Buscar cliente..."
                            className="bg-white/[0.02] border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm text-slate-400 w-full lg:w-80 focus:outline-none focus:border-[#A855F7]/30 transition-all font-medium"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#A855F7] text-white text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95 transition-all"
                    >
                        <UserPlus className="w-4 h-4" /> Novo Cliente
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-3 bg-white/[0.02] p-1.5 rounded-2xl w-fit border border-white/5">
                <button className="px-6 py-2 rounded-xl bg-white/10 text-[9px] font-black text-white uppercase tracking-widest border border-white/10">Ativos (1)</button>
                <button className="px-6 py-2 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Prospects</button>
                <button className="px-6 py-2 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Histórico</button>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CLIENTS.map((client, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative group"
                    >
                        <a href={`/crm/clientes/${client.id}/analytics`} className="block">
                            {/* Premium Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-purple-500/0 rounded-[34px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="liquid-card relative border-white/10 p-8 flex flex-col justify-between group-hover:border-emerald-500/30 transition-all bg-[#0A0A0F]/80 backdrop-blur-xl h-full min-h-[400px]">
                                <div className="absolute top-6 right-6 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                                        {client.status}
                                    </span>
                                </div>

                                <div>
                                    <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/5">
                                        <Building2 className="w-10 h-10 text-emerald-400 grayscale group-hover:grayscale-0 transition-all" />
                                        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-tighter mb-1">
                                        {client.name}
                                    </h3>
                                    <div className="flex gap-2 mb-8">
                                        <span className="text-[9px] font-black text-slate-500 border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-lg uppercase tracking-widest">{client.segment}</span>
                                        <span className="text-[9px] font-black text-slate-500 border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-lg uppercase tracking-widest">{client.size}</span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-between text-[10px] font-bold">
                                            <span className="text-slate-500 uppercase tracking-widest">Investimento Mensal</span>
                                            <span className="text-white">{client.monthlySpend}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-bold">
                                            <span className="text-slate-500 uppercase tracking-widest">Leads (Mês)</span>
                                            <span className="text-emerald-400 font-black">{client.leads}</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '95%' }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3].map(dot => (
                                                <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= client.health ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'bg-white/5'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0F] bg-blue-500 flex items-center justify-center text-[10px] font-bold shadow-lg">G</div>
                                            <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0F] bg-white flex items-center justify-center text-[10px] font-bold text-black shadow-lg">M</div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                ))}

                {/* Add Client Card */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="liquid-card border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#A855F7]/30 hover:bg-[#A855F7]/[0.02] transition-all group min-h-[400px] bg-transparent"
                >
                    <div className="w-16 h-16 rounded-[24px] bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:border-[#A855F7]/40 transition-all group-hover:scale-110">
                        <Plus className="w-8 h-8 text-slate-600 group-hover:text-[#A855F7] transition-colors" />
                    </div>
                    <div>
                        <p className="text-lg font-black text-white uppercase tracking-[0.2em] mb-1">Novo Cliente</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Expandir Operação</p>
                    </div>
                </button>
            </div>

            {/* New Client Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050508]/95 backdrop-blur-2xl"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0A0A0F] border border-white/10 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8 lg:p-12 relative">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/5 transition-colors text-slate-500"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="mb-10 text-center lg:text-left">
                                    <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Novo Cadastro</h2>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Informações Estratégicas para Agência</p>
                                </div>

                                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                <Building2 className="w-3 h-3 text-[#A855F7]" /> Empresa
                                            </label>
                                            <input type="text" placeholder="Nome do Cliente" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#A855F7]/40 focus:bg-white/[0.05] transition-all" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                <Target className="w-3 h-3 text-[#A855F7]" /> Segmento
                                            </label>
                                            <div className="relative">
                                                <select className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#A855F7]/40 appearance-none transition-all">
                                                    <option className="bg-[#0A0A0F]">Estética / Saúde</option>
                                                    <option className="bg-[#0A0A0F]">Imobiliário</option>
                                                    <option className="bg-[#0A0A0F]">Gastronomia</option>
                                                    <option className="bg-[#0A0A0F]">Infoprodutos</option>
                                                    <option className="bg-[#0A0A0F]">E-commerce</option>
                                                </select>
                                                <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                <User className="w-3 h-3 text-[#A855F7]" /> Tomador de Decisão
                                            </label>
                                            <input type="text" placeholder="Nome do Responsável" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#A855F7]/40 focus:bg-white/[0.05] transition-all" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                <DollarSign className="w-3 h-3 text-[#A855F7]" /> Verba Mensal (Ads)
                                            </label>
                                            <input type="text" placeholder="R$ 0,00" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#A855F7]/40 focus:bg-white/[0.05] transition-all" />
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 space-y-4">
                                        <p className="text-[10px] font-black text-[#A855F7] uppercase tracking-[0.2em]">IDs de Performance</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="ID Conta Meta Ads" className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3.5 text-xs text-slate-400 focus:outline-none focus:border-[#A855F7]/30" />
                                            <input type="text" placeholder="ID Conta Google Ads" className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3.5 text-xs text-slate-400 focus:outline-none focus:border-[#A855F7]/30" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 px-8 py-4 rounded-2xl border border-white/5 bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                                        >
                                            Descartar
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-[2] px-8 py-4 rounded-2xl bg-[#A855F7] text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#A855F7]/20 hover:scale-[1.02] active:scale-98 transition-all"
                                        >
                                            Salvar e Ativar Cliente
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

