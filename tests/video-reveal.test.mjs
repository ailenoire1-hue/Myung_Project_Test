import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const source=await readFile(new URL('../dist/assets/video-home.js',import.meta.url),'utf8');
function setup({reduced=false,reject='',start=true}={}){
 const classes=()=>{const set=new Set();return {add:c=>set.add(c),remove:c=>set.delete(c),contains:c=>set.has(c)};};
 const events=()=>{const handlers=new Map();return {addEventListener:(name,fn)=>{const list=handlers.get(name)||[];list.push(fn);handlers.set(name,list);},emit:name=>(handlers.get(name)||[]).forEach(fn=>fn())};};
 const element=()=>({inert:false,attributes:new Map(),setAttribute(name,value){this.attributes.set(name,value);},removeAttribute(name){this.attributes.delete(name);}});
 const copy=element(),cue=element(),sourceTag=events();
 const frames=new Map(),timers=new Map();let id=0;
 const film={...events(),paused:true,currentTime:0,error:null,querySelectorAll:()=>[sourceTag],pause(){this.paused=true;},play(){if(reject)return Promise.reject({name:reject});if(start){this.paused=false;this.emit('playing');}return Promise.resolve();}};
 const root={classList:classes()};root.classList.add('video-entry-pending');
 const hero={classList:classes(),querySelector:s=>s==='video'?film:s==='.video-welcome-copy'?copy:cue,getBoundingClientRect:()=>({top:0,bottom:720})};
 const doc={...events(),hidden:false,documentElement:root,querySelector:s=>s==='.video-hero'?hero:{getBoundingClientRect:()=>({top:720})}};
 const ctx={document:doc,window:{mdfcVideoEntryFallback:0},innerHeight:720,matchMedia:q=>({matches:q.includes('reduce)')?reduced:true,addEventListener(){}}),addEventListener(){},requestAnimationFrame:fn=>{frames.set(++id,fn);return id;},cancelAnimationFrame:key=>frames.delete(key),setTimeout:fn=>{timers.set(++id,fn);return id;},clearTimeout:key=>timers.delete(key)};
 runInNewContext(source,ctx);
 const render=()=>{const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn());};
 return {film,copy,cue,hero,root,doc,sourceTag,advance(time){film.currentTime=time;film.emit('timeupdate');render();},render,expire(){[...timers.values()].forEach(fn=>fn());},visible:()=>[hero.classList.contains('is-copy-visible'),hero.classList.contains('is-scroll-visible')]};
}

const normal=setup();
assert.deepEqual(normal.visible(),[false,false]);
assert(normal.cue.inert,'The delayed scroll link must not receive focus');
normal.advance(2.49);assert.deepEqual(normal.visible(),[false,false]);
normal.film.pause();normal.render();assert.deepEqual(normal.visible(),[false,false],'A pause must not advance the reveal');
normal.advance(2.5);assert.deepEqual(normal.visible(),[true,false]);
assert(!normal.copy.inert&&normal.cue.inert);
normal.advance(4.49);assert.deepEqual(normal.visible(),[true,false]);
normal.advance(4.5);assert.deepEqual(normal.visible(),[true,true]);
assert(!normal.cue.inert&&!normal.root.classList.contains('video-entry-pending'));
normal.advance(0);assert.deepEqual(normal.visible(),[true,true],'Looping must not hide content again');

const blocked=setup({reject:'NotAllowedError'});await Promise.resolve();assert.deepEqual(blocked.visible(),[true,true]);
const interrupted=setup({reject:'AbortError'});await Promise.resolve();assert.deepEqual(interrupted.visible(),[false,false],'An intentional play interruption must not reveal early');
interrupted.sourceTag.emit('error');assert.deepEqual(interrupted.visible(),[true,true]);
const unloaded=setup({start:false});unloaded.expire();assert.deepEqual(unloaded.visible(),[true,true],'An unavailable video must not hide navigation indefinitely');
const reduced=setup({reduced:true});assert.deepEqual(reduced.visible(),[true,true]);assert(reduced.film.paused);
console.log('Video timing, pause, loop, autoplay failure, source error, loading fallback and reduced motion checks passed.');
