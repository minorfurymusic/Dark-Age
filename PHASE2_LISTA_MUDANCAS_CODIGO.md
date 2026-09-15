# Dark Age — Fase 2: Lista de Mudanças de Código

Este documento mapeia cada sistema de mecânica do Dark Age e lista os arquivos/funções do código-fonte que precisam ser modificados para implementar as decisões finalizadas na Fase 1. Referência: `PHASE1_MAPEAMENTO_MECANICAS.md`.

**Fonte de verdade:** código do Terraforming Mars (commit 63b8a70), em `src/common` e `src/server`.

---

## Legenda

- **RENOMEAR:** trocar nome de tipo/função/constante — nenhuma lógica muda.
- **AJUSTAR:** trocar valor/comportamento de uma variável/função existente — lógica muda, arquivo mesmo.
- **NOVO:** criar arquivo/função novo do zero — código novo que não existia no original.
- **ESTRUTURAL:** reescrever mecanismo inteiro (fusões, reordenações).

---

## 1. Parâmetros Globais — trocar nomes, manter lógica

| Sistema | Arquivo(s) original | Mudança | Tipo |
|---|---|---|---|
| **Temperatura → Tecnologia** | `src/common/ScaleType.ts`, `src/common/GlobalParameter.ts` | Renomear constante global de Temperatura para Tecnologia (mantém range 1–20, mesma escala) | RENOMEAR |
| **Oxigênio → Fé** | id. | Renomear para Fé; **inverter lógica**: 14 → 0 decrescente (em vez de 0 → 14 crescente) | ESTRUTURAL |
| **Tiles de Oceano → Estandartes** | id. | Renomear tipo + constante; mudar teto de 9 pra 5 tiles | RENOMEAR + AJUSTAR |
| **Venus → Rotas de Comércio** | id. | Renomear tipo; mudar range de 0–30 pra 1–15 (e passo se houver) | RENOMEAR + AJUSTAR |
| **Fim de jogo (multiplayer)** | `src/server/Game.ts:766–770` | Checa 4 parâmetros no teto (original checa 3). Adicionar condição: Estandartes ≤ 0 (ou = 0) — ver behavior real do Oceano (se vai a 9, game ends; aqui 5 é o teto) | AJUSTAR |
| **Rodadas → 10 gen.** | `src/server/Game.ts:588–594` (`lastSoloGeneration`) | Hardcode 10 em vez de 14 (ou 12 com Prelúdio) — aplicar pro multiplayer, não só solo | AJUSTAR |
| **Ponto de Poder inicial 20** | `src/server/Game.ts:326` | Mantém 20 (já é assim); range 20–30 configurável continua igual | NENHUMA |

---

## 2. Recursos — ESTRUTURAL (mapeamento novo + ajustar nomes de recurso)

| Recurso | Em código | Dark Age | Mudança | Notas |
|---|---|---|---|---|
| Megacrédits | `Resource.MEGACREDITS` | Moeda | RENOMEAR | Sem lógica de conversão (1:1) |
| Steel | `Resource.STEEL` | Pedra | RENOMEAR | Sem ajuste (mesmo peso) |
| Titanium | `Resource.TITANIUM` | Aço | RENOMEAR | Sem ajuste; mantém taxa 1:3 pra Moeda se houver |
| Plants | `Resource.PLANTS` | Grãos | RENOMEAR | Sem ajuste; 8 Grãos = 1 tile de Camponeses (mesma fórmula de 8 Plantas = Greenery) |
| Energy | `Resource.ENERGY` | Guerrear | RENOMEAR | **Importante:** vira recurso de combate, não produção de TR (mudança de papel) |
| Heat | `Resource.HEAT` | Inovação | RENOMEAR | 8 Inovação = +1 passo Tecnologia (mesma fórmula; antes era 8 Heat = +1 temp) |

**Arquivos afetados:**
- `src/common/Resource.ts` — enum + mapeamento de display/UI
- `src/common/Player.ts` — loops/acesso de `player.resources[Resource.X]` (muito alto — grep `ENERGY` e `HEAT`)
- `src/server/cards/` — milhares de cartas referem recursos por `GAIN_RESOURCES` behavior ou valor direto
- `src/client/components/Board.ts` / `PlayerResources.vue` — UI de exibição

