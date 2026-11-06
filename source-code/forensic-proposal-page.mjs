import {proposalStorageSection} from './forensic-proposal-storage.mjs';
import {proposalMobileSection} from './forensic-proposal-mobile.mjs';
import {proposalAudioSection} from './forensic-proposal-audio.mjs';

// Replace a complete section, including any nested sections in its content.
function replaceSection(document,id,content){
 const escaped=id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const start=new RegExp(`<section\\b[^>]*\\bid="${escaped}"[^>]*>`).exec(document);
 if(!start)throw new Error(`Missing proposal target section: ${id}`);
 const tags=/<\/?section\b[^>]*>/g;tags.lastIndex=start.index;
 let depth=0,tag;
 while((tag=tags.exec(document))){
  depth+=tag[0].startsWith('</')?-1:1;
  if(depth===0)return document.slice(0,start.index)+content+document.slice(tags.lastIndex);
 }
 throw new Error(`Unclosed proposal target section: ${id}`);
}

export function applyLawProposalA1(document,version){
 let html=document.replace('class="dp-page dp-a ft-page ft-a1"','class="dp-page dp-a ft-page ft-a1 lp-page"');
 html=replaceSection(html,'why-mdfc','');
 html=replaceSection(html,'data-leakage',proposalStorageSection());
 html=replaceSection(html,'mobile-evidence',proposalMobileSection());
 html=replaceSection(html,'media-authenticity',proposalAudioSection());
 html=html.replace(/<li><a href="forensic-a1\.html#why-mdfc">[\s\S]*?<\/a><\/li>/g,'');
 html=html.replace('</head>',['forensic-proposal-page.css','forensic-proposal-storage.css','forensic-proposal-mobile.css','forensic-proposal-audio.css'].map(name=>`<link rel="stylesheet" href="assets/${name}?v=${version}">`).join('')+'</head>');
 return html.replace('<title>A1안 · 분석 로그형 | 디지털포렌식 서비스</title>','<title>A1안 · 서비스 분석 사례 | 디지털포렌식 서비스</title>');
}
