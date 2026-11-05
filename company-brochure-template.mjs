import {readFile,writeFile,mkdir,copyFile,access} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {companyBranches} from './company-data.mjs';
import {legalPartners} from './company-experience.mjs';

const require=createRequire(import.meta.url);
const playwright=require('C:/Users/DG-KIM/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const references=new URL('../reference-review-law/',import.meta.url);
const babel=require(fileURLToPath(new URL('./resource-53.js',references)));
const root=fileURLToPath(new URL('./',import.meta.url));
const work=new URL('./.sites-runtime/brochure-template/',import.meta.url);
await mkdir(work,{recursive:true});
// Keep the first version recoverable while replacing the user's current preview address.
const previous=new URL('./.sites-runtime/brochure-template/previous-16-page-design.html',import.meta.url);
try{await access(previous);}catch{try{await copyFile(new URL('./dist/company-brochure.html',import.meta.url),previous);}catch{}}
execFileSync('python',[fileURLToPath(new URL('./brochure-assets.py',import.meta.url))],{cwd:root,stdio:'inherit'});
const assets=JSON.parse(await readFile(new URL('./.sites-runtime/brochure/assets.json',import.meta.url),'utf8'));
const {patents,branchPhotos=[],insights}=JSON.parse(await readFile(new URL('./company-profile-data.json',import.meta.url),'utf8'));
const font=(await readFile(new URL('./resource-60.woff2',references))).toString('base64');
const fontStyle=`@font-face{font-family:'SUIT';font-style:normal;font-weight:100 900;src:url(data:font/woff2;base64,${font}) format('woff2-variations');font-display:block}:root{--domestic-partner-image:url(${assets.domestic})}*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:'SUIT',sans-serif;background:#fff;word-break:keep-all;color:#0A1628}h1,h2,h3,h4,p,figure{margin:0}a,button,select{font-family:inherit}a:focus-visible,button:focus-visible,select:focus-visible{outline:3px solid #2563EB;outline-offset:4px}`;
const primitives=await readFile(new URL('./company-profile-primitives.jsx',import.meta.url),'utf8');
const source=await readFile(new URL('./company-profile-template.jsx',import.meta.url),'utf8');
const total=Number(source.match(/const PROFILE_TOTAL=(\d+)/)?.[1]);
if(!Number.isInteger(total)||total<1)throw new Error('Invalid company profile page count');
const compiled=babel.transform(primitives+'\n'+source,{presets:['react'],comments:false}).code;
const react=await readFile(new URL('./resource-51.js',references),'utf8');
const reactDOM=await readFile(new URL('./resource-52.js',references),'utf8');
const inline=s=>s.replace(/<\/script/gi,'<\\/script');
const sections=Array.from({length:total},(_,i)=>`<section id="p${String(i+1).padStart(2,'0')}" style="width:1920px;height:1080px;position:relative;overflow:hidden"></section>`).join('');
const draft=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>${fontStyle}</style></head><body><main id="render-root">${sections}</main><script>${inline(react)}</script><script>${inline(reactDOM)}</script><script>window.PROFILE_ASSETS=${JSON.stringify(assets)};window.PROFILE_DATA=${JSON.stringify({branches:companyBranches,legal:legalPartners,patents,branchPhotos,insights})};</script><script>${inline(compiled)}</script></body></html>`;
const draftPath=new URL('./render-source.html',work);
await writeFile(draftPath,draft,'utf8');
const browser=await playwright.chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
let rendered,labels;
try{
 const page=await browser.newPage({viewport:{width:1920,height:1080}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(fileURLToPath(draftPath)).href,{waitUntil:'load'});
 await page.waitForSelector(`#p${String(total).padStart(2,'0')} [data-screen-label]`,{state:'attached'});
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>Promise.all([...document.images].map(img=>img.decode().catch(()=>null))));
 if(errors.length)throw new Error(errors.join('\n'));
 rendered=await page.locator('#render-root').evaluate(root=>root.innerHTML);
 labels=await page.locator('#render-root [data-screen-label]').evaluateAll(nodes=>nodes.map(node=>node.dataset.screenLabel));
 if(labels.length!==total)throw new Error('Company profile page list does not match declared total');
}finally{await browser.close();}
const deck=await readFile(new URL('./resource-54.js',references),'utf8');
const controls=`<nav class="profile-tools" aria-label="소개서 도구"><select id="page-select" aria-label="페이지 선택">${labels.map((t,i)=>`<option value="${i}">${String(i+1).padStart(2,'0')}. ${t}</option>`).join('')}</select><button id="fullscreen-profile" type="button" aria-pressed="false" aria-keyshortcuts="F" title="전체화면 (F) · Esc로 종료"><svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3H3v4M13 3h4v4M3 13v4h4M17 13v4h-4"/></svg><span>전체화면</span></button><button id="print-profile" type="button">인쇄 / PDF</button></nav><p id="profile-status" role="status" aria-live="polite"></p>`;
const toolsStyle=`.profile-tools{position:fixed;right:16px;top:10px;max-width:calc(100vw - 32px);z-index:2147483500;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px;opacity:0;transition:opacity .2s}.profile-tools.visible,.profile-tools:hover,.profile-tools:focus-within{opacity:1}.profile-tools select,.profile-tools button{font:600 12px/1.3 'SUIT',sans-serif;border:1px solid #E8ECF2;border-radius:6px;background:#fffffff5;color:#4A5A73;padding:8px 10px}.profile-tools select{max-width:100%;min-width:0}.profile-tools button{color:#2563EB;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}.profile-tools button[aria-pressed="true"]{background:#2456C4;border-color:#2456C4;color:#fff}.profile-tools button:disabled{cursor:wait;opacity:.65}#profile-status{position:fixed;z-index:2147483501;top:58px;right:16px;max-width:min(360px,calc(100vw - 32px));padding:12px 16px;border:1px solid #DCE2E9;border-radius:8px;background:#fff;color:#1C2C42;box-shadow:0 4px 18px #1c2c4214;font:500 14px/1.6 'SUIT',sans-serif}#profile-status:empty{display:none}@media(max-width:540px){#profile-status{top:94px}}@media print{.profile-tools,#profile-status{display:none!important}}@media(prefers-reduced-motion:reduce){.profile-tools{transition:none}}`;
const behavior=`
const stage=document.querySelector('deck-stage');
const picker=document.getElementById('page-select');
const tools=document.querySelector('.profile-tools');
const fullscreenButton=document.getElementById('fullscreen-profile');
const statusMessage=document.getElementById('profile-status');
let hideTimer,statusTimer,fullscreenPending=false;
function reveal(){tools.classList.add('visible');clearTimeout(hideTimer);hideTimer=setTimeout(()=>tools.classList.remove('visible'),2200);}
function reportFullscreenError(message){clearTimeout(statusTimer);statusMessage.textContent=message;statusTimer=setTimeout(()=>{statusMessage.textContent='';},7000);reveal();}
function syncFullscreen(){
  const active=Boolean(document.fullscreenElement);
  fullscreenButton.setAttribute('aria-pressed',String(active));
  fullscreenButton.querySelector('span').textContent=active?'전체화면 종료':'전체화면';
  fullscreenButton.title=active?'전체화면 종료 (F 또는 Esc)':'전체화면 (F) · Esc로 종료';
  fullscreenButton.querySelector('path').setAttribute('d',active?'M3 7h4V3M17 7h-4V3M7 17v-4H3M13 17v-4h4':'M7 3H3v4M13 3h4v4M3 13v4h4M17 13v4h-4');
  reveal();
  requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));
}
async function toggleFullscreen(){
  if(fullscreenPending)return;
  if(!document.fullscreenElement&&(!document.documentElement.requestFullscreen||!document.fullscreenEnabled)){
    reportFullscreenError('이 브라우저에서는 전체화면을 사용할 수 없습니다. HTML 파일을 Chrome 또는 Edge에서 열어주세요.');return;
  }
  fullscreenPending=true;fullscreenButton.disabled=true;clearTimeout(statusTimer);statusMessage.textContent='';
  try{
    if(document.fullscreenElement)await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  }catch(error){reportFullscreenError('전체화면을 열 수 없습니다. HTML 파일을 Chrome 또는 Edge에서 열어 다시 시도해 주세요.');}
  finally{fullscreenPending=false;fullscreenButton.disabled=false;syncFullscreen();}
}
fullscreenButton.addEventListener('click',toggleFullscreen);
// Keep Space on a focused toolbar button from advancing the slide.
tools.addEventListener('keydown',e=>{if(e.key===' '&&e.target.closest('button'))e.stopPropagation();});
document.addEventListener('fullscreenchange',syncFullscreen);
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&document.fullscreenElement){e.preventDefault();toggleFullscreen();return;}
  if(e.defaultPrevented||e.repeat||e.isComposing||e.ctrlKey||e.altKey||e.metaKey)return;
  if(e.target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])'))return;
  if(e.code==='KeyF'){e.preventDefault();toggleFullscreen();}
});
document.addEventListener('mousemove',reveal);
document.addEventListener('keydown',reveal);
document.addEventListener('touchstart',reveal,{passive:true});
picker.addEventListener('change',()=>stage.goTo(Number(picker.value)));
stage.addEventListener('slidechange',e=>{picker.value=String(e.detail.index);reveal();});
document.getElementById('print-profile').addEventListener('click',()=>window.print());
document.addEventListener('click',e=>{const link=e.target.closest('[data-goto]');if(link){e.preventDefault();stage.goTo(Number(link.dataset.goto));}});
picker.value=String(stage.index);syncFullscreen();
`;
const html=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>㈜명정보기술 회사소개서 | 2026</title><meta name="description" content="명정보기술 회사 소개, 디지털포렌식센터 소개, 서비스 소개. 주요 연혁과 특허·인증, 국가적 디지털재난 대응, 분석 환경, 교육·협력 및 주요 기술 서비스."><style>${fontStyle}${toolsStyle}</style></head><body>${controls}<deck-stage width="1920" height="1080">${rendered}</deck-stage><script>${inline(deck)}</script><script>${behavior}</script></body></html>`;
await writeFile(new URL('./dist/company-brochure.html',import.meta.url),html,'utf8');
await writeFile(new URL('../명정보기술_회사소개서.html',import.meta.url),html,'utf8');
await writeFile(new URL('./dist/company-brochure-template.html',import.meta.url),html,'utf8');
console.log(`Template company profile: ${labels.length} pages, ${Buffer.byteLength(html).toLocaleString()} bytes.`);
