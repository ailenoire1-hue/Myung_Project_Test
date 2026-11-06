const icons=[
 '<path d="M8 5h16v22H8zM12 11h8M12 16h8M12 21h5"/><path d="m21 25 3 3 5-6"/>',
 '<path d="M5 10h22v16H5zM9 6h14v4M9 15h14M16 15v7m-3-3 3 3 3-3"/>',
 '<circle cx="14" cy="14" r="8"/><path d="m20 20 7 7M10 15l3 3 5-7"/>',
 '<path d="M7 4h13l5 5v19H7zM20 4v6h5M11 15h10M11 20h10M11 24h6"/>'
];
const labels={
 'digital-forensics':[['상담·범위 확인','대상 기기와 확인할 쟁점 협의','분석 범위 · 일정'],['자료 수집·보존','기기 상태 확인과 출처 기록','보존 사본 · 수집 이력'],['분석·교차 확인','여러 기록을 연결해 사실 확인','주요 행위 · 확인 근거'],['결과 설명','분석 결과와 확인 한계 안내','보고서 · 후속 검토']],
 'incident-response':[['상황 파악','증상과 영향받은 시스템 확인','조사 범위 · 우선순위'],['자료 확보·조사','로그와 시스템 흔적 연결','보존 자료 · 사고 흐름'],['영향·대응 검토','침해 범위와 잔존 위험 확인','조치 · 복구 검토'],['결과 보고','사고 경위와 개선 과제 설명','보고서 · 개선 권고']],
 'enterprise-security':[['업무 환경 확인','자산·계정과 운영 체계 확인','관리 목적 · 대상'],['요구사항 검토','위험 요소와 연계 조건 검토','개선 항목 · 도입 조건'],['범위 협의·수행','일정과 구축·지원 범위 협의','점검 · 관리 · 구축'],['운영 인계','결과 설명과 운영 절차 안내','운영 자료 · 관리 계획']]
};
export function processFlow(slug){const steps=labels[slug];return `<section class="detail-process-chapter" id="process" data-detail-chapter><div class="container"><header class="detail-chapter-heading"><span class="detail-kicker">HOW WE WORK</span><h2>${slug==='digital-forensics'?'상담부터 결과 설명까지,':slug==='incident-response'?'상황 파악부터 결과 보고까지,':'환경 점검부터 운영 인계까지,'}<br>진행 과정을 한눈에.</h2></header><ol class="service-process-flow" aria-label="서비스 진행 순서">${steps.map(([title,copy,output],i)=>`<li><div class="process-node"><span class="process-step">0${i+1}</span><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[i]}</svg></div><h3>${title}</h3><p>${copy}</p><span class="process-output">${output}</span></li>`).join('')}</ol><p class="process-footnote">대상과 접근 권한, 자료 확보 조건에 따라 세부 범위와 일정을 협의합니다.</p></div></section>`;}
