import re
import os
import json
from google import genai
from google.genai import types
from skills_engine.core import PredatorSkill
import requests
import time
from apify_client import ApifyClient

class TrackingSkill(PredatorSkill):
    def __init__(self, target_url):
        super().__init__(target_url)
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.apify_token = os.getenv("APIFY_API_TOKEN")

    def execute(self) -> dict:
        """
        Executa a análise de Tracking usando Navegação Real (Apify Playwright)
        para detectar GA4, GTM, Meta Pixel e CTAs dinâmicos.
        """
        print(f"  [Tracking Agent] Iniciando Sniper Mode para: {self.target_url}")
        
        briefing = self._empty_boss_briefing()
        report = {
            "name": "Tracking & Data Agent",
            "score": 100,
            "findings": {
                "has_gtm": False,
                "has_ga4_base": False,
                "has_meta_pixel": False,
                "has_utm_links": False,
                "has_whatsapp_button": False,
                "whatsapp_number": None,
                "has_google_ads_signals": False,
                "google_ads_details": [],
                "has_meta_ads_signals": False,
                "meta_ads_details": [],
                "data_maturity_level": "Básico",
                "evidences": []
            },
            "critical_pains": [],
            "boss_briefing": briefing
        }

        apify_results = None
        if self.apify_token:
            try:
                client = ApifyClient(self.apify_token)
                
                # Actor: apify/playwright-scraper
                run_input = {
                    "startUrls": [{"url": self.target_url}],
                    "useChrome": True,
                    "maxPagesPerCrawl": 1,
                    "pageFunction": """
                    async ({ page, request, log }) => {
                        const result = {
                            gtm_ids: [],
                            ga4_ids: [],
                            meta_ids: [],
                            google_ads_ids: [],
                            has_datalayer: false,
                            whatsapp_links: [],
                            utm_links: [],
                            rendered_html: ""
                        };

                        result.has_datalayer = !!window.dataLayer;
                        const content = await page.content();
                        result.rendered_html = content;

                        const gtmMatch = content.match(/GTM-[A-Z0-9]+/g);
                        if (gtmMatch) result.gtm_ids = [...new Set(gtmMatch)];

                        const ga4Match = content.match(/G-[A-Z0-9]+/g);
                        if (ga4Match) result.ga4_ids = [...new Set(ga4Match)];

                        const metaMatch = content.match(/fbq\\('init',\\s*'(\\d+)'\\)/g);
                        if (metaMatch) result.meta_ids = metaMatch.map(m => m.match(/\\d+/)[0]);

                        const adsMatch = content.match(/AW-\d+/g);
                        if (adsMatch) result.google_ads_ids = [...new Set(adsMatch)];

                        const waLinks = await page.$$eval('a[href*="wa.me"], a[href*="api.whatsapp.com"]', 
                            els => els.map(el => el.href));
                        result.whatsapp_links = waLinks;

                        const utmLinks = await page.$$eval('a[href*="utm_"]', 
                            els => els.map(el => el.href));
                        result.utm_links = utmLinks;

                        return result;
                    }
                    """
                }
                
                run = client.actor("apify/playwright-scraper").call(run_input=run_input)
                items = list(client.dataset(run["defaultDatasetId"]).iterate_items())
                if items:
                    apify_results = items[0]
                    print(f"  [Tracking Agent] Dados extraídos via Sniper: {len(items)} items.")

            except Exception as e:
                print(f"  [Tracking Agent] Erro ao chamar Apify: {e}")

        src_html = apify_results.get("rendered_html", self.raw_html) if apify_results else self.raw_html
        
        # 1. GTM
        has_gtm = False
        if apify_results and apify_results.get("gtm_ids"):
            has_gtm = True
            report["findings"]["gtm_details"] = apify_results["gtm_ids"]
        elif re.search(r"GTM-[A-Z0-9]+", src_html, re.IGNORECASE):
            has_gtm = True

        if has_gtm:
            report["findings"]["has_gtm"] = True
            briefing["pontos_positivos"].append("Google Tag Manager detectado (Infraestrutura de Controle ativa).")
        else:
            report["score"] -= 25
            report["critical_pains"].append("Cegueira Completa de Eventos (GTM Inexistente).")
            report["findings"]["evidences"].append("O container 'GTM-XXXX' não foi encontrado.")

        # 2. GA4
        has_ga4 = False
        if apify_results and apify_results.get("ga4_ids"):
            has_ga4 = True
            report["findings"]["ga4_details"] = apify_results["ga4_ids"]
        elif re.search(r"G-[A-Z0-9]+", src_html, re.IGNORECASE):
            has_ga4 = True

        if has_ga4:
            report["findings"]["has_ga4_base"] = True
            briefing["pontos_positivos"].append("Google Analytics 4 detectado.")
        else:
            report["score"] -= 20
            report["critical_pains"].append("Tráfego Amador: Empresa não mede de onde vêm os visitantes.")

        # 3. Meta Pixel
        has_pixel = False
        if apify_results and apify_results.get("meta_ids"):
            has_pixel = True
            report["findings"]["meta_pixel_details"] = apify_results["meta_ids"]
        elif re.search(r"fbq\(|fbp=", src_html, re.IGNORECASE):
            has_pixel = True

        if has_pixel:
            report["findings"]["has_meta_pixel"] = True
            briefing["pontos_positivos"].append("Meta Pixel detectado.")
        else:
            report["score"] -= 30
            report["critical_pains"].append("Hemorragia de Receita: Site sem Pixel para Remarketing.")
            report["findings"]["evidences"].append("Pixel da Meta ausente. Perdendo 100% do público do Instagram/Facebook.")

        # 3.5 Google Ads
        has_ads = False
        if apify_results and apify_results.get("google_ads_ids"):
            has_ads = True
            report["findings"]["google_ads_details"] = apify_results["google_ads_ids"]
        elif re.search(r"AW-\d+", src_html):
            has_ads = True

        report["findings"]["has_google_ads_signals"] = has_ads
        if has_ads:
            briefing["pontos_positivos"].append("Sinais de Google Ads detectados.")
        else:
            briefing["pontos_negativos"].append("Sem sinais de Google Ads ativos.")

        # 4. WhatsApp
        wa_found = False
        wa_num = None
        if apify_results and apify_results.get("whatsapp_links"):
            wa_found = True
            for link in apify_results["whatsapp_links"]:
                m = re.search(r'(?:wa\.me/|phone=)(\d+)', link)
                if m: wa_num = m.group(1)
        
        if not wa_found:
            m = re.search(r'(?:wa\.me/|api\.whatsapp\.com/send\?phone=)(\d+)', src_html)
            if m:
                wa_found = True
                wa_num = m.group(1)

        report["findings"]["has_whatsapp_button"] = wa_found
        report["findings"]["whatsapp_number"] = wa_num
        if wa_found:
            briefing["pontos_positivos"].append(f"WhatsApp detectado ({wa_num if wa_num else 'Botão Visível'}).")
        else:
            report["score"] -= 15
            report["critical_pains"].append("Canal de Vendas Diretas Ausente (Sem WhatsApp).")

        # 5. UTMs
        has_utm = False
        if apify_results and apify_results.get("utm_links"):
            has_utm = True
        elif "utm_source" in src_html.lower():
            has_utm = True

        if has_utm:
            report["findings"]["has_utm_links"] = True
            briefing["pontos_positivos"].append("Rastreamento de origens (UTMs) detectado.")
        else:
            report["score"] -= 10
            report["critical_pains"].append("Gestão de Tráfego Cega: UTMs ausentes nos links.")

        # AI ANALYSIS
        if self.api_key:
            try:
                pixels_found_list = []
                if report["findings"].get("has_gtm"): pixels_found_list.append("Google Tag Manager")
                if report["findings"].get("has_ga4_base"): pixels_found_list.append("Google Analytics (GA4)")
                if report["findings"].get("has_meta_pixel"): pixels_found_list.append("Meta Pixel")
                
                prompt = f"""
                PERSONA:
                Você é o 'Auditor de Vendas & Tráfego' (Agente 05).
                Sua missão é dar o 'Veredito de Hemorragia Financeira' baseado nos furos de rastreamento.

                DADOS EXTRAÍDOS:
                - Tags Principais Encontradas: {", ".join(pixels_found_list) if pixels_found_list else "Nenhuma"}
                - Tem GTM: {report["findings"].get("has_gtm")}
                - Tem GA4: {report["findings"].get("has_ga4_base")}
                - Tem Pixel Meta: {report["findings"].get("has_meta_pixel")}
                - Tem WhatsApp: {report["findings"].get("has_whatsapp_button")}
                - Tem UTMs: {report["findings"].get("has_utm_links")}
                - Site do Alvo: {self.target_url}

                SUA MISSÃO:
                1. Nível de Maturidade (Cego, Amador, Iniciante, Profissional, Elite).
                2. Risco de Desperdício (0-100%).
                3. Veredito Executivo: 1 frase de impacto sobre o dinheiro perdido.
                4. Pontos Cegos: Lista de objetos {{"issue": "...", "business_impact": "..."}}.
                5. Plano de Ação: Lista de objetos {{"priority": "URGENTE" ou "ESCALA", "action": "..."}}.
                6. Alertas Críticos EXATAMENTE no formato: "[FERRAMENTA] não encontrada causando [IMPACTO 1], [IMPACTO 2] e [IMPACTO 3]".
                
                JSON Output Format:
                {{
                    "maturity_level": "...",
                    "risk_score_percentage": 0-100,
                    "executive_verdict": "...",
                    "blind_spots": [{{ "issue": "...", "business_impact": "..." }}],
                    "action_plan": [{{ "priority": "...", "action": "..." }}],
                    "critical_alerts": ["..."]
                }}
                """
                
                json_data = self._call_llm_json(prompt)
                if json_data and isinstance(json_data, dict):
                    report["findings"].update(json_data)
                    
            except Exception as ai_err:
                print(f"  [Traffic Agent] Falha na cognição Arsenal: {ai_err}")

        return report
