import { getProposalBySlugAndToken } from "@/features/proposals/actions/get_public_proposal";
import { notFound } from "next/navigation";
import PresentProposalClient from "./PresentProposalClient";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ t?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const slugParams = await params;
    return {
        title: `Apresentação Comercial - Grooway`,
        description: `Proposta Estratégica elaborada pela Grooway para acelerar seus resultados.`,
    };
}

export default async function PresentProposalPage(props: PageProps) {
    const { slug } = await props.params;
    const { t: token } = await props.searchParams;

    const data = await getProposalBySlugAndToken(slug, token);

    if (!data) {
        return (
            <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-bold text-slate-300 mb-4">Apresentação Inacessível</h1>
                <p className="text-slate-500">O link pode estar quebrado ou a proposta não existe mais.</p>
            </div>
        );
    }

    // Verifica expiração
    const isExpired = data.proposal.expires_at && new Date(data.proposal.expires_at) < new Date();

    if (isExpired) {
        return (
            <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                    <span className="text-2xl">⏳</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-200 mb-4">Proposta Expirada</h1>
                <p className="text-slate-400 max-w-md">
                    O prazo de validade desta proposta encerrou em {new Date(data.proposal.expires_at!).toLocaleDateString('pt-BR')}.
                </p>
            </div>
        );
    }

    return <PresentProposalClient proposal={data.proposal} content={data.version.content} />;
}
