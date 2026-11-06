import {esc} from './utils.mjs';
import {skipLink, topbar, siteHeader} from './header.mjs';
import {pageHero} from './page-hero.mjs';
import {contactBand} from './cta.mjs';
import {siteFooter} from './footer.mjs';
import {paymentDemo} from './payment-demo.mjs';

// page: {file, title, eyebrow, description, body}. The home page has no generic hero; product-detail adds the payment demo.
export function renderDocument(page, company) {
  const isHome = page.file === 'index.html';
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"><link rel="stylesheet" href="integrated-site.css"><script src="integrated-site.js" defer></script></head><body>${skipLink()}${topbar()}${siteHeader(page.file)}<main id="main">${isHome ? '' : pageHero(page)}${page.body}${page.file === 'product-detail.html' ? paymentDemo() : ''}</main>${contactBand()}${siteFooter(company)}</body></html>`;
}
