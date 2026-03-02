"use client";

import { motion } from "framer-motion";
import { BarChart3, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

const LOOKER_URL = "https://lookerstudio.google.com/embed/reporting/6577fa33-cf6c-44c4-8b94-dcc26630a9a5/page/p_ffqfubejnd";

export default function ClientAnalyticsPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Small delay to simulate system check
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center animate-pulse">
          <BarChart3 className="w-6 h-6 text-blue-500" />
        </div>
        <p className="text-[10px] font-black p-2 text-slate-500 uppercase tracking-[0.3em] animate-pulse">Sincronizando Looker Studio...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#050508] flex flex-col overflow-hidden">
      {/* Header bar simplified */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0A0A0F]/50 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <a
            href="/crm"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-all transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </a>
          <div>
            <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
              Performance Intelligence <span className="text-slate-600 font-medium">/</span> <span className="text-blue-500 uppercase text-xs tracking-widest px-2 py-0.5 bg-blue-500/10 rounded">Brisa Laser</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase text-emerald-400 tracking-widest">Real-time mirroring</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Area */}
      <div className="flex-1 relative bg-[#050508]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full p-2 lg:p-4 pb-0"
        >
          <div className="w-full h-full bg-[#0A0A0F] border border-white/10 rounded-t-[24px] lg:rounded-t-[32px] overflow-hidden relative shadow-2xl">
            <iframe
              src={LOOKER_URL}
              className="w-full h-full border-none"
              allowFullScreen
              loading="lazy"
            />

            {/* Minimalist Overlay to blend with OS */}
            <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-t-[24px] lg:rounded-t-[32px] z-10" />
          </div>
        </motion.div>
      </div>

      {/* Luxury Footer Indicator */}
      <div className="py-3 px-6 flex justify-between items-center opacity-20 shrink-0 border-t border-white/5 bg-[#050508]">
        <p className="text-[8px] font-bold uppercase tracking-[0.4em]">Looker Engine Integration • Enterprise Mirror v3.0</p>
        <div className="flex items-center gap-4">
          <span className="text-[7px] font-black uppercase tracking-widest">GroowayOS v2.5</span>
        </div>
      </div>
    </div>
  );
}
