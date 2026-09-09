# Rigol Velar Group · Site

Site estático em HTML, CSS e JavaScript. Sem build, sem dependência, sem
framework. Sobe direto numa pasta da hospedagem.

```
site/
  index.html
  assets/
    css/style.css
    js/main.js
    img/           hero, xadrez, montanhas, logo e foto do Gelson, em webp
```

Peso total: 492 KB, sendo 408 KB de imagem. Carrega rápido no 4G.

---

## O que o site é, e o que ele não é

O posicionamento vem do briefing do Gelson e vale pra cada linha nova que
alguém escrever aqui:

**A Rigol Velar não é agência.** Não é agência de marketing, não é agência de
tráfego, não é social media, não vende pacote de serviço. É uma empresa de
estratégia, estruturação comercial e crescimento. Marketing, tráfego, CRM,
automação e IA aparecem como **componentes de uma estrutura**, nunca como
produto isolado.

**O público é profissional e clínica da área da saúde.** Psicólogo, terapeuta,
nutricionista, fisioterapeuta, dentista, clínica de estética. Saúde física e
mental. O vocabulário do site é o do consultório: agenda, paciente, marcação,
recepção. Nada de "empresas" no genérico.

**A regra de ouro:** antes de publicar qualquer texto novo, perguntar se ele faz
a Rigol parecer agência. Se fizer, reescrever.

| Nunca escrever | Escrever assim |
|---|---|
| gerenciamos suas redes | estruturamos sua comunicação dentro da estratégia de aquisição |
| fazemos tráfego pago | construímos e otimizamos canais de aquisição |
| criamos sites | desenvolvemos pontos de conversão integrados à jornada |
| implantamos CRM | estruturamos o acompanhamento e a conversão das oportunidades |
| social media | estratégia de conteúdo e autoridade |

---

## ANTES DE PUBLICAR

### 1. WhatsApp e Instagram já estão certos

O número `5548991792017` está nos 15 links do site, cada um com uma mensagem
pré-preenchida diferente: cada engenharia, cada estrutura e cada CTA abrem a
conversa já dizendo do que se trata. O Instagram do rodapé aponta para
@rigolvelargroup. Só conferir se algum deles mudou.

### 2. As duas respostas do FAQ que estão pendentes

Procurar por `[CONFIRMAR` no `index.html`. São duas:

- **Tem contrato de fidelidade?** precisa do prazo mínimo, forma de pagamento e
  como funciona o cancelamento
- **Vocês atendem presencial ou online?** precisa da cidade base e se atende o
  Brasil inteiro

Enquanto não vier a resposta do Gelson, é melhor **apagar as duas perguntas** do
que publicar com o colchete aparecendo. Cada pergunta é um bloco
`<details class="fq rev"> ... </details>`.

### 3. Domínio

O `index.html` está com `https://www.rigolvelargroup.com.br/` no canonical, nas
tags de compartilhamento e no bloco de dados estruturados. Se o domínio for
outro, procurar por `rigolvelargroup.com.br` e trocar em todas as ocorrências.

---

## Depois de publicar

O site está pronto pro Pixel e pro GA4, mas eles ainda não foram instalados.
Colar os dois códigos antes do `</head>`.

Para medir o clique do WhatsApp separado por origem (hero, gargalos, engenharia,
estrutura, CTA final), todos os links de WhatsApp já têm o atributo `data-wa`.
Basta um listener no `main.js`.

---

## O que ficou de fora, de propósito

**Cases.** O briefing pede uma seção de cases e ela não entrou, porque o Gelson
não mandou nenhum. Tem um comentário no `index.html` marcando o lugar e o formato
que cada case precisa seguir: cenário, problema, estratégia, implementação,
resultado. Enquanto não existir, **Cases também fica fora do menu**, pra não
virar link morto.

O que pedir pro Gelson: dois ou três casos escritos nesse formato, print de
painel com o dado sensível borrado, antes e depois de perfil (nunca de paciente)
e autorização por escrito de cada clínica.

**Números de resultado.** Nenhum número de cliente, faturamento ou percentual
aparece na página, porque não existe prova. A faixa abaixo do hero descreve como
a Rigol trabalha em vez de prometer resultado.

---

## Manutenção

### Trocar uma imagem

As imagens estão em `assets/img/` em webp. Para trocar, converter a nova com o
mesmo nome e as mesmas proporções:

```
ffmpeg -i entrada.png -vf "scale=1672:-2" -q:v 82 assets/img/hero-desktop.webp
```

O original de cada uma está em `../Recursos Site/`.

### Mudar uma cor

Todas as cores vivem no topo do `style.css`, no bloco `:root`. O dourado
principal é `--ouro: #E9C25A`. As três estruturas têm metais próprios:
`--metal-aco` na Essencial, `--metal-prata` na Crescimento e `--metal` na
Avançada.

O Start tem cor própria, `--verde: #7FD8A4`, e é o único verde da página. Ele fica
fora da hierarquia dos três metais de propósito, porque não é um quarto plano, é a
porta de entrada.

### Testar antes de subir

```
cd site
node -e "const h=require('http'),f=require('fs'),p=require('path');const t={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png'};h.createServer((q,r)=>{let x=decodeURIComponent(q.url.split('?')[0]);if(x==='/')x='/index.html';f.readFile(p.join(process.cwd(),x),(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':t[p.extname(x)]||''});r.end(d)})}).listen(8099,()=>console.log('http://localhost:8099'))"
```

---

## Detalhes de construção

- **Fontes:** Playfair Display nos títulos, Manrope no corpo, servidas pelo
  Google Fonts com preconnect
- **Acessibilidade:** link de pular pro conteúdo, foco visível em dourado, menu
  com `aria-expanded`, tabela com `scope` e texto alternativo pra leitor de tela
  nos checks, imagens decorativas com `alt` vazio
- **Movimento:** só `transform` e `opacity`, tudo desligado quando o visitante
  liga "reduzir movimento" no sistema
- **FAQ:** usa `<details>` nativo. Se o JavaScript falhar, ele continua abrindo
  e fechando, só sem a animação
- **Hero:** a foto é posicionada pela altura e ancorada à direita, nunca com
  `cover`, senão em tela larga e baixa o corte come a cabeça do Gelson
- **Tabela comparativa:** rola sozinha no celular, com a primeira coluna presa
