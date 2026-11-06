const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const idPattern = /^[a-z][a-z0-9-]*$/i;

export function readingTabbedGuide({ shell, groups, hero = '', definition = '', faq = '', closing = '' }) {
  if (typeof shell !== 'function' || !Array.isArray(groups) || !groups.length) throw new Error('readingTabbedGuide requires a shell and service groups.');
  const pageIds = new Set();
  const serviceIds = new Set();
  groups.forEach(group => {
    if (!idPattern.test(group.id) || serviceIds.has(group.id) || !Array.isArray(group.pages) || !group.pages.length) throw new Error('Each reading group needs a unique id and content pages.');
    serviceIds.add(group.id);
    group.pages.forEach(page => {
      if (!idPattern.test(page.id) || pageIds.has(page.id)) throw new Error('Reading page ids must be unique anchor names.');
      pageIds.add(page.id);
    });
  });
  const primaryTabs = groups.map((group, index) => `<button class="fr-service-tab" type="button" role="tab" id="fr-service-tab-${group.id}" aria-controls="fr-service-panel-${group.id}" aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}" data-fr-service-tab="${index}"><span class="fr-service-tab-number">${escapeHtml(group.number)}</span><strong>${escapeHtml(group.title)}</strong><span class="fr-service-tab-mark" aria-hidden="true"></span></button>`).join('');
  const content = groups.map((group, groupIndex) => {
    const subTabs = group.pages.map((page, pageIndex) => `<button class="fr-page-tab" type="button" role="tab" id="fr-page-tab-${page.id}" aria-controls="${page.id}" aria-selected="${pageIndex === 0}" tabindex="${pageIndex === 0 ? '0' : '-1'}" data-fr-page-tab="${pageIndex}">${escapeHtml(page.label)}</button>`).join('');
    const className = String(group.className ?? '').split(/\s+/).filter(token => /^[a-z][a-z0-9-]*$/i.test(token)).join(' ');
    const pages = group.pages.map((page, pageIndex) => `<section class="lp-service ${escapeHtml(className)} fr-content-panel" id="${page.id}" role="tabpanel" aria-labelledby="fr-page-tab-${page.id}" tabindex="0" data-fr-page-panel="${pageIndex}"><h4 class="fr-fallback-page-title">${escapeHtml(page.label)}</h4><div class="dp-frame">${page.body ?? ''}</div></section>`).join('');
    return `<div class="fr-service-panel" id="fr-service-panel-${group.id}" role="tabpanel" aria-labelledby="fr-service-tab-${group.id}" data-fr-service-panel="${groupIndex}" data-fr-service-id="${group.id}"><h3 class="fr-fallback-service-title"><span>${escapeHtml(group.number)}</span>${escapeHtml(group.title)}</h3><div class="fr-page-tabs" role="tablist" aria-label="${escapeHtml(group.title)}의 안내 항목" aria-orientation="horizontal" data-fr-page-tabs>${subTabs}</div><div class="fr-content-stack">${pages}</div></div>`;
  }).join('');
  const guide = `<section class="fr-guide fr-screen" id="service-guide" aria-labelledby="fr-guide-title" data-fr-tabbed-guide><div class="dp-frame fr-guide-frame"><header class="fr-guide-heading"><div><p>SERVICE GUIDE</p><h2 id="fr-guide-title">의뢰 목적별 분석 안내</h2></div><p>서비스 개요와 분석 사례를 살펴보세요.</p></header><div class="fr-service-tabs" role="tablist" aria-label="의뢰 목적별 서비스" aria-orientation="horizontal" data-fr-service-tabs>${primaryTabs}</div>${content}</div></section>`;
  const path = 'forensic-chapter-a3.html';
  const html = shell({
    variant: 'a3',
    path,
    title: 'A3안 · 목적별 탭 안내',
    body: `<main class="fr-main" id="main">${hero}${definition}${guide}${faq}${closing}</main>`,
    extraBody: '<script src="assets/forensic-reading-a3.js" defer></script>'
  });
  return { path, html };
}
