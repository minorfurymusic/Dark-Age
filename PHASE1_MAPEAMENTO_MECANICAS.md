# Dark Age — Mapeamento de Mecânicas (fonte completa)

> Este documento é a fonte de todas as decisões de lógica e mecânica do projeto Dark Age, na ordem em que foram tomadas. Serve pra reconstruir o artefato "Dark Age — Mapeamento de Mecânicas" numa conversa nova, ou pra continuar o trabalho a partir daqui. Fontes usadas: código real do Terraforming Mars (commit `63b8a70`, pastas `src/common` e `src/server`) e o documento de especificação original do Dark Age.
>
> Legenda usada nas rodadas de decisão: **DECIDIDO** = travado pelo usuário; **PROPOSTA** = sugestão minha aguardando aval; **ABERTO** = pendência real, sem decisão ainda.

---

## 1. Parâmetros globais

| Terraforming Mars | Escala original | Dark Age | Escala | Status |
|---|---|---|---|---|
| Temperatura | −30 a +8 (19 passos, 8 Calor = 1 passo) | **Tecnologia** | 1 a 20 (8 Inovação = 1 passo) | DECIDIDO |
| Oxigênio | 0 a 14% (crescente) | **Fé** | 14 a 0 (**decrescente** — invertido!) | DECIDIDO |
| Tiles de Oceano | 9 tiles fixos | **Estandartes** | 5 tiles fixos | DECIDIDO |
| Venus (expansão opcional) | 0 a 30, passo 2 (16 passos) | **Rotas de Comércio** | 1 a 15 (obrigatória, não opcional) | DECIDIDO |

**Fim de jogo:** multiplayer checa os 4 parâmetros no teto (o original checa só 3). **Modo solo:** Estandarte é removido por completo (não é colocado, não conta pra condição de término, sem aura militar — não faz sentido sem combate PvP); fim de jogo solo checa só 3 (Tecnologia, Fé, Rotas), do mesmo jeito que o original checa Temperatura/Oxigênio/Oceano.

**Teto de rodadas:** a partida também termina em **10 rodadas**, o que vier primeiro. Isso não é invenção — o próprio original já tem exatamente esse padrão, só que restrito ao modo solo: função `lastSoloGeneration()` em `Game.ts:588-594`, retorna 14 gerações (12 com Prelúdio), e a partida termina em `generation === lastSoloGeneration()` mesmo sem os parâmetros no teto (`Game.ts:766`). Dark Age generaliza esse padrão pro multiplayer, com 10 em vez de 14 porque o combate deixa cada rodada mais longa.

**TR inicial → Ponto de Poder inicial:** o original já começa em 20 no multiplayer (14 só no solo, confirmado em `Game.ts:326`). Range 20–30 configurável no lobby, como já estava no doc original. O original também já tem um sistema de **handicap** por jogador (`Player.ts:377-378`, uso em `Game.ts:397`) — reaproveitável pra "adicionar uma quantidade a mais" a um jogador específico, sem escrever nada novo.

---

## 2. Recursos e produção

Mapeamento 1:1, direto, sem ajuste de regra:

| Terraforming Mars | Dark Age |
|---|---|
| Megacréditos | Moeda |
| Aço (Steel) | Pedra (1 = 2 Moedas) |
| Titânio | Aço (1 = 3 Moedas) |
| Plantas | Grãos (8 = 1 tile de Camponeses) |
| Energia | Guerrear |
| Calor | Inovação (8 = +1 passo de Tecnologia) |

---

## 3. TR / Ponto de Poder

Mantém a lógica do original: +1 Ponto de Poder por avanço de parâmetro global, 1 Ponto de Poder = 1 Moeda de renda por rodada, 1 PV no fim de jogo. Só o range inicial (20–30 configurável) e a disponibilidade de handicap são novidades expostas na UI.

---

## 4. Tags

O original tem 16 tags. O doc do Dark Age só tinha definido 13 (+ 4 tags "Pathfinder" sem regra). Mapeamento final, travado:

