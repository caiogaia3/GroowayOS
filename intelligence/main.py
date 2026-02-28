import sys
import time
import json
import requests
import os
from tenacity import retry, stop_after_attempt, wait_exponential
from dotenv import load_dotenv
from supabase import create_client, Client

# Carrega ambiente vital (Supabase, OpenAI, Gemini)
load_dotenv() # Procura .env automaticamente no diretório atual
load_dotenv(dotenv_path=".env") # Garante local
load_dotenv(dotenv_path="../.env.local") # Fallback Next.js se rodar da raiz

print(f"[*] Verificando chaves de API...")
print(f"    GEMINI_API_KEY: {'[OK]' if os.getenv('GEMINI_API_KEY') else '[MISSING]'}")
print(f"    OPENAI_API_KEY: {'[OK]' if os.getenv('OPENAI_API_KEY') else '[MISSING]'}")
print(f"    APIFY_API_TOKEN: {'[OK]' if os.getenv('APIFY_API_TOKEN') else '[MISSING]'}")

# Correção vital para macOS (LibreSSL / OpenSSL conflitos com Gemini/gRPC)
os.environ["GRPC_DNS_RESOLVER"] = "native"
import ssl
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

from concurrent.futures import ThreadPoolExecutor
from skills_engine.skills.agent_05_rastreador_leads.skill_tracking import TrackingSkill
from skills_engine.skills.agent_02_perito_site.skill_performance import PerformanceSkill
from skills_engine.skills.agent_04_espiao_mercado.skill_market_research import MarketResearchSkill
from skills_engine.skills.agent_03_auditor_atencao.skill_social_media import SocialMediaResearchSkill
from skills_engine.skills.agent_08_tribunal_boss.skill_senior_analyst import SeniorAnalystSkill
from skills_engine.skills.agent_01_detetive_gmb.skill_google_my_business import GMBAuditorSkill
from skills_engine.skills.agent_06_maestro_ads.skill_keyword_research import KeywordResearchSkill
from skills_engine.skills.agent_07_alquimista_ofertas.skill_value_proposition import ValuePropositionSkill
from skills_engine.skills.agent_09_sniper_fechamento.skill_closer import CloserSkill
from skills_engine.skills.agent_10_design_visionary.skill_design_translation import DesignTranslationSkill

