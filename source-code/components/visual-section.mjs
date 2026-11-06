import {esc} from './utils.mjs';
import {stockPhoto} from './stock-photo.mjs';

// Text + stock photo split section. textHtml is trusted markup; other props are escaped. reverse puts the photo first on wide screens.
export const visualSection = ({eyebrow, title, textHtml, photo, reverse = false, tall = false}) =>
  `<section class="section visual-section"><div class="container split${reverse ? ' split-reverse' : ''}"><div><span class="eyebrow">${esc(eyebrow)}</span><h2>${esc(title)}</h2>${textHtml}</div>${stockPhoto(photo, {className: tall ? 'stock-photo--tall' : ''})}</div></section>`;

// Three captioned photos with a short heading, text and link. items: [{photo, title, text, href, linkLabel}]
export const photoTrio = ({eyebrow, title, lead, items}) =>
  `<section class="section visual-section"><div class="container"><div class="section-heading"><span class="eyebrow">${esc(eyebrow)}</span><h2>${esc(title)}</h2><p class="lead">${esc(lead)}</p></div><div class="grid grid-3 photo-trio">${items.map((i) => `<div class="photo-trio-item">${stockPhoto(i.photo)}<h3>${esc(i.title)}</h3><p>${esc(i.text)}</p><a class="text-link" href="${esc(i.href)}">${esc(i.linkLabel)} →</a></div>`).join('')}</div></div></section>`;
