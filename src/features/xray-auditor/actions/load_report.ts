"use server";

import { supabase } from "@/core/lib/supabase";
import { PythonReport } from "./run_python";
import { SavedReportContext } from "./save_report";

export async function loadReportById(reportId: string): Promise<PythonReport | null> {
    try {
        const { data: record, error } = await supabase
            .from("reports")
            .select("data")
            .eq("id", reportId)
            .single();

        if (error) {
            console.error("Erro ao carregar relatório:", error);
            return null;
        }

        if (!record || !record.data) return null;

        const saved = record.data as SavedReportContext;
        return saved.report_data;

    } catch (e) {
        console.error("Exceção ao carregar relatório:", e);
        return null;
    }
}
