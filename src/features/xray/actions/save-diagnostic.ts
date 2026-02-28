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
        let lead;
        const { data: existingLead, error: checkError } = await supabase
            .from('leads')
            .select()
            .eq('target_url', targetUrl)
            .maybeSingle();

        if (checkError) {
            console.error('Error checking lead:', checkError);
            throw new Error(`Erro ao checar lead: ${checkError.message}`);
        }

        if (existingLead) {
            const { data: updatedLead, error: updateError } = await supabase
                .from('leads')
                .update({
                    company_name: companyName,
                    city,
                    instagram,
                    status: 'analyzed'
                })
                .eq('id', existingLead.id)
                .select()
                .single();

            if (updateError) {
                console.error('Error updating lead:', updateError);
                throw new Error(`Falha ao atualizar lead: ${updateError.message}`);
            }
            lead = updatedLead;
        } else {
            const { data: newLead, error: insertError } = await supabase
                .from('leads')
                .insert({
                    company_name: companyName,
                    target_url: targetUrl,
                    city,
                    instagram,
                    status: 'analyzed'
                })
                .select()
                .single();

            if (insertError) {
                console.error('Error inserting lead:', insertError);
                throw new Error(`Falha ao criar lead: ${insertError.message}`);
            }
            lead = newLead;
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
