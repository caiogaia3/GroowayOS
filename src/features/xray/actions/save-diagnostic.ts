"use server";

import { supabase } from '@/core/lib/supabase';
import { SaveDiagnosticSchema, SaveDiagnosticInput } from '@/core/lib/validation';

/**
 * Saves a diagnostic result to Supabase.
 * First ensures a lead exists, then creates the diagnostic record.
 */
export async function saveDiagnosticAction(params: SaveDiagnosticInput) {
    try {
        // Validate inputs
        const validated = SaveDiagnosticSchema.parse(params);

        const {
            companyName,
            targetUrl,
            city,
            instagram,
            reportData = {},
            finalScore = 0,
            status = 'complete'
        } = validated;
        // 1. Create or Update Lead
        const { data: lead, error: leadError } = await supabase
            .from('leads')
            .upsert({
                company_name: companyName,
                target_url: targetUrl,
                city,
                instagram,
                status: 'analyzed'
            }, { onConflict: 'target_url' })
            .select()
            .single();

        if (leadError) {
            console.error('Error saving lead:', leadError);
            throw new Error('Falha ao salvar lead.');
        }

        // 2. Create Diagnostic Record with 'complete' status since we are saving the result
        const { data: diagnostic, error: diagError } = await supabase
            .from('diagnostics')
            .insert({
                lead_id: lead.id,
                report_data: reportData,
                final_score: finalScore,
                status: status
            })
            .select()
            .single();

        if (diagError) {
            console.error('Error saving diagnostic:', diagError);
            throw new Error('Falha ao salvar diagnóstico.');
        }

        return { success: true, leadId: lead.id, diagnosticId: diagnostic.id };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
