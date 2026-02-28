import React from 'react';
import {
    Briefcase, Database, Smartphone, Target,
    Instagram, Building2, KeyRound, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Tab {
    id: string;
    label: string;
    icon: React.ElementType;
}

interface ResultsTabsProps {
    activeTab: string;
    onTabChange: (id: string) => void;
}

export const TABS: Tab[] = [
    { id: 'cmo', label: 'Veredito', icon: Briefcase },
    { id: 'tracking', label: 'Dados/Ads', icon: Database },
    { id: 'performance', label: 'UX/Performance', icon: Smartphone },
    { id: 'market', label: 'Estratégia/ICP', icon: Target },
    { id: 'social', label: 'Social Media', icon: Instagram },
    { id: 'gmb', label: 'Google Maps', icon: Building2 },
    { id: 'keywords', label: 'Keywords', icon: KeyRound },
    { id: 'commercial', label: 'Plano Comercial', icon: Activity },
];

export function ResultsTabs({ activeTab, onTabChange }: ResultsTabsProps) {
    return (
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-white/[0.02] border border-white/5 rounded-2xl no-scrollbar mb-8 backdrop-blur-md">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap group relative overflow-hidden ${activeTab === tab.id
                        ? 'bg-[#A855F7] text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <tab.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'text-white' : 'text-slate-500'}`} />
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="activeTabGlow"
                            className="absolute inset-0 bg-white/10 blur-sm -z-10"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
