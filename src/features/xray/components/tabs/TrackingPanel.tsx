"use client";
import React from 'react';
import { Database, Target, Zap, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2, Flame, EyeOff, Rocket, Fingerprint, Bug, Activity, Terminal } from 'lucide-react';

interface TrackingPanelProps {
    trackingSkill: {
        score: number;
        critical_pains?: string[];
        findings: {
            has_ga4_base: boolean;
            has_gtm: boolean;
            has_meta_pixel: boolean;
            has_google_ads_signals?: boolean;
            has_whatsapp_button?: boolean;
            whatsapp_number?: string;
            has_utm_links?: boolean;
            has_datalayer?: boolean;
            gtm_details?: string[];
            ga4_details?: string[];
            meta_pixel_details?: string[];
            google_ads_details?: string[];
            evidences?: string[];

            maturity_level?: string;
            risk_score_percentage?: number;
            executive_verdict?: string;
            blind_spots?: Array<{ issue: string; business_impact: string }>;
            action_plan?: Array<{ priority: string; action: string }>;
            infrastructure_status?: string;
            // Legacy fallbacks
            ui_strengths?: string[];
            ui_weaknesses?: string[];
            ui_improvements?: string[];
        };
    };
    getScoreBadge: (score: number) => React.ReactNode;
}

