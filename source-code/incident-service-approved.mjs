import {htmlElement} from './forensic-reading-content.mjs';

// Promote the selected design while retaining all comparison routes.
export function approvedIncidentService(preview,version){
 const switcher=htmlElement(preview,'<nav class="ir-preview-switch"');
 const description='랜섬웨어 데이터 복원·사고 원인 조사·재발 방지, 이메일·해킹 조사, 개인정보 및 내부 보안점검. 명디지털포렌식센터의 서비스를 확인하세요.';
 let html=preview.replace(switcher,'')
  .replace(/<meta name="robots"[^>]*>/g,'')
  .replace(/<title>[\s\S]*?<\/title>/,'<title>침해사고 조사 서비스 | 명디지털포렌식센터</title>')
  .replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${description}">`)
  .replace(/<meta property="og:title"[^>]*>/g,'<meta property="og:title" content="침해사고 조사 서비스 | 명디지털포렌식센터">')
  .replace(/<meta property="og:description"[^>]*>/g,`<meta property="og:description" content="${description}">`)
  .replace(/<script src="assets\/incident-service-previews\.js[^>]*><\/script>/,'')
  .replace(/<span class="sc-anchor-alias"[^>]*><\/span>/g,'')
  .replace('ir-service-page is-a','ir-service-page ir-approved is-a')
  .replace('</head>',`<link rel="stylesheet" href="assets/incident-service-approved.css?v=${version}"></head>`);
 const aliases={
  'service-main':['overview'],
  ransomware:['ransomware-analysis'],
  'email-hacking':['malware','malware-analysis','email-analysis','mail-hacking'],
  'security-review':['personal-data'],
  process:['analysis-deliverables','analysis-process','reports'],
  contact:['investigation-method','detail-contact']
 };
 for(const [target,ids] of Object.entries(aliases)){
  const matcher=new RegExp(`(<section\\b[^>]*\\bid="${target}"[^>]*>)`);
  if(!matcher.test(html))throw Error(`Missing selected incident chapter: ${target}`);
  html=html.replace(matcher,`$1${ids.map(id=>`<span class="ir-anchor-alias" id="${id}" aria-hidden="true"></span>`).join('')}`);
 }
 if(html.includes('ir-preview-switch')||/data-is-variant/.test(html))throw Error('Preview navigation remains on the service page.');
 return html;
}
