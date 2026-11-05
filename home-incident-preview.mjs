import {applyApprovedIncidentDesign} from './home-service-editorial.mjs';

export function homeIncidentPreviewDocument(home,{version}){
 return applyApprovedIncidentDesign(home,{version})
  .replace(/<title>[^<]*<\/title>/,'<title>메인 침해사고 조사 디자인 미리보기 | 명디지털포렌식센터</title>')
  .replace('</head>','<meta name="robots" content="noindex,nofollow"></head>');
}
