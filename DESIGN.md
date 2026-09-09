# Rigol Velar Group · Design system

O mundo visual foi aprovado no mockup em 2026-09-04. Quem mexer no site depois
segue este arquivo, não reinventa.

## A ideia

Preto profundo com ouro de acento. A referência não é "agência de marketing", é
patrimônio: a página tem o peso de um material de private banking, porque é isso
que sustenta um plano de R$ 4.497 por mês.

## Cor

| Token | Hex | Onde |
|---|---|---|
| `--preto` | `#000000` | fundo dominante |
| `--carta` | `#12100C` | fundo dos cards |
| `--borda` | `#1C1710` | contorno base |
| `--ouro-cl` | `#F7E9BC` | topo do metal, brilho especular |
| `--ouro` | `#E9C25A` | **acento principal** |
| `--ouro-md` | `#C8912A` | base do gradiente |
| `--ouro-qm` | `#7A4F12` | sombra do metal |
| `--txt` | `#F2EDE3` | corpo de texto |
| `--txt-2` | `#A39A87` | texto secundário |

**A regra que não se quebra:** o ouro é acento, nunca fundo de bloco. No máximo
10% da tela. Nenhuma seção tem fundo dourado, nenhum card é dourado por dentro.

Todo dourado é metal, com o gradiente `--metal`, nunca amarelo chapado. É o
mesmo acabamento da logo.

## Os três metais dos planos

Cada plano veste um metal próprio, numa escala de frio para quente que já conta
a hierarquia antes de a pessoa ler o preço:

| Plano | Metal | Token |
|---|---|---|
| Essencial | azul-aço claro | `--aco` `#A9CFEA`, `--metal-aco` |
| Plus | prata | `--prata` `#D6DAE1`, `--metal-prata` |
| Premium | ouro | `--ouro` `#E9C25A`, `--metal` |

A classe `.m-aco`, `.m-prata` ou `.m-ouro` no card define a variável `--tom` e o
resto herda: nome do plano, preço, aresta de cima, estrelas da lista e botão.
A mesma classe colore as colunas da tabela comparativa.

Os três metais vivem **só nos planos e na tabela**. No resto da página o acento
continua sendo o ouro sozinho, senão a escala vira enfeite.

## O verde do Start

O Start usa `--verde` `#7FD8A4` e `--metal-verde`, pela classe `.m-verde`, que
herda pelo mesmo mecanismo de `--tom`. Ele é **o único verde da página** e está
fora da escala de frio pra quente de propósito: se o Start entrasse como um quarto
metal, viraria o plano mais barato da mesma régua. Sendo outra cor, ele lê como
outra categoria, que é o que ele é, a porta de entrada.

Uma diferença: `.verde` é cor sólida, não gradiente, ao contrário de `--metal-verde`
que só é usado no preço e no botão. Em título de duas linhas o `background-clip`
escurece a segunda linha, e o título do Start quebra em duas.

**Cuidado ao mexer:** o preço usa `background-clip: text`. Trocar o gradiente com
o atalho `background` zera o clip e o preço vira uma barra sólida. Use sempre
`background-image`.

Alternância de fundo entre seções: `#000000` e `#050403`. A diferença é quase
imperceptível de propósito. Quem separa as seções é o filete, não a cor.

## Tipografia

- **Playfair Display** (600) nos títulos, sempre em caixa alta. É a serifa de
  alto contraste que separa a página de qualquer LP de marketing, que usa sans
  pesada por hábito
- **Manrope** (400/500/600) no corpo
- **Rótulos e menu:** Manrope em caixa alta com `letter-spacing` de 0.13em a
  0.28em, ecoando as letras espaçadas de "G R O U P" na logo

Dentro de cada título, só a parte que carrega o sentido fica dourada. Headline
inteira em ouro, nunca.

## A assinatura visual

O **filete com a estrela de quatro pontas**, copiado do rodapé da logo. Aparece
em três lugares e em nenhum outro:

1. Como divisória entre todas as seções
2. Como separador dos itens na faixa de prova
3. Como marcador de lista, no lugar da bolinha

É o único enfeite da página. Fora ele, tudo é disciplina: texto, filete, card,
botão. Sem ícone 3D, sem ilustração, sem emoji.

A estrela vive como máscara CSS na variável `--estrela`, então herda a cor de
onde é usada.

## Luz e matéria

- **Halo dourado subindo de baixo** no hero e no CTA final. A referência de
  design tinha a luz descendo do palco; foi invertida de propósito, senão sai o
  mesmo site com outra cor
- **Cards:** a aresta de cima acende com um gradiente dourado e vai sumindo pelas
  laterais. O card não é uma caixa fechada
- **Botões:** metal polido, com um brilho especular que atravessa no hover
- **Foto do fundador:** dois cantos marcados por filete, nunca uma moldura fechada

## Movimento

Leve por decisão, não por limitação. Só `transform` e `opacity`.

- **Entrada de seção:** sobe 20px com fade, 750ms, `cubic-bezier(.16,1,.3,1)`.
  Uma vez só, via IntersectionObserver que dá `unobserve` depois
- **Escalonamento:** vive no CSS, com `nth-child`, não em JS calculando delay
- **Hero:** um momento autoral, escalonado em 4 tempos no carregamento
- **Hover de card:** sobe 4px e a aresta de cima acende
- **FAQ:** altura animada com `grid-template-rows` de `0fr` para `1fr`, sem medir
  nada em JS
- **`prefers-reduced-motion`:** desliga tudo, e a página continua completa

## Superfícies do navegador

Seleção de texto, barra de rolagem e anel de foco foram tematizados na paleta.
São o detalhe mais barato que separa uma página construída de uma montada.

## Composição

- Container de 1200px, respiro de seção em `clamp(4rem, 7vw, 6.5rem)`
- Medida de texto entre 52 e 74 caracteres
- Grid de serviços em `auto-fit minmax(290px, 1fr)`
- **Hero no mobile:** headline, foto, subheadline, botões, nessa ordem. Padrão do
  MazyOS em todo site
- **Hero no desktop:** a foto é ancorada pela altura e alinhada à direita, nunca
  com `cover`. Em tela larga e baixa, `cover` cortaria a cabeça do Gelson
