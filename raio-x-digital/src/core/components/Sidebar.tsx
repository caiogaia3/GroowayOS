"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Target,
    Briefcase,
    Database,
    Wallet,
    BookOpen,
    Settings,
    LogOut
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Hub de Ferramentas", icon: Target, path: "/tools" },
    { name: "Pipeline", icon: Briefcase, path: "/pipeline" },
    { name: "Inteligência de Mercado", icon: Database, path: "/scraper" },
    { name: "Tesouraria", icon: Wallet, path: "/finance" },
    { name: "Wiki SOPs", icon: BookOpen, path: "/wiki" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 sidebar-glass flex flex-col pt-8 pb-6 px-4 z-50">
            {/* Logo Area */}
            <div className="mb-12 px-2 flex items-center gap-3">
                <img src="/logo-gw.png" alt="Grooway" className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-brand-purple/20" />
                <div>
                    <h1 className="text-white font-bold tracking-wide">GroowayOS</h1>
                    <p className="text-slate-400 text-xs">Agency Control</p>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <Link key={item.path} href={item.path} className="block relative">
                            {isActive && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                                }`}>
                                <item.icon className={`w-5 h-5 ${isActive ? "text-brand-cyan" : ""}`} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </div>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto space-y-2 pt-6 border-t border-white/5">
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium text-sm">Configuração</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Sair</span>
                </button>
            </div>
        </aside>
    );
}
