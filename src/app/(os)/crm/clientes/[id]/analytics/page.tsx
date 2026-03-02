"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  PieChart,
  ArrowUpRight,
  MessageSquare,
  Zap,
  ChevronDown,
  Calendar,
  Filter,
  Maximize2,
  Sparkles,
  Search,
  Plus
} from "lucide-react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { getClientMetrics } from "../../../../../actions/client_metrics";
import { askGeminiAnalytics } from "../../../../../actions/ask_gemini_analytics";

export default function ClientAnalyticsPage({ params }: { params: { id: string } }) {
  const [aiQuery, setAiQuery] = useState("");
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);

  const handleGeminiQuery = async (predefinedQuery?: string) => {
    const queryToUse = predefinedQuery || aiQuery;
    if (!queryToUse.trim()) return;

    setAiQuery(queryToUse);
    setGeminiLoading(true);
    setGeminiResponse(null);

    const res = await askGeminiAnalytics(queryToUse, metrics);
    if (res.success && res.text) {
      setGeminiResponse(res.text);
    } else {
      setGeminiResponse("Desculpe, não consegui processar a análise no momento. Tente novamente.");
    }
    setGeminiLoading(false);
  };

  useEffect(() => {
    async function loadData() {
      const response = await getClientMetrics(params.id);
      if (response && response.success) {
        setMetrics(response.data);
      }
      setLoading(false);
    }
    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-blue-500 animate-ping"></div>
      </div>
    );
  }

  // Map the backend data to the UI widget format
  const topWidgets = [
    { label: "Investimento Total", value: `R$ ${metrics.meta.spend_brl + metrics.google.spend_brl}`, change: "+12.4%", color: "text-blue-400", trend: "up" },
    { label: "Oportunidades (Sheets)", value: metrics.conversions.total, change: "+8.3%", color: "text-emerald-400", trend: "up" },
    { label: "CPA Médio Real", value: `R$ ${metrics.conversions.cpl_brl}`, change: "-5.2%", color: "text-purple-400", trend: "down" },
    { label: "ROI Multiplicador", value: `${metrics.roi_multiplier}x`, change: "+41.7%", color: "text-orange-400", trend: "up" },
    { label: "Taxa de Conversão", value: "39,67%", change: "+16.6%", color: "text-pink-400", trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-[#050508] p-4 lg:p-6 text-white font-sans selection:bg-purple-500/30">
      {/* Header Section - TradUp Inspired */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-bold text-blue-400 tracking-wider uppercase">
              Premium Analytics
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">Relatório de Marketing</h1>
          </div>
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Dados em tempo real • <span className="opacity-70 italic truncate">Cliente {params.id}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-medium">
            <Calendar className="w-4 h-4 text-blue-400" />
            23 Mai 2025 - 02 Mar 2026
            <ChevronDown className="w-3 h-3 opacity-50" />
          </button>
          <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/10">
            <Filter className="w-4 h-4" />
          </button>
          <div className="h-6 w-px bg-white/10 mx-1"></div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all text-sm font-bold shadow-lg shadow-blue-600/20 active:scale-95">
            <Plus className="w-4 h-4" />
            Novo Widget
          </button>
        </div>
      </div>

      {/* KPI Grid - High Glow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {topWidgets.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl -z-10 transition-all group-hover:scale-[1.02]" />
            <div className="p-6 border border-white/10 rounded-3xl backdrop-blur-3xl overflow-hidden relative">
              {/* Subtle top light effect */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/5 blur-3xl group-hover:bg-white/10 transition-all" />

              <div className="flex flex-col gap-4">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-none">
                  {m.label}
                </p>
                <div className="flex items-end justify-between gap-2">
                  <h3 className={`text-2xl font-black tracking-tighter ${m.color}`}>
                    {m.value}
                  </h3>
                  <div className={`flex items-center gap-1 text-[10px] font-black px-1.5 py-0.5 rounded-full ${m.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-blue-400 bg-blue-400/10'
                    }`}>
                    {m.trend === 'up' ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingUp className="w-2.5 h-2.5 rotate-180" />}
                    {m.change}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Section - Grid Stack Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Central Performance Chart - TradUp style */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-3xl relative overflow-hidden group">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h2 className="text-xl font-black mb-1">Performance Histórica</h2>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Meta Ads vs Google Ads</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <span className="text-[10px] font-bold uppercase text-slate-300 tracking-wider">Meta Ads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                <span className="text-[10px] font-bold uppercase text-slate-300 tracking-wider">Google Ads</span>
              </div>
              <button className="ml-4 p-2 hover:bg-white/10 rounded-xl transition-all">
                <Maximize2 className="w-4 h-4 opacity-40" />
              </button>
            </div>
          </div>

          {/* Large Area Graph Placeholder - Real SVG representation */}
          <div className="h-[320px] w-full mt-4 flex items-end justify-between relative">
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Grid Lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" y1={`${i * 25}%`} x2="100%" y2={`${i * 25}%`} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
              ))}

              {/* Meta Line (Blue) */}
              <path
                d="M0,80 Q100,20 200,90 T400,40 T600,100 T800,30 T1000,80"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
              />
              <path
                d="M0,80 Q100,20 200,90 T400,40 T600,100 T800,30 T1000,80 L1000,320 L0,320 Z"
                fill="url(#gradient-blue)"
                fillOpacity="0.1"
              />

              {/* Google Line (Indigo) */}
              <path
                d="M0,60 Q150,100 300,30 T500,80 T750,20 T1000,60"
                fill="none"
                stroke="#6366F1"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]"
              />

              <defs>
                <linearGradient id="gradient-blue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Data points */}
              <circle cx="800" cy="30" r="6" fill="#3B82F6" className="animate-pulse shadow-lg" />
              <rect x="790" y="-10" width="100" height="30" rx="6" fill="white" fillOpacity="0.1" />
              <text x="800" y="10" fontSize="10" fontWeight="bold" fill="white">R$ 1.362,59</text>
            </svg>

            {/* Legend Labels */}
            <div className="absolute -bottom-6 flex w-full justify-between px-2">
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map(m => (
                <span key={m} className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Info Stack - Assets/Insights */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* ROI Focus Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-8 shadow-2xl shadow-indigo-900/40 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute top-0 right-0 p-8">
              <Sparkles className="w-8 h-8 text-white/40" />
            </div>

            <div>
              <h4 className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Investimento Total Q4</h4>
              <h3 className="text-4xl font-extrabold tracking-tighter italic">R$ {metrics.meta.spend_brl + metrics.google.spend_brl}</h3>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <span className="text-[9px] font-bold uppercase text-white/60 block mb-1">ROI Global</span>
                <span className="text-lg font-black text-white">+{metrics.roi_multiplier}x</span>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <span className="text-[9px] font-bold uppercase text-white/60 block mb-1">Lucro Estimado</span>
                <span className="text-lg font-black text-white">R$ {metrics.estimated_revenue_brl}</span>
              </div>
            </div>
          </div>

          {/* Top Sources List */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-7 backdrop-blur-3xl flex-1">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Fontes de Alta Performance
            </h3>

            <div className="space-y-5">
              {[
                { name: "Facebook Video Ads", cpl: `R$ ${(metrics.conversions.cpl_brl * 0.8).toFixed(2)}`, quality: 92, icon: "FB" },
                { name: "Google Search - Core", cpl: `R$ ${(metrics.conversions.cpl_brl * 1.1).toFixed(2)}`, quality: 85, icon: "G" },
                { name: "Instagram Remarketing", cpl: `R$ ${(metrics.conversions.cpl_brl * 0.6).toFixed(2)}`, quality: 98, icon: "IG" },
                { name: "YouTube Brand Awareness", cpl: `R$ ${(metrics.conversions.cpl_brl * 1.5).toFixed(2)}`, quality: 72, icon: "YT" }
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-[10px] text-slate-400 group-hover:border-blue-500/50 group-hover:text-white transition-all">
                      {s.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{s.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{s.cpl} per lead</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-400">{s.quality}%</span>
                    <span className="block text-[8px] text-slate-600 font-bold uppercase">MATCH</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - AI Command Center & Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gemini AI Console - NLP Command Center */}
        <div className="lg:col-span-7 bg-[#0b0b14] border border-blue-500/20 rounded-[32px] p-8 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[2px_0_15px_rgba(59,130,246,0.4)]" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">AI Command Center</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">GEMINI 3.1 PRO • TEXT-TO-INSIGHT</p>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGeminiQuery(); } }}
              placeholder="Ex: 'Compare o ROI da Brisa Laser entre Meta e Google Ads nos últimos 15 dias e sugira um novo widget de barras'..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 pb-16 text-sm focus:outline-none focus:border-blue-500/50 min-h-[120px] transition-all placeholder:text-slate-600 resize-none z-10 relative"
            />
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
              <button
                onClick={() => handleGeminiQuery()}
                disabled={geminiLoading}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 rounded-xl transition-all text-xs font-black uppercase tracking-wider">
                {geminiLoading ? 'Processando...' : 'Executar Análise'}
                {!geminiLoading && <ArrowUpRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Gemini Response Area */}
          {geminiResponse && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-sm leading-relaxed prose prose-invert max-w-none"
            >
              <ReactMarkdown>{geminiResponse}</ReactMarkdown>
            </motion.div>
          )}

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["Ver ROI Quinzenal", "Custo por Mensagem", "Origem de Leads", "Performance de Criativos"].map(s => (
              <button
                key={s}
                onClick={() => handleGeminiQuery(s)}
                className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white hover:border-blue-500/50 transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Demographic/Secondary Data */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-3xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-black tracking-tight italic uppercase">Gênero e Origem</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Looker Synced Data</p>
            </div>
            <PieChart className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="flex items-center gap-8 h-40">
            {/* Simple SVG Donut Placeholder */}
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#1c1c2b" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#3B82F6" strokeWidth="4" strokeDasharray="60 40" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#6366F1" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-60" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-xl font-black">59%</span>
                <span className="text-[8px] text-slate-500 font-bold uppercase">Female</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Feminino</span>
                </div>
                <span className="text-xs font-black">59.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Masculino</span>
                </div>
                <span className="text-xs font-black">30.5%</span>
              </div>
              <div className="flex justify-between items-center opacity-40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Indeterminado</span>
                </div>
                <span className="text-xs font-black">10.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Footer Indicator */}
      <div className="mt-12 flex justify-between items-center px-4 opacity-30 group hover:opacity-100 transition-all duration-700">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em]">GroowayOS Performance Engine • v2.1.0</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-[9px] font-black uppercase">Meta API Connected</span>
          </div>
          <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            <span className="text-[9px] font-black uppercase">Google Ads Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
