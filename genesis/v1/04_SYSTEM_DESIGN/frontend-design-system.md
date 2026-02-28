# GroowayOS Design System v1.0 🎨📐🏗️

**System ID**: frontend-design-system
**Aesthetic Core**: Industrial Premium / Liquid Glass
**Version**: 1.0

---

## 1. Vision & Identity 💎
O Design System do GroowayOS foi construído para transmitir **Autoridade, Exclusividade e Tecnologia**. Utilizamos uma estética inspirada no "Liquid Glass" (iOS 26 Style), caracterizada por transparências profundas, cores neon saturadas sobre fundos ultra-dark e micro-interações fluidas.

---

## 2. Design Tokens (Variáveis Base) 🧬

### 2.1 Cores (Palette)
| Nome | Valor Hex | Uso |
|:---|:---|:---|
| **Dark Base** | `#020617` | Background principal (Slate-950) |
| **Brand Purple** | `#6D28D9` | Primária, CTAs principais, Glows |
| **Brand Cyan** | `#06B6D4` | Acessória, links, highlights técnicos |
| **Success Green**| `#4ADE80` | Status positivo, WhatsApp, Aprovações |
| **Text Primary** | `#F8FAFC` | Títulos e corpo principal |
| **Text Muted** | `#94A3B8` | Subtítulos e descrições secundárias |

### 2.2 Tipografia
- **Font-family**: `Inter`, sans-serif (Google Fonts).
- **Escala**: Priorizamos pesos `600` (Semi-bold) para títulos e `400` para leitura.

---

## 3. Superfícies & Efeitos (The Glass Layer) 🪟

### 3.1 Liquid Glass (Default Surface)
Utilizada em Cards de resultado e Paineis do Operacional.
- **Background**: `rgba(255, 255, 255, 0.03)`
- **Blur**: `24px`
- **Saturation**: `200%`
- **Border**: `1px solid rgba(255, 255, 255, 0.08)`
- **Shadow**: Inset layers para profundidade física.

### 3.2 Sidebar Glass
- **Background**: `rgba(10, 10, 20, 0.65)`
- **Blur**: `30px`
- **Saturation**: `200%`

---

## 4. Componentes de Elite 🚀

### 4.1 `btn-shine` (CTA Primário)
O botão principal que chama a atenção do usuário com um efeito de reflexo metálico.
- **Gradient**: Da `#7C3AED` para `#4F46E5`.
- **Efeito**: Shimmer animado em skewX(-20deg).
- **Hover**: 1.05 scale + Purple Shadow (30px).

### 4.2 Score Badge
Indicadores circulares de performance.
- **Estilo**: Borda neon pulsante conforme o score (Pulsing 1.25s).
- **Cores**: Dinâmicas baseadas no valor (0-100).

---

## 5. Micro-Interações & Animações ⚡
1. **Shimmer**: Aplicado em estados de carregamento (Loading Skeletons).
2. **Smooth Reveal**: Componentes de IA aparecem com 0.4s cubic-bezier delay.
3. **Hover Lift**: Cards sofrem translação de `-2px` Y no hover para indicar interatividade.

---

## 6. Padrões de Implementação (Do's & Don'ts) 🛠️
- ✅ **DO**: Use classes utilitárias do Tailwind estritamente vinculadas ao `@theme`.
- ✅ **DO**: Mantenha o contraste alto para acessibilidade em modo escuro.
- ❌ **DON'T**: Use cores sólidas e opacas em painéis de dashboard.
- ❌ **DON'T**: Remova o `backdrop-filter` (quebra a profundidade industrial).

---
**Status**: DOCUMENTADO E PADRONIZADO. ✅
