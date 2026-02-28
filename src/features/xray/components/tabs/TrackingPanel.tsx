"use client";
import React from 'react';
import { Database } from 'lucide-react';
import { MetricCard } from '../MetricCard';

interface TrackingPanelProps {
    trackingSkill: {
        score: number;
        findings: {
            has_ga4_base: boolean;
            has_gtm: boolean;
            has_meta_pixel: boolean;
        };
    };
    getScoreBadge: (score: number) => React.ReactNode;
}

export const TrackingPanel = ({ trackingSkill, getScoreBadge }: TrackingPanelProps) => {
    if (!trackingSkill) return null;

    return (
        <div className="liquid-glass p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-black/20 border-white/5 backdrop-blur-xl rounded-2xl">
            <h3 className="text-lg font-bold mb-5 flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2 text-slate-100"><Database className="w-5 h-5 text-indigo-400" /> Infraestrutura de Dados</span>
                {getScoreBadge(trackingSkill.score)}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    label="GA4 Base"
                    value={trackingSkill.findings.has_ga4_base ? 'ATIVO' : 'NÃO DETECTADO'}
                    status={trackingSkill.findings.has_ga4_base}
                    tooltip="Google Analytics 4: O padrão ouro para rastreamento de comportamento do usuário e conversões."
                />
                <MetricCard
                    label="GTM Control"
                    value={trackingSkill.findings.has_gtm ? 'ATIVO' : 'LIVRE'}
                    status={trackingSkill.findings.has_gtm}
                    tooltip="Google Tag Manager: Gerenciador central de scripts. Permite agilidade total em campanhas sem mexer no código."
                />
                <MetricCard
                    label="Meta Pixel"
                    value={trackingSkill.findings.has_meta_pixel ? 'ATIVO' : 'NÃO DETECTADO'}
                    status={trackingSkill.findings.has_meta_pixel}
                    tooltip="Pixel do Facebook: Essencial para remarketing e mensuração de vendas vindas do Instagram/Facebook."
                />
            </div>
            {/* Aditional sections from trackingSkill if needed */}
        </div>
    );
};
