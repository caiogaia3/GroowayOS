import { getProposalBySlugAndToken, trackProposalView } from "@/features/proposals/actions/get_public_proposal";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import crypto from "crypto";
import PublicProposalClient from "./PublicProposalClient";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ t?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const slugParams = await params;
    return {
        title: `Proposta Comercial - Grooway`,
        description: `Proposta Estratégica elaborada pela Grooway para acelerar seus resultados.`,
    };
}

export default async function PublicProposalPage(props: PageProps) {
    const { slug } = await props.params;
    const { t: token } = await props.searchParams;

    const data = await getProposalBySlugAndToken(slug, token);

    if (!data) {
        return (
            <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-bold text-slate-300 mb-4">Proposta Inacessível</h1>
                <p className="text-slate-500">O link pode estar quebrado ou a proposta não existe mais.</p>
            </div>
        );
    }

    // Verifica expiração
    const isExpired = data.proposal.expires_at && new Date(data.proposal.expires_at) < new Date();

    // Track View
    if (!isExpired) {
        const headersList = await headers();
        const forwarded = headersList.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(',')[0] : 'unknown-ip';
        const userAgent = headersList.get("user-agent") || 'unknown';

        // Hash IP for LGPD compliance and tracking unique readers
        const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

        // Executa em background (não precisa dar await)
        trackProposalView(data.proposal.id, ipHash, userAgent);
    }

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
                <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="mt-8 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors text-sm font-semibold text-slate-300">
                    Solicitar Renovação
                </a>
            </div>
        );
    }

    return <PublicProposalClient proposal={data.proposal} content={data.version.content} />;
}
