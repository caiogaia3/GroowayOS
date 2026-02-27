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
            # CONSOLIDA INTELIGÊNCIA ESTRATÉGICA (ALCHEMIST BRIEFING)
            # ---------------------------------------------------
            strategic_intelligence = ""
            cmo_verdict = ""
            cmo_plan = []

            if hasattr(self, 'previous_results_context') and self.previous_results_context:
                for agent_name, agent_data in self.previous_results_context.items():
                    # Briefing específico para o Alchemist (Copywriting/Oferta)
                    intel = agent_data.get("internal_briefing_for_alchemist", "")
                    score = agent_data.get("score", "?")
                    agent_pains = agent_data.get("critical_pains", [])
                    findings = agent_data.get("findings", {})

                    if intel or agent_pains:
                        strategic_intelligence += f"\n--- INSIGHT ESTRATÉGICO: {agent_name} (Score: {score}/100) ---\n"
                        if intel:
                            strategic_intelligence += f"RECOMENDAÇÃO DE OFERTA: {intel}\n"
                        if agent_pains:
                            strategic_intelligence += "DORES CRÍTICAS: " + "; ".join(agent_pains) + "\n"

                    # Extrai o veredito e plano do CMO (O Boss)
                    if "Senior CMO" in agent_name or "Boss" in agent_name.title():
                        cmo_verdict = findings.get("cmo_verdict", "")
                        cmo_plan = findings.get("plano_comercial", {}).get("servicos_recomendados", [])
            else:
                strategic_intelligence = "Nenhum relatório anterior recebido."

            cmo_plan_str = json.dumps(cmo_plan, ensure_ascii=False) if cmo_plan else "Nenhum plano disponível."

            client = genai.Client(api_key=self.api_key)

            prompt = f"""
            PERSONA:
            Você é o 'Alquimista de Ofertas' (Agente 07), mestre da persuasão e arquitetura de valor.
            Seu Arsenal inclui o 'Gerador de Headline Magnética' e o 'Scanner de Objeções'.
            Sua missão é transmutar dados técnicos no 'Veredito de Copy Fraca' e na 'Alquimia de Oferta Irresistível'.

            INTELIGÊNCIA DE RECONHECIMENTO (DORES E BRECHAS):
            {strategic_intelligence}
            
            VEREDITO DO COMANDANTE (THE BOSS):
            {cmo_verdict}
            
            MISSÃO: GERAR A ALQUIMIA DE OFERTA IRRESISTÍVEL (7 BLOCOS)
            1. HEADLINE MAGNÉTICA: Exponha o vácuo de autoridade ou o sangramento financeiro.
            2. O VÁCUO ATUAL: Use as dores críticas detectadas pelos agentes para gerar desconforto real.
            3. AGITAÇÃO (LUCRO CESSANTE): Mostre quanto custa NÃO agir agora ({company_name} está financiando a concorrência em {city}).
            4. PROVA TÉCNICA: Transforme os scores baixos do site/ads/social em autoridade da GroowayOS.
            5. A PONTE DE VALOR: Como a solução Grooway transmuta esse caos em faturamento.
            6. QUEBRA DE OBJEÇÕES: Mate o "está caro" ou "vou ver depois" com o Scanner de Objeções.
            7. COMANDO DE AÇÃO (CTA): O próximo passo inevitável.

            JSON OUTPUT FORMAT:
            {{
                "headline_magnetica": "Headline de impacto total",
                "veredito_copy": "Sua análise ácida sobre a comunicação atual",
                "bloco_dor": "A dor profunda extraída do diagnóstico",
                "custo_inacao": "Cálculo mental/argumento do lucro cessante",
                "solucao_alquimica": "Como o Plano de Dominação resolve o problema",
                "quebra_objecoes": "Munição rápida para matar o 'não'",
                "cta_final": "Chamada para ação agressiva",
                "alquimista_verdict": "Veredito final para o dossiê (2-3 linhas)",
                "sniper_ammo": "Munição letal de copy para o Agente 09 fechar o contrato."
            }}
            """

            response = client.models.generate_content(
                model='gemini-2.0-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.2,
                    response_mime_type="application/json"
                )
            )

            if response.text:
                json_data = json.loads(response.text)
                if isinstance(json_data, dict):
                    report["findings"].update(json_data)
                    report["internal_briefing_for_closer"] = json_data.get("sniper_ammo", "")
                    
                    verdict = json_data.get("alquimista_verdict", "")
                    if verdict:
                        report["boss_briefing"] = {
                            "recomendacoes": [f"AO ALQUIMISTA: {verdict}"],
                            "pontos_positivos": [],
                            "pontos_negativos": []
                        }
            else:
                report["critical_pains"].append("O Alquimista não conseguiu destilar a oferta.")

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
