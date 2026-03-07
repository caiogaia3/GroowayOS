"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Clock, ArrowRight, Activity, Loader2 } from 'lucide-react';
import { getAuditHistory, AuditHistoryItem } from '../actions/get-history';

interface HistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect?: (id: string) => void;
}

export const HistoryModal = ({ isOpen, onClose, onSelect }: HistoryModalProps) => {
    const [history, setHistory] = useState<AuditHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const fetchHistory = async () => {
                setIsLoading(true);
                const data = await getAuditHistory();
                setHistory(data);
                setIsLoading(false);
            };
            fetchHistory();
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-slate-900/50">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity className="w-5 h-5 text-brand-purple" />
                                Histórico de Diagnósticos
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <Loader2 className="w-8 h-8 animate-spin text-brand-purple mb-4" />
                                    <p className="text-slate-400 font-medium">Buscando histórico na nuvem...</p>
                                </div>
                            ) : history.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                                        <Activity className="w-8 h-8 text-slate-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-300 mb-2">Nenhum diagnóstico ainda</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto">
                                        Seus relatórios recentes aparecerão aqui para fácil acesso.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4 relative z-10 p-1">
                                    {history.map((item) => (
                                        <button
                                            key={item.id}
                                            className="w-full text-left bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-white/5 hover:border-brand-purple/50 hover:bg-brand-purple/5 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all relative overflow-hidden flex flex-col gap-4 group"
                                            onClick={() => {
                                                if (onSelect) {
                                                    onSelect(item.id);
                                                    onClose();
                                                } else {
                                                    window.open(`/report/${item.id}`, '_blank');
                                                }
                                            }}
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                            <div className="flex justify-between items-start w-full relative z-10">
                                                <div className="flex-1 pr-4">
                                                    <h4 className="text-lg font-bold text-white truncate mb-1 group-hover:text-brand-purple transition-colors">
                                                        {item.company_name}
                                                    </h4>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                        <ExternalLink className="w-3 h-3" />
                                                        <span className="truncate max-w-[200px]">{item.target_url.replace(/^https?:\/\//, '')}</span>
                                                    </div>
                                                </div>

                                                <div className="shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-slate-900 border border-slate-700 group-hover:border-brand-purple/30 shadow-inner">
                                                    <span className="text-[10px] text-slate-500 font-medium leading-none mb-0.5">Score</span>
                                                    <span className="text-sm font-bold text-white leading-none">{item.score || '--'}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-slate-700/50 relative z-10">
                                                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" />
                                                    {item.saved_at ? new Date(item.saved_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recente'}
                                                </p>
                                                <div className="text-[10px] uppercase tracking-wider font-bold text-brand-purple/70 group-hover:text-brand-purple flex items-center gap-1 transition-colors">
                                                    Carregar Análise
                                                    <ArrowRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
