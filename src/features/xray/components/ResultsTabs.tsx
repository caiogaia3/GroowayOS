import React from 'react';
import {
    Briefcase, Database, Smartphone, Target,
    Instagram, Building2, KeyRound, Activity
} from 'lucide-react';

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
        <div className="flex overflow-x-auto gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl no-scrollbar mb-8 backdrop-blur-md">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-3 px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeTab === tab.id
                        ? 'bg-[#A855F7] text-white border-[#A855F7]/30 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'text-slate-500 border-transparent hover:text-white hover:bg-white/5'
                        }`}
                >
                    <tab.icon className={`w-4 h-4 transition-colors ${activeTab === tab.id ? 'text-white' : 'text-slate-600 group-hover:text-white'}`} />
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
