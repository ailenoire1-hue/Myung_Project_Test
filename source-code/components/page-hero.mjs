import {esc} from './utils.mjs';

// Sub-page hero: eyebrow, heading (title before "|") and description. The home page has its own hero.
export const pageHero = ({eyebrow, title, description}) => `<section class="page-hero"><div class="container"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title.split('|')[0].trim())}</h1><p class="lead">${esc(description)}</p></div></section>`;
