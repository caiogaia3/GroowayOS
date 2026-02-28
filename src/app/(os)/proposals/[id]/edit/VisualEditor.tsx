import React from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

type ContentProps = {
    content: any;
    setContent: (content: any) => void;
};

export default function VisualEditor({ content, setContent }: ContentProps) {
    if (!content) return null;

    const handleHeaderChange = (field: string, value: string) => {
        setContent({
            ...content,
            header: {
                ...content.header,
                [field]: value
            }
        });
    };

    const handleSectionChange = (index: number, newSection: any) => {
        const newSections = [...(content.sections || [])];
        newSections[index] = newSection;
        setContent({ ...content, sections: newSections });
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Cabeçalho */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-bold text-white mb-4">Cabeçalho da Proposta</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-1.5">Nome do Cliente</label>
                        <input
                            type="text"
                            value={content.header?.client_name || ""}
                            onChange={(e) => handleHeaderChange("client_name", e.target.value)}
                            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-1.5">Empresa</label>
                        <input
                            type="text"
                            value={content.header?.client_company || ""}
                            onChange={(e) => handleHeaderChange("client_company", e.target.value)}
                            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-1.5">Responsável Grooway</label>
                        <input
                            type="text"
                            value={content.header?.proponent || ""}
                            onChange={(e) => handleHeaderChange("proponent", e.target.value)}
                            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-1.5">Headline de Escopo</label>
                        <input
                            type="text"
                            value={content.header?.scope_headline || ""}
                            onChange={(e) => handleHeaderChange("scope_headline", e.target.value)}
                            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>
                </div>
            </div>

            {/* Seções */}
            <div className="flex flex-col gap-6 w-full">
                {content.sections?.map((section: any, idx: number) => {
                    return (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                                <GripVertical className="w-5 h-5 text-neutral-500" />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={section.title || ""}
                                        onChange={(e) => {
                                            const newS = { ...section, title: e.target.value };
                                            handleSectionChange(idx, newS);
                                        }}
                                        className="bg-transparent border-none text-lg font-bold text-white focus:ring-0 p-0 w-full"
                                    />
                                    <div className="text-xs text-neutral-500">Tipo: {section.type}</div>
                                </div>
                            </div>

                            {section.type === "concept" && (
                                <div>
                                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">Conteúdo</label>
                                    <textarea
                                        rows={4}
                                        value={section.content || ""}
                                        onChange={(e) => handleSectionChange(idx, { ...section, content: e.target.value })}
                                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                                    />
                                </div>
                            )}

                            {section.type === "strategy_pillars" && (
                                <div className="space-y-4">
                                    <textarea
                                        rows={2}
                                        value={section.intro || ""}
                                        onChange={(e) => handleSectionChange(idx, { ...section, intro: e.target.value })}
                                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {section.pillars?.map((p: any, pIdx: number) => (
                                            <div key={pIdx} className="border border-white/10 rounded-lg p-3 bg-neutral-900">
                                                <input
                                                    value={p.title || ""}
                                                    onChange={e => {
                                                        const np = [...section.pillars];
                                                        np[pIdx].title = e.target.value;
                                                        handleSectionChange(idx, { ...section, pillars: np });
                                                    }}
                                                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-white px-0"
                                                    placeholder="Título"
                                                />
                                                <textarea
                                                    value={p.description || ""}
                                                    onChange={e => {
                                                        const np = [...section.pillars];
                                                        np[pIdx].description = e.target.value;
                                                        handleSectionChange(idx, { ...section, pillars: np });
                                                    }}
                                                    className="w-full bg-transparent border-none focus:ring-0 text-xs text-neutral-400 px-0 resize-none"
                                                    rows={3}
                                                    placeholder="Descrição"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {section.type === "investment" && (
                                <div className="space-y-4">
                                    {section.cards?.map((card: any, cIdx: number) => (
                                        <div key={cIdx} className="border border-white/10 rounded-lg p-4 bg-neutral-900 flex flex-col gap-3">
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    value={card.title || ""}
                                                    onChange={e => {
                                                        const nc = [...section.cards];
                                                        nc[cIdx].title = e.target.value;
                                                        handleSectionChange(idx, { ...section, cards: nc });
                                                    }}
                                                    className="bg-transparent border-b border-white/10 focus:border-purple-500 focus:ring-0 text-sm font-bold text-white px-0 pb-1"
                                                    placeholder="Título do Pacote"
                                                />
                                                <div className="flex gap-2">
                                                    <span className="text-sm text-neutral-400 mt-1">R$</span>
                                                    <input
                                                        type="number"
                                                        value={card.price || 0}
                                                        onChange={e => {
                                                            const nc = [...section.cards];
                                                            nc[cIdx].price = Number(e.target.value);
                                                            handleSectionChange(idx, { ...section, cards: nc });
                                                        }}
                                                        className="flex-1 bg-transparent border-b border-white/10 focus:border-purple-500 focus:ring-0 text-sm text-white px-0 pb-1"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs text-neutral-500">Etiqueta</label>
                                                <input
                                                    value={card.label || ""}
                                                    onChange={e => {
                                                        const nc = [...section.cards];
                                                        nc[cIdx].label = e.target.value;
                                                        handleSectionChange(idx, { ...section, cards: nc });
                                                    }}
                                                    className="w-full bg-transparent border-b border-white/10 focus:border-purple-500 focus:ring-0 text-xs text-white px-0 pb-1"
                                                />
                                            </div>
                                            <textarea
                                                value={card.items ? card.items.join('\n') : ""}
                                                onChange={e => {
                                                    const nc = [...section.cards];
                                                    nc[cIdx].items = e.target.value.split('\n');
                                                    handleSectionChange(idx, { ...section, cards: nc });
                                                }}
                                                className="w-full bg-transparent border border-white/10 rounded focus:border-purple-500 focus:ring-0 text-xs text-neutral-400 p-2 resize-none"
                                                rows={4}
                                                placeholder="Itens (1 por linha)"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Fallback para JSON pra seções complexas temporariamente */}
                            {["modules", "timeline", "validity"].includes(section.type) && (
                                <div>
                                    <div className="text-xs text-yellow-500 mb-2">Edição Visual em breve para este tipo. Por enquanto, valide os dados abaixo:</div>
                                    <textarea
                                        value={JSON.stringify(section, null, 2)}
                                        onChange={(e) => {
                                            try {
                                                const parsed = JSON.parse(e.target.value);
                                                handleSectionChange(idx, parsed);
                                            } catch (err) { } // ignore while typing invalid JSON
                                        }}
                                        className="w-full bg-neutral-950 font-mono border border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-300 resize-none h-48"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
