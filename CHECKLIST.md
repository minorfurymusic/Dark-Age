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

## 2. ~14 cartas com texto de "comerciar"/"negociar com Rota Comercial"

Herdado do jogo original (que tinha ação de comércio incondicional). No modelo Dark Age atual só existe **Atacar** — não decidi o efeito novo de cada uma, fica pra quando formos mexer nessas cartas.

- [ ] Doca Flutuante — *TitanFloatingLaunchPad*
- [ ] Feitoria Mercantil — *TradingColony* → renomear carta em si também (ainda usa "Feitoria" no nome)
- [ ] Manipulação do Mercado — *MarketManipulation*
- [ ] Nautas de Frete — *RimFreighters*
- [ ] Casa de Câmbio — *SolBank*
- [ ] Governador Veneziano — *LunaGovernor* (checar se usa "comercia")
- [ ] Entreposto Comercial — *VenusTradeHub*
- [ ] Salvo-Conduto Comercial — *CryoSleep*
- [ ] Mandarim Xu Feng — *Xu* (checar)
- [ ] Grão-Cã Huan — *Huan* ("comerciar com Feitorias")
- [ ] Iapetus II — *IapetusII*
- [ ] Leavitt II — *LeavittII* (também na lista Wild)
- [ ] Torre do Astrônomo — *HuygensObservatory*
- [ ] Bloqueio dos Portos — *TradeEmbargo*

> Lista levantada por busca de "comercia"/"comerciar"/"negocia" no Documento 1 (ver Documento 3, histórico item v14). Conferir linha por linha antes de reescrever.

## 3. Outras pendências gerais (não são carta por carta)

- [x] Trilha Marítimo (Documento 3, seção 11) — DECIDIDO nesta rodada, 19 níveis com espaçamento ~3.
- [x] Conteúdo das 80 cartas de Juramento (Documento 3, seção 5-6) — criadas via AllOaths.ts com factory batch. Descrições temáticas implementadas. isCompleted() placeholder pronto para refinamento.
- [ ] Confirmar se o sistema de lobby dos Sussurradores muda de mecânica ou só de nome (Documento 3, seção 8).
- [ ] Renomear ocorrências do nome de carta "Feitoria X" (ex.: *Feitoria Mercantil*, *Feitoria Gélida*, *Feitoria Vital*) para usar "Rota Comercial" também no nome da carta, não só no texto do efeito.

---

_Este arquivo é o companheiro dos Documentos 1/2/3 (mantidos fora do repositório, como uploads da conversa). Atualizar aqui sempre que uma pendência for fechada ou uma nova for aberta._
