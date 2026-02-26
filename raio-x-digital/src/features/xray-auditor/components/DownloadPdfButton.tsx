"use client"

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

export function DownloadPdfButton({ targetId, filename }: { targetId: string, filename: string }) {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            const element = document.getElementById(targetId);
            if (!element) {
                console.error("Elemento alvo não encontrado:", targetId);
                return;
            }

            // @ts-ignore
            const html2pdfModule = await import("html2pdf.js").then(m => m.default || m);
            const html2pdf = html2pdfModule;

            // Add a temporary class to the element to format for PDF specifically if needed
            element.classList.add("pdf-exporting");

            const opt = {
                margin: [10, 10, 10, 10] as [number, number, number, number], // top, left, bottom, right
                filename: `${filename}.pdf`,
                image: { type: 'jpeg' as 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, letterRendering: true, backgroundColor: '#020617' },
                jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
                pagebreak: { mode: ['css', 'legacy'] }
            };

            await html2pdf().set(opt).from(element).save();

            element.classList.remove("pdf-exporting");
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            alert("Houve um erro ao tentar gerar o PDF. Verifique o console.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            type="button"
            data-html2canvas-ignore="true"
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full font-bold shadow-lg shadow-violet-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mx-auto mb-8"
        >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            {isGenerating ? "Gerando PDF..." : "Exportar Diagnóstico em PDF"}
        </button>
    );
}
