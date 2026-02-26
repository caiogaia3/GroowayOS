"use server";

import { supabase } from "@/core/services/supabase";

export interface AuditHistoryItem {
    id: string;
    target_url: string;
    saved_at: number;
}

export async function getAuditHistory(): Promise<AuditHistoryItem[]> {
    try {
        const { data, error } = await supabase
            .from("reports")
            .select("id, data")
            .order("created_at", { ascending: false })
            .limit(20);

        if (error) {
            console.error("Erro ao buscar histórico:", error);
            return [];
        }

        if (!data) return [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map((row: any) => ({
            id: row.id,
            target_url: row.data?.report_data?.target_url || "URL desconhecida",
            saved_at: row.data?.saved_at || 0,
        }));

    } catch (e) {
        console.error("Exceção ao buscar histórico:", e);
        return [];
    }
}
