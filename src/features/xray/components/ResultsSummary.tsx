import React from 'react';
import { Share2, FileDown, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultsSummaryProps {
    score: number;
    companyName: string;
    onShareReport: () => void;
    onGenerateProposal: () => void;
    onOpenPDF: () => void;
    isSaving: boolean;
    shareLink: string | null;
}

export function getScoreBadge(score: number) {
    const isGood = score >= 70;
    const isWarning = score >= 40 && score < 70;

    return (
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black border tracking-widest uppercase flex items-center gap-2 ${isGood ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' :
                isWarning ? 'bg-orange-500/10 border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]' :
                    'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isGood ? 'bg-emerald-400' : isWarning ? 'bg-orange-400' : 'bg-red-400'}`}></span>
            Score: {score}/100
        </div>
    );
}

export function ResultsSummary({
    score,
    companyName,
    onShareReport,
    onGenerateProposal,
    onOpenPDF,
    isSaving,
    shareLink
}: ResultsSummaryProps) {
    return (
        <div className="liquid-card glow-cyan-neon !p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase">{companyName}</h2>
                    {getScoreBadge(score)}
                </div>
                <p className="text-slate-400 font-medium italic">Análise de DNA e Performance concluída com sucesso.</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                    onClick={onOpenPDF}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
                >
                    <FileDown className="w-4 h-4 text-[#06B6D4]" /> Exportar PDF
                </button>

                <button
                    onClick={onShareReport}
                    disabled={isSaving}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${shareLink
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                        }`}
                >
                    <Share2 className={`w-4 h-4 ${shareLink ? 'text-emerald-400' : 'text-[#06B6D4]'}`} /> {shareLink ? 'Link Ativo' : 'Compartilhar'}
                </button>

                <button
                    onClick={onGenerateProposal}
                    disabled={isSaving}
                    className="flex items-center gap-3 bg-[#A855F7] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] active:scale-[0.98]"
                >
                    <Rocket className="w-4 h-4" /> {isSaving ? 'Processando' : 'Gerar Proposta'}
                </button>
            </div>
        </div>
    );
}
