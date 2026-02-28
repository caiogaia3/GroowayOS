"use server";

import { createClient } from "@/core/lib/supabase/server";

export type ProposalAnalytics = {
    totalViews: number;
    uniqueViewers: number;
    averageTimeSeconds: number;
    pdfDownloads: number;
    recentViews: any[];
};

export async function getProposalAnalytics(proposalId: string): Promise<ProposalAnalytics | null> {
    const supabase = await createClient();

    const { data: views, error } = await supabase
        .from('proposal_views')
        .select('*')
        .eq('proposal_id', proposalId)
        .order('viewed_at', { ascending: false });

    if (error || !views) {
        console.error("Error fetching analytics:", error);
        return null;
    }

    const uniqueHashes = new Set(views.map(v => v.viewer_hash));
    const viewsWithTime = views.filter(v => v.time_on_page_seconds && v.time_on_page_seconds > 0);
    const avgTime = viewsWithTime.length > 0
        ? viewsWithTime.reduce((acc, curr) => acc + curr.time_on_page_seconds, 0) / viewsWithTime.length
        : 0;

    return {
        totalViews: views.length,
        uniqueViewers: uniqueHashes.size,
        averageTimeSeconds: Math.round(avgTime),
        pdfDownloads: views.filter(v => v.downloaded_pdf).length,
        recentViews: views.slice(0, 10) // Manda os 10 últimos para a listagem
    };
}
