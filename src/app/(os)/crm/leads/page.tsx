"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    MoreVertical,
    Target,
    MousePointer2,
    MessageSquare,
    Mail,
    Phone,
    Calendar,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react';

const LEADS = [
    { id: 1, name: 'Clínica Odontológica Sorriso', contact: 'Ricardo Silva', email: 'ricardo@sorriso.com.br', phone: '(11) 98877-6655', source: 'Instagram Ads', status: 'NOVO', temperature: 'HOT', value: 'R$ 5.000', date: 'Há 2 horas' },
    { id: 2, name: 'Imobiliária House Prime', contact: 'Ana Paula', email: 'contato@houseprime.com', phone: '(11) 97766-5544', source: 'Google Search', status: 'QUALIFICADO', temperature: 'WARM', value: 'R$ 12.000', date: 'Hoje, 10:30' },
    { id: 3, name: 'Restaurante Sabor Divino', contact: 'Carlos Eduardo', email: 'carlos@sabordivino.com', phone: '(11) 96655-4433', source: 'Meta Ads', status: 'NEGOCIAÇÃO', temperature: 'HOT', value: 'R$ 3.500', date: 'Ontem' },
    { id: 4, name: 'Academia Fit Life', contact: 'Mariana Costa', email: 'marianacosta@fitlife.club', phone: '(11) 95544-3322', source: 'TikTok Ads', status: 'NOVO', temperature: 'COLD', value: 'R$ 2.800', date: 'Há 3 dias' },
];

export default function LeadsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                        Gestão de <span className="text-[#A855F7]">Leads</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2 italic">
                        CRM / <span className="text-[#A855F7]">LEADS TRACKING</span>
                    </p>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input
                            placeholder="Buscar leads..."
                            className="bg-white/[0.02] border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm text-slate-400 w-full lg:w-80 focus:outline-none focus:border-[#A855F7]/30 transition-all font-medium"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                        <Filter className="w-4 h-4" /> Filtros
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Leads', value: '142', change: '+12%', icon: Target, color: 'text-blue-400' },
                    { label: 'Conversion Rate', value: '18.4%', change: '+3.2%', icon: TrendingUp, color: 'text-emerald-400' },
                    { label: 'CPC Médio', value: 'R$ 1.42', change: '-5%', icon: MousePointer2, color: 'text-purple-400' },
                    { label: 'Oportunidades', value: 'R$ 54k', change: '+R$ 8k', icon: ArrowUpRight, color: 'text-amber-400' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <stat.icon className="w-12 h-12" />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-2xl font-black text-white leading-none">{stat.value}</h3>
                            <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Leads Table */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[32px] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Empresa / Contato</th>
                                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Origem</th>
                                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Temperatura</th>
                                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Valor Est.</th>
                                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Data</th>
                                <th className="p-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {LEADS.map((lead, i) => (
                                <motion.tr
                                    key={lead.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 + (i * 0.05) }}
                                    className="hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center text-lg">
                                                🏢
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-sm">{lead.name}</p>
                                                <p className="text-xs text-slate-500">{lead.contact}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400">
                                            {lead.source}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${lead.status === 'NOVO' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                lead.status === 'QUALIFICADO' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${lead.temperature === 'HOT' ? 'bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]' :
                                                    lead.temperature === 'WARM' ? 'bg-amber-500' : 'bg-slate-500'
                                                }`} />
                                            <span className="text-[10px] font-black text-slate-400 tracking-widest">{lead.temperature}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-sm font-bold text-white">{lead.value}</p>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-xs text-slate-500">{lead.date}</p>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                                <MessageSquare className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                                <Phone className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-6 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">Página 1 de 12</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-widest disabled:opacity-30 cursor-not-allowed">Anterior</button>
                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-colors">Próxima</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
