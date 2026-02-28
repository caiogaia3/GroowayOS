import { getServiceCatalog } from "@/features/proposals/actions/get_catalog";
import NewProposalClient from "./NewProposalClient";

export default async function NewProposalPage() {
    // Only fetch active services for the creation form
    const catalog = await getServiceCatalog();
    const activeCatalog = catalog.filter(c => c.is_active);

    return (
        <div className="flex flex-col gap-6 p-6 sm:p-8 max-w-7xl mx-auto w-full">
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Nova Proposta Comercial
                </h1>
                <p className="text-neutral-400 text-sm mt-1">
                    Preencha o briefing e selecione os serviços do catálogo para gerar uma nova proposta.
                </p>
            </div>

            <NewProposalClient catalog={activeCatalog} />
        </div>
    );
}
