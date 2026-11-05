const samples = {
 'digital-forensics': {
  code:'DF-SAMPLE-014', title:'업무 문서·USB 사용 흔적 검토', scope:'업무용 PC 1대 · USB 사본 1개', date:'2026.06.10–06.11',
  heading:'분석의 결론부터,<br>근거가 되는 기록까지.', description:'결과 요약, 시간 흐름과 증거 목록.<br>고객에게 전달하는 보고서의 구성을 살펴보세요.',
  findings:[['확인','USB 연결 기록과 동일한 문서','PC와 USB 사본에서 내용이 동일한 문서 1개를 확인했습니다.','E01 · E03 · E04'],['추정','연결 시간대의 문서 사용 가능성','USB 연결 이후 대상 문서를 가리키는 최근 사용 흔적이 있습니다.','E01 · E02'],['미확인','복사 방향·시점과 승인 여부','현재 자료만으로 실제 행위자나 무단 반출 여부를 확정하기 어렵습니다.','추가 자료 필요']],
  next:'파일 작업 기록·사용자 설명·반출 승인 자료 대조',
  events:[['06.10','09:12:05','USB 연결 기록','PC-014의 장치 연결 흔적','E01','기기 기록'],['06.10','09:16:42','대상 문서의 최근 사용 흔적','budget_Q3.xlsx 경로를 가리키는 기록','E02','기기 기록'],['06.11','14:25:00','PC·USB 문서 해시 일치 확인','분석 과정에서 두 파일의 SHA-256 비교','E03 · E04','분석 수행']],
  timelineNote:'해시 비교 시각은 분석 수행 시각입니다. 파일이 복사된 시각을 뜻하지 않습니다.',
  evidence:[['E01','USB 연결 기록','PC-014 · 장치 기록','장치 식별자 · 연결 시각'],['E02','문서 사용 흔적','PC-014 · 최근 사용 항목','대상 문서 경로'],['E03','PC의 대상 문서','PC 이미지 · 업무 폴더','내용 · 메타데이터 · 해시'],['E04','USB의 대상 문서','USB 사본 · 검토 폴더','E03과 SHA-256 일치']],
  evidenceNote:'해시 일치는 파일 내용의 동일성을 확인하는 근거입니다. 복사 방향이나 승인 여부를 뜻하지 않습니다.'
 },
 'incident-response': {
  code:'IR-SAMPLE-008', title:'랜섬웨어 의심 사고 조사', scope:'APP-02 · 관련 로그 · 변경 파일 표본 12개', date:'2026.05.14',
  heading:'조사 결과가,<br>다음 대응의 기준이 되도록.', description:'사고의 경위와 확인 근거, 후속 검토 사항.<br>담당자가 활용할 수 있는 결과물로 정리합니다.',
  findings:[['확인','접속·실행·파일 변경 기록','원격 로그온과 의심 프로그램 실행, 표본 12개의 내용 변경을 확인했습니다.','E01 · E02 · E03'],['추정','프로그램 실행과 파일 변경의 연관성','확보한 기록의 시간 흐름을 바탕으로 연관성을 검토합니다.','E02 · E03'],['미확인','최초 침입 경로와 전체 피해 범위','외부 자료 반출과 다른 시스템의 피해 여부는 추가 확인이 필요합니다.','추가 자료 필요']],
  next:'관련 계정 접속 이력 · 다른 서버의 흔적 · 백업 상태 검토',
  events:[['05.14','11:11:08','원격 로그온 기록','ops_admin → APP-02','E01','접속 기록'],['05.14','11:17:32','의심 프로그램 실행','services.exe → svc-update.exe','E02','실행 기록'],['05.14','11:18:09','변경 파일 생성 기록','spec.xlsx.locked 생성','E02','파일 기록'],['05.14','11:42:00','네트워크 격리 조치','운영 담당자 조치 이력','E04','대응 기록']],
  timelineNote:'시간적 연결을 보여주는 예시입니다. 접속·파일 생성 기록만으로 침입자나 자료 유출을 확정하지 않습니다.',
  evidence:[['E01','원격 로그온 기록','APP-02 · Windows Security','계정 · 접속지 · 로그온 유형'],['E02','프로세스·파일 활동','APP-02 · Sysmon','실행 파일 · 파일 생성'],['E03','변경 파일·랜섬 노트','공유 폴더 사본 · 표본 12개','원본 대비 내용 · 구조 변화'],['E04','초기 대응 기록','운영 담당자 조치 이력','격리 대상 · 조치 시각']],
  evidenceNote:'표본 분석 결과와 전체 피해 범위를 구분합니다. 자료의 출처·수집 이력·전체 해시는 실제 목록에 함께 기록합니다.'
 }
};

