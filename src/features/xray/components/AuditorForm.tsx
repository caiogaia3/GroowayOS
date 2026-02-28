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
        <form onSubmit={onSubmit} className="liquid-card glow-purple-neon !p-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end text-left">
                <div className="lg:col-span-4">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Site Institucional</label>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#A855F7] transition-colors" />
                        <input
                            type="url"
                            required
                            placeholder="https://empresa.com.br"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#A855F7]/40 text-sm font-medium transition-all group-hover:bg-white/10"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={appState === 'analyzing'}
                        />
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Empresa</label>
                    <input
                        type="text"
                        required
                        placeholder="Nome da Marca"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#A855F7]/40 text-sm font-medium transition-all hover:bg-white/10"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        disabled={appState === 'analyzing'}
                    />
                </div>

                <div className="lg:col-span-3">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Localização</label>
                    <input
                        type="text"
                        placeholder="Cidade, UF"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#A855F7]/40 text-sm font-medium transition-all hover:bg-white/10"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={appState === 'analyzing'}
                    />
                </div>

                <div className="lg:col-span-2">
                    <button
                        type="submit"
                        disabled={appState === 'analyzing'}
                        className="w-full py-4 px-6 rounded-2xl bg-[#A855F7] text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                    >
                        {appState === 'analyzing' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                        {appState === 'analyzing' ? 'Extraindo' : 'Analisar'}
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Instagram URL (Opcional)</label>
                <div className="max-w-xl">
                    <input
                        type="text"
                        placeholder="instagram.com/perfil"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A855F7]/40 text-sm font-medium transition-all hover:bg-white/10"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        disabled={appState === 'analyzing'}
                    />
                </div>
            </div>

            <div className="mt-10 border-t border-white/5 pt-10">
                <label className="block text-[10px] font-black text-[#A855F7] uppercase tracking-[0.3em] mb-6">Processadores de Inteligência</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {availableAgents.map((agent) => (
                        <label
                            key={agent.id}
                            className={`flex flex-col gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${selectedAgents.includes(agent.id)
                                ? 'bg-[#A855F7]/10 border-[#A855F7]/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                                : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100 hover:bg-white/10'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${selectedAgents.includes(agent.id) ? 'bg-[#A855F7] border-[#A855F7]/50' : 'bg-white/5 border-white/10'}`}>
                                    <CheckCircle2 className={`w-4 h-4 ${selectedAgents.includes(agent.id) ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'}`} />
                                </div>
                                <input
                                    type="checkbox"
                                    className="sr-only"
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
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-tighter leading-tight ${selectedAgents.includes(agent.id) ? 'text-white' : 'text-slate-500'}`}>
                                {agent.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </form>
    );
};
