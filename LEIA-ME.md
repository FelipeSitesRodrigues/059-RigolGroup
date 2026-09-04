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

Peso total: 484 KB, sendo 408 KB de imagem. Carrega rápido no 4G.

---

## ANTES DE PUBLICAR, trocar 3 coisas

### 1. O número do WhatsApp (obrigatório)

O placeholder `5511000000000` aparece **17 vezes** no `index.html`, uma pra cada
botão e link. Substituir todas de uma vez, no VS Code:

1. Abrir `index.html`
2. Ctrl+H
3. Procurar: `5511000000000`
4. Substituir por: o número real, no formato `55` + DDD + número, sem espaço,
   sem traço e sem parêntese. Exemplo para (11) 94005-9518: `5511940059518`
5. Substituir tudo

Os textos das mensagens já estão prontos e são diferentes em cada botão: cada
serviço abre o WhatsApp com o nome daquele serviço, e cada plano com o nome do
plano.

### 2. Instagram e Facebook

No rodapé, os dois ícones estão com `href="#"`. Procurar por
`aria-label="Instagram da Rigol Velar Group"` e trocar o `#` pelo link real.
Mesma coisa no Facebook.

### 3. As duas respostas do FAQ que estão pendentes

Procurar por `[CONFIRMAR` no `index.html`. São duas:

- **Tem contrato de fidelidade?** precisa do prazo mínimo, forma de pagamento e
  como funciona o cancelamento
- **Vocês atendem presencial ou online?** precisa da cidade base e se atende o
  Brasil inteiro

Enquanto não vier a resposta do Gelson, é melhor **apagar as duas perguntas**
do que publicar com o colchete aparecendo. Cada pergunta é um bloco
`<details class="fq rev"> ... </details>`.

---

## Depois de publicar

### Domínio

O `index.html` está com `https://www.rigolvelargroup.com.br/` no `canonical` e
nas tags de compartilhamento. Se o domínio for outro, trocar nas linhas 8, 16 e
33 e 34.

### Rastreamento

O site está pronto pro Pixel e pro GA4, mas eles ainda não foram instalados.
Colar os dois códigos antes do `</head>`.

Para medir o clique do WhatsApp separado por origem (hero, serviço, plano, CTA
final), todos os links de WhatsApp já têm o atributo `data-wa`. Basta um
listener no `main.js`.

---

## O que ficou de fora, de propósito

**Depoimentos.** A seção existe pronta em `copy-site.md` (item 9) mas não entrou
no HTML, porque o Gelson não mandou nenhum depoimento real. Tem um comentário no
`index.html` marcando o lugar exato. Quando chegarem os depoimentos com
autorização de uso, é só montar a seção ali.

**Números de resultado.** Nenhum número de cliente, faturamento ou percentual
aparece na página, porque não existe prova. A faixa abaixo do hero descreve o
serviço em vez de prometer resultado. Quando o Gelson mandar número real, trocar
dois itens dessa faixa.

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

Todas as cores vivem no topo do `style.css`, no bloco `:root`. Trocar ali muda a
página inteira. O dourado principal é `--ouro: #E9C25A`.

### Testar antes de subir

```
cd site
node -e "const h=require('http'),f=require('fs'),p=require('path');const t={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png'};h.createServer((q,r)=>{let x=decodeURIComponent(q.url.split('?')[0]);if(x==='/')x='/index.html';f.readFile(path.join(process.cwd(),x),(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':t[p.extname(x)]||''});r.end(d)})}).listen(8099,()=>console.log('http://localhost:8099'))"
```

---

## Detalhes de construção

- **Fontes:** Playfair Display nos títulos, Manrope no corpo, servidas pelo
  Google Fonts com preconnect
- **Acessibilidade:** link de pular pro conteúdo, foco visível em dourado,
  menu com `aria-expanded`, imagens decorativas com `alt` vazio, contraste do
  texto de corpo acima de 7:1
- **Movimento:** só `transform` e `opacity`, tudo desligado quando o visitante
  liga "reduzir movimento" no sistema
- **FAQ:** usa `<details>` nativo. Se o JavaScript falhar, ele continua abrindo
  e fechando, só sem a animação
- **Hero:** a foto é posicionada pela altura e ancorada à direita, nunca com
  `cover`, senão em tela larga e baixa o corte come a cabeça do Gelson
