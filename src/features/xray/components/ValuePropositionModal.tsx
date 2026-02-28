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
// Local Interface since action path changed
export interface ValuePropositionData {
  titulo_proposta: string;
  bloco1_apresentacao: string;
  bloco2_cenario_atual: string;
  bloco3_estrategia: string;
  bloco4_escopo: string;
  bloco5_cronograma: string;
  bloco6_resultados: string;
  bloco7_investimentos_condicoes: string;
  assinatura_consultor: string;
}

interface ValuePropositionModalProps {
  isOpen: boolean; // Added for AnimatePresence control from outside if needed
  data: ValuePropositionData | null;
  companyName: string;
  onClose: () => void;
  onDownloadDiagnostic?: () => void;
}

export function ValuePropositionModal({
  isOpen,
  data,
  companyName,
  onClose,
  onDownloadDiagnostic
}: ValuePropositionModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen || !data) return null;

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
              <p className="text-sm sm:text-base text-violet-100 font-semibold leading-relaxed">
                {data.bloco1_apresentacao}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-6 space-y-8">
            {/* Cenario Atual */}
            <section className="bg-gradient-to-r from-red-900/20 to-transparent border-l-4 border-red-500 p-5 rounded-r-2xl">
              <h2 className="flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-widest mb-2">
                <Target className="w-3.5 h-3.5" /> Cenário Atual e Desafios
              </h2>
              <p className="text-sm text-red-100/80 leading-relaxed font-medium whitespace-pre-wrap">
                {data.bloco2_cenario_atual}
              </p>
            </section>

            {/* Estrategia Proposta */}
            <section>
              <h2 className="flex items-center gap-2 text-xs font-black text-violet-400 uppercase tracking-widest mb-3">
                <Zap className="w-3.5 h-3.5" /> Estratégia Proposta
              </h2>
              <p className="text-slate-200 text-sm leading-relaxed bg-gradient-to-br from-violet-950/40 to-transparent p-5 rounded-2xl border border-violet-500/20 font-medium whitespace-pre-wrap">
                {data.bloco3_estrategia}
              </p>
            </section>

            {/* Escopo de Entrega */}
            <section>
              <h2 className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">
                <FileText className="w-3.5 h-3.5" /> Escopo de Entrega
              </h2>
              <div className="bg-gradient-to-br from-indigo-950/40 to-black border border-indigo-500/20 rounded-2xl p-5">
                <p className="text-sm text-indigo-100 leading-relaxed whitespace-pre-wrap">
                  {data.bloco4_escopo}
                </p>
              </div>
            </section>

            {/* Cronograma */}
            <section>
              <h2 className="flex items-center gap-2 text-xs font-black text-yellow-400 uppercase tracking-widest mb-3">
                <Clock className="w-3.5 h-3.5" /> Cronograma de Execução
              </h2>
              <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-xl p-5">
                <p className="text-sm text-yellow-100/90 leading-relaxed font-medium whitespace-pre-wrap">
                  {data.bloco5_cronograma}
                </p>
              </div>
            </section>

            {/* Resultados Esperados */}
            <section>
              <h2 className="flex items-center gap-2 text-xs font-black text-blue-400 uppercase tracking-widest mb-3">
                <TrendingUp className="w-3.5 h-3.5" /> Resultados Esperados
              </h2>
              <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                <p className="text-sm text-blue-100/90 leading-relaxed font-medium whitespace-pre-wrap">
                  {data.bloco6_resultados}
                </p>
              </div>
            </section>

            {/* Investimento */}
            <section className="bg-gradient-to-br from-green-900/20 to-transparent border border-green-500/20 p-6 rounded-2xl text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h2 className="text-xs font-black text-green-400 uppercase tracking-widest mb-2">
                Investimento e Condições
              </h2>
              <p className="text-sm text-green-100 font-semibold leading-relaxed max-w-2xl mx-auto whitespace-pre-wrap text-left">
                {data.bloco7_investimentos_condicoes}
              </p>
            </section>

            {/* Assinatura */}
            <div className="text-center pt-4 pb-4 border-t border-white/5">
              <p className="text-xs text-slate-500 font-medium whitespace-pre-wrap">
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
                onClick={onDownloadDiagnostic}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95"
              >
                <FileText className="w-4 h-4" />
                Baixar Diagnóstico (PDF)
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
    </AnimatePresence >
  );
}

function generatePrintHTML(
  data: ValuePropositionData,
  companyName: string,
  baseUrl: string
): string {

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
  
  /* PROVAS (Mitigacao de risco) */
  .provas-grid {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 10px;
    padding: 16px;
    font-size: 13px;
    color: #92400e;
    font-weight: 500;
    text-align: center;
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
  </div>

  <!-- CUSTO DA INAÇÃO -->
  <div class="section">
    <div class="section-title">🎯 Cenário Atual e Desafios</div>
    <div class="box box-red" style="white-space: pre-wrap;">${data.bloco2_cenario_atual}</div>
  </div>

  <!-- SOLUÇÃO -->
  <div class="section">
    <div class="section-title">⚡ Estratégia Proposta</div>
    <div class="box box-purple" style="white-space: pre-wrap;">${data.bloco3_estrategia}</div>
  </div>

  <!-- ESCOPO -->
  <div class="section">
    <div class="section-title">📦 Escopo de Entrega</div>
    <div class="box" style="white-space: pre-wrap;">${data.bloco4_escopo}</div>
  </div>

  <!-- CRONOGRAMA -->
  <div class="section">
    <div class="section-title">⏱️ Cronograma de Execução</div>
    <div class="box" style="white-space: pre-wrap; background: #fffbeb; border: 1px solid #fde68a;">${data.bloco5_cronograma}</div>
  </div>

  <!-- RESULTADOS -->
  <div class="section">
    <div class="section-title">📈 Resultados Esperados</div>
    <div class="box" style="white-space: pre-wrap; background: #eff6ff; border: 1px solid #bfdbfe;">${data.bloco6_resultados}</div>
  </div>

  <!-- INVESTIMENTO -->
  <div class="section">
    <div class="box box-green">
      <div class="section-title" style="justify-content:center; margin-bottom:8px;">💰 Investimento e Condições</div>
      <p style="font-weight:600; color:#065f46; white-space: pre-wrap; text-align: left;">${data.bloco7_investimentos_condicoes}</p>
    </div>
  </div>

  <!-- CTA -->
  <div class="section">
    <div class="box-cta">
      <div style="font-size:9px; font-weight:900; letter-spacing:0.15em; text-transform:uppercase; color:#c4b5fd; margin-bottom:8px;">Aviso Importante</div>
      <div class="cta-text">Os valores apresentados na proposta variam conforme as necessidades específicas de cada caso e são moldados para garantir o melhor Retorno Sobre Investimento (ROI) possível, equilibrando sua realidade e as nossas entregas.</div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">${data.assinatura_consultor}</div>
</div>
</body>
</html>`;
}