| Terraforming Mars | Dark Age |
|---|---|
| Building | Construção |
| Science | **Erudição** (era "Ciência" até a rodada anterior — trocado a pedido do usuário porque combina melhor com "Tecnologia") |
| Plant | Agricultura |
| Animal | Pecuária |
| City | Feudo |
| Event | História |
| Microbe | Bruxaria |
| Power + Mars | **Guerrear** (DECIDIDO esta rodada — fusão de Power e Mars para balancear 75 cartas em 12 níveis, ver seção 11) |
| Venus | Comércio |
| Space | Marítimo |
| Earth | Diplomacia |
| Jovian | Engenho |
| Wild | **removida, sem substituto** (era curinga — conta como qualquer tag — no original; cartas que dependiam disso ficaram mecanicamente mais fracas, por escolha do usuário) |
| Crime | **removida, sem substituto** |
| Clone | **removida, sem substituto** |

**Consequência aceita:** cartas que dependiam de Wild como coringa perdem essa função. Já reescritas na fase 3 com o efeito descontinuado documentado (ver Documento 1, cartas marcadas `⚠ pendência`). **Power e Mars foram mesclados em Guerrear** — a tag mesclada (75 cartas: 59 de Power + 16 de Mars) nomeia a 5ª trilha Pathfinder (seção 11), balanceando a densidade de cartas entre trilhas.

**Tags Pathfinder (Diplomacia, Engenho, Comércio, Marítimo, Guerrear) já usadas acima** são, na verdade, reaproveitamento dos mesmos nomes das 5 trilhas de progresso (ver seção 11) — não são tags de carta separadas, é a mesma palavra servindo dois papéis (tag de carta E nome de trilha).

---

## 5-6. Decretos (ex-Projetos Padrão) e Juramentos (ex-Objetivos, ex-Marcos e Prêmios) — DECIDIDO, substitui as duas seções antigas por completo

**Renomeação travada nesta rodada:**
- "Projetos Padrão" (Standard Projects) → **Decretos**
- "Objetivos" (que já tinha substituído Marcos e Prêmios na rodada anterior) → **Juramentos**

**Fusão estrutural travada nesta rodada:** Juramento deixa de ser uma seção numerada à parte — a ação de comprar um Juramento **é um Decreto como outro qualquer**, listada na mesma tabela dos demais. Faz sentido porque os dois têm a mesma forma (ação que se paga direto em Moeda, sem depender de carta na mão); a diferença é só o que cada Decreto entrega.

### Tabela de Decretos (9 no total — Dark Age tinha 8, ganhou +1 com o Decreto de Juramento)

O original tem 6 no jogo base + 1 na expansão Venus Next (7 no total). Dark Age tinha 8 (ganhou "Construir uma Rota Comercial", que no original só se funda via carta) e agora tem **9** com a fusão do Juramento.

| Terraforming Mars | Custo original | Dark Age | Custo Dark Age |
|---|---|---|---|
| Sell Patents | carta → 1 MC | Vender Título | carta → 1 Moeda |
| Power Plant | 11 | Recrutar Guerrear | **10** |
| Asteroid | 14 | Avanço Técnico | **12** |
| Aquifer | 18 | Erigir Estandarte | **15** |
| — (só via carta) | 17 (fundação manual) | **Construir uma Rota Comercial** | **15** (ou 15+1 Guerrear só para Constantinopla) |
| Greenery | 23 / 8 Plantas | Assentar Camponeses | **20** / 8 Grãos |
| City | 25 | Construir Feudo | 25 (sem mudança) |
| Venus (Venus Next) | 15 | Expandir as Rotas de Comércio | 12 (sem mudança) |
| — (sem equivalente no original) | — | **Fazer um Juramento** (novo) | **8** |

**Cuidado de nomenclatura (correção nesta rodada):** "Construir uma Rota Comercial" (funda um posto de comércio individual, seção 7) e "Expandir as Rotas de Comércio" (avança o parâmetro global 1–15, seção 1) são **coisas diferentes** que quase colidiram no nome. O parâmetro global manteve o nome "Rotas de Comércio" que já tinha desde o início do projeto (seção 1); o Decreto que funda um posto individual usa "Rota Comercial" no singular, referindo-se a 1 posto específico.

### Como funciona o Decreto "Fazer um Juramento"

