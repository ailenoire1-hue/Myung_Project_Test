import {esc} from './utils.mjs';

// Plain text props are escaped; *Html props are trusted markup.
export const articleCard = ({tag, title, text}) => `<article class="card"><span class="tag">${esc(tag)}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`;

export const serviceCard = ({href, tag, title, text}) => `<a class="card service-card" href="${esc(href)}"><span class="tag">${esc(tag)}</span><h3>${esc(title)} <span aria-hidden="true">↗</span></h3><p>${esc(text)}</p></a>`;

export const productCard = ({category, categoryLabel, name, description, noteHtml, image, href}) => `
<article class="card" data-product-category="${esc(category)}">
  <div class="card-media"><img src="${esc(image.src)}" alt="${esc(image.alt)}"></div>
  <span class="tag">${esc(categoryLabel)}</span>
  <h3>${esc(name)}</h3>
  <p>${esc(description)}</p>
  <p class="note">${noteHtml}</p>
  <a class="text-link" href="${esc(href)}">상세 보기 →</a>
</article>`;
