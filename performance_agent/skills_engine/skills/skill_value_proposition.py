from skills_engine.core import PredatorSkill
import os
import json
from google import genai
from google.genai import types

class ValuePropositionSkill(PredatorSkill):
    """
    COMPLEMENTAR DO BOSS: Gerador de Proposta de Valor Irresistível.
    Recebe o diagnóstico completo de todos os agentes + veredito do CMO
    e constrói uma proposta de valor persuasiva e estruturada para convencer
    a empresa diagnosticada a contratar os serviços da Grooway.
    """
    def __init__(self, target_url, params=None):
        super().__init__(target_url)
        self.params = params or {}

        from dotenv import load_dotenv
        load_dotenv(dotenv_path=".env")
        load_dotenv(dotenv_path="../raio-x-digital/.env.local")

        self.api_key = os.getenv("GEMINI_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")

    def execute(self) -> dict:
        report = {
            "name": "Value Proposition Agent (Grooway)",
            "score": 100,
            "findings": {
                "titulo_proposta": "",
                "contexto_problema": "",
                "custo_inacao": "",
                "solucao_customizada": "",
                "valor_gerado_roi": "",
                "investimento_pacotes": "",
                "mitigacao_risco": "",
                "proximos_passos": "",
                "assinatura_consultor": ""
            },
            "critical_pains": []
        }

        pains = report.get("critical_pains", [])
        if not isinstance(pains, list):
            pains = []
            report["critical_pains"] = pains

        if not self.api_key:
            pains.append("API Key Gemini não configurada.")
            return report

        try:
            company_name = self.params.get("companyName", "Empresa Diagnosticada")
            city = self.params.get("city", "sua região")

            # ---------------------------------------------------
            # CONSOLIDA O DIAGNÓSTICO COMPLETO DE TODOS OS AGENTES
            # ---------------------------------------------------
            all_briefings = ""
            cmo_verdict = ""
            cmo_plan = []

            if hasattr(self, 'previous_results_context') and self.previous_results_context:
                for agent_name, agent_data in self.previous_results_context.items():
                    bb = agent_data.get("boss_briefing", {})
                    findings = agent_data.get("findings", {})
                    score = agent_data.get("score", "?")
                    agent_pains = agent_data.get("critical_pains", [])

                    # Extrai o veredito e plano do CMO especificamente
                    if "Senior CMO" in agent_name or "Boss" in agent_name.title():
                        cmo_verdict = findings.get("cmo_verdict", "")
                        cmo_plan = findings.get("plano_comercial", {}).get("servicos_recomendados", [])

                    agent_section = f"\n--- {agent_name} (Score: {score}/100) ---\n"
                    neg = bb.get("pontos_negativos", [])
                    pos = bb.get("pontos_positivos", [])
                    brechas = bb.get("brechas_diferenciacao", [])

                    if neg:
                        agent_section += "NEGATIVOS:\n" + "\n".join([f"  ❌ {n}" for n in neg]) + "\n"
                    if pos:
                        agent_section += "POSITIVOS:\n" + "\n".join([f"  ✅ {p}" for p in pos]) + "\n"
                    if brechas:
                        agent_section += "BRECHAS:\n" + "\n".join([f"  💡 {b}" for b in brechas]) + "\n"
                    if agent_pains:
                        agent_section += "DORES:\n" + "\n".join([f"  🔴 {p}" for p in agent_pains]) + "\n"

                    all_briefings += agent_section
            else:
                all_briefings = "Nenhum relatório anterior recebido."

            cmo_plan_str = json.dumps(cmo_plan, ensure_ascii=False) if cmo_plan else "Nenhum plano disponível."

            client = genai.Client(api_key=self.api_key)

            prompt = f"""
            Você é um Especialista de Elite em Propostas Comerciais B2B e Engenheiro de Valor. Sua missão é ajudar empresas e vendedores a transformarem orçamentos simples e PDFs genéricos em 'casos de fechamento' altamente persuasivos e focados na conversão.
            
            Sua Mentalidade e Filosofia:
            Uma proposta não é sobre a empresa que vende, é sobre o problema do cliente. Nunca comece falando do currículo da empresa.
            O preço deve ser a consequência lógica do valor gerado (ROI).
            Você utiliza o Value Proposition Canvas (entende as Dores, Ganhos e Tarefas do cliente para alinhar com os Aliviadores de Dor e Criadores de Ganho).
            Você não lista características técnicas (features); você vende resultados, transformação e impacto no negócio (lucro, redução de custos, mitigação de riscos).
            
            Você acabou de realizar um diagnóstico profundo e gratuito do digital da empresa "{company_name}" (localizada em {city}).
            Seu objetivo é redigir a PROPOSTA DE VALOR com base na seguinte arquitetura de 7 blocos lógicos de persuasão:
            
            ========== DIAGNÓSTICO COMPLETO ==========
            {all_briefings}
            ==========================================
            
            ========== VEREDITO DO CMO ==========
            {cmo_verdict}
            =====================================
            
            ========== PLANO COMERCIAL DO CMO ==========
            {cmo_plan_str}
            =============================================
            
            ESTRUTURA DA PROPOSTA DE SAÍDA (Obrigatório em JSON puro, sem markdown block):
            {{
                "titulo_proposta": "Persuasivo e focado no ganho principal. Ex: Projeto de Estruturação Digital e Aquisição para a {company_name}",
                "bloco1_apresentacao": "Bloco 1: Contexto e Resumo do Problema Validado. Inicie recapitulando o cenário atual e a dor do cliente, mostrando profunda empatia e prova de que o problema foi compreendido.",
                "bloco2_cenario_atual": "Bloco 2: Consequências e Custo da Inação (Gatilho da Aversão à Perda). Mostre de forma tangível o que o cliente perde (financeiramente ou em eficiência) se não resolver o problema agora.",
                "bloco3_estrategia": "Bloco 3: A Solução Customizada. Apresente a solução não como um catálogo de produtos, mas explicando como ela preenche a lacuna entre a dor atual e o ganho desejado, através de um escopo e cronograma claros.",
                "bloco4_escopo": "Bloco 4: Valor Gerado e ROI (Retorno sobre o Investimento). Traduza a solução em ganhos mensuráveis. Compare o custo do problema com os ganhos que sua solução trará.",
                "bloco5_cronograma": "Bloco 5: Investimento Contextualizado e Psicologia de Preços. Nunca apresente o preço solto. Apresente o valor ancorado nos ganhos. Sempre que possível, sugira a criação de opções de pacotes (ex: Básico, Recomendado, Premium) utilizando o 'Efeito Isca' (Decoy Effect) para facilitar a decisão. NÃO coloque valores específicos quebrados, apenas informe que o projeto completo se inicia a partir de R$ 3.000,00 mensais.",
                "bloco6_resultados": "Bloco 6: Prova Social e Mitigação de Risco. Inclua espaço para cases de sucesso, depoimentos e garantias que quebrem a percepção de risco.",
                "bloco7_investimentos_condicoes": "Bloco 7: Próximos Passos Claros (Call to Action). Encerre com um convite à ação claro e sem atritos, definindo prazos e responsáveis pelo próximo movimento.",
                "assinatura_consultor": "Ex: 'Equipe Grooway | Marketing de Performance & Crescimento B2B'"
            }}
            
            Seu Tom de Voz: Consultivo, direto, autoritário (sem ser arrogante), persuasivo e empático. Evite jargões excessivos e linguagem rebuscada. Use frases curtas, listas (bullet points) e resumos para facilitar a escaneabilidade da leitura.
            Retorne APENAS o JSON puro. Não inicie com ```json nem termine com ```.
            """

            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.4
                )
            )

            if response.text:
                json_data = json.loads(response.text)
                report["findings"] = json_data
            else:
                pains.append("Gemini não retornou proposta de valor.")

        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                if self.openai_api_key:
                    try:
                        from openai import OpenAI
                        openai_client = OpenAI(api_key=self.openai_api_key)
                        oai_response = openai_client.chat.completions.create(
                            model="gpt-4o-mini",
                            messages=[
                                {"role": "system", "content": "You are an API that outputs valid JSON only. Respond in Portuguese (Brazil)."},
                                {"role": "user", "content": prompt}
                            ],
                            response_format={"type": "json_object"},
                            temperature=0.4
                        )
                        raw_text = oai_response.choices[0].message.content
                        if raw_text:
                            json_data = json.loads(raw_text)
                            report["findings"] = json_data
                        else:
                            pains.append("Fallback OpenAI: Resposta vazia.")
                    except Exception as fallback_e:
                        pains.append(f"Falha na geração da proposta de valor: {fallback_e}")
                else:
                    pains.append("Limite da IA atingido. Tente novamente em breve.")
            else:
                pains.append(f"Erro na geração da proposta de valor: {e}")

        return report
