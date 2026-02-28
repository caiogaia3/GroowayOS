"use server";

import { createClient } from "@/core/lib/supabase/server";
import { ServiceCatalogItem } from "../lib/types";
import { revalidatePath } from "next/cache";

export async function upsertService(service: Partial<ServiceCatalogItem>) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('service_catalog')
        .upsert(service)
        .select()
        .single();

    if (error) {
        console.error("Error upserting service:", error);
        return { success: false, error: error.message };
    }

    revalidatePath('/proposals/catalog');
    revalidatePath('/proposals/new');

    return { success: true, data };
}

export async function deleteService(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('service_catalog')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Error deleting service:", error);
        return { success: false, error: error.message };
    }

    revalidatePath('/proposals/catalog');
    revalidatePath('/proposals/new');

    return { success: true };
}
