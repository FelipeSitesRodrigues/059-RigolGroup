/* =========================================================================
   RIGOL VELAR GROUP
   Movimento leve: sem biblioteca, só transform e opacity, tudo desligado
   quando o visitante pede menos animação.
   ========================================================================= */

(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

  var calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- cabeçalho ganha fundo depois que a página rola ---------- */
  var topo = document.getElementById('topo');
  var zap = document.querySelector('.zap');
  var ultimo = -1;

  function aoRolar() {
    var y = window.scrollY;
    if (y > 40 !== ultimo > 40) topo.classList.toggle('fixo', y > 40);
    if (zap) zap.classList.toggle('ver', y > window.innerHeight * 0.6);
    ultimo = y;
  }

  var agendado = false;
  window.addEventListener('scroll', function () {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () { aoRolar(); agendado = false; });
  }, { passive: true });
  aoRolar();

  /* ---------- menu do celular ---------- */
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');

  if (btn && nav) {
    btn.addEventListener('click', function () {
      var abrindo = !nav.classList.contains('aberto');
      nav.classList.toggle('aberto', abrindo);
      btn.setAttribute('aria-expanded', String(abrindo));
      btn.setAttribute('aria-label', abrindo ? 'Fechar menu' : 'Abrir menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('aberto');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Abrir menu');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !nav.classList.contains('aberto')) return;
      nav.classList.remove('aberto');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    });
  }

  /* ---------- as seções entram conforme aparecem ---------- */
  var alvos = document.querySelectorAll('.rev');

  if (calmo || !('IntersectionObserver' in window)) {
    for (var i = 0; i < alvos.length; i++) alvos[i].classList.add('vis');
  } else {
    var olho = new IntersectionObserver(function (itens) {
      for (var j = 0; j < itens.length; j++) {
        if (!itens[j].isIntersecting) continue;
        itens[j].target.classList.add('vis');
        olho.unobserve(itens[j].target);
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });

    for (var k = 0; k < alvos.length; k++) olho.observe(alvos[k]);
  }


  /* ---------- provas: esteira contínua e lente ----------
     a esteira só duplica os cards quando há animação. no modo calmo a
     faixa vira rolagem normal e a cópia seria só ruído pro leitor de tela. */
  var pista = document.getElementById('provasPista');
  var lente = document.getElementById('lente');

  if (pista && !calmo) {
    var copia = pista.cloneNode(true);
    var clones = copia.querySelectorAll('.prova-c');
    for (var c = 0; c < clones.length; c++) {
      clones[c].setAttribute('tabindex', '-1');
      clones[c].setAttribute('aria-hidden', 'true');
    }
    while (copia.firstChild) pista.appendChild(copia.firstChild);
  }

  if (pista && lente && typeof lente.showModal === 'function') {
    var fichas = [];
    var originais = document.querySelectorAll('.provas-pista .prova-c');
    for (var f = 0; f < originais.length; f++) {
      if (originais[f].getAttribute('aria-hidden') === 'true') continue;
      fichas.push({
        img: originais[f].getAttribute('href'),
        alt: originais[f].querySelector('img').getAttribute('alt'),
        tit: originais[f].getAttribute('data-tit'),
        leg: originais[f].getAttribute('data-leg')
      });
    }

    var lImg = document.getElementById('lenteImg');
    var lTit = document.getElementById('lenteTit');
    var lLeg = document.getElementById('lenteLeg');
    var atual = 0;

    function mostra(n) {
      atual = (n + fichas.length) % fichas.length;
      var d = fichas[atual];
      lImg.src = d.img;
      lImg.alt = d.alt;
      lTit.textContent = d.tit;
      lLeg.textContent = d.leg;
    }

    pista.addEventListener('click', function (e) {
      var card = e.target.closest ? e.target.closest('.prova-c') : null;
      if (!card) return;
      e.preventDefault();
      mostra(parseInt(card.getAttribute('data-i'), 10) || 0);
      document.body.classList.add('lente-on');
      lente.showModal();
    });

    lente.addEventListener('close', function () {
      document.body.classList.remove('lente-on');
      lImg.removeAttribute('src');
    });

    document.getElementById('lenteX').addEventListener('click', function () { lente.close(); });
    document.getElementById('lenteAnt').addEventListener('click', function () { mostra(atual - 1); });
    document.getElementById('lenteProx').addEventListener('click', function () { mostra(atual + 1); });

    lente.addEventListener('click', function (e) {
      if (e.target === lente) lente.close();
    });

    lente.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); mostra(atual - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); mostra(atual + 1); }
    });
  }

  /* ---------- FAQ: abre e FECHA animado ----------
     o details nativo some com o conteúdo na hora, então o fechamento
     é segurado aqui até a transição terminar. */
  var perguntas = document.querySelectorAll('.fq');

  Array.prototype.forEach.call(perguntas, function (fq) {
    var titulo = fq.querySelector('summary');
    var caixa = fq.querySelector('.fq-c');
    if (!titulo || !caixa) return;

    if (fq.open) fq.classList.add('aberta');

    titulo.addEventListener('click', function (e) {
      e.preventDefault();

      if (!fq.open) {
        fq.open = true;
        if (calmo) { fq.classList.add('aberta'); return; }
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { fq.classList.add('aberta'); });
        });
        return;
      }

      if (calmo) { fq.classList.remove('aberta'); fq.open = false; return; }

      fq.classList.remove('aberta');
      var fim = function (ev) {
        if (ev && ev.propertyName !== 'grid-template-rows') return;
        caixa.removeEventListener('transitionend', fim);
        clearTimeout(reserva);
        fq.open = false;
      };
      var reserva = setTimeout(fim, 480);
      caixa.addEventListener('transitionend', fim);
    });
  });
})();
