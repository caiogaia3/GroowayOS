"use server"

import { createClient } from "@/lib/supabase/server";
import { Proposal, ProposalVersion } from "../lib/types";

export async function getProposalWithVersion(id: string): Promise<{ proposal: Proposal; version: ProposalVersion } | null> {
    const supabase = await createClient();

    const { data: proposal, error: pError } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', id)
        .single();

    if (pError || !proposal) return null;

    const { data: version, error: vError } = await supabase
        .from('proposal_versions')
        .select('*')
        .eq('proposal_id', id)
        .order('version', { ascending: false })
        .limit(1)
        .single();

    if (vError || !version) return null;

    return { proposal: proposal as Proposal, version: version as ProposalVersion };
}
