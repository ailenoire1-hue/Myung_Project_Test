import {brand} from './brand.mjs';
import {mainNav} from './navigation.mjs';

export const skipLink = () => `<a class="skip" href="#main">본문 바로가기</a>`;
export const topbar = () => `<div class="topbar"><div class="container">명정보기술 통합 홈페이지 시안 <span>제품·서비스 조건 확인 중</span></div></div>`;
export const siteHeader = (currentFile) => `<header class="header"><div class="container header-inner">${brand()}<button class="menu-toggle" type="button" aria-controls="navigation" aria-expanded="false" hidden>메뉴</button>${mainNav(currentFile)}</div></header>`;
