import {pridePreviewSwitch} from './pride-preview-switch.mjs';
// Shared selected layout; preview metadata and comparison controls stay separate.
export function applyPrideSliderDesign(home,{version}){
 const page=home.replace(/<section\b[^>]*\bid="national-experience"[^>]*>[\s\S]*?<\/section>/,section=>section.includes('data-pride-slider')?section:section
  .replace('class="national-section home-pride"','class="national-section home-pride pride-solution-preview"')
  .replaceAll('national-cheonan-recovery.png','company/history_img_2010.jpg')
  .replaceAll('침수된 천안함 CCTV 저장장치 회로와 영상 복원을 소개한 사진','천안함 CCTV 복구에 사용된 침수·부식 저장매체 자료')
  .replace('data-national-gallery','data-pride-slider')
  .replace(/(<article\b[^>]*?) hidden/g,'$1')
  .replace('<div class="pride-gallery">','<div class="pride-gallery"><div class="pride-slide-track">')
  .replace(/<\/div>\s*<\/div><\/section>$/,'</div></div></div></section>')
  .replace('<a class="pride-company-link"','<div class="pride-slider-controls"><button type="button" data-pride-prev aria-label="이전 사례">←</button><button type="button" data-pride-next aria-label="다음 사례">→</button><span><b data-pride-count>01</b> / 05</span></div><a class="pride-company-link"'));
 if(page.includes('assets/home-pride-preview.css'))return page;
 return page.replace('</head>',`<link rel="stylesheet" href="assets/home-pride-preview.css?v=${version}"><script src="assets/home-pride-preview.js?v=${version}" defer></script></head>`);
}

export function pridePreviewDocument(home,{version}){
 return pridePreviewSwitch(applyPrideSliderDesign(home,{version})
  .replace(/<title>[^<]*<\/title>/,'<title>기술력과 신뢰 · 사례 선택형 시안 | 명디지털포렌식센터</title>')
  .replace('</head>','<meta name="robots" content="noindex,nofollow"></head>'),'a');
}
