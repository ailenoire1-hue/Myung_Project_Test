import {esc} from './utils.mjs';
import {routes, footerRoutes} from './routes.mjs';

export const mainNav = (currentFile) => `<nav id="navigation" aria-label="주 메뉴">${routes.map(([file, label]) => `<a href="${file}"${currentFile === file ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('')}</nav>`;
export const footerNav = () => `<nav aria-label="하단 메뉴">${footerRoutes.map(([file, label]) => `<a href="${file}">${esc(label)}</a>`).join('')}</nav>`;