- Custa 8 Moedas. Como qualquer Decreto, pode ser usado 1 vez por turno de jogador (não há um teto separado de "1x por rodada" só para ele — vale a mesma regra geral de Decretos). Com 10 rodadas de partida, isso limita a no máximo ~10 Juramentos por jogador ao longo do jogo, mas não é uma regra própria, é consequência do número de rodadas.
- Ao usar, o jogador **compra 3 cartas do baralho de Juramentos**, escolhe **1 para ficar** e **embaralha as outras 2 de volta** no baralho.
- O Juramento escolhido é **secreto** — os pontos que ele vale não aparecem pros outros jogadores.
- **Painel pessoal do jogador (novidade desta rodada):** cada Juramento comprado entra numa **lista própria e visível só para o dono**, separada da mão de cartas — tipo um checklist pessoal. Cada linha mostra o Juramento e sua pontuação. Conforme a condição dele é cumprida durante a partida, a linha correspondente é **marcada como concluída** (aparece riscada, com os pontos em destaque ao lado). Enquanto não cumprida, fica visível como pendente na mesma lista, para o jogador saber o que ainda falta. Isso é conveniência de interface — o jogo já sabe internamente quando a condição foi satisfeita, mas o jogador só vê essa confirmação nessa lista pessoal, nunca os outros jogadores.
- Pontuação só é somada e revelada **no final da partida**. Ninguém sabe quantos pontos os outros tiraram de Juramentos até esse momento — nem quantos Juramentos concluídos, nem quais.
- Não há mais reivindicação pública, não há mais "só os 3 primeiros", não há mais ranking comparativo entre jogadores. Cada jogador pontua só o que ele mesmo cumpriu.

### Baralho de Juramentos — 80 cartas, 4 faixas de dificuldade

| Faixa | Pontos por Juramento | Dificuldade | Quantidade de cartas |
|---|---|---|---|
| 1 | 2–3 PV | Fácil | 20 |
| 2 | 4–6 PV | Médio | 25 |
| 3 | 7–8 PV | Difícil | 25 |
| 4 | 9–10 PV | Muito difícil | 10 |

Total: 20 + 25 + 25 + 10 = **80 cartas**.

### Ainda ABERTO (adiado, como as trilhas Pathfinder)

- **O conteúdo das 80 cartas de Juramento** (o que cada uma pede para completar) — vai ser criado depois, carta por carta, mesma lógica das trilhas Pathfinder (fase 3, quando chegar a vez).
- Não ficou definido se um jogador pode desistir/trocar um Juramento já escolhido (embaralhando-o de volta e comprando outro Decreto de Juramento depois), ou se, uma vez escolhido, fica fixo até o fim de jogo.
- Interface do "painel pessoal de Juramentos" descrita aqui em termos de regra/UX; a implementação real (onde fica na tela, como marca "concluído" automaticamente) é decisão de fase de código, fora do escopo deste documento de mecânica.

---

## 7. As 11 Rotas Comerciais (ex-Colônias)

O original tem 12 colônias implementadas; Deimos ficou de fora do Dark Age (decisão do usuário). Modelo final: **dois tipos de rota comercial**.

- **8 rotas comerciais de recurso direto** (Veneza, Gênova, Rodes, Alexandria, Flandres, Nuremberga, Jerusalém, Novgorod): dão recurso direto pro estoque do jogador. Reaproveitam o mecanismo `ColonyBenefit.GAIN_PRODUCTION` / `GAIN_RESOURCES` que Luna/Callisto já usam no original.
- **2 rotas comerciais de recurso de carta** (Lisboa, Ragusa): não dão recurso pro estoque — põem contadores em cima de uma carta específica que aceita aquele tipo. Reaproveitam `ColonyBenefit.ADD_RESOURCES_TO_CARD` que Miranda/Enceladus já usam no original. Lisboa usa "Porco" (era Animal, aceito por cartas de tag Pecuária), Ragusa usa "Caldeirão" (era Microbe, tag Bruxaria).
- **Constantinopla é a exceção de propósito** (recurso especial: Ponto de Poder + roubo de Moeda multi-jogador).

**Regra geral de renda (as 10 "normais"):** no início do turno de cada dono, ele recebe automaticamente a produção da rota comercial — **mas só se ela não tiver sido atacada nesta rodada**. Isso substitui o modelo do original, onde todo dono ganha toda vez que qualquer um ativa a colônia (esse modelo antigo era o que fazia os primeiros jogadores da rodada disparar na frente; o novo modelo dá aos jogadores atrasados uma alavanca real: atacar a rota comercial do líder rouba recurso E cancela a renda passiva de quem ainda não jogou o turno).

