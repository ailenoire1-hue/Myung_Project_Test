import {readFileSync} from 'node:fs';
import {companyBranches} from './company-data.mjs';

// Geographic outlines: Natural Earth, public domain. Coordinates use the same
// Mercator projection for the coastline and the official branch locations.
const geography=JSON.parse(readFileSync(new URL('./korea-map-data.json',import.meta.url),'utf8'));
const projection=geography.projection;
const point=b=>({
 x:90+projection.offsetX+(Number(b.map_lon)*Math.PI/180-projection.minX)*projection.scale,
 y:projection.offsetY+(projection.maxY-Math.log(Math.tan(Math.PI/4+Number(b.map_lat)*Math.PI/360)))*projection.scale
});
const positions={1:[354,442],6:[354,512],7:[445,575],8:[458,648],9:[148,594]};
const capital=companyBranches.filter(b=>[2,3,4,5].includes(b.no));
const regional=companyBranches.filter(b=>positions[b.no]);
const link=(b,extra='')=>`<a href="#branch-${b.no}" data-branch-link="${b.no}" aria-label="${b.name} 주소와 연락처 보기" ${extra}>${b.name}</a>`;

export function companyNetworkMap(){
 return `<figure class="company-network-map" aria-label="명정보기술 전국 직영 접수망 지도">
  <div class="company-map-canvas">
   <svg viewBox="0 0 620 720" aria-hidden="true" focusable="false">
    <g transform="translate(90 0)"><path class="company-map-north" d="${geography.paths.PRK}"/><path class="company-map-south" d="${geography.paths.KOR}"/></g>
    <path class="company-map-capital-leader" d="M204 320 H248 L294 410"/>
    ${regional.map(b=>{const p=point(b),[x,y]=positions[b.no];return `<path class="company-map-leader" d="M${p.x.toFixed(2)} ${p.y.toFixed(2)} L${x-9} ${y}"/>`;}).join('')}
    ${companyBranches.map(b=>{const p=point(b);return `<g class="company-map-point ${b.no===1?'is-headquarters':''}" data-map-point="${b.no}"><circle class="company-map-halo" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${b.no===1?15:9}"/><circle class="company-map-dot" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${b.no===1?5:3.7}"/></g>`;}).join('')}
   </svg>
   <div class="company-map-capital"><span>수도권 <small>4개 지점</small></span><div>${capital.map(b=>link(b)).join('')}</div></div>
   ${regional.map(b=>{const [x,y]=positions[b.no];return link(b,`class="company-map-label ${b.no===1?'is-headquarters':''}" style="--map-x:${x/620*100}%;--map-y:${y/720*100}%"`);}).join('')}
  </div>
  <figcaption><span class="company-map-legend"><i></i>청주 본사 <i></i>8개 지점</span><span>지점명을 선택하면 주소와 연락처를 확인할 수 있습니다.</span></figcaption>
 </figure>`;
}
