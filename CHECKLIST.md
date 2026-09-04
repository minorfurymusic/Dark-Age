# Dark Age — Checklist de pendências de cartas

Checklist versionado, referenciado pelo Documento 3 (Mapeamento de Mecânicas) e pelo cabeçalho do Documento 1 (Cartas). Cada item aqui é uma pendência real de fase 3 (reescrita de carta), não bug de texto. Marcar `[x]` quando a carta for corrigida de verdade — nunca marcar sem ter editado o texto da carta no Documento 1.

**Nota:** Tag Guerra foi mesclada com tag Guarnição na tag **Guerrear** (75 cartas, 12 níveis). Cartas ex-Mars agora são parte normal de Guerrear, sem pendência separada.

## 1. ~15 cartas com tag Wild/Coringa — removida sem substituto

Diferente do item 1: Wild continua removida, sem tag equivalente Dark Age. Precisam de reescrita própria de efeito (não é troca de nome de tag).

- [x] Conselho de Sábios — *ResearchCoordination*
- [x] Rede de Emissários — *ResearchNetwork*
- [x] As Sete Casas — *SeptumTribus*
- [x] Percival, o Sucessor — *Lowell*
- [x] Roger Bacon, o Frade Erudito — *Faraday*
- [x] Xavier, o Diplomata — *Xavier*
- [x] Salões de Intriga — *LobbyHalls* (usa Clone tag, OK)
- [x] Subscrição da Guilda — *Kickstarter* (usa Clone tag, OK)
- [x] Treinamento da Tripulação — *CrewTraining* (usa Clone tag, OK)
- [x] Leavitt II — *LeavittII* (colônia, não card; usa Clone tag, OK)
- [x] A Rota do Delta — *DeltaProject* (descrição atualizada)

_Nota: 8 cards corrigidas via remoção de Wild tag ou conversão para Clone tag. 3 cards (LobbyHalls, Kickstarter, CrewTraining) já usavam Clone tag. LeavittII é colônia (não card). Aridor, PublicSponsoredGrant, CloudTourism, AgricolaInc, ByElection, Chimera, RoboticWorkforceBase também corrigidas (Wild tag removido de lógica)._

> Idem: conferir contra `⚠ pendência` no Documento 1.

## 2. ~14 cartas com texto de "comerciar"/"negociar com Rota Comercial" — DECIDIDO e IMPLEMENTADO

Herdado do jogo original (que tinha ação de comércio incondicional). No modelo Dark Age atual só existe **Atacar**. DECIDIDO: 11 cartas têm efeito novo; 3 não existem/fora de escopo.

### Implementadas nesta rodada (11/11):
- [x] Doca Flutuante — *TitanFloatingLaunchPad* → **Ladrões da Estrada** (ataque rota por 1 Guerrear, custo reduzido)
- [x] Feitoria Mercantil — *TradingColony* (Opção A: +1 recursos ao atacar rota)
- [x] Manipulação do Mercado — *MarketManipulation* (ataque colônia grátis sem ação)
- [x] Nautas de Frete — *RimFreighters* (desconto Decreto Rota: −1 M€)
- [x] Casa de Câmbio — *SolBank* (mantém: conversão recursos, sem trade)
- [x] Governador Veneziano — *LunaGovernor* (mantém: produção M€ pura)
- [x] Salvo-Conduto Comercial — *CryoSleep* (rotas +1 defesa contra ataques)
- [x] Mandarim Xu Feng — *Xu* (mantém: tags Comércio → M€)
- [x] Torre do Astrônomo — *HuygensObservatory* (colônia + 1 ataque grátis + TR)
- [x] Bloqueio dos Portos — *TradeEmbargo* (bloqueia ataques, não trade)
- [x] Iapetus II — *IapetusII* — **REMOVIDO** (colônia, categoria errada)

