"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Download,
    TrendingUp,
    CheckCircle,
    Clock,
    Star,
    ArrowRight,
    Target,
    Zap,
    Users,
    Loader2,
    X,
} from "lucide-react";
import type { ValuePropositionData } from "@/features/xray-auditor/actions/get_value_proposition";

interface ValuePropositionModalProps {
    data: ValuePropositionData;
    companyName: string;
    onClose: () => void;
}

export function ValuePropositionModal({
    data,
    companyName,
    onClose,
}: ValuePropositionModalProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        try {
            // Use browser print dialog with print-specific CSS
            const printWindow = window.open("", "_blank");
            if (!printWindow) return;

            const html = generatePrintHTML(data, companyName, window.location.origin);
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                setIsDownloading(false);
            }, 800);
        } catch (e) {
            console.error(e);
            setIsDownloading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-4 py-8"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-4xl bg-[#080c14] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Gradient header */}
                    <div className="relative bg-gradient-to-br from-violet-900/60 via-indigo-900/40 to-[#080c14] px-8 pt-8 pb-6 border-b border-white/10">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                        </div>

                        {/* Close btn */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        >
                            <X className="w-4 h-4 text-slate-400" />
                        </button>

                        {/* Logo / branding */}
                        <div className="relative flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">
                                    Grooway — Marketing de Performance
                                </p>
                                <p className="text-xs text-slate-500">
                                    Proposta Estratégica Personalizada
                                </p>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="relative">
                            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-200 to-white leading-tight mb-3">
                                {data.titulo_proposta}
                            </h1>
                            {/* Hook */}
                            <div className="bg-gradient-to-r from-violet-500/20 to-transparent border-l-4 border-violet-500 p-4 rounded-r-xl">
                                <p className="text-sm sm:text-base text-violet-100 font-semibold leading-relaxed italic">
                                    &ldquo;{data.frase_gancho}&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-8 py-6 space-y-8">
                        {/* Diagnóstico resumido */}
                        <section>
                            <h2 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                                <FileText className="w-3.5 h-3.5" /> Diagnóstico Executivo
                            </h2>
                            <p className="text-slate-300 text-sm leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/5">
                                {data.diagnostico_resumido}
                            </p>
                        </section>

                        {/* Proposta de valor */}
                        <section>
                            <h2 className="flex items-center gap-2 text-xs font-black text-violet-400 uppercase tracking-widest mb-3">
                                <Zap className="w-3.5 h-3.5" /> A Solução Grooway
                            </h2>
                            <p className="text-slate-200 text-sm leading-relaxed bg-gradient-to-br from-violet-950/40 to-transparent p-5 rounded-2xl border border-violet-500/20 font-medium">
                                {data.proposta_valor_grooway}
                            </p>
                        </section>

                        {/* Serviços propostos */}
                        {data.servicos_propostos && data.servicos_propostos.length > 0 && (
                            <section>
                                <h2 className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">
                                    <TrendingUp className="w-3.5 h-3.5" /> Programa Estratégico
                                    Proposto
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.servicos_propostos.map((srv, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-gradient-to-br from-indigo-950/40 to-black border border-indigo-500/20 rounded-2xl p-5 flex flex-col gap-3 hover:border-indigo-400/40 transition-colors group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <h3 className="text-base font-black text-indigo-300 group-hover:text-violet-300 transition-colors leading-tight">
                                                    {srv.nome}
                                                </h3>
                                                <span className="text-[10px] w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold shrink-0 ml-2">
                                                    {String(idx + 1).padStart(2, "0")}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                {srv.descricao}
                                            </p>
                                            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                                                <div className="flex gap-2 items-start">
                                                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                                                    <p className="text-xs text-green-300 leading-snug font-medium">
                                                        {srv.resultado_esperado}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 items-start">
                                                    <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                                                    <p className="text-xs text-orange-300 leading-snug font-medium">
                                                        {srv.urgencia}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Por que agora */}
                        <section className="bg-gradient-to-r from-red-900/20 to-transparent border-l-4 border-red-500 p-5 rounded-r-2xl">
                            <h2 className="flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-widest mb-2">
                                <Target className="w-3.5 h-3.5" /> Por Que Agir Agora
                            </h2>
                            <p className="text-sm text-red-100/80 leading-relaxed font-medium">
                                {data.por_que_agora}
                            </p>
                        </section>

                        {/* Provas sociais */}
                        {data.provas_sociais_placeholder &&
                            data.provas_sociais_placeholder.length > 0 && (
                                <section>
                                    <h2 className="flex items-center gap-2 text-xs font-black text-yellow-400 uppercase tracking-widest mb-3">
                                        <Star className="w-3.5 h-3.5" /> Casos de Sucesso
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {data.provas_sociais_placeholder.map((prova, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-yellow-900/10 border border-yellow-500/20 rounded-xl p-4 text-center"
                                            >
                                                <Star className="w-4 h-4 text-yellow-400 mx-auto mb-2" />
                                                <p className="text-xs text-yellow-100/80 leading-snug italic">
                                                    {prova}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                        {/* Investimento */}
                        <section className="bg-gradient-to-br from-green-900/20 to-transparent border border-green-500/20 p-6 rounded-2xl text-center">
                            <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                            <h2 className="text-xs font-black text-green-400 uppercase tracking-widest mb-2">
                                Investimento
                            </h2>
                            <p className="text-sm text-green-100 font-semibold leading-relaxed max-w-xl mx-auto">
                                {data.investimento_estimado}
                            </p>
                        </section>

                        {/* CTA */}
                        <section className="bg-gradient-to-br from-violet-900/50 to-indigo-900/30 border border-violet-500/30 p-6 rounded-2xl text-center shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                            <h2 className="text-xs font-black text-violet-300 uppercase tracking-widest mb-2">
                                Próximo Passo
                            </h2>
                            <p className="text-sm text-white font-bold leading-relaxed max-w-xl mx-auto mb-4">
                                {data.proximo_passo}
                            </p>
                            <ArrowRight className="w-6 h-6 text-violet-400 mx-auto animate-bounce" />
                        </section>

                        {/* Assinatura */}
                        <div className="text-center pt-2 pb-4 border-t border-white/5">
                            <p className="text-xs text-slate-500 font-medium">
                                {data.assinatura_consultor}
                            </p>
                        </div>
                    </div>

                    {/* Sticky footer actions */}
                    <div className="sticky bottom-0 bg-[#080c14]/95 backdrop-blur-md border-t border-white/10 px-8 py-4 flex items-center justify-between gap-4">
                        <p className="text-xs text-slate-500 hidden sm:block">
                            Proposta gerada com base no diagnóstico estratégico completo
                        </p>
                        <div className="flex items-center gap-3 ml-auto">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors font-medium"
                            >
                                Fechar
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isDownloading}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDownloading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Download className="w-4 h-4" />
                                )}
                                {isDownloading ? "Gerando PDF..." : "Baixar Proposta (PDF)"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function generatePrintHTML(
    data: ValuePropositionData,
    companyName: string,
    baseUrl: string
): string {
    const servicosHTML = data.servicos_propostos
        .map(
            (srv, idx) => `
    <div class="service-card">
      <div class="service-header">
        <span class="service-num">0${idx + 1}</span>
        <h3>${srv.nome}</h3>
      </div>
      <p class="service-desc">${srv.descricao}</p>
      <div class="service-meta">
        <div class="meta-item green">✓ ${srv.resultado_esperado}</div>
        <div class="meta-item orange">⏱ ${srv.urgencia}</div>
      </div>
    </div>`
        )
        .join("");

    const provasHTML = data.provas_sociais_placeholder
        .map((p) => `<div class="prova-item">⭐ ${p}</div>`)
        .join("");

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Proposta de Valor — ${companyName}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    font-family: 'Inter', sans-serif;
    background: #fff;
    color: #1a1a2e;
    font-size: 13px;
    line-height: 1.6;
  }
  
  .page {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 48px;
  }
  
  /* HEADER */
  .header {
    background: linear-gradient(135deg, #4c1d95 0%, #312e81 50%, #1e1b4b 100%);
    color: white;
    padding: 40px 48px;
    margin: -40px -48px 40px;
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: -50px; right: -50px;
    width: 200px; height: 200px;
    background: rgba(139,92,246,0.3);
    border-radius: 50%;
    filter: blur(60px);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .brand-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    font-weight: 900;
    color: white;
    shadow: 0 4px 12px rgba(139,92,246,0.4);
  }
  .brand-name {
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #c4b5fd;
  }
  .brand-sub { font-size: 10px; color: rgba(255,255,255,0.5); }
  
  h1 { font-size: 26px; font-weight: 900; line-height: 1.2; margin-bottom: 16px; }
  
  .hook {
    border-left: 4px solid #8b5cf6;
    padding: 12px 16px;
    background: rgba(139,92,246,0.15);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    font-weight: 600;
    font-size: 14px;
    color: #e9d5ff;
  }
  
  /* SECTIONS */
  .section { margin-bottom: 32px; }
  .section-title {
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #7c3aed;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ede9fe;
  }
  
  .box {
    background: #f9f7ff;
    border: 1px solid #ede9fe;
    border-radius: 12px;
    padding: 16px 20px;
    color: #374151;
    line-height: 1.7;
  }
  .box-purple {
    background: linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%);
    border-color: #c4b5fd;
  }
  .box-red {
    background: #fff5f5;
    border-left: 4px solid #ef4444;
    border-radius: 0 12px 12px 0;
  }
  .box-green {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 12px;
    text-align: center;
    padding: 24px;
  }
  .box-cta {
    background: linear-gradient(135deg, #4c1d95 0%, #312e81 100%);
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    color: white;
  }
  
  /* SERVICES */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .service-card {
    border: 1px solid #c4b5fd;
    border-radius: 12px;
    padding: 16px;
    background: linear-gradient(135deg, #f5f3ff 0%, white 100%);
  }
  .service-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
  }
  .service-header h3 { font-size: 13px; font-weight: 800; color: #4c1d95; line-height: 1.3; }
  .service-num {
    font-size: 9px; font-weight: 900;
    background: #ede9fe; color: #6d28d9;
    border-radius: 50%; width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    shrink: 0;
  }
  .service-desc { font-size: 11px; color: #6b7280; margin-bottom: 10px; }
  .meta-item { font-size: 11px; font-weight: 600; margin-bottom: 4px; }
  .meta-item.green { color: #065f46; }
  .meta-item.orange { color: #92400e; }
  
  /* PROVAS */
  .provas-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .prova-item {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 10px;
    padding: 12px;
    font-size: 11px;
    color: #92400e;
    font-style: italic;
  }
  
  /* CTA */
  .cta-text { font-size: 15px; font-weight: 800; margin-bottom: 8px; }
  .cta-arrow { font-size: 20px; }
  
  /* FOOTER */
  .footer {
    margin-top: 40px;
    padding-top: 16px;
    border-top: 1px solid #ede9fe;
    text-align: center;
    font-size: 10px;
    color: #9ca3af;
  }
  
  @media print {
    body { font-size: 11px; }
    .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .box-cta { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="page">
  <!-- HEADER -->
  <div class="header">
    <div class="brand">
      <div class="brand-icon" style="background: transparent;"><img src="${baseUrl}/logo-gw.png" alt="Grooway" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;" /></div>
      <div>
        <div class="brand-name">Grooway — Marketing de Performance</div>
        <div class="brand-sub">Proposta Estratégica Personalizada</div>
      </div>
    </div>
    <h1>${data.titulo_proposta}</h1>
    <div class="hook">"${data.frase_gancho}"</div>
  </div>

  <!-- DIAGNÓSTICO -->
  <div class="section">
    <div class="section-title">📋 Diagnóstico Executivo</div>
    <div class="box">${data.diagnostico_resumido}</div>
  </div>

  <!-- SOLUÇÃO -->
  <div class="section">
    <div class="section-title">⚡ A Solução Grooway</div>
    <div class="box box-purple">${data.proposta_valor_grooway}</div>
  </div>

  <!-- SERVIÇOS -->
  ${data.servicos_propostos?.length > 0
            ? `
  <div class="section">
    <div class="section-title">📈 Programa Estratégico Proposto</div>
    <div class="services-grid">${servicosHTML}</div>
  </div>`
            : ""
        }

  <!-- POR QUE AGORA -->
  <div class="section">
    <div class="section-title">🎯 Por Que Agir Agora</div>
    <div class="box box-red">${data.por_que_agora}</div>
  </div>

  <!-- PROVAS SOCIAIS -->
  ${data.provas_sociais_placeholder?.length > 0
            ? `
  <div class="section">
    <div class="section-title">⭐ Casos de Sucesso</div>
    <div class="provas-grid">${provasHTML}</div>
  </div>`
            : ""
        }

  <!-- INVESTIMENTO -->
  <div class="section">
    <div class="box box-green">
      <div class="section-title" style="justify-content:center; margin-bottom:8px;">💰 Investimento</div>
      <p style="font-weight:600; color:#065f46;">${data.investimento_estimado}</p>
    </div>
  </div>

  <!-- CTA -->
  <div class="section">
    <div class="box-cta">
      <div style="font-size:9px; font-weight:900; letter-spacing:0.15em; text-transform:uppercase; color:#c4b5fd; margin-bottom:8px;">Próximo Passo</div>
      <div class="cta-text">${data.proximo_passo}</div>
      <div class="cta-arrow">→</div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">${data.assinatura_consultor}</div>
</div>
</body>
</html>`;
}
