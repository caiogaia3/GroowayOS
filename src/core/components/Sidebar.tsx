"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Zap, Briefcase, Contact, DollarSign, TerminalSquare, Settings, LogOut } from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/leads", label: "Leads", icon: Users },
    { href: "/hub", label: "HUB", icon: Zap },
    { href: "#crm", label: "CRM", icon: Briefcase },
    { href: "#clientes", label: "Clientes", icon: Contact },
    { href: "#financeiro", label: "Financeiro", icon: DollarSign },
    { href: "#prompts", label: "Prompts", icon: TerminalSquare },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 h-screen w-20 md:w-20 glass-panel flex flex-col items-center py-8 z-50 transition-all duration-500 overflow-hidden">
            {/* Brand / Logo Node */}
            <div className="w-12 h-12 bg-gradient-to-br from-[#A855F7] to-[#06B6D4] rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.4)] mb-10 shrink-0">
                <Zap className="text-white w-7 h-7" />
            </div>

            {/* Navigation Icons Only (Stitch Style) */}
            <nav className="flex-1 flex flex-col gap-6 px-3">
                {navItems.map((item) => {
                    const isFuture = item.href.startsWith('#');
                    const isActive = !isFuture && pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group border ${isActive
                                ? "bg-white/10 text-[#A855F7] border-white/20 shadow-lg"
                                : "text-slate-500 hover:text-[#06B6D4] border-transparent hover:bg-white/5"
                                }`}
                            title={item.label}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? "text-[#A855F7]" : "group-hover:text-[#06B6D4]"}`} />
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto flex flex-col gap-6 px-3">
                <Link href="#settings" className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-500 hover:text-white transition-all">
                    <Settings className="w-5 h-5" />
                </Link>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-500 hover:text-red-400 transition-all">
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </aside>
    );
}
