/* ==========================================================================
   Curso HTML & CSS — showcase
   Melhorias progressivas: abas de módulo, busca, carrossel, contadores,
   reveal ao rolar e botão "voltar ao topo". A página funciona sem JS.
   ========================================================================== */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupTabs();
    setupSearch();
    setupCounters();
    setupReveal();
    setupToTop();
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---- Abas de módulo ---------------------------------------------------- */
  const tabs = Array.from(document.querySelectorAll('.seg'));
  const panels = Array.from(document.querySelectorAll('.module-panel'));
  const searchInput = document.getElementById('busca');

  function activateModule(id) {
    tabs.forEach((t) => {
      const on = t.dataset.target === id;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
    });
    panels.forEach((p) => p.classList.toggle('active', p.dataset.module === id));
  }

  function setupTabs() {
    tabs.forEach((tab) => {
      tab.addEventListener('click', function () {
        if (searchInput && searchInput.value) { searchInput.value = ''; runSearch(); }
        activateModule(tab.dataset.target);
      });
    });
  }

  /* ---- Busca ------------------------------------------------------------- */
  const cards = Array.from(document.querySelectorAll('.ex-card'));
  const body = document.getElementById('modulesBody');
  const status = document.getElementById('searchStatus');
  const noResults = document.getElementById('noResults');

  function runSearch() {
    const raw = searchInput ? searchInput.value.trim() : '';
    const q = norm(raw);

    if (!q) {
      body.classList.remove('searching');
      cards.forEach((c) => { c.hidden = false; });
      panels.forEach((p) => p.classList.remove('no-match'));
      if (status) status.hidden = true;
      if (noResults) noResults.hidden = true;
      return;
    }

    body.classList.add('searching');
    let total = 0;
    cards.forEach((c) => {
      const match = norm(c.dataset.keywords || '').indexOf(q) !== -1;
      c.hidden = !match;
      if (match) total += 1;
    });
    panels.forEach((p) => {
      const has = p.querySelector('.ex-card:not([hidden])') !== null;
      p.classList.toggle('no-match', !has);
    });
    if (status) {
      status.hidden = false;
      status.textContent = total === 0
        ? ''
        : `${total} resultado${total > 1 ? 's' : ''} para “${raw}”.`;
    }
    if (noResults) noResults.hidden = total !== 0;
  }

  function setupSearch() {
    if (searchInput) searchInput.addEventListener('input', runSearch);
  }

  /* ---- Contadores animados ---------------------------------------------- */
  function setupCounters() {
    const nums = Array.from(document.querySelectorAll('.num[data-count]'));
    nums.forEach((el) => {
      const target = Number(el.dataset.count) || 0;
      if (reduceMotion) { el.textContent = String(target); return; }
      const dur = 1100;
      let t0 = null;
      const step = (ts) => {
        if (t0 === null) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        el.textContent = String(Math.round(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* ---- Reveal ao rolar --------------------------------------------------- */
  function setupReveal() {
    const items = Array.from(document.querySelectorAll('.reveal-init'));
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('reveal'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('reveal'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* ---- Voltar ao topo ---------------------------------------------------- */
  function setupToTop() {
    const btn = document.getElementById('toTop');
    if (!btn) return;
    const toggle = () => {
      const on = window.scrollY > 500;
      btn.hidden = !on;
      btn.classList.toggle('show', on);
    };
    window.addEventListener('scroll', toggle, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
    toggle();
  }
})();
