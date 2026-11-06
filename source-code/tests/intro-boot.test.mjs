import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const source=await readFile(new URL('../dist/assets/intro-boot.js',import.meta.url),'utf8');
function check(path,search='',{seen=true,reduce=false,storageThrows=false}={}){
 const classes=new Set();
 runInNewContext(source,{document:{documentElement:{classList:{add:c=>classes.add(c),remove:c=>classes.delete(c)}}},location:{pathname:path,search},URLSearchParams,matchMedia:()=>({matches:reduce}),sessionStorage:{getItem:()=>{if(storageThrows)throw Error('Storage blocked');return seen?'1':null;}},window:{},setTimeout:()=>1});
 return classes;
}
for(const id of ['a','b','c'])for(const path of [`/splash-${id}`,`/splash-${id}.html`,`/splash-${id}/`])assert(check(path).has('intro-pending'),`A previously seen intro must still replay on ${path}`);
assert(!check('/').has('intro-pending'),'Ordinary repeat homepage visits should skip the intro');
assert(check('/','',{seen:false}).has('intro-pending'),'A first homepage visit should start the selected intro');
assert(check('/','?intro=1').has('intro-pending'),'An explicit replay must start on the homepage');
assert(check('/splash-b','',{reduce:true}).has('intro-pending'),'Motion reduction must retain the static preview');
assert(check('/splash-c','',{storageThrows:true}).has('intro-pending'),'Blocked storage must not prevent previews');
const held=check('/splash-a','?hold=1&embed=1');
assert(held.has('intro-hold')&&held.has('intro-pending')&&held.has('splash-embed'));
const homepage=await readFile(new URL('../dist/intro-home.html',import.meta.url),'utf8');
assert(homepage.includes('data-evolution="1"'),'The chosen intro must be rendered on the homepage');
assert(homepage.includes('data-splash-preview="false"'),'The homepage must not force preview replay on repeat visits');
assert(homepage.includes('calm-main-page calm-1'),'The homepage must use the selected C-1 main design');
assert(!homepage.includes('class="preview-toolbar')&&!homepage.includes('class="main-design-tools'),'The homepage must not show design selection controls');
console.log('Intro regression checks passed for canonical routes, .html routes, replay, reduced motion, held previews, and blocked storage.');
