import {proposalStorageSection} from './forensic-proposal-storage.mjs';
import {proposalMobileSection} from './forensic-proposal-mobile.mjs';
import {proposalAudioSection} from './forensic-proposal-audio.mjs';

export function htmlElement(document,match){
 const start=typeof match==='string'?document.indexOf(match):document.search(match);
 if(start<0)throw new Error(`Missing reading component ${match}`);
 const openStart=document.lastIndexOf('<',start);
 const opening=/^<([a-z][\w-]*)\b[^>]*>/i.exec(document.slice(openStart));
 if(!opening)throw Error('Invalid reading component opening');
 const tag=opening[1],tokens=new RegExp(`<\\/?${tag}\\b[^>]*>`,'gi');tokens.lastIndex=openStart;
 let depth=0,token;
 while((token=tokens.exec(document))){
  if(token[0].startsWith('</'))depth--;else if(!token[0].endsWith('/>'))depth++;
  if(depth===0)return document.slice(openStart,tokens.lastIndex);
 }
 throw new Error(`Unclosed reading component ${tag}`);
}
const part=(html,tag,className)=>htmlElement(html,new RegExp(`<${tag}\\b[^>]*class="(?:[^"]* )?${className}(?:[" ])`));
const withoutId=(html,id)=>html.replace(new RegExp(` id="${id}"`),'');

export function readingGroups(){
 const storage=proposalStorageSection(),mobile=proposalMobileSection(),audio=proposalAudioSection();
 return [
  {id:'data-leakage',number:'01',title:'자료 유출 조사',subtitle:'PC·저장매체에 남은 사용과 이동 기록',className:'lp-storage',pages:[
   {id:'data-leakage',label:'서비스 개요',body:part(storage,'header','lp-storage-heading')+part(storage,'div','lp-storage-overview')},
   {id:'data-leakage-analysis',label:'USB 연결·자료 대조',body:withoutId(part(storage,'article','lp-storage-case'),'data-leakage-analysis')}
  ]},
  {id:'mobile-evidence',number:'02',title:'스마트폰 증거 확보',subtitle:'연락·대화·활동 기록과 메신저 자료',className:'lp-mobile',pages:[
   {id:'mobile-evidence',label:'서비스 개요',body:part(mobile,'header','lpm-heading')+part(mobile,'div','lpm-intro-grid')},
   {id:'mobile-evidence-analysis',label:'분석 결과물',body:withoutId(part(mobile,'article','lpm-results'),'mobile-evidence-analysis')},
   {id:'messenger-analysis',label:'메신저 분석',body:part(mobile,'div','lpm-messenger')}
  ]},
  {id:'media-authenticity',number:'03',title:'음성·녹음 분석',subtitle:'파일 구조·작성 정보·파형 비교',className:'lp-audio',pages:[
   {id:'media-authenticity',label:'서비스 개요',body:part(audio,'div','lp-audio-heading')+part(audio,'div','lp-audio-intro')},
   {id:'media-authenticity-analysis',label:'파일 구조 비교',body:withoutId(part(audio,'article','lp-audio-case-structure'),'media-authenticity-analysis')},
   {id:'audio-waveform',label:'음성 파형 비교',body:part(audio,'div','lp-audio-case-waveform')+part(audio,'p','lp-audio-scope')}
  ]}
 ];
}

export function readingFragments(document){
 const section=id=>htmlElement(document,new RegExp(`<section\\b[^>]*id="${id}"`));
 const marked=(html)=>html.replace('<section ','<section data-fr-screen ').replace(/class="([^"]+)"/,(_,classes)=>`class="${classes} fr-screen"`);
 let closing=marked(section('contact')).replace('확인하고 싶은<br>사실이 있나요?','지금 바로<br>문의하세요.');
 closing=closing.replace('대상 기기와 자료, 의뢰 목적을 알려 주세요.<br>필요한 분석과 진행 방법을 함께 정리해 드립니다.','자료 유출, 스마트폰 증거 확보, 음성 분석.<br>상담을 통해 필요한 분석과 진행 방법을 안내합니다.');
 return {hero:marked(section('service-main')),definition:marked(section('overview')),faq:marked(section('questions')),closing};
}