---

## 3. Ponto de Poder (TR) — NENHUMA mudança de código

`src/server/Player.ts:terraformRating` continua com mesmo nome interno. Sem alteração.

---

## 4. Tags — ESTRUTURAL (merge + renomeações)

| Tag original | Dark Age | Mudança | Cartas afetadas |
|---|---|---|---|
| Building | Construção | RENOMEAR | Nenhuma lógica muda |
| Science | Erudição | RENOMEAR | ~145 cartas (já foram atualizadas em DOC1) |
| Plant | Agricultura | RENOMEAR | Nenhuma lógica muda |
| Animal | Pecuária | RENOMEAR | Nenhuma lógica muda |
| City | Feudo | RENOMEAR | Nenhuma lógica muda |
| Event | História | RENOMEAR | Nenhuma lógica muda |
| Microbe | Bruxaria | RENOMEAR | Nenhuma lógica muda |
| **Power + Mars** | **Guerrear** | **MERGE** | **75 cartas (59 Power + 16 Mars); define 5ª trilha Pathfinder** |
| Venus | Comércio | RENOMEAR | Nenhuma lógica muda (nome de tag = nome de trilha) |
| Space | Marítimo | RENOMEAR | Nenhuma lógica muda |
| Earth | Diplomacia | RENOMEAR | Nenhuma lógica muda |
| Jovian | Engenho | RENOMEAR | Nenhuma lógica muda |
| **Wild** | **removida** | **DELETE** | **~16 cartas; efeito descontinuado (DOC1 marca `⚠ pendência`)** |
| Crime | removida | DELETE | ~1–2 cartas |
| Clone | removida | DELETE | ~1–2 cartas |

**Arquivos afetados:**
- `src/common/cards/CardName.ts` — enum (sem mudança estrutural, SÓ os nomes das tags referidas mudam)
- `src/server/cards/Tags.ts` — enum Tag + mapeamento de display
- `src/server/cards/*/CardName.ts` (cada módulo) — `.tags = [Tag.POWER]` vira `.tags = [Tag.GUERREAR]`, etc.
- `src/server/pathfinders/PathfindersExpansion.ts` — trilha Mars agora usa Tag.GUERREAR

---

## 5. Decretos (ex-Projetos Padrão) + Juramentos (ex-Objetivos) — ESTRUTURAL

### 5.1. Renomear Projetos Padrão → Decretos

**Arquivos:**
- `src/server/cards/*StandardProject*.ts` — renomear classes
- `src/server/StandardProjects.ts` — renomear exports/tipos
- `src/common/cards/CardName.ts` — manter nomes existentes de SP (ex: `POWER_PLANT_STANDARD_PROJECT` pode virar `RECRUTAR_GUARNIÇÃO_STANDARD_PROJECT` se mudar o efeito também, **mas é optativo**)

### 5.2. Novo Decreto: "Fazer um Juramento"

**Custo:** 8 Moedas  
**Ação:** pega 3 cartas do baralho de Juramentos, escolhe 1, embaralha as 2 de volta

**Arquivo novo:**
- `src/server/cards/base/JuramentoDec.ts` (ou nome similar)

**Ajustar:**
- `StandardProjects.ts` — adicionar nova entrada na tabela de Decretos (será o 9º)

**Interface:**
- `src/client/components/PlayerInput.ts` — renderizar opção de seleção (compra 3, fica com 1)
- Novo painel pessoal do jogador (mostrar Juramentos ativos + marca concluídos)

### 5.3. Novo: Baralho de Juramentos (80 cartas)

Decisão de Fase 1: **conteúdo das 80 cartas fica para Fase 3** — estrutura (4 faixas de dificuldade, distribuição 20/25/25/10) está fechada.

**Implementação Fase 2:**
- `src/server/cards/oath/OathCard.ts` — classe-base para cartas de Juramento
- `src/server/cards/oath/OathCardManifest.ts` — registro do baralho (vazio ou stub)
- `src/common/oaths/OathName.ts` — enum (80 entradas)
- `src/server/oaths/Oaths.ts` — factory/lookup

