// Adapted from S15_StorageIntro and S17_CaseStorageLeak in the user-provided proposal.
// The source's conflicting aggregate counts (1,959 / 1,939 / 1,652) are not reused.
const storageDeviceArt = {
  laptop: '<rect x="28" y="14" width="144" height="90" rx="6" fill="#0A1628"/><rect x="34" y="20" width="132" height="78" rx="3" fill="#1B2334"/><g opacity=".45"><rect x="42" y="30" width="44" height="4" rx="2" fill="#60A5FA"/><rect x="42" y="40" width="80" height="3" rx="1.5" fill="#8B99AE"/><rect x="42" y="48" width="60" height="3" rx="1.5" fill="#8B99AE"/><rect x="42" y="60" width="90" height="24" rx="3" fill="#2C3647"/></g><path d="M14 104h172l-4 18q-2 6-10 6H28q-8 0-10-6Z" fill="#C7CCD6"/><rect x="82" y="104" width="36" height="4" rx="2" fill="#8B99AE"/>',
  desktop: '<rect x="12" y="14" width="46" height="110" rx="4" fill="#0A1628"/><rect x="18" y="22" width="34" height="20" rx="2" fill="#1B2334"/><circle cx="23" cy="52" r="2" fill="#2563EB"/><rect x="28" y="50" width="22" height="2" rx="1" fill="#4A5A73"/><path d="M20 60h30M20 66h30M20 72h30" stroke="#4A5A73" stroke-width="1.5"/><rect x="20" y="100" width="30" height="18" rx="2" fill="#1B2334"/><rect x="68" y="18" width="120" height="82" rx="4" fill="#0A1628"/><rect x="74" y="24" width="108" height="70" rx="2" fill="#1B2334"/><g opacity=".5"><rect x="82" y="32" width="40" height="3" rx="1.5" fill="#60A5FA"/><rect x="82" y="42" width="70" height="2.5" rx="1.25" fill="#8B99AE"/><rect x="82" y="50" width="55" height="2.5" rx="1.25" fill="#8B99AE"/></g><rect x="118" y="100" width="20" height="8" fill="#0A1628"/><rect x="100" y="108" width="56" height="4" rx="2" fill="#8B99AE"/>',
  hdd: '<rect x="26" y="26" width="148" height="88" rx="4" fill="#C7CCD6" stroke="#8B99AE" stroke-width="1.5"/><rect x="30" y="30" width="140" height="80" rx="2" fill="#E8ECF2"/><circle cx="86" cy="70" r="30" fill="#4A5A73"/><g fill="none" stroke="#2C3647" stroke-width=".5"><circle cx="86" cy="70" r="28"/><circle cx="86" cy="70" r="22"/><circle cx="86" cy="70" r="16"/></g><circle cx="86" cy="70" r="5" fill="#8B99AE"/><circle cx="86" cy="70" r="1.5" fill="#0A1628"/><path d="m160 40-70 32 4 6 68-32Z" fill="#8B99AE"/><circle cx="160" cy="40" r="5" fill="#4A5A73"/><circle cx="92" cy="75" r="3" fill="#2C3647"/><g fill="#8B99AE"><circle cx="34" cy="34" r="2.5"/><circle cx="166" cy="34" r="2.5"/><circle cx="34" cy="106" r="2.5"/><circle cx="166" cy="106" r="2.5"/></g><rect x="122" y="82" width="40" height="20" rx="2" fill="#fff" stroke="#8B99AE" stroke-width=".5"/><path d="M126 88h22M126 93h32M126 98h16" stroke="#A7AFBD" stroke-width="2"/>',
  usb: '<rect x="20" y="52" width="30" height="36" rx="3" fill="#8B99AE"/><rect x="24" y="56" width="22" height="28" rx="2" fill="#C7CCD6"/><rect x="50" y="58" width="28" height="24" fill="#E8ECF2" stroke="#8B99AE"/><rect x="54" y="62" width="6" height="4" fill="#8B99AE"/><rect x="64" y="62" width="10" height="4" fill="#8B99AE"/><rect x="54" y="74" width="20" height="4" fill="#8B99AE"/><rect x="78" y="46" width="102" height="48" rx="6" fill="#0A1628"/><rect x="82" y="50" width="94" height="40" rx="4" fill="#1B2334"/><circle cx="168" cy="70" r="2.5" fill="#2563EB"/><rect x="92" y="58" width="64" height="24" rx="2" fill="#0A1628"/><text x="124" y="74" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="#60A5FA" font-weight="700" letter-spacing="2">USB</text><circle cx="186" cy="70" r="4" fill="none" stroke="#8B99AE" stroke-width="1.5"/>'
};

const storageChecks = [
  ['무결성 검증','해시값 기반 검증'],
  ['적법한 수집','의뢰 권한·범위 확인'],
  ['외부 유출 정황','연결 이력·파일 대조'],
  ['삭제 데이터','목록·복원 가능성 검토'],
  ['근무 외 활동','사용 시각·활동 확인'],
  ['재현성','분석 과정·결과 기록']
];

const connectionRecords = [
  ['D-30','09:12','SanDisk Ultra 32GB','1시간 24분','',false],
  ['D-27','18:47','Samsung BAR+ 64GB','2시간 08분','',false],
  ['D-22','11:03','SanDisk Ultra 32GB','3시간 17분','',false],
  ['D-16','20:15','WD Passport 1TB','4시간 42분','610MB',true],
  ['D-09','21:33','WD Passport 1TB','5시간 21분','1.2GB',true],
  ['D-04','19:58','Samsung T7 500GB','6시간 08분','2.1GB',true],
  ['D-01','17:22','WD Passport 1TB','7시간 14분','3.4GB',true]
];

