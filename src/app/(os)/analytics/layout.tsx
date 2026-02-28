"use client";
import React from 'react';
import { SubSidebar } from '@/core/components/SubSidebar';
import {
    BarChart3,
    Target,
    Users,
    TrendingUp,
    Zap,
    Scale
} from 'lucide-react';

const ANALYTICS_ITEMS = [
    { id: 'q4', label: 'Previsão Q4', href: '/analytics', icon: TrendingUp },
    { id: 'vendas', label: 'Performance Vendas', href: '/analytics/vendas', icon: Zap },
    { id: 'marketing', label: 'ROI Marketing', href: '/analytics/marketing', icon: BarChart3 },
    { id: 'okr', label: 'Objetivos & OKRs', href: '/analytics/okr', icon: Target },
    { id: 'equipe', label: 'Cultura & Time', href: '/analytics/equipe', icon: Users },
    { id: 'juridico', label: 'Health Score', href: '/analytics/score', icon: Scale },
];

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <SubSidebar title="Módulo Analytics" items={ANALYTICS_ITEMS} />
            <main className="flex-1 min-h-[calc(100vh-64px)] p-8">
                {children}
            </main>
        </div>
    );
}
