"use client"

import { Proposal } from "@/features/proposals/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Brain, Search, BarChart3, Clock, Rocket, Shield, Activity, FileText, ChevronRight, ChevronLeft, Maximize } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
    proposal: Proposal;
    content: any;
}

export default function PresentProposalClient({ proposal, content }: Props) {
    const header = content.header || {};
    const sections = content.sections || [];

    // The slides array will contain the header as the first slide, and then each section.
    const slides = [
        { type: 'header', content: header },
        ...sections
    ];

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const nextSlide = () => {
        setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
    };

    const prevSlide = () => {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [slides.length]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const getIcon = (iconName: string, className: string = "w-6 h-6") => {
        switch (iconName) {
            case 'search': return <Search className={className} />;
            case 'brain': return <Brain className={className} />;
            case 'chart': return <BarChart3 className={className} />;
            case 'check': return <Check className={className} />;
            case 'clock': return <Clock className={className} />;
            case 'shield': return <Shield className={className} />;
            case 'activity': return <Activity className={className} />;
            default: return <Check className={className} />;
        }
    };

    const currentSlide = slides[currentSlideIndex];

    return (
        <main className="min-h-screen bg-[#020617] text-slate-50 font-sans relative overflow-hidden flex flex-col justify-center">
            {/* Background Assets */}
            <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#020617] to-[#020617] pointer-events-none" />
            <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-white/[0.02] opacity-30 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            {/* Top Bar Navigation */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white/50 text-sm font-medium tracking-widest uppercase">
                    MODO APRESENTAÇÃO
                </div>
                <button
                    onClick={toggleFullscreen}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 text-white"
                    title="Tela Cheia"
                >
                    <Maximize className="w-4 h-4" />
                </button>
            </div>

            {/* Slide Content */}
            <div className="relative z-10 w-full h-full flex-grow flex items-center justify-center p-8 sm:p-16 max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlideIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full flex justify-center"
                    >

                        {/* HEADER SLIDE */}
                        {currentSlide.type === 'header' && (
                            <div className="text-center w-full max-w-4xl mx-auto">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-bold uppercase tracking-widest mb-10">
                                    Projeto Estratégico Exclusivo
                                </div>
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
                                    {currentSlide.content.scope_headline || "Estratégia Definitiva de Escala"}
                                </h1>
                                <p className="text-2xl text-slate-400 font-medium max-w-3xl mx-auto mb-12">
                                    Desenvolvido para <strong className="text-white">{currentSlide.content.client_company || currentSlide.content.client_name}</strong>
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-base text-slate-500 font-mono mt-12 bg-white/5 w-fit mx-auto px-8 py-4 rounded-full border border-white/10">
                                    <span>P / {currentSlide.content.proponent}</span>
                                    <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700" />
                                    <span>V / {new Date(proposal.created_at).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                        )}

                        {/* CONCEPT SLIDE */}
                        {currentSlide.type === 'concept' && (
                            <div className="w-full max-w-5xl">
                                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-12 border-l-4 border-indigo-500 pl-6">
                                    {currentSlide.title}
                                </h2>
                                <div className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-10 sm:p-16 backdrop-blur-sm text-xl lg:text-2xl text-slate-300 leading-relaxed sm:leading-loose space-y-6 shadow-2xl">
                                    {currentSlide.content.split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
                                </div>
                            </div>
                        )}

                        {/* STRATEGY PILLARS SLIDE */}
                        {currentSlide.type === 'strategy_pillars' && (
                            <div className="w-full max-w-6xl">
                                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-10 border-l-4 border-indigo-500 pl-6">
                                    {currentSlide.title}
                                </h2>
                                {currentSlide.intro && <p className="text-slate-400 mb-12 text-xl max-w-4xl">{currentSlide.intro}</p>}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {currentSlide.pillars?.map((pillar: any, i: number) => (
                                        <div key={i} className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 hover:border-indigo-500/50 hover:bg-white/[0.08] transition-all transform hover:-translate-y-2">
                                            <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                                                {getIcon(pillar.icon, "w-8 h-8")}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
                                            <p className="text-slate-400 text-base leading-relaxed">{pillar.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* MODULES SLIDE */}
                        {currentSlide.type === 'modules' && (
                            <div className="w-full max-w-5xl">
                                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-12 border-l-4 border-indigo-500 pl-6">
                                    {currentSlide.title}
                                </h2>
                                <div className="space-y-8">
                                    {currentSlide.modules?.map((mod: any, i: number) => (
                                        <div key={i} className="bg-black/60 border border-white/5 rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-sm">
                                            <div className="mb-8 border-b border-white/10 pb-6">
                                                <h3 className="text-3xl font-bold text-indigo-300 mb-3">{mod.name}</h3>
                                                {mod.description && <p className="text-slate-400 text-lg">{mod.description}</p>}
                                            </div>
                                            <ul className="grid sm:grid-cols-2 gap-6">
                                                {mod.items?.map((item: any, j: number) => (
                                                    <li key={j} className="flex gap-4 items-start">
                                                        <div className="mt-1 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                                            {getIcon(item.icon, "w-4 h-4")}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-white text-lg">{item.label}</h4>
                                                            <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.detail}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* INVESTMENT SLIDE */}
                        {currentSlide.type === 'investment' && (
                            <div className="w-full max-w-6xl">
                                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-16 border-l-4 border-emerald-500 pl-6">
                                    {currentSlide.title}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
                                    {currentSlide.cards?.map((card: any, i: number) => (
                                        <div key={i} className={`rounded-[2.5rem] p-10 lg:p-12 relative overflow-hidden group border ${card.recurrence === 'monthly' ? 'bg-indigo-950/40 border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.15)] scale-105 z-10' : 'bg-white/5 border-white/10'}`}>
                                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Brain className="w-64 h-64" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                                                {card.label}
                                            </p>
                                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8">{card.title}</h3>

                                            <div className="mb-10 pb-10 border-b border-white/10">
                                                {card.price != null ? (
                                                    <div className="flex items-end gap-2">
                                                        <span className="text-xl text-slate-400 font-medium mb-1">R$</span>
                                                        <span className="text-5xl lg:text-6xl font-black text-white">{card.price.toLocaleString('pt-BR')}</span>
                                                        {card.recurrence === 'monthly' && <span className="text-lg text-slate-400 mb-2">/mês</span>}
                                                    </div>
                                                ) : (
                                                    <span className="text-4xl font-black text-white">Sob Consulta</span>
                                                )}
                                            </div>

                                            <ul className="space-y-4">
                                                {card.items?.map((item: string, j: number) => (
                                                    <li key={j} className="flex items-start gap-4 text-base lg:text-lg text-slate-300">
                                                        <Check className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 bg-emerald-500/10 rounded-full p-1" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TIMELINE SLIDE */}
                        {currentSlide.type === 'timeline' && (
                            <div className="w-full max-w-4xl mx-auto">
                                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-16 border-l-4 border-amber-500 pl-6">
                                    {currentSlide.title}
                                </h2>
                                <div className="relative border-l-4 border-slate-800/80 ml-8 space-y-12 py-8">
                                    {currentSlide.stages?.map((stage: any, i: number) => (
                                        <div key={i} className="relative pl-12 group">
                                            <div className="absolute -left-[14px] top-2 w-6 h-6 rounded-full bg-amber-500 ring-8 ring-[#020617] group-hover:scale-125 transition-transform" />
                                            <h3 className="font-bold text-white text-2xl flex items-center gap-6 mb-3">
                                                {stage.name}
                                                <span className="text-sm font-mono px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">{stage.deadline}</span>
                                            </h3>
                                            <p className="text-lg text-slate-400 leading-relaxed bg-white/[0.02] p-6 rounded-2xl border border-white/5">{stage.action}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* VALIDITY / CTA SLIDE */}
                        {currentSlide.type === 'validity' && (
                            <div className="w-full max-w-5xl text-center">
                                <div className="bg-gradient-to-br from-indigo-900/60 to-black/80 border border-indigo-500/40 rounded-[3rem] p-12 lg:p-20 shadow-[0_0_100px_rgba(99,102,241,0.2)] backdrop-blur-xl">
                                    <h3 className="text-4xl lg:text-6xl font-light text-white mb-10 leading-tight">
                                        Próximos passos para <br /><strong className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">dominarmos o seu mercado.</strong>
                                    </h3>

                                    <div className="flex justify-center mb-16">
                                        <ul className="space-y-6 text-left inline-block">
                                            {currentSlide.steps?.map((step: any, i: number) => (
                                                <li key={i} className="flex items-center gap-6 text-slate-300 bg-white/5 pr-8 py-3 rounded-full border border-white/10">
                                                    <div className="w-12 h-12 rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/50 flex items-center justify-center shrink-0 ml-2">
                                                        <span className="font-bold text-lg">{i + 1}</span>
                                                    </div>
                                                    <div>
                                                        <strong className="text-white text-lg block">{step.label}</strong>
                                                        <span className="text-indigo-200">{step.detail}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="flex flex-wrap justify-center gap-4">
                                            <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="px-10 py-5 bg-white text-black font-extrabold text-xl rounded-full flex items-center justify-center gap-4 hover:scale-105 hover:bg-slate-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                                                {currentSlide.cta || "Avançar para Implementação"} <ArrowRight className="w-6 h-6" />
                                            </a>
                                        </div>
                                        <p className="mt-8 text-sm text-slate-400 flex items-center gap-2 bg-black/40 px-6 py-2 rounded-full">
                                            <Clock className="w-4 h-4" />
                                            Proposta válida até {new Date(proposal.expires_at!).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 w-full p-8 flex justify-between items-center z-50">
                <div className="flex items-center gap-4 text-slate-500 font-mono text-sm bg-black/50 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
                    <span className="text-white">{(currentSlideIndex + 1).toString().padStart(2, '0')}</span>
                    <span className="opacity-50">/</span>
                    <span>{slides.length.toString().padStart(2, '0')}</span>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={prevSlide}
                        disabled={currentSlideIndex === 0}
                        className={`w-14 h-14 rounded-full flex items-center justify-center border backdrop-blur-md transition-all ${currentSlideIndex === 0 ? 'border-white/5 text-white/20 bg-black/20' : 'border-white/20 text-white bg-white/5 hover:bg-white/10 hover:scale-110'}`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={currentSlideIndex === slides.length - 1}
                        className={`w-14 h-14 rounded-full flex items-center justify-center border backdrop-blur-md transition-all animate-pulse ${currentSlideIndex === slides.length - 1 ? 'border-white/5 text-white/20 bg-black/20 animate-none' : 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 hover:scale-110 hover:text-white'}`}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* ProgressBar */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
                <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </main>
    );
}
