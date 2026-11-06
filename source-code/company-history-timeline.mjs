// Curated milestones from company-data.mjs, shown in chronological order.
const milestones=[
 {year:'1990',title:'명정보기술 설립',description:'하드디스크 수리·데이터복구\n기술 기반 마련',era:'foundation'},
 {year:'2003',title:'오창 본사·클린룸',description:'본사 사옥 이전 및\n전문 복구 시설 운영',era:'foundation'},
 {year:'2010',title:'천안함 CCTV 복원',description:'침수된 저장매체의\nCCTV 영상 데이터 복구',era:'response'},
 {year:'2013',title:'3·20 전산대란 복구',description:'농협·KBS·MBC 등\n피해 데이터복구 수행',era:'response'},
 {year:'2014',title:'세월호 CCTV 복원',description:'CCTV 영상 데이터 및\n창원 버스 블랙박스 복구',era:'response'},
 {year:'2015',title:'CCTV 복구방법 특허',description:'영상 인덱스·매칭 스캔 기반\n영상 데이터 복구 기술',era:'expansion'},
 {year:'2019',title:'CSM 포렌식센터 구축',description:'말레이시아 사이버보안청\n보안관제·복구 인프라 협력',era:'expansion'},
 {year:'2024',title:'법률 전문가와의 협력',description:'전북·제주 지방변호사회\n디지털포렌식 업무협약',era:'expansion'}
];
export function companyHistoryTimeline(){
 return `<div class="company-journey"><ol class="company-journey-line" aria-label="명정보기술 핵심 연혁">${milestones.map(item=>`<li class="journey-milestone journey-${item.era}"><span class="journey-node" aria-hidden="true"></span><div class="journey-record"><time datetime="${item.year}">${item.year}</time><h3>${item.title}</h3><p>${item.description.replace('\n','<br>')}</p></div></li>`).join('')}</ol><div class="company-journey-eras" aria-hidden="true"><span>기술 기반과 분석 인프라</span><span>국가적 사고 대응</span><span>기술 고도화와 전문 협력</span></div></div>`;
}
