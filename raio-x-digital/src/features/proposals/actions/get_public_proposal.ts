"use server"

import { createClient } from "@/lib/supabase/server";
import { Proposal, ProposalVersion } from "@/features/proposals/lib/types";

export async function getProposalBySlugAndToken(slug: string, token: string | undefined): Promise<{ proposal: Proposal; version: ProposalVersion } | null> {
    const supabase = await createClient();

    let query = supabase.from('proposals').select('*').eq('slug', slug);

    // Validate token if needed. In PRD we said access is only via share_token
    if (!token) return null;
    query = query.eq('share_token', token);

    const { data: proposal, error: pError } = await query.single();

    if (pError || !proposal) return null;

    // Se a proposta já expirou
    if (proposal.expires_at && new Date(proposal.expires_at) < new Date()) {
        // Here we could return a specific status to show "Expired" UI
        // For now, let's pass it anyway and let the UI handle expiration
    }

    const { data: version, error: vError } = await supabase
        .from('proposal_versions')
        .select('*')
        .eq('proposal_id', proposal.id)
        .order('version', { ascending: false })
        .limit(1)
        .single();

    if (vError || !version) return null;

    return { proposal: proposal as Proposal, version: version as ProposalVersion };
}

export async function trackProposalView(proposalId: string, ipHash: string, userAgent: string) {
    const supabase = await createClient();

    // In a real app we'd hash the IP properly considering x-forwarded-for etc
    const { error } = await supabase
        .from('proposal_views')
        .insert({
            proposal_id: proposalId,
            viewer_hash: ipHash,
            user_agent: userAgent
        });

    if (error) {
        console.error("Error tracking view:", error);
    }
}
