import {htmlElement} from './forensic-reading-content.mjs';

// Publish the chosen A2 design while preserving previously shared section URLs.
export function approvedIncidentA2(preview,version){
 const switcher=htmlElement(preview,'<nav class="irx-switch');
 if(!switcher)throw new Error('The selected A2 preview control was not found.');
 let page=preview.replace(switcher,'')
  .replace(/<meta name="robots"[^>]*>/g,'')
  .replace(/<title>[\s\S]*?<\/title>/,'<title>침해사고 조사 서비스 | 명디지털포렌식센터</title>')
  .replace(/<script src="assets\/incident-entry-previews\.js[^>]*><\/script>/g,'')
  .replace('irx-a2-final"','irx-a2-final ir-live-a2"')
  .replace('</head>',`<link rel="stylesheet" href="assets/incident-a2-approved.css?v=${version}"></head>`);
 const aliases={
  top:['service-main','overview'],
  ransomware:['ransomware-analysis'],
  'email-hacking':['malware','malware-analysis','email-analysis','mail-hacking'],
  'privacy-audit':['security-review','personal-data'],
  process:['analysis-deliverables','analysis-process','reports'],
  contact:['investigation-method','detail-contact','questions']
 };
 for(const [target,ids] of Object.entries(aliases)){
  const section=new RegExp(`(<section\\b[^>]*\\bid="${target}"[^>]*>)`);
  if(!section.test(page))throw new Error(`Missing approved A2 chapter: ${target}`);
  page=page.replace(section,`$1${ids.map(id=>`<span class="ir-live-anchor" id="${id}" aria-hidden="true"></span>`).join('')}`);
 }
 if(/미리보기|이전 시안 비교|data-irx-variant|noindex/.test(page))throw new Error('Preview-only content remains on the live service page.');
 return page;
}
