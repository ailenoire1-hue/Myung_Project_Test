import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const read=p=>readFile(new URL(p,import.meta.url),'utf8');
const version=createHash('sha256').update((await Promise.all(['dist/assets/quote-estimate.css','dist/assets/quote-estimate.js','dist/assets/home-quote-entry.css'].map(read))).join('')).digest('hex').slice(0,12);
let html=await read('dist/index.html');
html=html.replace(/<title>[^<]*<\/title>/,'<title>서비스 예상 견적 · 모달 미리보기 | MDFC</title>');
html=html.replace('</head>','<meta name="robots" content="noindex,nofollow"></head>');
const snippet=await read('quote-estimate-snippet.html');
if(!html.includes('id="qe-dialog"')){
 html=html.replace('</head>',`<link rel="stylesheet" href="assets/quote-estimate.css?v=${version}"><script defer src="assets/quote-estimate.js?v=${version}"></script></head>`);
 html=html.replace('</body>',snippet+'</body>');
}else html=html.replace('</body>',snippet.match(/^<button class="qe-launcher"[^\n]*/)[0]+'</body>');
html=html.replace('id="qe-dialog"','id="qe-dialog" data-qe-autostart');
html=html.replace(/(assets\/(?:quote-estimate\.(?:css|js)|home-quote-entry\.css)\?v=)[a-f0-9]+/g,(_,prefix)=>prefix+version);
await writeFile(new URL('dist/quote-estimate-preview.html',import.meta.url),html,'utf8');
console.log('Created separate quote-estimate-preview.html with preview auto-open.');
