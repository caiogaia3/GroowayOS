"use server";

import { supabase } from "@/core/lib/supabase";

export interface AuditHistoryItem {
    id: string; // diagnostic ID
    target_url: string;
    company_name: string;
    score: number;
    saved_at: string;
}

/**
 * Fetches the 10 most recent diagnostic records, including associated lead data.
 */
export async function getAuditHistory(): Promise<AuditHistoryItem[]> {
    try {
        const { data, error } = await supabase
            .from("diagnostics")
            .select(`
                id,
                created_at,
                final_score,
                leads (
                    company_name,
                    target_url
                )
            `)
            .order("created_at", { ascending: false })
            .limit(10);

        if (error) {
            console.error("Erro ao buscar histórico de diagnósticos:", error);
            return [];
        }

        if (!data) return [];

        return data.map((row: any) => ({
            id: row.id,
            target_url: row.leads?.target_url || "URL desconhecida",
            company_name: row.leads?.company_name || row.leads?.target_url?.replace(/^https?:\/\//, '').split('/')[0] || "Empresa",
            score: row.final_score || 0,
            saved_at: row.created_at,
        }));

    } catch (e) {
        console.error("Exceção ao buscar histórico:", e);
        return [];
    }
}