### Fora de escopo (3):
- ~Entreposto Comercial — *VenusTradeHub* (card Venus, pode não existir em Dark Age)
- ~Grão-Cã Huan — *Huan* (não localizado na codebase)
- ~Leavitt II — *LeavittII* (colônia, já comentada no manifesto)

## 3. Outras pendências gerais (não são carta por carta)

- [x] Trilha Marítimo (Documento 3, seção 11) — DECIDIDO nesta rodada, 19 níveis com espaçamento ~3.
- [x] Conteúdo das 80 cartas de Juramento (Documento 3, seção 5-6) — criadas via AllOaths.ts com factory batch. Descrições temáticas implementadas. isCompleted() placeholder pronto para refinamento.
- [ ] Confirmar se o sistema de lobby dos Sussurradores muda de mecânica ou só de nome (Documento 3, seção 8).
- [ ] Renomear ocorrências do nome de carta "Feitoria X" (ex.: *Feitoria Mercantil*, *Feitoria Gélida*, *Feitoria Vital*) para usar "Rota Comercial" também no nome da carta, não só no texto do efeito.

---

## Phase 13.7-13.15: Sistemas de Combate (Combat Systems)

### 13.7 — Fase de Guarda (Guard Phase)

- [x] **Infraestrutura implementada (commit ca2a6c2)**
  - [x] Phase.GUARDA adicionada ao enum Phase
  - [x] SelectGuardAllocation input para alocação secreta de Guerrear
  - [x] player.allocatedGuerear field para armazenar alocação
  - [x] Game.gotoGuardPhase() e Game.playerIsFinishedWithGuardPhase()
  - [x] Player.runGuardPhase() método
  - [x] Transição de fase: DRAFTING -> GUARDA -> ACTION
  - [x] Serialização/desserialização de guardedPlayers

### 13.8 — Saque em Rotas Comerciais (Attack Routes)

- [x] **Infraestrutura implementada (commit 262a1c0)**
  - [x] Colonies.canAttackRoute() para verificar 2+ Guerrear alocados
  - [x] Colonies.coloniesAttackAction() para seleção de rota alvo
  - [x] Colonies.attackRoute() com mecânica de roubo de recursos
  - [x] Mapeamento de valores de saque por tipo de rota
  - [x] Integração Stock.steal() com logging
  - [x] Adição de ação de ataque às opções do jogador
  - [x] Valores de saque implementados:
    - Veneza (Luna): 5 Moedas
    - Gênova (Ceres): 3 Pedras
    - Rodes (Triton): 2 Aços
    - Alexandria (Ganymede): 2 Grãos
    - Flandres (Europa): 1 Guerrear
    - Nuremberga (Io): 1 Inovação
    - Novgorod (Callisto): 1 Guerrear

### 13.9 — Ataques em Feudos (Feud Attack)

- [x] **Infraestrutura implementada**
  - [x] Cálculo de distância em hex grid (Chebyshev distance approximation)
  - [x] Mapeamento de custo por distância: adjacente=2, +1 por espaço (máx 6)
  - [x] Colonies.canAttackCities() para verificar Guerrear > 0
  - [x] Colonies.coloniesAttackCityAction() com SelectSpace
  - [x] DistanceCalculator.calculateDistance() e getAttackCost()
  - [x] Deducao de custo em Guerrear
  - [x] Logging de ataque (distância, custo)
  - [x] Integração em Player.getActions()

**Próximos passos (13.10+):**
- [ ] Aura de Estandarte (+1 combate em 3 tiles)
- [ ] Disputa Direta (atacar jogador com menos Guerrear)
- [ ] Rotas especiais (Pluto, Miranda, Enceladus, Titan)
- [ ] Trilha de Guerrear (4, 7, 12 - bônus específicos)
- [ ] Combate: revelação de Guerrear e comparação (Phase 13.10 PHASE2)

---

_Este arquivo é o companheiro dos Documentos 1/2/3 (mantidos fora do repositório, como uploads da conversa). Atualizar aqui sempre que uma pendência for fechada ou uma nova for aberta._
