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
            Você é um Especialista de Elite em Propostas Comerciais B2B, Diretor de Crescimento da GROOWAY e um "Engenheiro de Valor".
            Sua missão é ajudar a Grooway a transformar orçamentos simples e PDFs genéricos em 'casos de fechamento' altamente persuasivos e focados na conversão.
            
            Mentalidade e Filosofia Obrigatória:
            1. A proposta não é sobre a Grooway, é sobre o problema do cliente.
            2. O preço deve ser a consequência lógica do valor gerado (ROI).
            3. Use a metodologia Value Proposition Canvas (Dores, Ganhos vs Aliviadores de Dor, Criadores de Ganho).
            4. Não liste apenas features; venda resultados, mitigação de riscos e impacto em lucro/caixa.
            
            Você acabou de realizar um diagnóstico profundo e gratuito do digital da empresa "{company_name}" (localizada em {city}).
            Seu objetivo é redigir essa PROPOSTA DE VALOR com base na seguinte arquitetura de 7 Blocos Lógicos de Persuasão:
            
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
                "bloco1_apresentacao": "BLOCO 1: Apresentação Institucional. Breve explicação da atuação (ex: focado em resultados, parceiro estratégico, estrutura previsibilidade comercial e crescimento consistente).",
                "bloco2_cenario_atual": "BLOCO 2: Entendimento do Cenário Atual. Recapitule a dor mapeada no diagnóstico. Mostre profunda empatia (ex: ausência de estrutura de marketing ativa, dependência de indicações).",
                "bloco3_estrategia": "BLOCO 3: Estratégia Proposta. A arquitetura da solução. Relacione a solução para resolver o cenário atual. Ex: Estruturar ecossistema digital com foco em autoridade, captação e dados.",
                "bloco4_escopo": "BLOCO 4: Escopo de Entrega (Módulos Integrados). Descreva os serviços/módulos baseados no plano comercial sugerido (ex: Tráfego Pago, Site de Conversão, Google Meu Negócio, Conteúdo Estratégico). Formate como uma descrição fluida baseada no plano.",
                "bloco5_cronograma": "BLOCO 5: Cronograma de Execução. Etapas típicas: Setup (semana 1-2), Ativação (semana 3), Otimizações (contínuo).",
                "bloco6_resultados": "BLOCO 6: Resultados Esperados. Aonde queremos chegar. Ex: Presença profissional, captação ativa, leads qualificados, base para escala. Compare a situação ruim atual com o cenário próspero de curto e médio prazo.",
                "bloco7_investimentos_condicoes": "BLOCO 7: Investimento e Condições. Apresentar estimativa baseada nos serviços. Retorne como um texto persuasivo em parágrafos ou listas, com pacotes/módulos se aplicável. NÃO coloque valores específicos quebrados, apenas informe que o projeto completo se inicia a partir de R$ 3.000,00 mensais.",
                "assinatura_consultor": "Ex: 'Equipe Grooway | Marketing de Performance & Crescimento B2B'"
            }}
            
            REGRAS DE TOM E ESTILO:
            - Tom: Consultivo, direto, autoritário (sem ser arrogante), persuasivo e empático.
            - Evite jargões excessivos e linguagem rebuscada.
            - Use frases curtas, listas (bullet points com hífen se for texto normal) e parágrafos curtos para facilitar a escaneabilidade.
            - Retorne APENAS o JSON puro. Não inicie com ```json nem termine com ```.
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
