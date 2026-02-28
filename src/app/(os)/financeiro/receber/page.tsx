"use client";
import React from 'react';
import {
    ArrowUpCircle,
    Search,
    Mail,
    Download,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { MetricCard } from '@/features/xray/components/MetricCard';

const INVOICES = [
    { id: '1', company: 'Tech Solutions Inc', value: 'R$ 12.500,00', due: '15 Out 2024', status: 'paid', client: 'John Doe' },
    { id: '2', company: 'Global Marketing', value: 'R$ 8.900,00', due: '22 Out 2024', status: 'pending', client: 'Jane Smith' },
    { id: '3', company: 'Eco Friendly Co', value: 'R$ 15.000,00', due: '05 Out 2024', status: 'overdue', client: 'Robert Brown' },
    { id: '4', company: 'StartUp Vision', value: 'R$ 5.200,00', due: '28 Out 2024', status: 'pending', client: 'Alice Johnson' },
    { id: '5', company: 'Heavy Industry', value: 'R$ 22.000,00', due: '10 Out 2024', status: 'paid', client: 'Michael Scott' },
];

export default function AccountsReceivable() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter">
                        Contas a Receber
                    </h1>
                    <p className="text-slate-400 font-medium">
                        Gestão ativa de recebíveis, faturas e controle de inadimplência.
                    </p>
                </div>
                <button className="bg-cyan px-6 py-2.5 rounded-xl text-black transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <Download className="w-4 h-4" /> Exportar Balancete
                </button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                    label="Previsto p/ Receber"
                    value="R$ 89.200,00"
                    icon={ArrowUpCircle}
                    tooltip="Soma de todas as faturas pendentes para o período."
                />
                <MetricCard
                    label="Recebido (Mês)"
                    value="R$ 45.300,00"
                    icon={CheckCircle2}
                    variant="success"
                    tooltip="Total liquidado com sucesso em conta."
                />
                <MetricCard
                    label="Em Atraso"
                    value="R$ 15.000,00"
                    icon={AlertCircle}
                    variant="warning"
                    tooltip="Faturas com data de vencimento ultrapassada."
                />
            </div>

            {/* Table Section */}
            <div className="liquid-card border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative group flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar por cliente ou empresa..."
                            className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan/30 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors">Todos</button>
                        <button className="px-4 py-2 text-[10px] font-black uppercase text-cyan bg-cyan/10 rounded-lg">Pendente</button>
                        <button className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors">Pago</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Empresa / Cliente</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Valor Brutp</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Vencimento</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {INVOICES.map((inv) => (
                                <tr key={inv.id} className="group hover:bg-white/[0.01] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-100">{inv.company}</span>
                                            <span className="text-[10px] text-slate-500">{inv.client}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-white">{inv.value}</td>
                                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">{inv.due}</td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                inv.status === 'overdue' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                            <span className={`w-1 h-1 rounded-full ${inv.status === 'paid' ? 'bg-emerald-400' :
                                                    inv.status === 'overdue' ? 'bg-rose-400' : 'bg-amber-400'
                                                }`} />
                                            {inv.status === 'paid' ? 'Liquidado' : inv.status === 'overdue' ? 'Atrasado' : 'Aguardando'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-500 hover:text-cyan hover:border-cyan/20 transition-all">
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-500 hover:text-white transition-all">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
