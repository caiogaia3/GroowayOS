import { createClient } from "@/lib/supabase/server";
import { Proposal } from "@/features/proposals/lib/types";
import Link from "next/link";
import { ArrowLeft, BookmarkPlus } from "lucide-react";
import ReferenceBankClient from "./ReferenceBankClient";

export default async function ReferenceBankPage() {
    const supabase = await createClient();

    const { data: templates, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('is_template', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error loading templates:", error);
    }

    const proposals = (templates || []) as Proposal[];

    return (
        <div className="flex flex-col gap-6 p-6 sm:p-8 max-w-7xl mx-auto w-full">
            <div>
                <Link
                    href="/proposals"
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-4 transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar para o Dashboard
                </Link>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <BookmarkPlus className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            Banco de Referências
                        </h1>
                        <p className="text-neutral-400 text-sm mt-1">
                            Modelos de propostas comerciais de alta conversão.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                {!proposals || proposals.length === 0 ? (
                    <div className="py-16 text-center border border-white/5 bg-white/5 border-dashed rounded-2xl flex flex-col items-center justify-center">
                        <BookmarkPlus className="w-12 h-12 text-neutral-600 mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">Nenhum modelo salvo</h3>
                        <p className="text-neutral-500 max-w-md mx-auto">
                            Ao editar uma proposta que você considera excelente, clique em "Salvar como Modelo" para que ela apareça aqui e seja reutilizada depois.
                        </p>
                    </div>
                ) : (
                    <ReferenceBankClient templates={proposals} />
                )}
            </div>
        </div>
    );
}
