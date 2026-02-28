"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, XCircle, AlertTriangle, Briefcase, FileText, ExternalLink, CheckCircle2, Loader2 } from 'lucide-react';

interface DiagnosticModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportData: any;
    companyName: string;
    isGeneratingPDF: boolean;
    onGeneratePDF: () => void;
    isSaving: boolean;
    onShareReport: () => void;
    shareLink: string | null;
}

export const DiagnosticModal = ({
    isOpen,
    onClose,
    reportData,
    companyName,
    isGeneratingPDF,
    onGeneratePDF,
    isSaving,
    onShareReport,
    shareLink
}: DiagnosticModalProps) => {
    if (!isOpen || !reportData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-4 py-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-4xl bg-[#080c14] border border-white/10 rounded-3xl shadow-2xl overflow-hidden font-medium"
            >
                <div className="relative bg-gradient-to-br from-brand-purple/40 via-indigo-900/30 to-[#080c14] px-8 pt-8 pb-6 border-b border-white/10">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10">
                        <XCircle className="w-4 h-4 text-slate-400" />
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-indigo-600 flex items-center justify-center shadow-lg font-bold text-white">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-brand-purple uppercase tracking-widest">Dossiê Digital Completo</p>
                            <p className="text-xs text-slate-500">Relatório de Auditoria — {companyName || reportData.target_url}</p>
                        </div>
                    </div>
                    <h1 className="text-2xl font-black text-white">Diagnóstico de Presença Digital</h1>
                </div>

                <div className="px-8 py-6 space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {reportData.skills_results.filter((s: any) => s.score !== undefined && !s.name?.includes('Value')).map((skill: any, idx: number) => (
                            <div key={idx} className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                                <p className="text-xs text-slate-400 font-semibold mb-1 truncate">{skill.name?.split('(')[0]?.trim() || 'Motor'}</p>
                                <p className={`text-2xl font-black ${(skill.score || 0) >= 70 ? 'text-emerald-400' : (skill.score || 0) >= 40 ? 'text-orange-400' : 'text-red-400'}`}>
                                    {skill.score || 0}<span className="text-sm text-slate-600">/100</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {reportData.skills_results.some((s: any) => s.critical_pains?.length > 0) && (
                        <div className="bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
                            <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Problemas Críticos Detectados
                            </h3>
                            <ul className="space-y-1.5">
                                {reportData.skills_results.flatMap((s: any) => s.critical_pains || []).slice(0, 8).map((pain: string, idx: number) => (
                                    <li key={idx} className="text-sm text-red-200/80 flex items-start gap-2 leading-relaxed">
                                        <span className="text-red-500 mt-0.5">•</span> {pain}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                        <button
                            onClick={onGeneratePDF}
                            disabled={isGeneratingPDF}
                            className="px-6 py-3 text-sm font-bold flex items-center gap-2 bg-gradient-to-r from-brand-purple to-indigo-600 text-white rounded-full transition-all shadow-lg"
                        >
                            {isGeneratingPDF ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                            PDF do Diagnóstico
                        </button>
                        <button
                            onClick={onShareReport}
                            disabled={isSaving}
                            className="px-5 py-3 text-sm font-semibold flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-all"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                            Gerar Link de Compartilhamento
                        </button>
                        {shareLink && (
                            <div className="flex items-center gap-2 bg-spring-green-400/10 px-4 py-2 rounded-full border border-spring-green-400/20">
                                <CheckCircle2 className="w-4 h-4 text-spring-green-400" />
                                <a href={shareLink} target="_blank" rel="noopener noreferrer" className="text-xs text-spring-green-400 underline truncate max-w-[200px]">{shareLink}</a>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
