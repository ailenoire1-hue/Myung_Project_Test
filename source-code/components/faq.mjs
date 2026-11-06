import {esc} from './utils.mjs';

// items: [question (text), answerHtml (trusted markup)]
// options.cardItems: render <details class="card"> items; options.openFirst: first item starts open.
export const faq = (items, {cardItems = false, openFirst = false} = {}) =>
  `<div class="faq">${items.map(([question, answerHtml], i) => `<details${cardItems ? ' class="card"' : ''}${openFirst && i === 0 ? ' open' : ''}><summary>${esc(question)}</summary><p>${answerHtml}</p></details>`).join('')}</div>`;
