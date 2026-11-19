(() => {
  'use strict';
  const content = window.homepageContent;
  const storageKey = 'homepage-language';
  const valid = lang => lang === 'en' || lang === 'zh';
  const select = selector => document.querySelector(selector);
  const make = (tag, text) => { const el = document.createElement(tag); el.textContent = text; return el; };

  function renderPublications(t) {
    const section = select('#publications');
    section.querySelectorAll('.publication').forEach(el => el.remove());
    [...content.publications].sort((a, b) => b.year - a.year).forEach(p => {
      const entry = make('article', ''); entry.className = 'publication';
      const citation = make('p', ''); const link = make('a', p.title);
      link.href = `https://doi.org/${p.doi}`; link.lang = 'en';
      p.authors.forEach((author, i) => {
        if (i) citation.append(i === p.authors.length - 1 ? ' and ' : ', ');
        citation.append(author === 'Jiacai Han' ? make('strong', author) : document.createTextNode(author));
      });
      const journal = make('em', p.journal); journal.lang = 'en';
      const doiLink = make('a', `doi: ${p.doi}`); doiLink.href = link.href;
      citation.append(', ', link, ', ', journal, t.citation.replace('{volume}', p.volume).replace('{article}', p.article).replace('{year}', p.year), ' ', doiLink, '.');
      if (p.annotations && p.annotations[document.documentElement.lang === 'zh-CN' ? 'zh' : 'en']) citation.append(` (${p.annotations[document.documentElement.lang === 'zh-CN' ? 'zh' : 'en']})`);
      entry.append(citation); section.append(entry);
    });
  }

  function apply(lang, preservePosition = false) {
    const sections = [...document.querySelectorAll('header, main section')];
    const anchor = sections.filter(el => el.getBoundingClientRect().top <= 80).pop() || sections[0];
    const offset = anchor.getBoundingClientRect().top;
    const t = content[lang];
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t.title;
    select('meta[name="description"]').content = t.description;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = t[el.dataset.i18n];
      if (typeof text === 'string') el.textContent = text;
    });
    select('.portrait').alt = t.portraitAlt;
    select('.section-nav').setAttribute('aria-label', t.navigationLabel);
    select('.academic-links').setAttribute('aria-label', t.profilesLabel);
    select('.language-switch').setAttribute('aria-label', t.languageLabel);
    const biography = select('#biography');
    biography.querySelectorAll('p').forEach(el => el.remove());
    t.biographyParagraphs.forEach(text => biography.append(make('p', text)));
    select('.interests').replaceChildren(...t.interests.map(text => make('li', text)));
    renderPublications(t);
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === lang)));
    if (preservePosition) window.scrollBy(0, anchor.getBoundingClientRect().top - offset);
  }

  function initialLanguage() {
    const requested = new URL(location.href).searchParams.get('lang');
    if (valid(requested)) return requested;
    try { const saved = localStorage.getItem(storageKey); if (valid(saved)) return saved; } catch { /* Storage may be blocked; switching still works. */ }
    return 'en';
  }

  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    const lang = button.dataset.language;
    apply(lang, true);
    try { localStorage.setItem(storageKey, lang); } catch { /* Non-persistent fallback. */ }
    const url = new URL(location.href); url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }));
  apply(initialLanguage());
  select('.language-switch').hidden = false;
  // Restore deep-link alignment after translating content above the target.
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }
})();
