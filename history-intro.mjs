import {companyFacts as facts} from './company-facts.mjs';
import { splashMarkup } from './intro.mjs';

export const historyDesigns = [
 {id:'1',name:'시간의 흔적',description:'오래된 인쇄물처럼 흐릿하고 닳은 글자의 질감이 서서히 걷힙니다. 같은 글씨가 깨끗하고 선명해집니다.'},
 {id:'2',name:'선명해지는 시간',description:'낮은 대비와 흐릿한 잉크의 느낌이 점차 또렷해집니다. 차분하게 축적된 경험을 표현합니다.'},
 {id:'3',name:'기술의 정밀화',description:'연도가 이동하는 방향을 따라 낡은 질감이 왼쪽부터 지워집니다. 또렷해지는 글자로 기술의 발전을 보여줍니다.'}
];
const titleLines = '<span class="splash-line intro-first"><span>시간이 쌓은 경험,</span></span><span class="splash-line intro-second"><span><em>신뢰받는 기술</em>로 보답합니다.</span></span>';
const agingFilter = '<svg class="history-filter-defs" aria-hidden="true" width="0" height="0"><defs><filter id="history-aged-ink" x="-10%" y="-20%" width="120%" height="140%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="1" seed="19" result="grain"/><feColorMatrix in="grain" type="luminanceToAlpha"/><feComponentTransfer result="wear"><feFuncA type="linear" slope="6" intercept="-2.8"/></feComponentTransfer><feComposite in="SourceGraphic" in2="wear" operator="out" result="worn"/><feDisplacementMap in="worn" in2="grain" scale=".35" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>';
export function historyIntroMarkup(id,{preview=true}={}){
 return splashMarkup('b')
  .replace('class="site-intro splash-b"',`data-evolution="${id}" class="site-intro splash-b history-intro history-${id}"`)
  .replace('data-splash-preview="false"',`data-splash-preview="${preview}"`)
  .replace('<div class="intro-curtain"',agingFilter+'<div class="intro-curtain"')
  .replace('명디지털포렌식센터 인트로 B안',preview?`명디지털포렌식센터 인트로 개선 ${id}안`:'명디지털포렌식센터 인트로')
  .replace(/<h2>[\s\S]*?<\/h2>/,`<h2 class="history-title"><span class="history-title-old" aria-hidden="true">${titleLines}</span><span class="history-title-current">${titleLines}</span></h2>`);
}
export function historyDesignTools(id){
 return `<nav class="preview-toolbar history-tools" aria-label="인트로 개선안"><span>INTRO</span>${historyDesigns.map(v=>`<a href="history-${v.id}.html?intro=1" ${id===v.id?'aria-current="page"':''}>${v.id}안</a>`).join('')}<button data-replay>다시 재생</button><a href="history-previews.html">3안 비교</a></nav>`;
}
export function historyComparisonPage(){
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>시간에서 기술로 · 인트로 3안 | 명디지털포렌식센터</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/intro.css"><link rel="stylesheet" href="assets/cohesive.css"><link rel="stylesheet" href="assets/history-intro.css"><script src="assets/compare.js" defer></script><script src="assets/history-previews.js" defer></script></head><body class="comparison-page history-comparison-page"><main class="compare-main"><header class="compare-heading"><a class="compare-brand" href="calm-1.html?skip=1">MDFC <span>명디지털포렌식센터</span></a><span class="compare-kicker">INTRO DESIGN · 4 SECONDS</span><h1>시간이 쌓여, 오늘의 기술로.</h1><p>중앙에 배치한 문구, ${facts.foundingYear}년부터 현재까지 이동하는 연도, 낡고 흐릿한 질감이 선명해지는 세 가지 인트로입니다.</p><button class="history-play-all" data-play-all>3안 함께 재생</button></header><div class="compare-grid">${historyDesigns.map(v=>`<article class="compare-card"><div class="compare-frame"><iframe title="인트로 개선 ${v.id}안" src="history-${v.id}.html?hold=1&embed=1" tabindex="-1" loading="eager"></iframe></div><div class="compare-card-copy"><span class="compare-option">OPTION ${v.id}</span><h2>${v.name}</h2><p>${v.description}</p><div class="compare-actions"><button class="button" data-play-history="${v.id}">4초 재생</button><a href="history-${v.id}.html?intro=1">전체 화면 보기</a></div></div></article>`).join('')}</div><p class="history-comparison-note">세 시안 모두 같은 C-1 메인 화면으로 이어집니다.</p></main></body></html>`;
}
