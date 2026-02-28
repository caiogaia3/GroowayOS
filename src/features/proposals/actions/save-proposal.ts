"use server";

import { supabase } from '@/core/lib/supabase';
import { SaveProposalSchema, SaveProposalInput } from '@/core/lib/validation';

/**
 * Saves a generated proposal to Supabase.
 */
export async function saveProposalAction(params: SaveProposalInput) {
    try {
        const validated = SaveProposalSchema.parse(params);
        const { leadId, diagnosisId, contentJson, status = 'draft' } = validated;
        const { data: proposal, error } = await supabase
            .from('proposals')
            .insert({
                lead_id: leadId,
                diagnosis_id: diagnosisId,
                content_json: contentJson,
                status: status
            })
            .select()
            .single();

        if (error) {
            console.error('Error saving proposal:', error);
            throw new Error('Falha ao salvar proposta.');
        }

        return { success: true, proposalId: proposal.id };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