**Custo de ativação/ataque:** 2 Guerrear (era 3 numa decisão anterior, revisado pra 2).

### Tabela completa das 11 rotas comerciais

| Rota Comercial | Recurso | Fundação (custo 15) | Passiva/turno (se não atacada) | Ataque (2 Guerrear) |
|---|---|---|---|---|
| Veneza (Luna) | Moeda | +2 prod. Moeda | +2 Moedas | atacante rouba **5 Moedas** |
| Gênova (Ceres) | Pedra | +1 prod. Pedra | +1 Pedra | atacante rouba **3 Pedras** |
| Rodes (Triton) | Aço | +1 prod. Aço | +1 Aço | atacante rouba **2 Aços** |
| Alexandria (Ganymede) | Grãos | +1 prod. Grãos | +1 Grão | atacante rouba **2 Grãos** |
| Flandres (Europa) | Guerrear | +1 prod. Guerrear | +1 Guerrear | atacante ganha **+1 na força de Defesa** (não rouba do estoque) |
| Nuremberga (Io) | Inovação | +1 prod. Inovação | +1 Inovação | atacante rouba **1 Inovação** |
| Jerusalém (Pluto) | Cartas | compra 2 cartas grátis | compra 1 carta por 1 Moeda | atacante escolhe **qual jogador** descarta; o escolhido decide **qual carta** |
| Novgorod (Callisto) | Guerrear | +1 prod. Guerrear | +1 Guerrear | atacante rouba **1 Guerrear** |
| Lisboa (Miranda) | Porco (recurso de carta, tag Pecuária) | +2 Porcos numa carta sua | +1 Porco numa carta sua | atacante remove 1 Porco de **qualquer carta do jogo** (mostra candidatas com dono marcado, atacante escolhe e confirma) |
| Ragusa (Enceladus) | Caldeirão (recurso de carta, tag Bruxaria) | +2 Caldeirões numa carta sua | +1 Caldeirão numa carta sua | mesma regra do Porco, aplicada a Caldeirão |
| **Constantinopla (Titan)** | Ponto de Poder + Moeda | **nenhum bônus** — mas custa 15 Moedas **+ 1 Guerrear** pra fundar | **+1 Ponto de Poder** | atacante ganha **4 Moedas — 2 roubadas de cada outro colonizador presente** (até 2 outros, máx. 3 colonizadores por rota comercial) |

**Por que Constantinopla quebra o padrão:** o usuário pediu ela de volta "forte" depois de uma correção minha que a tinha enfraquecido. Ela é a única rota comercial com PvP embutido na própria produção (rouba de jogadores rivais, não de um "estoque da rota comercial"), condizente com ser a "capital" do tabuleiro político.

---

## 8. Conselho dos Estados (ex-Turmoil)

Nome do sistema: **Conselho dos Estados** (troca "Dieta Imperial" do doc original — mais alinhado com cenário feudal europeu do que com o Sacro Império especificamente). 6 facções, 1 por eixo:

| Terraforming Mars | Dark Age | Eixo | Bônus de governo (só pra quem é membro) | Política exclusiva do governante |
|---|---|---|---|---|
| Mars First | **Nobreza** | Feudo / Moeda | Ganha 2 Moedas ao construir | Construir Feudo custa −3 |
| Greens | **Clero** | Fé | Assentar Camponeses custa −1 Fé a menos de perda | Ganha 1 Guerrear por ataque sofrido nesta rodada |
| Kelvinists | **Ordem Militar** | Guerrear / combate | +1 na força de Defesa em Saques sofridos | Pode atacar mais uma vez na rodada |
| Reds | **Comuna Camponesa** | freio ao combate | quem ataca paga 1 Moeda ao tesouro comum, por ataque | pode vetar 1 Saque por rodada (paga o custo, alvo não é atacado) |
| Unity | **Guilda dos Mercadores** | Rotas / Rotas Comerciais | +2 Moedas por passo avançado em Rotas | Rota Comercial custa −3 |
| Scientists | **Círculo Herege** | Bruxaria / Inovação | cartas com tag Bruxaria custam −2 | Revela cartas do topo do baralho até achar 1 com tag Bruxaria ou que gere Inovação; pega ela de graça, descarta as demais |