export function readingShell(base,version){
 const header=htmlElement(base,'<header class="header"');
 const dialog=htmlElement(base,'<dialog class="contact-dialog"');
 const head=base.slice(base.indexOf('<head>')+6,base.indexOf('</head>'))
  .replace(/<title>[\s\S]*?<\/title>/,'').replace(/<link[^>]*forensic-technical-log\.css[^>]*>/,'');
 return ({variant,path,title,body,extraHead='',extraBody=''})=>{
  const currentHeader=header.replaceAll('forensic-a1.html',path).replace(/<li><a href="[^"#]+#analysis-process">[\s\S]*?<\/a><\/li>/g,'');
  const previewNav=`<nav class="fr-preview-switch" aria-label="읽기 방식 미리보기 선택"><a href="forensic-chapter-previews.html">3안 비교</a>${['a1','a2','a3'].map(id=>`<a href="forensic-chapter-${id}.html"${id===variant?' aria-current="page"':''}>${id.toUpperCase()}</a>`).join('')}</nav>`;
  const scripts=extraBody.replace(/src="(assets\/forensic-reading-[^"?]+)"/g,(_,asset)=>`src="${asset}?v=${version}"`);
  return `<!doctype html><html lang="ko"><head>${head}<title>${title} | MDFC</title><link rel="stylesheet" href="assets/forensic-reading.css?v=${version}"><link rel="stylesheet" href="assets/forensic-reading-${variant}.css?v=${version}">${extraHead}</head><body class="dp-page dp-a ft-page ft-a1 lp-page fr-page fr-${variant}">${currentHeader}${body}${dialog}${previewNav}${scripts}</body></html>`;
 };
}

export function readingScreen(group,page){
 return `<section class="fr-screen lp-service ${group.className}" data-fr-screen data-fr-group="${group.id}" data-fr-label="${group.title} · ${page.label}" id="${page.id}"><div class="dp-frame"><div class="fr-screen-body">${page.body}</div><div class="fr-page-caption"><strong>${group.number} <span>${group.title}</span></strong><span>${String(group.pages.indexOf(page)+1).padStart(2,'0')} / ${String(group.pages.length).padStart(2,'0')} · ${page.label}</span></div></div></section>`;
}

export function readingSequential({shell,groups,hero,definition,faq,closing,version}){
 const navItems=[['overview','디지털포렌식이란?',''],...groups.map(g=>[g.id,g.title,g.number]),['questions','자주 묻는 질문',''],['contact','상담 안내','']];
 const chapterNav=`<nav class="fr-chapter-nav" aria-label="페이지 챕터 이동">${navItems.map(([id,name,number])=>`<a href="#${id}">${number?`<span>${number}</span>`:''}<strong>${name}</strong></a>`).join('')}</nav>`;
 const topbar=`<div class="fr-topbar"><div class="dp-frame"><span class="fr-topbar-title">SERVICE GUIDE</span>${chapterNav}<a class="fr-topbar-home" href="#service-main">서비스 메인</a><div class="fr-screen-count" aria-live="off"></div></div></div>`;
 const body=`<main class="fr-main" id="main">${hero}${topbar}${definition}${groups.flatMap(g=>g.pages.map(p=>readingScreen(g,p))).join('')}${faq}${closing}</main>`;
 return {path:'forensic-chapter-a1.html',html:shell({variant:'a1',path:'forensic-chapter-a1.html',title:'A1 · 화면 단위 챕터형',body,extraHead:`<link rel="stylesheet" href="assets/forensic-reading-a1-spacing.css?v=${version}">`,extraBody:`<script src="assets/forensic-reading-a1.js?v=${version}" defer></script>`})};
}
