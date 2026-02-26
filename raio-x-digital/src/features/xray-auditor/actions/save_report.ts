"use server";

import crypto from "crypto";
import { PythonReport } from "./run_python";
import { supabase } from "@/core/services/supabase";

// Salvamos o Dossiê completo + as Sugestões Comerciais geradas para travar a versão final
export interface SavedReportContext {
    report_data: PythonReport;
    // commercial_plan: CommercialPlan | null; // Se quiser expor o plano pro cliente (opcional)
    saved_at: number;
}

export async function saveReportLocally(report: PythonReport, companyName: string = "empresa"): Promise<{ id: string, slug: string } | null> {
    try {
        const uuid = crypto.randomUUID();

        // Generate friendly slug: "diagnostico-empresa-1234"
        const baseSlug = `diagnostico-${companyName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')}`;
        const shortHash = uuid.split('-')[0].substring(0, 4);
        const slug = `${baseSlug}-${shortHash}`;

        const payload: SavedReportContext = {
            report_data: report,
            saved_at: Date.now()
        };

        const { error } = await supabase
            .from("reports")
            .insert({
                id: uuid,
                slug: slug,
                data: payload,
            });

        if (error) {
            console.error("Erro do Supabase ao salvar relatório:", error);
            return null;
        }

        return { id: uuid, slug: slug };

    } catch (e) {
        console.error("Erro ao salvar Dossiê Localmente:", e);
        return null;
    }
}