**Delegados → Sussurradores.** Muda mais que o nome:
- `DELEGATES_PER_PLAYER` cai de **7 para 6** por jogador (`DELEGATES_FOR_NEUTRAL_PLAYER` = 14 segue igual).
- Custo de enviar um Sussurrador: **1ª vez na rodada é grátis, a partir da 2ª custa 6 Moedas** — diferente do original, que cobra 3 M€ sempre (5 M€ quando a facção Reds governa, `Turmoil.ts:547-549`).

**Regra corrigida sobre o "bônus de governo (todos)":** originalmente eu tinha decidido errado — pensei que fosse "quem participou do eixo no turno anterior". O certo, confirmado com exemplo real do usuário (Bruxaria: João com 2 Sussurradores, Fernando com 1, Neutros com 2 — o bloco neutro venceu a liderança): o bônus só vale pra quem **tem Sussurrador alocado naquela facção** (no exemplo, só João e Fernando) — não pra todo mundo no jogo. E a **política exclusiva do governante só é concedida se um jogador de verdade for o líder** — se um bloco neutro vence a liderança (empate ou maioria neutra), ninguém recebe o bônus exclusivo naquela rodada. Isso muda o original de propósito: no TM real, o bônus do partido governante vale pra todo mundo, membro ou não; aqui vale só pra quem é membro.

**Ainda aberto:** confirmar se o sistema de lobby por trás dos Sussurradores (colocar fichas, apurar maioria) fica mecanicamente idêntico ao original, só trocando o nome — parece que sim, mas nunca foi confirmado explicitamente.

---

## 9. Estrutura de turno (geração / rodada)

Mantém o loop original: 1 ação por vez, ordem de turno rotativa, 1–2 ações normais por turno de jogador. O que muda:

- **"Negociar" vira "Atacar".** Ação normal do jogador — gastando 2 Guerrear, ataca uma Rota Comercial; ou (custo de Saque) ataca um Feudo/castelo. Quem tiver **2 ou mais Hostes** pode atacar 2 vezes na mesma rodada, inclusive 2 alvos diferentes — nunca o mesmo alvo duas vezes pelo mesmo atacante, mas um alvo já atacado por alguém pode levar um segundo ataque de outro jogador diferente.
- **"Fleet" vira "Hoste."** `MAX_FLEET_SIZE` no código vira o teto de Hostes por jogador.

---

## 10. Mecânicas 100% novas (sem equivalente no original)

A maior peça de engenharia nova do projeto:

- **Fase de Guarda** — alocação secreta de Guerrear, uma vez por rodada, logo após a última escolha do draft de cartas.
- **Ação de Saque (Feudo)** — custo de marcha por distância, ataque vs. defesa, rouba recurso do defensor.
- **Ação de Saque (Rota Comercial)** — custo fixo de 2 Guerrear, ver tabela da seção 7.
- **Aura militar do Estandarte** — zona de +1 em combate projetada em 3 tiles ao redor.
- **Disputa Direta em Rota Comercial** — ao atacar, rouba recurso de colonizador rival com menos Guerrear no estoque (regra herdada do original, mantida onde aplicável).

### Alocação secreta de Guerrear (Fase de Guarda) — mecânica detalhada

Acontece uma única vez, logo após o draft de cartas (mesma tela, campo pra digitar o valor a alocar). **Não desconta do quadro visível de recursos na hora** — o número alocado fica oculto, só o total de Guerrear em estoque continua público. Some do estoque visível só quando é revelada: ao atacar (o próprio jogador revela e gasta) ou ao ser atacado (o defensor revela pra provar a defesa). Regras de limite: não pode alocar mais do que a produção do turno, e não pode alocar durante o próprio turno — só na janela pós-draft.

---

## 11. As 5 trilhas Pathfinder — DECIDIDO

As 5 trilhas Pathfinder estão fechadas e prontas para implementação:

