"use server";

import { supabase } from "@/core/lib/supabase";

export async function getDiagnosticById(id: string) {
    try {
        const { data, error } = await supabase
            .from("diagnostics")
            .select(`
                id,
                status,
                report_data,
                final_score,
                leads (
                    id,
                    target_url,
                    company_name,
                    city,
                    instagram
                )
            `)
            .eq("id", id)
            .single();

        if (error) {
            console.error("Erro ao buscar detalhes do diagnóstico:", error);
            return { success: false, error: error.message };
        }

        if (!data) {
            return { success: false, error: "Diagnóstico não encontrado." };
        }

        return {
            success: true,
            data: {
                id: data.id,
                status: data.status,
                reportData: data.report_data,
                finalScore: data.final_score,
                lead: data.leads
            }
        };

    } catch (e: any) {
        console.error("Exceção ao buscar diagnóstico:", e);
        return { success: false, error: e.message };
    }
}
