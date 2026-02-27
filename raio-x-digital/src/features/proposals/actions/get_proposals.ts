"use server"

import { createClient } from "@/lib/supabase/server";
import { Proposal } from "../lib/types";

export async function getProposals(): Promise<Proposal[]> {
    const supabase = await createClient();

    // We intentionally ignore RLS here if the action is executing as the system or 
    // we make sure the RLS allows read access to proposals. 
    // Since we are building an internal admin panel inside GroowayOS, 
    // all authenticated users (the team) can see the proposals.
    const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching proposals:", error);
        return [];
    }

    return data as Proposal[];
}