**Confirmado por execução real (leitura do código), a mecânica das 3 colunas é:**
- **Individual (`risingPlayer`):** só o jogador que jogou a carta que avançou a trilha recebe esse bônus.
- **Coletivo (`everyone`):** todo jogador na partida recebe, não importa quem avançou a trilha.
- **Bônus final (`mostTags`):** só dispara no último espaço da trilha; quem tiver mais cartas daquela tag em jogo (empate = todos empatados recebem) ganha o PV.
(fonte: `PathfindersExpansion.ts:116-146`, função `raiseTrackEssense`)

### Tabela — Comércio, Diplomacia e Engenho

Níveis (22/20/15) continuam os que o usuário já tinha travado antes — **não mexi neles**. O conteúdo de cada nível é novo: peguei os prêmios reais das trilhas Venus/Earth/Jovian do código-fonte e redistribuí proporcionalmente pra escala de cada trilha Dark Age (regra já usada no projeto pra Estandartes/Rotas de Comércio: nível_novo = round(nível_original × tamanho_novo / tamanho_original)).

| Trilha | Nível | Individual (quem joga a carta) | Coletivo (todos) |
|---|---|---|---|
| **Comércio** (Venus, 22, era 17) | 4 | Ganha 1 Inovação e 1 Especiaria | Todos ganham 1 Inovação |
| | 6 | Ganha 1 Especiaria e +1 produção de Inovação | Todos ganham 1 Grão |
| | 10 | Avança 1 passo nas Rotas de Comércio | Todos compram 1 carta |
| | 14 | Ganha 1 Especiaria e 1 Sussurrador | Todos ganham 1 Especiaria |
| | 18 | Ganha 6 Moedas | Todos compram 1 carta |
| | 22 (final) | +1 Ponto de Poder | Quem tiver mais tags de Comércio: +2 PV |
| **Diplomacia** (Earth, 20, era 22) | 3 | Ganha 1 Grão | Todos ganham 1 Grão |
| | 5 | — (sem bônus individual, igual ao original) | Todos ganham 3 Moedas |
| | 8 | Ganha 1 recurso padrão à escolha | Todos ganham 1 recurso padrão à escolha |
| | 11 | Ganha 1 Sussurrador | Todos compram 1 carta |
| | 15 | +1 produção de Grãos | Todos compram 1 carta |
| | 17 | Ganha 3 Moedas e 1 Sussurrador | Todos ganham 3 Moedas |
| | 20 (final) | Instala 1 tile de Camponeses | Quem tiver mais tags de Diplomacia: +2 PV |
| **Engenho** (Jovian, 15, era 14) | 2 | — (sem bônus individual, igual ao original) | Todos ganham 1 Aço |
| | 5 | Ganha 1 Especiaria e 1 Sussurrador | Todos compram 1 carta |
| | 9 | +1 produção de Aço | Todos ganham 1 Aço |
| | 12 | Instala 1 Estandarte | Todos ganham 3 Moedas |
| | 15 (final) | +1 Ponto de Poder | Quem tiver mais tags de Engenho: +1 PV |

### Tabela — Trilha de Guerrear (mesclada de Power + Mars, 12 níveis)

Fusão de Power (59 cartas) + Mars (16 cartas ex-descontinuadas) = 75 cartas. Bônus individual apenas em níveis 4, 7, 12 (densidade: 6.25 cartas/nível). Prêmios adaptados do Mars original para 12 níveis.

| Nível | Individual (quem joga a carta) | Coletivo (todos) |
|---|---|---|
| 1–3 | — | nada |
| 4 | +1 prod. Pedra | Todos ganham 1 Pedra |
| 5–6 | — | nada |
| 7 | +1 prod. Guerrear | Todos ganham 1 Guerrear |
| 8–11 | — | nada |
| 12 (final) | Instala 1 Feudo | Quem tiver mais tags Guerrear: +2 PV |

### Marítimo — DECIDIDO esta rodada (19 níveis, espaçamento ~3)

Finalizado com espaçamento estratégico de ~3 níveis entre bônus (evita que um jogador acumule múltiplos bônus no mesmo turno). Bônus negativos em níveis 7 e 13: quem ativa ganha o bônus, mas todos os outros sofrem penalidade.

