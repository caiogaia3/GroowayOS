"use server";

import { createClient } from "@/core/lib/supabase/server";
import { ServiceCatalogItem } from "../lib/types";

export async function getServiceCatalog(): Promise<ServiceCatalogItem[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('service_catalog')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

    if (error) {
        console.error("Error fetching service catalog:", error);
        return [];
    }

    return data as ServiceCatalogItem[];
}
