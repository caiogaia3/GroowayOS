"use server";

import { supabase } from '@/core/lib/supabase';

interface TrackViewParams {
    id: string;
    type: 'diagnostic' | 'proposal';
}

/**
 * Increments view count and updates last_opened_at for a given entity.
 */
export async function trackViewAction({ id, type }: TrackViewParams) {
    try {
        const table = type === 'diagnostic' ? 'diagnostics' : 'proposals';

        // Use Supabase RPC or direct update
        // We'll use a transaction-less increment if possible, or just fetch and update
        const { data, error: fetchError } = await supabase
            .from(table)
            .select('view_count')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        const { error: updateError } = await supabase
            .from(table)
            .update({
                view_count: (data?.view_count || 0) + 1,
                last_opened_at: new Date().toISOString()
            })
            .eq('id', id);

        if (updateError) throw updateError;

        return { success: true };
    } catch (error: any) {
        console.error(`Error tracking view for ${type}:`, error);
        return { success: false, error: error.message };
    }
}