const CompactCard = ({
    label,
    isActive,
    valueText,
    subtext,
    details,
    icon: Icon,
    isDanger = false
}: {
    label: string;
    isActive: boolean;
    valueText: string;
    subtext?: string;
    details?: string[];
    icon: any;
    isDanger?: boolean;
}) => {
    const activeColor = isDanger ? 'text-amber-400' : 'text-emerald-400';
    const activeBg = isDanger ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/5 border-emerald-500/20';
    const inactiveBg = 'bg-slate-900 border-white/5';

    return (
        <div className={`p-4 rounded-xl border flex flex-col h-full ${isActive ? activeBg : inactiveBg}`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Icon className="w-3 h-3" /> {label}
                </span>
                {isActive ? <CheckCircle2 className={`w-4 h-4 ${activeColor}`} /> : <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-slate-800">LIVRE</span>}
            </div>
            <div className="mt-auto">
                <p className={`text-base font-black tracking-tight ${isActive ? activeColor : 'text-slate-500'}`}>
                    {valueText}
                </p>
                {subtext && <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">{subtext}</p>}

                {details && details.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-white/5 space-y-1">
                        {details.map((d, i) => (
                            <p key={i} className="text-[9px] text-slate-400 font-mono tracking-tighter truncate">
                                {d}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const TrackingPanel = ({ trackingSkill, getScoreBadge }: TrackingPanelProps) => {
    if (!trackingSkill || !trackingSkill.findings) return null;
    const { findings, critical_pains } = trackingSkill;

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Header & Main Cards Container */}
            <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200 uppercase tracking-widest">
                        <Database className="w-4 h-4 text-indigo-400" /> Auditoria de Tracking & Dados
                    </h3>
                    <div className="flex items-center gap-4">
                        {findings.maturity_level && (
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                Maturidade: {findings.maturity_level}
                            </span>
                        )}
                        {getScoreBadge(trackingSkill.score)}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <CompactCard
                        label="GA4 (Analytics)"
                        isActive={findings.has_ga4_base}
                        valueText={findings.has_ga4_base ? 'ATIVO' : 'NÃO DETECTADO'}
                        details={findings.ga4_details}
                        icon={Activity}
                    />
                    <CompactCard
                        label="GTM (Container)"
                        isActive={findings.has_gtm}
                        valueText={findings.has_gtm ? 'ATIVO' : 'NÃO DETECTADO'}
                        details={findings.gtm_details}
                        icon={Database}
                    />
                    <CompactCard
                        label="Meta Pixel"
                        isActive={findings.has_meta_pixel}
                        valueText={findings.has_meta_pixel ? 'ATIVO' : 'NÃO DETECTADO'}
                        details={findings.meta_pixel_details}
                        icon={Target}
                    />
                    <CompactCard
                        label="DataLayer"
                        isActive={findings.has_datalayer ?? false}
                        valueText={findings.has_datalayer ? 'ESTRUTURADO' : 'INATIVO'}
                        subtext="Ecommerce Tracking"
                        icon={Terminal}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    <div className={`p-4 xl:p-5 rounded-xl border flex justify-between items-center ${findings.has_whatsapp_button ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900 border-white/5'}`}>
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                                Snipper de WhatsApp
                            </span>
                            <p className={`text-sm font-black tracking-tight ${findings.has_whatsapp_button ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {findings.has_whatsapp_button ? 'DETECTADO' : 'SEM SINAIS'}
                            </p>
                        </div>
                        {findings.whatsapp_number && (
                            <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded">
                                {findings.whatsapp_number}
                            </span>
                        )}
                    </div>

                    <div className={`p-4 xl:p-5 rounded-xl border flex justify-between items-center ${findings.has_google_ads_signals ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900 border-white/5'}`}>
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                                Google Ads (Tags Internas)
                            </span>
                            <p className={`text-sm font-black tracking-tight ${findings.has_google_ads_signals ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {findings.has_google_ads_signals ? 'SINAIS ENCONTRADOS' : 'NENHUM SINAL'}
                            </p>
                        </div>
                        {findings.google_ads_details && findings.google_ads_details.length > 0 && (
                            <span className="text-[10px] font-mono text-emerald-300">
                                {findings.google_ads_details[0]}
                            </span>
                        )}
                    </div>

                    <div className={`p-4 xl:p-5 rounded-xl border flex justify-between items-center ${findings.has_utm_links ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                                URLs com UTM Tracking
                            </span>
                            <p className={`text-sm font-black tracking-tight ${findings.has_utm_links ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {findings.has_utm_links ? 'BLINDAGEM ATIVA' : 'TRÁFEGO CEGO'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Actionable Output - Ultra Compact */}
            {findings.executive_verdict && (
                <div className="bg-gradient-to-r from-slate-900 to-[#0A0A0F] border-l-4 border-indigo-500 p-5 rounded-r-xl border border-y-white/5 border-r-white/5">
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        <span className="text-indigo-400 font-bold uppercase tracking-widest text-[10px] block mb-2">Veredito Executivo</span>
                        "{findings.executive_verdict}"
                    </p>
                </div>
            )}

            <div className="bg-[#050508] p-8 rounded-[22px] relative z-10">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-indigo-500/20">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white italic tracking-tighter">Inteligência Operacional</h2>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-indigo-400">Diagnosis Engine • Agente 05</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Strengths */}
                    {(findings.ui_strengths && findings.ui_strengths.length > 0) && (
                        <div>
                            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">
                                <ShieldCheck className="w-4 h-4" /> Pontos Fortes
                            </h4>
                            <ul className="space-y-3">
                                {(findings.ui_strengths || []).map((item, idx) => (
                                    <li key={idx} className="text-xs text-slate-300 font-medium pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-emerald-500 before:rounded-full">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Weaknesses */}
                    {(findings.ui_weaknesses && findings.ui_weaknesses.length > 0) && (
                        <div>
                            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-500 mb-4">
                                <AlertTriangle className="w-4 h-4" /> Furos no Balde
                            </h4>
                            <ul className="space-y-3">
                                {(findings.ui_weaknesses || []).map((item, idx) => (
                                    <li key={idx} className="text-xs text-slate-300 font-medium pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-rose-500 before:rounded-full">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Improvements */}
                    {(findings.ui_improvements && findings.ui_improvements.length > 0) && (
                        <div className="bg-indigo-500/5 p-5 rounded-2xl border border-indigo-500/20 md:col-span-1 h-full">
                            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
                                <TrendingUp className="w-4 h-4" /> Oportunidades
                            </h4>
                            <ul className="space-y-3">
                                {(findings.ui_improvements || []).map((item, idx) => (
                                    <li key={idx} className="text-xs text-indigo-100 font-medium pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-indigo-400 before:rounded-full">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Blind Spots & Risk */}
                <div className="bg-slate-900 border border-rose-500/20 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-400">
                            <Bug className="w-4 h-4" /> Alertas Críticos (Furos de Dados)
                        </h4>
                        {findings.risk_score_percentage !== undefined && (
                            <div className="text-right">
                                <span className="text-lg font-black text-rose-500 block">Risco: {findings.risk_score_percentage}%</span>
                            </div>
                        )}
                    </div>

                    {/* Raw Evidences from System first */}
                    {findings.evidences && findings.evidences.length > 0 && (
                        <div className="mb-4">
                            <ul className="space-y-1.5 list-disc list-inside text-[11px] text-slate-400 marker:text-rose-500/50">
                                {findings.evidences.map((evi, i) => (
                                    <li key={i}><span className="font-mono text-slate-500">{"<sys>"}</span> {evi}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* AI Blind spots */}
                    {findings.blind_spots && findings.blind_spots.length > 0 ? (
                        <div className="space-y-3">
                            {findings.blind_spots.map((spot, idx) => (
                                <div key={idx} className="bg-[#050508] p-3 rounded-lg border border-white/5">
                                    <p className="text-xs font-bold text-rose-200 mb-1">{spot.issue}</p>
                                    <p className="text-[10px] text-slate-400 leading-relaxed">{spot.business_impact}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-xs text-slate-500 italic mt-2">Nenhum ponto cego analisado.</div>
                    )}
                </div>

                {/* Action Plan */}
                <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-5">
                    <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">
                        <Rocket className="w-4 h-4" /> Plano de Otimização Executivo
                    </h4>

                    {findings.action_plan && findings.action_plan.length > 0 ? (
                        <div className="space-y-3">
                            {findings.action_plan.map((action, idx) => (
                                <div key={idx} className="flex gap-3 items-start bg-[#050508] p-3 rounded-lg border border-white/5">
                                    <span className={`mt-0.5 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full ${action.priority.toUpperCase() === 'URGENTE' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                                        }`}>
                                        {action.priority.toUpperCase()}
                                    </span>
                                    <p className="text-xs text-slate-300 leading-relaxed flex-1">{action.action}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-xs text-slate-500 italic">Estrutura atende aos requisitos mínimos.</div>
                    )}

                    {/* Leftovers / Extra Opportunities from old model if they exist */}
                    {findings.ui_improvements && findings.ui_improvements.length > 0 && !findings.action_plan && (
                        <div className="space-y-2 mt-4">
                            {findings.ui_improvements.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <p className="text-xs text-slate-300">{item}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