**Observação:** diferente de cartas normais, Juramentos são **secretos** — não aparecem na mão, vão pra painel pessoal. Interface vai precisar guardar a lista `player.oaths[]` separada.

---

## 6. Rotas Comerciais (ex-Colônias) — AJUSTAR (maioria renomear, um novo efeito)

| Colônia original | Dark Age | Mudança | Impacto |
|---|---|---|---|
| Luna | Veneza | RENOMEAR + ajuste de números | Produção: −2 Moeda, produto: +2 Moedas |
| Ceres | Gênova | RENOMEAR | Produção: −1 Pedra, produto: +1 Pedra |
| Triton | Rodes | RENOMEAR | Produção: −1 Aço, produto: +1 Aço |
| Ganymede | Alexandria | RENOMEAR | Produção: −1 Grão, produto: +1 Grão |
| Europa | Flandres | **AJUSTAR** | Produção: −1 Guerrear, produto: +1 Guerrear; **ataque: bônus de defesa, não roubo** |
| Io | Nuremberga | RENOMEAR | Produção: −1 Inovação, produto: +1 Inovação |
| Pluto | Jerusalém | RENOMEAR | Compra de cartas (sem mudança lógica) |
| Callisto | Novgorod | RENOMEAR | Produção: −1 Guerrear, produto: +1 Guerrear |
| Miranda | Lisboa | RENOMEAR + recurso de carta | Recurso: Porco (tag Pecuária) — sem mudança lógica |
| Enceladus | Ragusa | RENOMEAR + recurso de carta | Recurso: Caldeirão (tag Bruxaria) — sem mudança lógica |
| Titan (Deimos é removido) | Constantinopla | **NOVO** | +1 Ponto de Poder + 4 Moedas (2 roubadas de cada outro colonizador) |

**Arquivos:**
- `src/server/colonies/Colony.ts` — enum + tipos (renomear, ajustar)
- `src/server/colonies/ColoniesExpansion.ts` — factory (ajustar valores de produção/prêmio)
- `src/server/colonies/TradeEmbargo.ts` (ou nome similar) — novo Decreto/card que afeta rotas

---

## 7. Conselho dos Estados (ex-Turmoil) — AJUSTAR nomes + 1 custo

| Facção original | Dark Age | Mudança | Impacto código |
|---|---|---|---|
| Mars First | Nobreza | RENOMEAR | Bônus/política mudam só de nome, não lógica |
| Greens | Clero | RENOMEAR | id. |
| Kelvinists | Ordem Militar | RENOMEAR | id. |
| Reds | Comuna Camponesa | RENOMEAR | id. |
| Unity | Guilda dos Mercadores | RENOMEAR | id. |
| Scientists | Círculo Herege | RENOMEAR | id. |

**Delegados → Sussurradores:** `DELEGATES_PER_PLAYER` de 7 → 6  
**Custo de Sussurrador:** 1ª vez grátis, 2ª em diante 6 Moedas (em vez de sempre 3 M€)

**Arquivos:**
- `src/server/turmoil/Turmoil.ts` — renomear classe pra "ConselhoEstados" (optativo)
- `src/server/turmoil/Faction.ts` — enum facções (renomear valores)
- `src/server/turmoil/Turmoil.ts:DELEGATES_PER_PLAYER` — 7 → 6
- `src/server/turmoil/Turmoil.ts` — custo de Sussurrador: if (index < 1) grátis else 6 Moedas

---

## 8. Estrutura de Turno — 1 mudança de nome, nenhuma lógica

**Ação "Trade" → "Attack"**

- `src/server/inputs/SelectActionCard.ts` — tipo de ação agora é "Atacar"
- Custo: 2 Guerrear (antes de cartas era 3 Energy)
- Alvo: Rota Comercial (custa 2 Guerrear) **OU** Feudo (custo de marcha)

**Fleet → Hoste**

- `src/common/Player.ts:fleetSize` → `hostSize` (optativo renomear, ou manter interno)
- `MAX_FLEET_SIZE` → `MAX_HOSTE_SIZE` (ou manter como está internamente — só exibe como "Hoste")
- Regra: 2+ Hostes = pode atacar 2 vezes por rodada

**Arquivos:**
- `src/server/actions/` — refatorar action de Trade pra Attack
- `src/server/Game.ts` — lógica de fases mantém igual, só nomes mudam