function deviceIllustration(type,label) {
  return `<div class="lp-storage-device"><svg viewBox="0 0 200 140" aria-hidden="true" focusable="false">${storageDeviceArt[type]}</svg><span>${label}</span></div>`;
}

function connectionTable() {
  return `<div class="lp-storage-log-table"><table><caption class="lp-storage-sr-only">분석 사례 예시의 USB 연결 기록. 식별정보는 익명화했습니다. D는 퇴사일을 뜻하며 7개 기록을 표시합니다.</caption><thead><tr><th scope="col">퇴사일 기준</th><th scope="col">시각</th><th scope="col">저장매체</th><th scope="col">지속 시간·자료 크기</th></tr></thead><tbody>${connectionRecords.map(([day,time,device,duration,size,highlight]) => `<tr${highlight?' class="lp-storage-log-highlight"':''}><th scope="row">${day}</th><td>${time}</td><td>${highlight?'<span class="lp-storage-log-dot" aria-hidden="true"></span>':''}${device}</td><td>${duration}${size?`<span class="lp-storage-log-size">${size}</span>`:''}</td></tr>`).join('')}</tbody></table></div>`;
}

export function proposalStorageSection() {
  return `<section class="lp-service lp-storage" id="data-leakage" aria-labelledby="lp-storage-title"><div class="dp-frame">
    <header class="lp-storage-heading"><span class="lp-storage-kicker">01 / 자료 유출 조사</span><h2 id="lp-storage-title">노트북, 데스크탑, 서버 등 저장장치 포렌식</h2></header>
    <div class="lp-storage-overview"><div class="lp-storage-overview-copy"><p>운영체제가 설치된 저장매체의 데이터를 수집·분석해<br class="lp-storage-desktop-break"> 사건과 관련된 자료를 확보하고 사실관계를 확인합니다.</p><div class="lp-storage-scope">운영체제가 설치되지 않은 저장매체는 확인 가능한 범위가 제한될 수 있습니다.</div><div class="lp-storage-devices" aria-label="분석 대상 저장장치">${[['laptop','노트북'],['desktop','데스크탑'],['hdd','하드디스크'],['usb','USB']].map(([type,label]) => deviceIllustration(type,label)).join('')}</div></div><dl class="lp-storage-checks">${storageChecks.map(([label,value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl></div>
    <article class="lp-storage-case" id="data-leakage-analysis" aria-labelledby="lp-storage-case-title"><header class="lp-storage-case-heading"><p><span>CASE 01</span> 노트북에서 USB를 통한 자료 유출 조사</p><h3 id="lp-storage-case-title">퇴사 전후의 기록에서<br><em>외부 매체와 자료의 관계</em>를 살펴봅니다.</h3></header>
      <div class="lp-storage-paper"><header class="lp-storage-paper-heading"><div><span>USB CONNECTION LOG</span><h4>퇴사 직전 30일간 외부 저장매체 연결 증가</h4></div><div class="lp-storage-paper-meta"><span>분석 대상 · 노트북 HDD</span><span>검토 기간 · D-90 ~ 퇴사일</span></div><span class="lp-storage-paper-stamp">사례 기록</span></header>
        <div class="lp-storage-log-layout"><aside class="lp-storage-log-summary" aria-label="제안서 사례의 외부 저장매체 연결 요약"><div class="lp-storage-log-total"><span>퇴사 직전 30일</span><strong>20<small>회</small></strong><p>외부 저장매체 연결</p></div><div class="lp-storage-log-baseline"><span>이전 기간 · D-90 ~ D-31</span><strong>평시 주 1회 미만</strong></div><div class="lp-storage-log-finding"><span>주요 검토 구간</span><strong>D-30 이후<br>연결 빈도의 변화</strong></div></aside>${connectionTable()}</div>
        <footer class="lp-storage-paper-note"><span>분석 사례 예시 · 식별정보 익명화</span><p>장치 연결 이력과 확보한 파일을 함께 대조합니다.</p></footer>
      </div>
      <div class="lp-storage-case-bottom"><div class="lp-storage-filetypes"><div class="lp-storage-bottom-heading"><span>관련 자료</span><h4>확인한 파일 유형</h4></div><div class="lp-storage-type-strip" aria-hidden="true"><span></span><span></span><span></span><span></span></div><ul>${[['.xlsx / .csv','영업·고객 자료'],['.pdf / .hwp','문서'],['.pptx','제안서'],['기타','압축·이미지 파일']].map(([extension,label],index) => `<li><i class="lp-storage-file-dot lp-storage-file-dot-${index}" aria-hidden="true"></i><strong>${extension}</strong><span>${label}</span></li>`).join('')}</ul></div><div class="lp-storage-case-result"><span>분석 의견</span><h4>연결 이력과 데이터 목록을<br>유출 정황 검토의 근거로.</h4><p>외부 매체 사용 시점과 관련 자료를 대조하고,<br class="lp-storage-desktop-break"> 확인된 내용과 판단 범위를 보고서에 정리합니다.</p></div></div>
      <p class="lp-storage-case-limit">USB 연결 기록만으로 자료 유출을 단정하지 않습니다. 실제 파일과 관련 기록을 함께 확인합니다.</p>
    </article>
  </div></section>`;
}
