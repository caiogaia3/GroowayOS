"use client"

import { useEffect, useState } from "react";
import { getProposalWithVersion } from "@/features/proposals/actions/get_proposal";
import { Proposal } from "@/features/proposals/lib/types";
import { Copy, Check, MessageCircle, Mail, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ShareProposalPage() {
    const params = useParams();
    const id = params.id as string;

    const [proposal, setProposal] = useState<Proposal | null>(null);
    const [publicUrl, setPublicUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getProposalWithVersion(id);
            if (data?.proposal) {
                setProposal(data.proposal);
                setPublicUrl(`${window.location.origin}/p/${data.proposal.slug}?t=${data.proposal.share_token}`);
            }
            setIsLoading(false);
        }
        load();
    }, [id]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(publicUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error("Failed to copy", e);
        }
    };

    const handleWhatsApp = () => {
        if (!proposal) return;
        const text = `Olá${proposal.client_name ? ` ${proposal.client_name}` : ''}!\n\nAqui está a nossa proposta comercial estratégica detalhando as soluções para escalarmos o seu negócio:\n\n🔗 ${publicUrl}\n\nQualquer dúvida, estou à disposição.`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleEmail = () => {
        if (!proposal) return;
        const subject = `Proposta Comercial Executiva - Grooway`;
        const body = `Olá${proposal.client_name ? ` ${proposal.client_name}` : ''},\n\nConforme conversamos, elaboramos uma proposta estratégica focada nos desafios atuais da sua operação.\n\nVocê pode visualizar a proposta completa (e exportar o PDF) através do link seguro abaixo:\n\n${publicUrl}\n\nQualquer dúvida, fique à vontade para responder este e-mail.\n\nAtenciosamente,\nEquipe Grooway`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    };

    if (isLoading) {
        return <div className="p-8 text-slate-400">Carregando...</div>;
    }

    if (!proposal) {
        return <div className="p-8 text-slate-400">Proposta não encontrada.</div>;
    }

    return (
        <div className="flex flex-col gap-8 p-6 sm:p-12 max-w-4xl mx-auto w-full min-h-screen items-center justify-center">

            <div className="w-full">
                <Link href="/proposals" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
                </Link>
            </div>

            <div className="w-full text-center mb-4">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 mb-2">
                    Proposta Pronta e Publicada!
                </h1>
                <p className="text-slate-400">
                    A proposta para <strong className="text-white">{proposal.client_company || proposal.client_name}</strong> está pronta para ser enviada.
                </p>
            </div>

            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">

                <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Link Seguro de Acesso</h3>
                <div className="flex items-center gap-3 bg-black/40 border border-white/10 p-2 pl-4 rounded-xl mb-8">
                    <span className="text-slate-200 font-mono text-sm truncate flex-1">{publicUrl}</span>
                    <button
                        onClick={handleCopy}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg transition-colors font-medium text-sm whitespace-nowrap"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copiado!" : "Copiar Link"}
                    </button>
                    <a
                        href={publicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center p-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-colors"
                        title="Abrir Proposta"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={handleWhatsApp}
                        className="flex items-center justify-center gap-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#25D366] p-4 rounded-xl transition-all font-semibold text-lg"
                    >
                        <MessageCircle className="w-6 h-6" />
                        Enviar por WhatsApp
                    </button>
                    <button
                        onClick={handleEmail}
                        className="flex items-center justify-center gap-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 p-4 rounded-xl transition-all font-semibold text-lg"
                    >
                        <Mail className="w-6 h-6" />
                        Enviar por E-mail
                    </button>
                </div>

            </div>
        </div>
    );
}
