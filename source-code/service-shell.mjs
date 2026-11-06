import {enterpriseChapters} from './service-design.mjs';
import {processFlow} from './detail-process.mjs';
import {servicePages,serviceDetails} from './service-details.mjs';
import {reportResources} from './service-resources.mjs';
import {forensicAnalysis} from './forensic-fields.mjs';
import {incidentPage} from './incident-page.mjs';
const list=items=>`<ul class="detail-clean-list">${items.map(t=>`<li>${t}</li>`).join('')}</ul>`;
const heading=(label,title,description='')=>`<header class="detail-section-heading"><span class="detail-kicker">${label}</span><h2>${title.replace(/\n/g,'<br>')}</h2>${description?`<p>${description}</p>`:''}</header>`;
const jumps=items=>`<div class="detail-jumps"><nav class="container" aria-label="페이지 내 메뉴">${items.map(t=>`<a href="#${t[0]}">${t[1]}</a>`).join('')}</nav></div>`;
export function serviceShell({service:s,pageHero,services}){
 const page=servicePages[s.slug],forensic=s.slug==='digital-forensics',enterprise=s.slug==='enterprise-security';
 if(s.slug==='incident-response')return incidentPage({service:s,page,pageHero,services});
 const links=forensic?[['analysis-fields','분석 분야'],['process','진행 절차'],['analysis-deliverables','분석 결과물'],['questions','자주 묻는 질문']]:[...s.items.map(t=>[t.id,t.name]),['process','진행 절차'],['questions','자주 묻는 질문']];
 const body=forensic?forensicAnalysis():enterpriseChapters(s);
 return `${pageHero(s.name,page.title,page.summary,s.image)}${jumps(links)}${body}${processFlow(s.slug)}${reportResources(s.slug)}<section class="detail-section" id="questions"><div class="container detail-faq-layout"><header><span class="detail-kicker">BEFORE YOU START</span><h2>상담 전,<br>궁금한 내용을 확인하세요.</h2><p>의뢰 목적과 환경을 알려주시면<br>필요한 범위를 함께 정리합니다.</p></header><div class="detail-faq">${page.faqs.map(t=>`<details><summary>${t[0]}<span aria-hidden="true">+</span></summary><p>${t[1]}</p></details>`).join('')}</div></div></section>`;
}