export function reportSamples(slug){
 const s=samples[slug];if(!s)return '';
 const pages=[['핵심 결과 요약','확인된 사실과 판단 범위'],['행위 타임라인','시간 순서로 연결한 기록'],['증거 목록','분석 근거와 자료의 출처']];
 const body=[
  `<div class="sample-findings">${s.findings.map(([state,title,copy,refs],i)=>`<article><span class="sample-status sample-status-${i}">${state}</span><div><h4>${title}</h4><p>${copy}</p><small>연결 근거 ${refs}</small></div></article>`).join('')}</div><div class="sample-next"><span>후속 검토</span><p>${s.next}</p></div>`,
  `<div class="sample-timezone">시간 기준 KST · UTC+9</div><ol class="sample-timeline">${s.events.map(([date,time,title,copy,refs,type])=>`<li><div class="sample-time"><span>${date}</span><strong>${time}</strong></div><div class="sample-event"><span>${type}</span><h4>${title}</h4><p>${copy}</p></div><small>${refs}</small></li>`).join('')}</ol><p class="sample-method-note">${s.timelineNote}</p>`,
  `<div class="sample-evidence"><table><caption>요약·타임라인과 연결되는 증거 목록</caption><thead><tr><th scope="col">증거 ID</th><th scope="col">자료 · 출처</th><th scope="col">확인 내용</th></tr></thead><tbody>${s.evidence.map(([id,name,source,detail])=>`<tr><th scope="row">${id}</th><td><strong>${name}</strong><small>${source}</small></td><td>${detail}</td></tr>`).join('')}</tbody></table></div><p class="sample-method-note">${s.evidenceNote}</p>`
 ];
 return `<section class="detail-section report-samples" id="analysis-deliverables" data-nav-theme="dark"><div class="container sample-layout" data-resource-tabs><div class="sample-introduction"><span class="detail-kicker">REPORT PREVIEW</span><h2>${s.heading}</h2><p>${s.description}</p><div class="sample-tabs" role="tablist" aria-label="보고서 예시 페이지" aria-orientation="vertical">${pages.map(([name,desc],i)=>`<button type="button" role="tab" id="sample-tab-${i}" aria-controls="sample-page-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}"><span class="sample-tab-number">0${i+1}</span><span><strong>${name}</strong><small>${desc}</small></span></button>`).join('')}</div><p class="sample-disclosure"><strong>보고서 구성 예시 · 가상 데이터</strong>사건·파일·계정·시각은 설명을 위한 예시입니다.<br>실제 결과물은 의뢰 범위와 확보 자료에 따라 달라집니다.</p></div><div class="sample-documents">${pages.map(([name],i)=>`<article class="sample-paper" role="tabpanel" id="sample-page-${i}" aria-labelledby="sample-tab-${i}" tabindex="0" ${i?'hidden':''}><header class="sample-paper-header"><span class="sample-wordmark">MDFC <small>REPORT SAMPLE</small></span><span class="sample-fiction">가상 데이터</span></header><div class="sample-paper-title"><span>${s.code}</span><h3>${name}</h3><p>${s.title}</p></div><dl class="sample-metadata"><div><dt>분석 대상</dt><dd>${s.scope}</dd></div><div><dt>검토 기간</dt><dd>${s.date}</dd></div></dl>${body[i]}<footer class="sample-paper-footer"><span>보고서 구성 예시 · 실제 사건 자료가 아닙니다.</span><span>0${i+1} / 03</span></footer></article>`).join('')}</div></div></section>`;
}
