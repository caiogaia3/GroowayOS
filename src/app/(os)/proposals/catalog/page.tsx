import { getServiceCatalog } from "@/features/proposals/actions/get_catalog";
import CatalogClient from "./CatalogClient";

export default async function CatalogPage() {
    const catalog = await getServiceCatalog();

    return (
        <div className="flex flex-col gap-6 p-6 sm:p-8 max-w-7xl mx-auto w-full">
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Catálogo de Serviços
                </h1>
                <p className="text-neutral-400 text-sm mt-1">
                    Gerencie os serviços que serão usados nas propostas comerciais.
                </p>
            </div>

            <CatalogClient initialCatalog={catalog} />
        </div>
    );
}
