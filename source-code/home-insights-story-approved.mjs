// Apply only the approved plan-2 Insights chapter to the existing homepage.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {renderSituationHome} from './marketing-situation-home.mjs';

const read=path=>readFile(new URL(path,import.meta.url),'utf8');
const channels=`<nav class="cs-head-ch" aria-label="인사이트 채널"><span class="cs-head-label">MDFC CHANNELS</span><div><a class="cs-hc cs-hc-b" href="https://blog.naver.com/myungit2" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">N</span>네이버 블로그</a><a class="cs-hc cs-hc-y" href="https://www.youtube.com/channel/UC7P1LyBxStJkKxAb_yx5DKw" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span>유튜브</a><a class="cs-hc cs-hc-n" href="newsletter-preview.html"><span aria-hidden="true">✉</span>보안 뉴스레터</a><a class="cs-hc cs-hc-a" href="insights-preview.html"><span aria-hidden="true">↗</span>MDFC 스토리 전체 보기</a></div></nav>`;

export function renderApprovedStory(data){
 return renderSituationHome(data)
  .replace('data-situation-insights','data-situation-insights data-approved-story')
  .replace('class="ms-heading"','class="ms-heading cs-head-split"')
  .replace('MDFC INSIGHTS','MDFC STORY')
  .replace('지금 겪고 있는 일, 먼저 읽어 보세요.','현장에서 쌓은 경험, 꼭 필요한 정보로 전합니다.')
  .replace('상황을 선택하면 관련 글·영상과 서비스를 함께 보여 드립니다.','36년간 데이터 현장의 노하우를 상황별 글과 영상으로 전합니다.')
  .replace('</header>',channels+'</header>')
  .replace('상황별 추천 콘텐츠 <span>03</span>','<span class="cs-picked">자료 유출·증거가 궁금해요</span> · 추천 스토리 <span>03</span>')
  .replace(/<a class="ms-all-link"[\s\S]*?<\/a>/,'')
  .replaceAll('인사이트 · 기획 예시','MDFC STORY · 기획 예시')
  .replace(/(<strong class="ms-card-title">)([\s\S]*?)(<\/strong>)/g,(_,start,title,end)=>start+title.replace(/\s*,{2,}\s*/g,'… ')+end);
}

export function applyApprovedStoryDocument(html,data,player,version){
 html=html.replace(/<!--APPROVED_STORY_(ASSETS|PLAYER|NAV)_START-->[\s\S]*?<!--APPROVED_STORY_\1_END-->/g,'');
 const marker=html.indexOf('id="home-insights"');
 const start=html.lastIndexOf('<section',marker);
 const end=html.indexOf('<section class="contact-band',marker);
 if(marker<0||start<0||end<marker)throw new Error('Homepage Insights chapter boundary not found');
 html=html.slice(0,start)+renderApprovedStory(data)+html.slice(end);
 const assets=`<!--APPROVED_STORY_ASSETS_START--><link rel="stylesheet" href="assets/marketing-channels.css?v=${version}"><link rel="stylesheet" href="assets/home-insights-story.css?v=${version}"><script defer src="assets/marketing-channels.js?v=${version}"></script><script defer src="assets/home-insights-story.js?v=${version}"></script><!--APPROVED_STORY_ASSETS_END-->`;
 html=html.replace('</head>',assets+'</head>');
 const contact='<button class="button nav-contact" data-contact>';
 if(!html.includes(contact))throw new Error('Homepage contact navigation not found');
 html=html.replace(contact,'<!--APPROVED_STORY_NAV_START--><a class="cs-nav-story" href="insights-preview.html">MDFC STORY</a><!--APPROVED_STORY_NAV_END-->'+contact);
 return html.replace('</body>','<!--APPROVED_STORY_PLAYER_START-->'+player+'<!--APPROVED_STORY_PLAYER_END--></body>');
}

export async function writeApprovedStoryHome(){
 const files=['dist/assets/home-insights-story.css','dist/assets/home-insights-story.js','dist/assets/marketing-channels.css','dist/assets/marketing-channels.js','marketing-situation-home.mjs','home-insights-story-approved.mjs'];
 const version=createHash('sha256').update((await Promise.all(files.map(read))).join('')).digest('hex').slice(0,12);
 const html=applyApprovedStoryDocument(await read('dist/index.html'),JSON.parse(await read('insights-content.json')),await read('marketing-channel-player.html'),version);
 await writeFile(new URL('dist/index.html',import.meta.url),html,'utf8');
}

if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url)await writeApprovedStoryHome();