| Nível | Individual (quem sobe) | Coletivo (todos) |
|---|---|---|
| 1–2 | — | nada |
| 3 | +1 prod. Moeda | Todos compram 1 carta |
| 4–6 | — | nada |
| 7 | **+1 prod. Guerrear** | **Todos os OUTROS perdem 1 Guerrear** |
| 8–9 | — | nada |
| 10 | Ganha 1 Sussurrador | Todos ganham 3 Moedas |
| 11–12 | — | nada |
| 13 | **Ganha 1 recurso qualquer** | **Todos os OUTROS perdem 4 Moedas** |
| 14–15 | — | nada |
| 16 | +3 prod. Moeda | Todos compram 1 carta |
| 17–18 | — | nada |
| 19 (final) | +1 Ponto de Poder | Quem tiver mais tags Marítimo: +2 PV |

---

## 12. Escopo de módulos de carta (fase 3)

| Módulo | Cartas no original | No escopo do Dark Age? |
|---|---|---|
| base | 210 | sim |
| corporation (corpera) | 15 | sim |
| promo | 97 | sim |
| venusNext | 57 | sim |
| colonies | 55 | sim |
| prelude | 50 | sim |
| prelude2 | 55 | sim |
| turmoil | 22 | sim |
| ares | 27 | sim |
| ceos | 40 | sim |
| community | 30 | sim |
| pathfinders | 115 | sim |
| starwars | 9 | sim (contra minha recomendação original de deixar fora — usuário decidiu manter) |
| delta | 1 | sim |
| **moon** | 109 | **NÃO** (fora do escopo, decisão do usuário) |
| **underworld** | 134 | **NÃO** (fora do escopo, decisão do usuário) |

**Resultado:** 769 cartas jogáveis reescritas (ver Documento 1). Diferença pros ~783 esperados: uns poucos arquivos de infraestrutura/classe-base que não são cartas jogáveis de verdade foram identificados e pulados (ex: `MiningCard.ts`, `RoboticWorkforceBase.ts`, `CorporationCard.ts`, `PreludeCard.ts`, `ICeoCard.ts`, `energyForCards.ts`).

---

## 13. Estado da lógica (resumo)

- **Fase 1 — concluída.** Parâmetros globais, recursos, Ponto de Poder, as 11 rotas comerciais, Conselho dos Estados, estrutura de turno/combate, alocação secreta — fechados. **Juramentos (ex-Objetivos, ex-Marcos/Prêmios):** sistema novo (seção 5-6). **Decretos (ex-Projetos Padrão):** renomeado e fundido com Juramentos na mesma tabela (seção 5-6). **Tags e Trilhas Pathfinder:** Power + Mars mesclados em Guerrear (tag + 5ª trilha de 12 níveis, seções 4 e 11). As 5 trilhas (Comércio, Diplomacia, Engenho, Marítimo, Guerrear) estão fechadas com conteúdo completo (seção 11).
- **Fase 2 — concluída.** Lista do que precisa mudar no motor real (arquivos/funções do código original a tocar) documentada por sistema: fim de jogo, combate, rotas comerciais, Conselho dos Estados, e o que NÃO muda de mecânica (só nome).
- **Fase 3 — em andamento.** 769 cartas reescritas. Pendências reais restantes (não são bug de texto, são decisão de design faltando) — **checklist detalhado em `CHECKLIST.md` no repositório**:
  - **~16 cartas** que dependiam da tag Mars — agora têm a tag Guerrear; precisam ser reescritas pra usar a mecânica real de Guerrear.
  - **~15 cartas** (a maioria em Pathfinders) cuja mecânica dependia da tag Wild/Coringa (essa sim removida sem substituto) — efeito descontinuado, precisam de reescrita própria.
  - **Trilha Marítimo** (seção 11) — única das 5 trilhas que continua rascunho não travado (não corresponde a nenhuma trilha real do Pathfinders).
  - **As 80 cartas de Juramento** (seção 5-6) — sistema, fusão com Decretos e distribuição de pontos travados, conteúdo de cada carta ainda por criar.
  - **~14 cartas** com texto de "comerciar"/"negociar com Rota Comercial" herdado do original — precisam de efeito novo pro modelo de Ataque (ver Documento 1, cabeçalho).
  - Confirmar se o sistema de lobby por trás dos Sussurradores muda de mecânica ou só de nome.

