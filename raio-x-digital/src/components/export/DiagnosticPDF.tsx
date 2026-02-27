"use client";

import React from 'react';
import { Target, Smartphone, Database, MapPin, KeyRound, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DiagnosticPDFProps {
    reportData: any;
    designSkill: any;
}

export const DiagnosticPDF: React.FC<DiagnosticPDFProps> = ({ reportData, designSkill }) => {
    if (!reportData) return null;
    const didactic = designSkill?.findings?.diagnostic_didactic || {};

    return (
        <div id="diagnostic-pdf-content" className="p-12 bg-white text-slate-900 font-sans min-h-[297mm] w-[210mm] mx-auto hidden print:block">
            {/* Header */}
            <div className="flex justify-between items-center border-b-4 border-cyan-500 pb-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Diagnóstico Digital</h1>
                    <p className="text-cyan-600 font-bold tracking-widest uppercase text-sm">GroowayOS • Inteligência Competitiva</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase">Empresa Analisada</p>
                    <p className="text-xl font-black text-slate-800">{reportData.company_name || 'Alvo Estratégico'}</p>
                </div>
            </div>

            {/* Hero Score */}
            <div className="bg-slate-50 p-8 rounded-3xl mb-8 border border-slate-200 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Saúde Digital Geral</h2>
                    <p className="text-slate-600 max-w-md">Este score reflete a capacidade da sua empresa de atrair e converter clientes no ambiente digital hoje.</p>
                </div>
                <div className="text-center">
                    <div className="text-6xl font-black text-cyan-500">{reportData.score || 0}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pontos de ROI</div>
                </div>
            </div>

            {/* Didactic Sections */}
            <div className="grid grid-cols-1 gap-8">
                {/* Pilares */}
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="bg-cyan-100 p-3 rounded-2xl h-fit">
                            <MapPin className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black uppercase text-slate-800">Presença Local & Google</h3>
                            <p className="text-slate-600 leading-relaxed mt-1 italic">"{didactic.presenca_local || 'Análise didática em processamento...'}"</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-purple-100 p-3 rounded-2xl h-fit">
                            <Smartphone className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black uppercase text-slate-800">Infraestrutura & Site</h3>
                            <p className="text-slate-600 leading-relaxed mt-1 italic">"{didactic.infraestrutura_site || 'Análise didática em processamento...'}"</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-indigo-100 p-3 rounded-2xl h-fit">
                            <Database className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black uppercase text-slate-800">Rastreio de Clientes (Imãs)</h3>
                            <p className="text-slate-600 leading-relaxed mt-1 italic">"{didactic.rastreio_leads || 'Análise didática em processamento...'}"</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-blue-100 p-3 rounded-2xl h-fit">
                            <KeyRound className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black uppercase text-slate-800">Canais de Anúncios</h3>
                            <p className="text-slate-600 leading-relaxed mt-1 italic">"{didactic.campanha_ads || 'Análise didática em processamento...'}"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-12 border-t border-slate-100 text-center">
                <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">Documento Gerado por GroowayOS • Sigilo Corporativo</p>
            </div>
        </div>
    );
};
