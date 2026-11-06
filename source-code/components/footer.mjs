import {esc} from './utils.mjs';
import {brand} from './brand.mjs';
import {footerNav} from './navigation.mjs';

export const siteFooter = (company, year = new Date().getFullYear()) => `<footer class="footer"><div class="container">${brand()}${footerNav()}<p>${esc(company.legalName)} · 대표이사 ${esc(company.ceo)} · 사업자등록번호 ${esc(company.registration)}</p><p>${esc(company.address)} · 대표번호 <a href="tel:${esc(company.phone)}">${esc(company.phone)}</a> · FAX ${esc(company.fax)}</p><div class="footer-bottom"><span>© ${year} MYUNG Information Technologies.</span><a href="#main">맨 위로 ↑</a></div></div></footer>`;
