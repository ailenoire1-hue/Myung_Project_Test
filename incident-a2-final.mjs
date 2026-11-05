import {htmlElement} from './forensic-reading-content.mjs';

export function incidentA2Final(base,version){
 const guide=htmlElement(base,'<nav class="ira-entry-quick"');
 const response=htmlElement(guide,'<a href="#first-response"');
 if(!guide||!response)throw new Error('The selected A2 quick guide is missing.');
 const remaining=guide.replace(response,'');
 const first=remaining.indexOf('>')+1;
 const responseFirst=remaining.slice(0,first)+response.replace('사고를 발견했다면?','사고를 확인했다면?')+remaining.slice(first);
 const switcher=htmlElement(base,'<nav class="irx-switch');
 return base.replace(guide,responseFirst)
  .replace('irx-a-family irx-a2"','irx-a-family irx-a2 irx-a2-final"')
  .replace(/<title>[\s\S]*?<\/title>/,'<title>침해사고 조사 서비스 · A2 최종 미리보기 | MDFC</title>')
  .replace(switcher,'<nav class="irx-switch ira-family-switch ira-final-preview" aria-label="미리보기 안내"><span>A2 최종 미리보기</span><a href="incident-a-previews.html">이전 시안 비교 ↗</a></nav>')
  .replace('</head>',`<link rel="stylesheet" href="assets/incident-a2-final.css?v=${version}"></head>`);
}
