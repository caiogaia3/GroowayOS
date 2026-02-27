"use server"

import { createClient } from "@/lib/supabase/server";

export async function updateProposalContent(proposalId: string, currentVersionNumber: number, newContent: any, status: string): Promise<boolean> {
    const supabase = await createClient();

    // Insert new version
    const newVersionNum = currentVersionNumber + 1;
    const { error: vError } = await supabase
        .from('proposal_versions')
        .insert({
            proposal_id: proposalId,
            version: newVersionNum,
            content: newContent,
            change_note: 'Atualização manual via editor'
        });

    if (vError) {
        console.error("Error creating new version:", vError);
        return false;
    }

    // Update proposal current_version and status
    const { error: pError } = await supabase
        .from('proposals')
        .update({
            current_version: newVersionNum,
            status: status,
            updated_at: new Date().toISOString() // Let DB handle if default now(), but explicit is good
        })
        .eq('id', proposalId);

    if (pError) {
        console.error("Error updating proposal:", pError);
        return false;
    }

    return true;
}