---

## 9. Combate (Novo Sistema 100%) — NOVO

### 9.1. Fase de Guarda (alocação secreta de Guerrear)

**Timing:** após final do draft de cartas, antes de começar o turno de ações.

**Mecânica:**
- Cada jogador aloca X Guerrear (número secreto) sem revelar
- Só revela ao atacar (gasta) ou sofrer ataque (prova defesa)
- Limite: não pode alocar mais da produção do turno

**Arquivos novos:**
- `src/server/deferredActions/GuardingPhaseAction.ts` — ação que ativa a janela de input
- `src/server/inputs/SelectGuardingAllocation.ts` — input de campo numérico (X Guerrear)
- `src/server/Player.ts:guardedMilitary` — novo campo privado (secreto)

### 9.2. Ação de Saque (Feudo)

**Precondição:** Feudo na distância  
**Custo:** varia por distância (1–6 Guerrear, ex.: adjacente = 2, 2 espaços = 3, etc.)  
**Resolução:** atacante revela guardian, defensor revela seu; comparação + roubo de recurso

**Arquivos:**
- `src/server/actions/AttackCityAction.ts` (novo)
- `src/server/inputs/SelectCityToAttack.ts` (novo)
- Lógica de cálculo de distância: `getTileCost()` ou similar

### 9.3. Ação de Saque (Rota Comercial)

**Custo fixo:** 2 Guerrear  
**Efeito:** rouba recurso da rota conforme tabela (seção 6)

**Arquivo:**
- Integrado em `src/server/actions/AttackColonyAction.ts` (rename do Trade)

### 9.4. Aura militar do Estandarte

**Mecânica:** +1 em combate para qualquer ataque dentro de 3 tiles de um Estandarte do atacante

**Arquivo:**
- `src/server/tiles/Tile.ts` — adicionar verificação: "qual jogador é dono", aura no cálculo de força

### 9.5. Disputa Direta em Rota Comercial

**Mecânica:** ao atacar uma rota com <2 Hostes, atacante rouba do colonizador com menos Guerrear

**Arquivo:**
- Lógica integrada em `AttackColonyAction.ts`

---

## 10. Trilhas Pathfinder (Pathfinders Expansion) — AJUSTAR valores

Todas as 5 trilhas estão mapeadas em Fase 1, seção 11. Implementação aqui é **copiar conteúdo real do código** pros ajustes de escala.

| Trilha | Nível | Alteração vs. original |
|---|---|---|
| **Comércio** | 22 (era 17) | Redistribuir prêmios reais de Venus proporcionalmente |
| **Diplomacia** | 20 (era 22) | Redistribuir prêmios reais de Earth proporcionalmente |
| **Engenho** | 15 (era 14) | Redistribuir prêmios reais de Jovian proporcionalmente |
| **Guerrear** | 12 (novo) | Novo: Power (59 cartas) + Mars (16 cartas) = 75 cartas; bônus em 4, 7, 12 |
| **Marítimo** | 19 (não tem equivalente) | Rascunho final: nível 3, 7, 10, 13, 16, 19 com negativos em 7, 13 |

**Arquivo:**
- `src/common/pathfinders/PlanetaryTracks.ts` — ajustar `levels` e `bonuses` pra cada trilha
- `src/server/pathfinders/PathfindersExpansion.ts` — integração (sem mudança)

---

## 11. Módulos de Carta — verificação + adaptar efeitos

**Escopo:** 14 módulos dentro do escopo (769 cartas reescritas em DOC1).

**Fora do escopo:** Moon (109 cartas) e Underworld (134 cartas) — decisão de usuário.

**Checklist Fase 3 (já documentado em CHECKLIST.md):**
- ~16 cartas ex-Mars: agora tag Guerrear, precisam usar efeitos reais de Guerrear
- ~15 cartas ex-Wild: efeito descontinuado, reescrita própria necessária
- ~14 cartas com "comerciar": precisam ser convertidas pra "atacar"
- 80 cartas de Juramento: criar conteúdo (cada uma tem condição única)

