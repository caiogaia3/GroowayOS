"use client";
import React from 'react';
import { Search, Loader2, Activity, CheckCircle2 } from 'lucide-react';

interface AuditorFormProps {
    url: string;
    setUrl: (v: string) => void;
    companyName: string;
    setCompanyName: (v: string) => void;
    city: string;
    setCity: (v: string) => void;
    instagram: string;
    setInstagram: (v: string) => void;
    selectedAgents: string[];
    setSelectedAgents: React.Dispatch<React.SetStateAction<string[]>>;
    availableAgents: { id: string; label: string; default: boolean }[];
    appState: 'input' | 'analyzing' | 'result';
    onSubmit: (e: React.FormEvent) => void;
}

export const AuditorForm = ({
    url, setUrl,
    companyName, setCompanyName,
    city, setCity,
    instagram, setInstagram,
    selectedAgents, setSelectedAgents,
    availableAgents,
    appState,
    onSubmit
}: AuditorFormProps) => {
    return (
        <form onSubmit={onSubmit} className="liquid-glass p-5 sm:p-6 !rounded-2xl shadow-xl backdrop-blur-xl relative mb-8 bg-black/40 border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end text-left">
                <div className="lg:col-span-4">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">Site Institucional</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="url"
                            required
                            placeholder="https://suaempresa.com.br"
                            className="w-full bg-[#0f172a]/60 border border-slate-700/50 rounded-xl pl-10 pr-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-purple/70 text-sm shadow-inner placeholder-slate-500"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={appState === 'analyzing'}
                        />
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">Empresa</label>
                    <input
                        type="text"
                        required
                        placeholder="Nome Fantasia"
                        className="w-full bg-[#0f172a]/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 text-sm shadow-inner"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        disabled={appState === 'analyzing'}
                    />
                </div>

                <div className="lg:col-span-3">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">Localização</label>
                    <input
                        type="text"
                        placeholder="Ex: São Paulo, SP"
                        className="w-full bg-[#0f172a]/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 text-sm shadow-inner"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={appState === 'analyzing'}
                    />
                </div>

                <div className="lg:col-span-2">
                    <button
                        type="submit"
                        disabled={appState === 'analyzing'}
                        className="btn-shine w-full py-2.5 px-4 text-sm font-bold tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed h-[42px] bg-brand-gradient text-white"
                    >
                        {appState === 'analyzing' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                        {appState === 'analyzing' ? 'Extraindo...' : 'Analisar'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 text-left">
                <div className="lg:col-span-8">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">Instagram URL (Opcional)</label>
                    <input
                        type="text"
                        placeholder="Ex: instagram.com/empresa"
                        className="w-full bg-[#0f172a]/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 text-sm shadow-inner"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        disabled={appState === 'analyzing'}
                    />
                </div>
            </div>

            <div className="mt-5 border-t border-slate-700/50 pt-5 text-left">
                <label className="block text-xs font-semibold text-slate-300 mb-3 ml-1">Motores de Análise Inteligente</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableAgents.map((agent) => (
                        <label
                            key={agent.id}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedAgents.includes(agent.id)
                                ? 'bg-brand-purple/20 border-brand-purple/50 shadow-inner'
                                : 'bg-black/20 border-white/5 opacity-60 hover:opacity-100 hover:bg-black/40'
                                }`}
                        >
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selectedAgents.includes(agent.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedAgents((prev) => [...prev, agent.id]);
                                        } else {
                                            setSelectedAgents((prev) => prev.filter((id) => id !== agent.id));
                                        }
                                    }}
                                    disabled={appState === 'analyzing'}
                                />
                                <div className="w-5 h-5 rounded border border-slate-500 peer-checked:bg-brand-purple peer-checked:border-brand-purple flex items-center justify-center transition-colors">
                                    {selectedAgents.includes(agent.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                </div>
                            </div>
                            <span className={`text-xs font-semibold select-none ${selectedAgents.includes(agent.id) ? 'text-white' : 'text-slate-400'}`}>
                                {agent.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </form>
    );
};
