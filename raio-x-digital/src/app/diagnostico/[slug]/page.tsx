import { supabase } from "@/core/services/supabase";
import { SavedReportContext } from "@/features/xray-auditor/actions/save_report";
import { ShieldAlert, Target, Activity, Smartphone, Database, Instagram, BarChart3, Search } from "lucide-react";

export default async function DiagnosticoSlugPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;

    let data: SavedReportContext | null = null;

    try {
        const { data: record, error } = await supabase
            .from("reports")
            .select("data")
            .eq("slug", slug)
            .single();

        if (error) {
            console.error("Erro ao buscar relatório no Supabase:", error);
        } else if (record && record.data) {
            data = record.data as SavedReportContext;
        }
    } catch (error) {
        console.error("Link Inválido ou Expirado", error);
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-slate-100 font-sans">
                <ShieldAlert className="w-16 h-16 text-red-500 mb-6" />
                <h1 className="text-3xl font-bold mb-2">Relatório Não Encontrado</h1>
                <p className="text-slate-400">O link que você acessou expirou ou é inválido.</p>
            </div>
        );
    }

    const reportData = data.report_data;
    const marketSkill = reportData.skills_results.find(s => s.name === "Market Intelligence Agent");
    const niche = marketSkill?.findings?.niche || "Negócios Locais";
    // @ts-ignore
    const companyName = reportData.company_name || reportData.target_url.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
    const score = reportData.skills_results.reduce((acc, skill) => acc + skill.score, 0) / reportData.skills_results.length;

    return (
        <main className="min-h-screen bg-[#020617] text-slate-50 font-sans p-4 sm:p-8 flex flex-col items-center">
            {/* Glow background pattern */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple via-fuchsia-500 to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] z-50"></div>

            <div className="w-full max-w-4xl pt-8 pb-16 relative z-10">
                <header className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 liquid-glass rounded-full mb-4">
                        <Activity className="w-6 h-6 text-brand-purple" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-white">
                        Auditoria Digital Estratégica
                    </h1>
                    <p className="text-slate-300 text-xl font-medium">
                        Dossiê Exclusivo: <span className="font-bold text-white tracking-wide uppercase">{companyName}</span>
                    </p>
                    <div className="mt-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            Segmento Analisado: {niche}
                        </span>
                    </div>
                </header>

                <section className="liquid-glass p-6 sm:p-8 rounded-3xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-400" />
                        Visão Geral Estratégica
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                            <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-widest">Score Técnico Geral</p>
                            <p className={`text-4xl font-black ${score > 70 ? 'text-spring-green-400' : 'text-red-400'}`}>
                                {score.toFixed(1)}/100
                            </p>
                        </div>

                        <div className="bg-red-950/20 p-5 rounded-2xl border border-red-500/20">
                            <p className="text-sm font-bold text-red-500 mb-1 uppercase tracking-widest flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4" /> Pontos de Vazamento de Vendas
                            </p>
                            <p className="text-lg font-medium text-slate-300 mt-2">
                                Foram detectados pontos onde seu negócio está literalmente perdendo dinheiro hoje por falta de estratégia digital, infraestrutura tecnológica e acompanhamento técnico correto. A pontuação baixa indica que seu ecossistema atual dificulta em vez de facilitar as vendas.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="space-y-6">
                    {reportData.skills_results.map((skill, index) => (
                        <div key={index} className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                            <div className="mb-4 border-b border-white/5 pb-4">
                                <h3 className="text-xl font-black text-white flex items-center justify-between mb-2">
                                    {skill.name === "Performance UX Agent" ? "Experiência do Usuário e Código" :
                                        skill.name === "Audit UX/SEO Agent" ? "Experiência do Usuário e Código" :
                                            skill.name === "Google My Business Auditor (Local SEO)" ? "Posicionamento no Google Maps" :
                                                skill.name === "Social Media Agent (Apify + AI)" ? "Presença nas Redes Sociais" :
                                                    skill.name === "Tracking & Data Agent" ? "Infraestrutura de Dados (Tráfego)" :
                                                        skill.name === "Tracking Intelligence Agent" ? "Infraestrutura de Dados (Tráfego)" :
                                                            skill.name === "Senior CMO Agent (Business & Sales)" ? "Análise Comercial e de Vendas" :
                                                                skill.name === "Market Intelligence Agent" ? "Inteligência de Mercado" :
                                                                    skill.name}

                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-lg ${skill.score >= 80 ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-green-500/10' :
                                        skill.score >= 50 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-yellow-500/10' :
                                            'bg-red-500/20 text-red-400 border border-red-500/30 shadow-red-500/10'
                                        }`}>
                                        {skill.score >= 80 ? 'Nota: Excelente' : skill.score >= 50 ? 'Nota: Alerta' : skill.score === 0 ? 'Indisponível' : 'Nota: Crítico'}
                                    </span>
                                </h3>

                                {/* Descrições amigáveis e super detalhadas para leigos sobre O QUE É essa área */}
                                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl mt-2">
                                    {skill.name === "Performance UX Agent" && "Nesta área, avaliamos o quão rápido o seu site carrega e se a experiência de navegação online facilita ou dificulta uma venda. Um site lento ou confuso expulsa o cliente antes mesmo dele ver sua proposta."}
                                    {skill.name === "Audit UX/SEO Agent" && "Nesta área, avaliamos o quão rápido o seu site carrega e se a experiência de navegação online facilita ou dificulta uma venda. Um site lento ou confuso expulsa o cliente antes mesmo dele ver sua proposta."}
                                    {skill.name === "Google My Business Auditor (Local SEO)" && "Aqui analisamos como o seu negócio é visto quando alguém procura pelos seus serviços no Google. Se você não aparece bem no mapa ou tem poucas avaliações, o cliente que estava pronto para comprar com você acaba sendo roubado gratuitamente pela concorrência."}
                                    {skill.name === "Social Media Agent (Apify + AI)" && "Medimos se o seu Instagram funciona como uma verdadeira 'Máquina de Aquisição' ou se é só um panfleto digital. Focamos não só em estética, mas se os textos e a estratégia realmente constroem autoridade e guiam o cliente para comprar de você."}
                                    {skill.name === "Tracking Intelligence Agent" && "Este é o 'Cérebro' por trás do Marketing Digital. Verificamos se você tem os identificadores corretos no site para rastrear visitantes. Sem isso, o sistema não consegue aprender quem é o comprador ideal."}
                                    {skill.name === "Tracking & Data Agent" && "Este é o 'Cérebro' por trás do Marketing Digital. Verificamos se você tem os identificadores corretos no site para rastrear visitantes. Sem isso, o sistema não consegue aprender quem é o comprador ideal."}
                                    {skill.name === "Senior CMO Agent (Business & Sales)" && "Avaliamos se a comunicação do site e da marca está apta para fechar negócios. Verificamos se os textos, chamadas para ação e o posicionamento geral transmitem confiança e urgência para o cliente comprar."}
                                    {skill.name === "Market Intelligence Agent" && "Mapeamos o cenário competitivo local e nacional do seu segmento. Comparamos sua presença com concorrentes reais encontrados nas buscas do Google na sua cidade."}
                                </p>

                                {/* GMB EXTRACTS */}
                                {skill.name === "Google My Business Auditor (Local SEO)" && skill.findings && (
                                    <div className="mt-6 mb-4">
                                        {skill.findings.optimization_tips && skill.findings.optimization_tips.length > 0 && (
                                            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20 mb-4">
                                                <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                                                    Oportunidades de Vendas Locais (O que fazer)
                                                </h4>
                                                <ul className="space-y-2">
                                                    {skill.findings.optimization_tips.map((tip: string, idx: number) => (
                                                        <li key={`gmb-tip-${idx}`} className="flex items-start gap-2 text-sm text-slate-300">
                                                            <span className="text-emerald-500 font-bold mt-0.5">•</span>
                                                            <span className="leading-snug">{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {skill.findings.review_sentiment && (
                                            <div className="bg-black/40 p-3 rounded-lg border border-zinc-800">
                                                <p className="text-xs uppercase font-bold text-brand-purple tracking-widest mb-1">Análise de Sentimento (IA)</p>
                                                <p className="text-sm text-slate-300 italic">"{skill.findings.review_sentiment}"</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* SOCIAL MEDIA EXTRACTS */}
                                {skill.name === "Social Media Agent (Apify + AI)" && skill.findings && (
                                    <div className="mt-6 mb-4">
                                        {skill.findings.bio_links && skill.findings.bio_links.length > 0 && (
                                            <div className="bg-fuchsia-950/20 p-4 rounded-xl border border-fuchsia-500/20">
                                                <h4 className="text-sm font-bold text-fuchsia-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                                                    Links de Aquisição na Bio (Instagram)
                                                </h4>
                                                <ul className="space-y-1">
                                                    {skill.findings.bio_links.map((link: string, idx: number) => (
                                                        <li key={`sm-link-${idx}`} className="text-sm text-fuchsia-200/80 truncate">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 inline-block mr-2"></span>
                                                            <a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{link}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* KEYWORDS EXTRACTS */}
                                {skill.name === "Keyword Research Agent" && skill.findings && skill.findings.keyword_opportunities && skill.findings.keyword_opportunities.length > 0 && (
                                    <div className="mt-6 mb-6 bg-blue-950/20 p-5 md:p-6 rounded-2xl border border-blue-500/10">
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-6 uppercase tracking-wide border-b border-blue-500/20 pb-2">
                                            <BarChart3 className="w-4 h-4 text-blue-400" /> Mapa de Oportunidades no Google
                                        </h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Cauda Curta */}
                                            <div>
                                                <h5 className="text-xs font-black text-blue-300 mb-4 uppercase tracking-widest flex items-center gap-2"><Target className="w-3 h-3" /> Termos Diretos (Cauda Curta)</h5>
                                                <div className="space-y-4">
                                                    {skill.findings.keyword_opportunities.filter((kw: any) => kw.type === 'short-tail').map((kw: any, idx: number) => {
                                                        const maxVol = Math.max(...skill.findings.keyword_opportunities.map((k: any) => parseInt(k.volume) || 1));
                                                        const pct = Math.min(100, Math.max(5, ((parseInt(kw.volume) || 0) / maxVol) * 100));
                                                        return (
                                                            <div key={`short-${idx}`} className="group">
                                                                <div className="flex justify-between items-end mb-1.5">
                                                                    <span className="text-sm text-slate-200 font-bold group-hover:text-white transition-colors truncate pr-4">{kw.keyword || kw.name}</span>
                                                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/50 text-slate-400">{kw.competition?.toUpperCase() || "ALTA"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-1.5 bg-black/50 rounded-full flex-1 overflow-hidden">
                                                                        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: `${pct}%` }}></div>
                                                                    </div>
                                                                    <span className="text-xs font-mono font-bold text-blue-400 min-w-10 text-right">{kw.volume || kw.score}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* Cauda Longa */}
                                            <div className="relative">
                                                <div className="hidden md:block absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
                                                <h5 className="text-xs font-black text-spring-green-400 mb-4 uppercase tracking-widest flex items-center gap-2"><Search className="w-3 h-3" /> Termos de Fundo de Funil (Cauda Longa)</h5>
                                                <div className="space-y-4">
                                                    {skill.findings.keyword_opportunities.filter((kw: any) => kw.type === 'long-tail').map((kw: any, idx: number) => {
                                                        const maxVol = Math.max(...skill.findings.keyword_opportunities.filter((k: any) => k.type === 'long-tail').map((k: any) => parseInt(k.volume) || 1));
                                                        const pct = Math.min(100, Math.max(5, ((parseInt(kw.volume) || 0) / maxVol) * 100));
                                                        return (
                                                            <div key={`long-${idx}`} className="group">
                                                                <div className="flex justify-between items-end mb-1.5">
                                                                    <span className="text-sm text-slate-200 font-bold group-hover:text-spring-green-300 transition-colors truncate pr-4">{kw.keyword || kw.name}</span>
                                                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/50 text-slate-400">{kw.competition?.toUpperCase() || "BAIXA"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-1.5 bg-black/50 rounded-full flex-1 overflow-hidden">
                                                                        <div className="h-full bg-gradient-to-r from-spring-green-600 to-spring-green-400" style={{ width: `${pct}%` }}></div>
                                                                    </div>
                                                                    <span className="text-xs font-mono font-bold text-spring-green-400 min-w-10 text-right">{kw.volume || kw.score}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {skill.critical_pains && skill.critical_pains.length > 0 ? (
                                <div className="mt-4">
                                    <h4 className="text-sm font-bold text-slate-100 mb-3 uppercase tracking-wider flex items-center gap-2">
                                        Vazamentos Detectados (Problemas que fazem você perder vendas):
                                    </h4>
                                    <ul className="space-y-4">
                                        {skill.critical_pains.map((pain: string, pIdx: number) => {
                                            // Traduz termos técnicos internos para linguagem do cliente
                                            let clientFriendlyPain = pain;

                                            // Traduz erros de API para linguagem humana ao invés de escondê-los
                                            if (pain.includes("Apify") || pain.includes("API")) {
                                                clientFriendlyPain = "Nosso sistema de coleta de dados externos não conseguiu acessar as informações desta área durante a auditoria. Recomendamos uma nova tentativa ou análise manual.";
                                            }
                                            if (pain.includes("Cota de IA") || pain.includes("Gemini 429") || pain.includes("Rate Limit") || pain.includes("RESOURCE_EXHAUSTED")) {
                                                clientFriendlyPain = "Houve uma limitação temporária no processamento desta área. Os dados podem estar incompletos. Recomendamos uma nova análise em alguns minutos.";
                                            }

                                            // Tech SEO & Tracking Translation
                                            if (pain.includes("GTM") || pain.includes("gtag")) {
                                                clientFriendlyPain = "Sistema de rastreamento avançado não encontrado. Se você faz anúncios, o sistema publicitário não consegue saber quem visitou seu site e não consegue otimizar campanhas.";
                                            } else if (pain.includes("Tag H1") || pain.includes("<meta") || pain.includes("SEO")) {
                                                clientFriendlyPain = "O código do seu site está 'escondido' para o Google. Ele não foi programado para ser encontrado organicamente, impedindo que clientes te encontrem de graça.";
                                            } else if (pain.includes("TTFB") || pain.includes("carregamento")) {
                                                clientFriendlyPain = "Servidor e carregamento lentos. Cada milissegundo extra faz visitantes fecharem a aba e irem para o concorrente.";
                                            } else if (pain.includes("Sem pixel do Facebook") || pain.includes("Meta Pixel")) {
                                                clientFriendlyPain = "O 'Pixel do Facebook/Instagram' não foi estruturado. Isso impossibilita realizar 'Remarketing' (aparecer de novo para quem já entrou no site mas não comprou).";
                                            }

                                            return (
                                                <details key={pIdx} className="group p-4 rounded-xl bg-red-950/20 border border-red-900/40 hover:bg-red-900/30 transition-colors open:bg-red-900/20">
                                                    <summary className="flex gap-4 cursor-pointer list-none items-start outline-none">
                                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold mt-0 transition-transform group-open:rotate-90">✕</span>
                                                        <span className="text-sm text-slate-200 leading-relaxed font-medium flex-1">{clientFriendlyPain}</span>
                                                        <span className="text-xs text-red-400/50 mt-1 ml-2 group-open:hidden">Expandir ▾</span>
                                                    </summary>
                                                    <div className="mt-4 pl-10 text-xs text-red-200/70 border-l border-red-500/20 ml-3 py-1">
                                                        <span className="block font-bold text-red-400 mb-1 uppercase tracking-widest text-[10px]">Diagnóstico Técnico Original (Raio-X)</span>
                                                        <p className="leading-relaxed whitespace-pre-wrap">{pain}</p>
                                                    </div>
                                                </details>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : (
                                <div className="mt-4 flex gap-4 p-4 rounded-xl bg-green-950/20 border border-green-900/40">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold mt-0">✓</span>
                                    <p className="text-sm text-slate-300 leading-relaxed font-medium">Parabéns. O domínio/perfil atende aos critérios ouro do mercado. Não identificamos vazamentos de venda graves nesta área.</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center border-t border-slate-800 pt-8 pb-10">
                    <p className="text-spring-green-400 font-bold tracking-widest text-sm uppercase">Próximos Passos</p>
                    <p className="text-slate-400 font-medium text-sm mt-2 max-w-xl mx-auto">
                        Identificamos onde seu funil está vazando. Os aspectos apontados como "Alerta" ou "Críticos" representam excelentes oportunidades de aumento de conversão caso sejam corrigidos estruturalmente por especialistas locais.
                    </p>
                </div>
            </div>
        </main>
    );
}
