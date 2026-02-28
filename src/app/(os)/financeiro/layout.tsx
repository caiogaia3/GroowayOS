"use client";
import React from 'react';
import { SubSidebar } from '@/core/components/SubSidebar';
import {
    LayoutDashboard,
    ArrowUpCircle,
    ArrowDownCircle,
    FileText,
    Settings,
    ShieldCheck
} from 'lucide-react';

const FINANCE_ITEMS = [
    { id: 'dashboard', label: 'Visão Geral', href: '/financeiro', icon: LayoutDashboard },
    { id: 'receber', label: 'Contas a Receber', href: '/financeiro/receber', icon: ArrowUpCircle },
    { id: 'pagar', label: 'Contas a Pagar', href: '/financeiro/pagar', icon: ArrowDownCircle },
    { id: 'dre', label: 'DRE / Fluxo', href: '/financeiro/dre', icon: FileText },
    { id: 'notas', label: 'Notas Fiscais', href: '/financeiro/notas', icon: ShieldCheck },
    { id: 'config', label: 'Configurações', href: '/financeiro/config', icon: Settings },
];

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <SubSidebar title="Módulo Financeiro" items={FINANCE_ITEMS} />
            <main className="flex-1 min-h-[calc(100vh-64px)] p-8">
                {children}
            </main>
        </div>
    );
}
