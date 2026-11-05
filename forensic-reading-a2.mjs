const HUB_PATH = 'forensic-chapter-a2.html';

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const escapeRegExp = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const arrow = direction => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${direction === 'left' ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'}"/></svg>`;

const summaries = {
  'data-leakage': '문서 사용, 외부 매체와 삭제 흔적을 연결해 자료의 흐름을 살펴봅니다.',
  'mobile-evidence': '스마트폰·백업·메신저에 남은 대화와 활동 기록을 함께 확인합니다.',
  'media-authenticity': '음성·영상 파일의 구조와 연속성을 살펴보고 확인 근거를 정리합니다.'
};

function serviceLinks(groups, currentIndex = -1) {
  return `<nav class="fr-a2-services" aria-label="서비스별 상세 페이지"><ol>${groups.map((group, index) => `<li><a href="${group.path}#${escapeHtml(group.pages[0].id)}"${index === currentIndex ? ' aria-current="page"' : ''}><span class="fr-a2-service-number">${escapeHtml(group.number)}</span><span class="fr-a2-service-label">${escapeHtml(group.title)}</span>${arrow('right')}</a></li>`).join('')}</ol></nav>`;
}

function directory(groups) {
  return `<section class="fr-a2-directory" id="services" aria-labelledby="fr-a2-directory-title"><div class="dp-frame">
    <header class="fr-a2-directory-heading"><div><p class="fr-a2-eyebrow">서비스별 상세 안내</p><h2 id="fr-a2-directory-title">확인하려는 자료에 맞춰<br>서비스 내용을 살펴보세요.</h2></div><p>서비스 개요부터 분석 사례까지,<br>각 페이지에서 차례로 확인할 수 있습니다.</p></header>
    <div class="fr-a2-cards">${groups.map(group => `<article class="fr-a2-card"><div class="fr-a2-card-top"><span>${escapeHtml(group.number)}</span><span>${String(group.pages.length).padStart(2, '0')}개 내용</span></div><h3><a href="${group.path}#${escapeHtml(group.pages[0].id)}">${escapeHtml(group.title)}</a></h3><p>${escapeHtml(summaries[group.id] || '서비스의 주요 분석 범위와 관련 사례를 확인합니다.')}</p><ol>${group.pages.map((page, index) => `<li><a href="${group.path}#${escapeHtml(page.id)}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(page.label)}</a></li>`).join('')}</ol><a class="fr-a2-card-link" href="${group.path}#${escapeHtml(group.pages[0].id)}"><span>서비스 자세히 보기</span>${arrow('right')}</a></article>`).join('')}</div>
  </div></section>`;
}

function readingNav(groups, currentIndex) {
  const group = groups[currentIndex];
  return `<div class="fr-a2-sticky"><div class="dp-frame"><div class="fr-a2-nav-top"><a class="fr-a2-all" href="${HUB_PATH}#services">${arrow('left')}<span>전체 서비스</span></a><span class="fr-a2-nav-caption">디지털포렌식 서비스 안내</span></div>${serviceLinks(groups, currentIndex)}<nav class="fr-a2-contents" aria-label="${escapeHtml(group.title)} 페이지 목차">${group.pages.map((page, index) => `<a href="#${escapeHtml(page.id)}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(page.label)}</a>`).join('')}</nav></div></div>`;
}

function adjacentServices(groups, currentIndex) {
  const previous = groups[currentIndex - 1];
  const next = groups[currentIndex + 1];
  const href = group => group ? `${group.path}#${escapeHtml(group.pages[0].id)}` : `${HUB_PATH}#services`;
  return `<nav class="fr-a2-adjacent" aria-label="이전 다음 서비스"><div class="dp-frame"><a href="${href(previous)}">${arrow('left')}<span><small>${previous ? '이전 서비스' : '서비스 안내'}</small><strong>${previous ? `${escapeHtml(previous.number)} · ${escapeHtml(previous.title)}` : '전체 서비스 보기'}</strong></span></a><a href="${href(next)}"><span><small>${next ? '다음 서비스' : '서비스 안내'}</small><strong>${next ? `${escapeHtml(next.number)} · ${escapeHtml(next.title)}` : '전체 서비스 보기'}</strong></span>${arrow('right')}</a></div></nav>`;
}

/** Builds the hub and three distinct service reading pages from the approved content. */
export function readingSeparatePages({ shell, groups, hero = '', definition = '', faq = '', closing = '' }) {
  if (typeof shell !== 'function') throw new TypeError('readingSeparatePages requires a shell function.');
  if (!Array.isArray(groups) || !groups.length || groups.some(group => !Array.isArray(group.pages) || !group.pages.length)) {
    throw new TypeError('readingSeparatePages requires service groups with page content.');
  }

  const services = groups.map((group, index) => ({ ...group, number: group.number || String(index + 1).padStart(2, '0'), path: `forensic-chapter-a2-${String(index + 1).padStart(2, '0')}.html` }));
  const destinations = new Map();
  services.forEach(group => {
    destinations.set(group.id, `${group.path}#${group.pages[0].id}`);
    group.pages.forEach(page => destinations.set(page.id, `${group.path}#${page.id}`));
  });

  // Keep all existing quick links usable after the services move to separate URLs.
  const rewriteLinks = (content, servicePage) => String(content).replace(/\bhref\s*=\s*(["'])([^"']*)\1/g, (attribute, quote, href) => {
    const hash = href.lastIndexOf('#');
    if (hash < 0 || /^(?:https?:)?\/\//i.test(href) || /^[a-z][a-z\d+.-]*:/i.test(href)) return attribute;
    const anchor = href.slice(hash + 1);
    const target = servicePage && ['overview', 'questions', 'service-main'].includes(anchor)
      ? `${HUB_PATH}#${anchor}`
      : destinations.get(anchor);
    return target ? `href=${quote}${escapeHtml(target)}${quote}` : attribute;
  });
  const build = (path, title, body) => ({ path, html: rewriteLinks(shell({ variant: 'a2', path, title, body }), path !== HUB_PATH) });

  const pages = [build(HUB_PATH, 'A2 · 서비스별 상세 안내 | 디지털포렌식', `<main id="main" class="fr-a2 fr-a2-hub">${hero}${definition}${directory(services)}${faq}${closing}</main>`)];
  services.forEach((group, index) => {
    const chunks = group.pages.map(page => {
      // The outer screen owns the original anchor, avoiding duplicate IDs in copied articles.
      const body = String(page.body ?? '').replace(new RegExp(`\\s+id\\s*=\\s*(["'])${escapeRegExp(page.id)}\\1`, 'g'), '');
      return `<section class="fr-screen lp-service ${escapeHtml(group.className || '')}" id="${escapeHtml(page.id)}"><div class="dp-frame"><div class="fr-screen-body">${body}</div></div></section>`;
    }).join('');
    const body = `<main id="main" class="fr-a2 fr-a2-service-page">${readingNav(services, index)}${chunks}${adjacentServices(services, index)}${closing}</main>`;
    pages.push(build(group.path, `${group.number} · ${group.title} | 디지털포렌식 서비스`, body));
  });
  return pages;
}