class PredatorOrchestrator:
    def __init__(self, params):
        self.params = params
        target_url = params.get("url", "")
        self.target_url = target_url if target_url.startswith("http") else f"https://{target_url}"
        self.raw_html = ""
        self.load_time = 0.0
        self.skills = []
        
        # Onde a mágica acontece. Adicione novas skills aqui.
        self._register_skills()

    def _register_skills(self):
        # Array of selected agents passed from the frontend UI
        selected_agents = self.params.get("selectedAgents", [])
        
        # If no agents are selected or the parameter is missing, default to running all frontier agents
        if not selected_agents:
            selected_agents = ["tracking", "performance", "market", "social", "gmb", "keywords"]

        if "tracking" in selected_agents:
            self.skills.append(TrackingSkill(self.target_url))
        if "performance" in selected_agents:
            self.skills.append(PerformanceSkill(self.target_url))
        if "market" in selected_agents:
            self.skills.append(MarketResearchSkill(self.target_url, self.params))
            
        if "social" in selected_agents:
            insta_url = self.params.get("instagram", "")
            insta_url = insta_url.strip().rstrip("/")
            handle = insta_url.split("/")[-1].replace("@", "") if insta_url else self.target_url.split("://")[-1].split(".")[0]
            self.skills.append(SocialMediaResearchSkill(handle))
            
        if "gmb" in selected_agents:
            self.skills.append(GMBAuditorSkill(self.target_url, self.params))
            
        if "keywords" in selected_agents:
            self.skills.append(KeywordResearchSkill(self.target_url, self.params))
        
        # --- COMPILATION AGENTS (ALWAYS RUN) ---
        # Skill do Diretor de Marketing Implacável (O Boss)
        self.skills.append(SeniorAnalystSkill(self.target_url, self.params))
        
        # Skill Complementar do Boss: Proposta de Valor Irresistível
        self.skills.append(ValuePropositionSkill(self.target_url, self.params))
        
        # O GOLPE DE MISERICÓRDIA: O Fechador (SEMPRE O ÚLTIMO)
        self.skills.append(CloserSkill(self.target_url, self.params))

        # O TRADUTOR DIDÁTICO E DESIGNER (Prepara o PDF)
        self.skills.append(DesignTranslationSkill(self.target_url, self.params))

    def _fetch_target(self):
        """Faz a requisição vital 1 única vez para não afogar o servidor alvo e passa o HTML pras skills."""
        print(f"[*] Motores ligados. Mirando no alvo: {self.target_url}")
        try:
            start_time = time.time()
            # Modern browser User-Agent to avoid blocks from security systems (UX/SEO Agent fix)
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            }
            response = requests.get(self.target_url, timeout=12, headers=headers)
            self.load_time = time.time() - start_time
            
            if response.status_code == 200:
                self.raw_html = response.text
                print(f"[+] Alvo engajado. Load real capturado: {self.load_time:.2f}s.")
            else:
                print(f"[!] O servidor rejeitou o contato HTTP {response.status_code}.")
        except Exception as e:
            print(f"[!] Escudo bloqueou a análise: {e}")

    def _run_skill(self, skill, previous_results_context=None):
        """Injeta os dados base e ativa a Skill específica."""
        # Se for o Senior Analyst, além do HTML, passamos o histórico de tudo que as skills acharam
        if isinstance(skill, SeniorAnalystSkill):
            skill.setup(self.raw_html, self.load_time, previous_results_context)
        else:
            skill.setup(self.raw_html, self.load_time)
        
        # Passa o contexto para agentes de compilação que precisam dele
        if isinstance(skill, (ValuePropositionSkill, CloserSkill, DesignTranslationSkill)):
            skill.previous_results_context = previous_results_context
            
        # DesignTranslation tem assinatura especial
        if isinstance(skill, DesignTranslationSkill):
            return skill.execute(previous_results_context=previous_results_context)
        
        return skill.execute()

    def run(self):
        self._fetch_target()
        
        master_report: Dict[str, Any] = {
            "target_url": self.target_url,
            "company_name": self.params.get("companyName", ""),
            "scan_timestamp": time.time(),
            "skills_results": []
        }

        print(f"[*] Lançando {len(self.skills)} Agentes sequencialmente (Prevenção Antifraude API)...")
        
        for skill in self.skills:
            try:
                skill_name = skill.__class__.__name__
                print(f"[*] Chamando {skill_name}...")
                start_skill = time.time()
                
                # Logic for strategy-aware agents
                if isinstance(skill, (SeniorAnalystSkill, ValuePropositionSkill, CloserSkill, DesignTranslationSkill)):
                    previous_context = {}
                    for r in master_report["skills_results"]:
                        agent_name = r.get("name", "unknown")
                        previous_context[agent_name] = {
                            "findings": r.get("findings", {}),
                            "boss_briefing": r.get("boss_briefing", {}),
                            "score": r.get("score", 0),
                            "critical_pains": r.get("critical_pains", []),
                            "internal_briefing_for_boss": r.get("internal_briefing_for_boss", ""),
                            "internal_briefing_for_alchemist": r.get("internal_briefing_for_alchemist", "")
                        }
                    result = self._run_skill(skill, previous_results_context=previous_context)
                else:
                    result = self._run_skill(skill)
                
                duration = time.time() - start_skill
                has_data = "findings" in result and bool(result["findings"])
                print(f"    [+] {skill_name} concluído em {duration:.2f}s. Dados encontrados: {'[SIM]' if has_data else '[NÃO]'}")
                
                master_report["skills_results"].append(result)
                
                # Injeta ID para o Frontend mapear os painéis
                skill_id_map = {
                    "TrackingSkill": "tracking",
                    "PerformanceSkill": "performance",
                    "MarketResearchSkill": "market",
                    "SocialMediaResearchSkill": "social",
                    "GMBAuditorSkill": "gmb",
                    "KeywordResearchSkill": "keywords",
                    "SeniorAnalystSkill": "cmo",
                    "ValuePropositionSkill": "alchemist",
                    "CloserSkill": "closer",
                    "DesignTranslationSkill": "design"
                }
                result["id"] = skill_id_map.get(skill_name, "unknown")
                
                # Dynamic delay to avoid 429
                if "Skill" in skill_name:
                    time.sleep(2) 
            except Exception as e:
                print(f"  [!] Falha crítica no agente {skill.__class__.__name__}: {e}")
        # --- SYNC TO SUPABASE ---
        diagnostic_id = self.params.get("diagnosticId")
        if diagnostic_id:
            @retry(stop=stop_after_attempt(5), wait=wait_exponential(multiplier=1, min=2, max=10))
            def _sync_to_supabase():
                url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
                key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
                
                if not (url and key):
                    print("  [!] Falha ao sincronizar: Credenciais do Supabase ausentes.")
                    return
                
                supabase: Client = create_client(url, key)
                print(f"[*] Sincronizando resultados com Supabase (ID: {diagnostic_id})...")
                
                # Calcular nota final baseada na média
                total_sc: float = 0.0
                sc_count: int = 0
                for res in master_report.get("skills_results", []):
                    score_val = res.get("score")
                    if isinstance(score_val, (int, float)) and score_val > 0:
                        total_sc += float(score_val)
                        sc_count += 1
                
                final_score = int(total_sc / sc_count) if sc_count > 0 else 0
                
                supabase.table("diagnostics").update({
                    "report_data": master_report,
                    "final_score": final_score,
                    "status": "complete"
                }).eq("id", diagnostic_id).execute()
                
                print("[+] Supabase sincronizado com sucesso.")

            try:
                _sync_to_supabase()
            except Exception as se:
                print(f"[!] Erro persistente ao sincronizar com Supabase: {se}")

        return master_report

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python main.py <url_ou_parametros_json>")
        sys.exit(1)
        
    arg_input = sys.argv[1]
    try:
        # Next.js manda um JSON stringificado
        params = json.loads(arg_input)
    except Exception:
        # Fallback rodando nativo no terminal `python main.py site.com`
        params = {
            "url": arg_input,
            "companyName": "Desconhecido",
            "city": "",
            "instagram": "",
            "linkedin": ""
        }
        
    orchestrator = PredatorOrchestrator(params)
    
    # Roda a inteligência
    report_data = orchestrator.run()
    
    # Salva o Output como JSON 
    # (No futuro, o Next.js vai ler esse arquivo para gerar a Proposta e a tela)
    output_filename = "predator_report.json"
    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(report_data, f, ensure_ascii=False, indent=4)
        
    print(f"\n[+] Relatório de Guerra gerado em {output_filename}")
    
    # Snapshot no Terminal
    for skill_data in report_data["skills_results"]:
        print(f" -> {skill_data['name']} reportou nota: {skill_data.get('score', 0)}")
