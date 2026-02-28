"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/core/lib/supabase';
import { CMOPanel } from '@/features/xray/components/tabs/CMOPanel';
import { TrackingPanel } from '@/features/xray/components/tabs/TrackingPanel';
import { PerformancePanel } from '@/features/xray/components/tabs/PerformancePanel';
import { MarketPanel } from '@/features/xray/components/tabs/MarketPanel';
import { SocialPanel } from '@/features/xray/components/tabs/SocialPanel';
import { GMBPanel } from '@/features/xray/components/tabs/GMBPanel';
import { KeywordsPanel } from '@/features/xray/components/tabs/KeywordsPanel';
import { Activity, Briefcase, Database, Smartphone, Target, Instagram, Building2, KeyRound } from 'lucide-react';
import { trackViewAction } from '@/features/xray/actions/track-view';

export default function PublicReportPage() {
    const params = useParams();
    const id = params.id as string;

    const [reportData, setReportData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('cmo');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReport() {
            if (!id) return;
            const { data, error } = await supabase
                .from('diagnostics')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setReportData(data.report_data);
                // Track usage asynchronously
                trackViewAction({ id, type: 'diagnostic' });
            }
            setLoading(false);
        }
        fetchReport();
    }, [id]);

    const getScoreBadge = (score: number) => (
        <div className={`px-3 py-1 rounded-full text-xs font-black bg-white/5 border ${score >= 70 ? 'text-emerald-400 border-emerald-500/30' :
            score >= 40 ? 'text-orange-400 border-orange-500/30' :
                'text-red-400 border-red-500/30'
            }`}>
            SCORE: {score}/100
        </div>
    );

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!reportData) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
            <h1 className="text-2xl font-black">Relatório não encontrado ou link expirado.</h1>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200 p-4 sm:p-12">
            <div className="max-w-6xl mx-auto space-y-12">
                <header className="border-b border-white/10 pb-10">
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                        Dossiê <span className="text-brand-purple">Estratégico</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">
                        Preparado Exclusivamente para: {reportData.company_name}
                    </p>
                </header>

                <div className="flex overflow-x-auto gap-2 p-1 bg-black/40 border border-white/5 rounded-2xl no-scrollbar">
                    {[
                        { id: 'cmo', label: 'Veredito', icon: Briefcase },
                        { id: 'tracking', label: 'Dados/Ads', icon: Database },
                        { id: 'performance', label: 'UX/Performance', icon: Smartphone },
                        { id: 'market', label: 'Estratégia/ICP', icon: Target },
                        { id: 'social', label: 'Social Media', icon: Instagram },
                        { id: 'gmb', label: 'Google Maps', icon: Building2 },
                        { id: 'keywords', label: 'Keywords', icon: KeyRound },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-brand-purple text-white' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>

                <div className="min-h-[500px] bg-white/[0.02] border border-white/5 p-8 rounded-[40px] backdrop-blur-3xl shadow-2xl">
                    {activeTab === 'cmo' && <CMOPanel cmoSkill={reportData?.skills_results.find((s: any) => s.id === 'cmo')} getScoreBadge={getScoreBadge} />}
                    {activeTab === 'tracking' && <TrackingPanel trackingSkill={reportData?.skills_results.find((s: any) => s.id === 'tracking')} getScoreBadge={getScoreBadge} />}
                    {activeTab === 'performance' && <PerformancePanel performanceSkill={reportData?.skills_results.find((s: any) => s.id === 'performance')} getScoreBadge={getScoreBadge} />}
                    {activeTab === 'market' && <MarketPanel marketSkill={reportData?.skills_results.find((s: any) => s.id === 'market')} />}
                    {activeTab === 'social' && <SocialPanel socialSkill={reportData?.skills_results.find((s: any) => s.id === 'social')} getScoreBadge={getScoreBadge} />}
                    {activeTab === 'gmb' && <GMBPanel gmbSkill={reportData?.skills_results.find((s: any) => s.id === 'gmb')} getScoreBadge={getScoreBadge} />}
                    {activeTab === 'keywords' && <KeywordsPanel keywordSkill={reportData?.skills_results.find((s: any) => s.id === 'keywords')} getScoreBadge={getScoreBadge} />}
                </div>

                <footer className="text-center pt-20 opacity-30">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">Gerado por GroowayOS • Inteligência Competitiva</p>
                </footer>
            </div>
        </main>
    );
}