---

## Histórico de correções feitas (pra não repetir erro)

1. **v2:** corrigi um erro de mecânica nas rotas comerciais Lisboa/Ragusa/Constantinopla — tinha inventado "recurso flexível tipo dinheiro" quando o original usa recurso preso a carta (`ADD_RESOURCES_TO_CARD`), bem mais fraco.
2. **v5:** corrigi a regra do Conselho dos Estados — bônus de governo não é pra quem "participou do eixo", é pra quem é membro da facção.
3. **Rodada de revisão de cartas:** corrigi inconsistência de nomenclatura entre módulos (Science resource/Fighter ficaram em inglês no módulo Base porque foram processados antes de eu decidir os nomes Pergaminho/Mercenário) e nomes de facção não traduzidos em Prelúdio 2/CEOs/Community.
4. **v11:** corrigi contradição na seção "o que não muda de mecânica" (dizia que o sistema de Sussurradores não mudava, mas a seção ao lado já documentava que muda contagem e custo).
5. **v11 (rodada anterior):** tag "Ciência" trocada para **"Erudição"** em todo o projeto (145 cartas + este documento), a pedido do usuário.
6. **Tag Mars → Guerrear:** tag Mars renomeada para Guerrear e mesclada com Power (59 cartas) para balancear a 5ª trilha Pathfinder em 75 cartas totais.
7. **v12:** sistema de Marcos e Prêmios substituído por completo pelo sistema de Objetivos (depois renomeado Juramentos, ver item 8) — não foi só reescrita de critério, mudou a estrutura inteira: ação paga (8 Moedas), baralho de 80 cartas secretas em 4 faixas de dificuldade (2-3/4-6/7-8/9-10 PV, 20/25/25/10 cartas), compra 3 e fica com 1. Conteúdo das 80 cartas fica para depois, mesmo tratamento das trilhas Pathfinder.
8. **v13:** "Objetivos" renomeado para **Juramentos** e "Projetos Padrão" renomeado para **Decretos**, a pedido do usuário. Além do nome, a estrutura mudou: Juramento deixou de ser sistema à parte e virou **um Decreto como qualquer outro** (Decreto "Fazer um Juramento", 8 Moedas) — mesma tabela, seção 5-6. Também adicionado: o jogador que compra um Juramento passa a ter um **painel pessoal** (lista própria, só ele vê) que mostra cada Juramento ativo e risca/marca os pontos quando a condição é cumprida — mas a pontuação continua secreta pros outros e só soma no fim de jogo.
9. **v14:** "Feitoria" renomeada para **Rota Comercial**, a pedido do usuário — aplicado em todo o projeto (seções 6/7/8/9/10, Documento 1, Documento 2). No processo, achei e corrigi uma colisão de nome: o Decreto que funda um posto individual ("Construir uma Rota Comercial") ia ficar com nome quase idêntico ao Decreto que avança o parâmetro global de Rotas de Comércio — esse último foi renomeado para "Expandir as Rotas de Comércio" pra não confundir as duas mecânicas (seção 5-6, nota de nomenclatura). Também confirmado que a interação com Rota Comercial já era só "Atacar" desde a rodada de combate original (seção 9) — não existe mais "comerciar"/"negociar" como ação própria. Isso deixou ~14 cartas do Documento 1 com texto desatualizado ("comercia com uma Rota Comercial", "quando comerciar") herdado do jogo original; sinalizei no cabeçalho do Documento 1, mas não reescrevi o efeito de cada uma — isso é decisão de design (o que a carta faz no modelo de ataque), não troca de palavra.
10. **Trilhas Pathfinder — conteúdo real:** código-fonte confirmado (`src/common/pathfinders/PlanetaryTracks.ts`, `src/server/pathfinders/PathfindersExpansion.ts`). Conteúdo das trilhas Comércio/Diplomacia/Engenho foi redistribuído proporcionalmente pra escala de cada trilha Dark Age (mesma técnica usada pra Estandartes/Rotas de Comércio). Trilha de Guerrear (12 níveis) criada a partir de Mars, com bônus em níveis 4, 7, 12. Marítimo (19 níveis) permanece com espaçamento estratégico de ~3 níveis entre bônus, com negativos em níveis 7 e 13.
