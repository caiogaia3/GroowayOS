"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SubSidebarItem {
    id: string;
    label: string;
    href: string;
    icon: LucideIcon;
}

interface SubSidebarProps {
    title: string;
    items: SubSidebarItem[];
}

export function SubSidebar({ title, items }: SubSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-white/5 bg-white/[0.01] backdrop-blur-xl h-[calc(100vh-64px)] sticky top-16 hidden lg:block overflow-y-auto no-scrollbar">
            <div className="p-6 space-y-8">
                <div>
                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
                        {title}
                    </h2>
                    <nav className="space-y-1">
                        {items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold transition-all group relative overflow-hidden ${isActive
                                            ? 'bg-white/5 text-white shadow-xl'
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="subSidebarActive"
                                            className="absolute left-0 w-1 h-3 bg-cyan rounded-r-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </aside>
    );
}