**Processos de implementação:**
1. Renomear recurso em milhares de linhas (ENERGY → GUERREAR, HEAT → INOVAÇÃO, etc.) — via find-replace global + validação
2. Renomear tag (TAG_SCIENCE → TAG_ERUDIÇÃO, etc.) — idem
3. Converter efeitos de "comerciar" em "atacar" — caso por caso (Fase 3)

---

## 12. Cliente (UI/Vue) — ajustar display de recursos/parâmetros

**Arquivos afetados:**

- `src/client/components/PlayerResources.vue` — nomes de recursos
- `src/client/components/GlobalParameters.vue` — nomes de parâmetros (Tecnologia, Fé, Estandartes, Rotas)
- `src/client/components/Board.vue` — renderização de tiles/feudo/estandartes
- `src/client/components/Milestones.ts` — ajustar descrição de marcos (se houver relacionado)
- `src/client/directives/i18n.ts` — adicionar strings de tradução (Guerrear, Erudição, etc.)

**Sem mudança estrutural — SÓ cosmética de nomes.**

---

## 13. Checklist de Implementação Fase 2

- [ ] **13.1** — Parâmetros globais: renomear Temperatura, Oxigênio, Oceano, Venus (+ inverter lógica de Fé)
- [ ] **13.2** — Recursos: renomear todos (ENERGY → GUERREAR, HEAT → INOVAÇÃO, etc.) + validar produção
- [ ] **13.3** — Tags: renomear todas (SCIENCE → ERUDIÇÃO, etc.) + verificar referências
- [ ] **13.4** — Merge Power + Mars → Guerrear (ajustar CardName.ts, Tags.ts, PathfindersExpansion.ts)
- [ ] **13.5** — Novo Decreto "Fazer um Juramento" (8 Moedas, compra 3 fica com 1)
- [ ] **13.6** — Estrutura de Baralho de Juramentos (80 cartas, 4 faixas de dificuldade)
- [ ] **13.7** — Rotas Comerciais: renomear Luna→Veneza, etc. + ajustar Flandres (bônus de defesa)
- [ ] **13.8** — Novo: Constantinopla (Rota +1 PV, +4 Moedas com roubo de outros colonizadores)
- [ ] **13.9** — Conselho dos Estados: renomear 6 facções + ajustar DELEGATES_PER_PLAYER (7→6) + custo Sussurrador (grátis 1ª, 6 Moedas depois)
- [ ] **13.10** — Ação Attack: renomear Trade, custo 2 Guerrear, alvo Rota ou Feudo (com distância)
- [ ] **13.11** — Fase de Guarda: guardar alocação secreta de Guerrear (input + campo privado em Player)
- [ ] **13.12** — Saque de Feudo: custo por distância, comparação de força, roubo de recurso
- [ ] **13.13** — Saque de Rota: custo fixo 2 Guerrear, roubo conforme tabela Fase 1
- [ ] **13.14** — Aura de Estandarte: +1 em combate num raio de 3 tiles
- [ ] **13.15** — Trilhas Pathfinder: ajustar conteúdo real (Comércio 22, Diplomacia 20, Engenho 15, Guerrear 12, Marítimo 19)
- [ ] **13.16** — Cliente: renomear display de recursos/parâmetros (UI cosmética)
- [ ] **13.17** — Testes: validar que Fim de Jogo checa 4 parâmetros (multiplayer), 10 rodadas (todos)

---

## Notas Importantes

1. **Ordem de prioridade:** 13.1–13.4 (base/estrutural) → 13.5–13.9 (sistemas) → 13.10–13.15 (combate + trilhas) → 13.16–13.17 (UI + testes).
2. **Validação:** após cada bloco, rodar `npm run lint` + `npm run test:server` pra verificar que não quebrou nada.
3. **Fase 3 pode começar em paralelo:** já que mudanças de código não precisam das cartas individuais implementadas (as cartas podem ser reescritas depois que o motor tiver os sistemas prontos).
4. **Git commits:** criar 1 commit por item da seção 13 (13.1, 13.2, etc.) pra facilitar review depois.

---

_Este documento é a ponte entre Fase 1 (decisões) e Fase 3 (reescrita de cartas). Fase 2 é a implementação de motor — tudo que os jogadores vão notar vai estar aqui. Comece por 13.1 (parâmetros globais) e avance sequencialmente._
