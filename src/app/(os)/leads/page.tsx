"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Search, Filter, ExternalLink, Eye, Clock,
    ChevronRight, CreditCard, ShieldCheck, TrendingUp
} from 'lucide-react';
import { supabase } from '@/core/lib/supabase';

export default function LeadsDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchLeads() {
            // PERF OPTIMIZATION: Fetch only necessary fields for the list view.
            // Avoids fetching huge 'report_data' and 'content_json' blobs during listing.
            const { data, error } = await supabase
                .from('leads')
                .select(`
                    id, 
                    company_name, 
                    target_url, 
                    status, 
                    created_at,
                    diagnostics!inner (id, final_score, view_count, last_opened_at),
                    proposals (id, status, view_count, last_opened_at)
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('[Leads] Error fetching leads:', error);
            }
            if (data) setLeads(data);
            setLoading(false);
        }
        fetchLeads();
    }, []);

    const filteredLeads = leads.filter(lead =>
        lead.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.target_url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200 p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase italic">
                            Pipeline de <span className="text-brand-purple">Inteligência</span>
                        </h1>
                        <p className="text-slate-400 font-medium">Controle central de leads, diagnósticos e engajamento.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar empresa ou URL..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-purple/50 transition-all w-64 md:w-80"
                            />
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Total de Leads', value: leads.length, icon: Users, color: 'text-blue-400' },
                        { label: 'Analisados', value: leads.filter(l => l.status === 'analyzed').length, icon: ShieldCheck, color: 'text-emerald-400' },
                        { label: 'Propostas Ativas', value: leads.reduce((acc, l) => acc + (l.proposals?.length || 0), 0), icon: CreditCard, color: 'text-brand-purple' },
                        { label: 'Engajamento Médio', value: '72%', icon: TrendingUp, color: 'text-orange-400' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-[32px] backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ativo</span>
                            </div>
                            <div className="text-3xl font-black text-white">{stat.value}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase mt-1 tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Leads Table */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Lead / Empresa</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Score</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Tracking</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredLeads.map((lead) => {
                                    const diag = lead.diagnostics?.[0];
                                    const proposal = lead.proposals?.[0];

                                    return (
                                        <motion.tr
                                            key={lead.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="group hover:bg-white/[0.01] transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="font-black text-white group-hover:text-brand-purple transition-colors uppercase tracking-tight">{lead.company_name}</div>
                                                <div className="text-[10px] font-mono text-slate-500 mt-1">{lead.target_url}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${lead.status === 'analyzed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'analyzed' ? 'bg-emerald-500' : 'bg-blue-500'} animate-pulse`} />
                                                    {lead.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                {diag ? (
                                                    <div className={`text-xl font-black ${diag.final_score >= 70 ? 'text-emerald-400' : 'text-orange-400'}`}>
                                                        {diag.final_score}
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-600">--</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                                            <Eye className="w-3 h-3" /> {diag?.view_count || 0}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-400">
                                                            <CreditCard className="w-3 h-3" /> {proposal?.view_count || 0}
                                                        </div>
                                                    </div>
                                                    {diag?.last_opened_at && (
                                                        <div className="flex items-center gap-1 text-[9px] font-black uppercase text-slate-600">
                                                            <Clock className="w-2.5 h-2.5" /> LIDO: {new Date(diag.last_opened_at).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {diag && (
                                                        <a
                                                            href={`/report/${diag.id}`}
                                                            target="_blank"
                                                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-purple/50 transition-all group/btn"
                                                            title="Ver Relatório"
                                                        >
                                                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover/btn:text-white" />
                                                        </a>
                                                    )}
                                                    {proposal && (
                                                        <a
                                                            href={`/proposal/${proposal.id}`}
                                                            target="_blank"
                                                            className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all group/btn"
                                                            title="Ver Proposta"
                                                        >
                                                            <ChevronRight className="w-4 h-4 text-indigo-400 group-hover/btn:text-white" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
