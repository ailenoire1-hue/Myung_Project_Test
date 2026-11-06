(() => {
  'use strict';
  const dialog = document.getElementById('mp-quote-dialog');
  if (!dialog || dialog.dataset.mqReady) return;
  dialog.dataset.mqReady = 'true';
  const $ = selector => dialog.querySelector(selector);
  const $$ = selector => [...dialog.querySelectorAll(selector)];
  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const svg = paths => `<svg viewBox="0 0 32 32" aria-hidden="true">${paths}</svg>`;
  const services = {
    forensics: {
      title: '디지털포렌식', english: 'DIGITAL FORENSICS',
      icon: svg('<circle cx="14" cy="14" r="8"/><path d="m20 20 8 8M10 14h8M14 10v8"/>'),
      topics: ['leak', 'mobile', 'media']
    },
    incident: {
      title: '침해사고 조사', english: 'INCIDENT RESPONSE',
      icon: svg('<path d="m16 3 11 4v8c0 7-11 14-11 14S5 22 5 15V7Z"/><path d="M16 10v8M16 22h.01"/>'),
      topics: ['ransomware', 'email', 'personal']
    },
    enterprise: {
      title: '기업보안관리', english: 'ENTERPRISE SECURITY',
      icon: svg('<rect x="4" y="5" width="24" height="9" rx="2"/><rect x="4" y="18" width="24" height="9" rx="2"/><path d="M9 9.5h.01M9 22.5h.01M17 9.5h6M17 22.5h6"/>'),
      topics: ['remote', 'offboarding', 'solutions']
    }
  };
  const topics = {
    leak: {
      title: '정보 유출 흔적 확인', description: 'PC·저장매체의 파일 이용과 전송 관련 흔적',
      targets: ['업무용 PC·노트북', 'USB·외장 저장장치', 'PC와 저장장치 함께'],
      purposes: ['자료 이용·전송 관련 행위 확인', '특정 기간의 행위 타임라인 정리', '확보한 기록의 의미와 분석 범위 검토'],
      scope: ['관심 자료·기간을 정하고 관련 기기와 기록의 분석 범위를 협의합니다.', '확보된 자료를 바탕으로 파일 이용·전송 관련 흔적과 시간대를 검토합니다.'],
      prepare: ['의심 상황, 처음 인지한 시점, 확인하고 싶은 행위를 정리해 주세요.', '대상 기기·계정 목록과 현재 보유한 기록의 종류를 확인해 주세요.'],
      discuss: ['어떤 자료의 어떤 행위를 우선 확인해야 하나요?', '기기와 계정의 관리 담당자는 누구이며, 분석에 필요한 접근이 가능한가요?'],
      cost: '기기·저장매체 수량, 자료 용량, 관심 기간, 확인할 행위와 결과 정리 범위'
    },
    mobile: {
      title: '스마트폰·모바일 자료 분석', description: '기기 상태와 앱·기간에 따른 확인 가능 범위',
      targets: ['스마트폰', '태블릿', '모바일 백업 자료'],
      purposes: ['현재 보유한 대화·앱 자료 확인', '삭제 자료의 확인 가능 범위 상담', '관심 기간의 자료와 행위 정리'],
      scope: ['기종·운영체제·잠금 상태에 따라 분석 가능한 자료 범위를 검토합니다.', '관심 기간과 앱, 확인 목적을 중심으로 분석 항목을 협의합니다.'],
      prepare: ['기종, 운영체제, 기기 손상·잠금 상태를 확인해 주세요.', '확인하고 싶은 앱·자료 종류와 기간, 백업 보유 여부를 정리해 주세요.'],
      discuss: ['기기 접근과 잠금 해제가 가능한가요?', '현재 보유한 자료 확인과 삭제 자료 확인 중 어떤 목적이 우선인가요?'],
      cost: '기종·운영체제, 기기·잠금 상태, 자료 확보 방식, 분석할 앱·기간과 결과 범위'
    },
    media: {
      title: '음성·영상 자료 분석', description: '관심 구간의 내용 식별과 편집 흔적 검토',
      targets: ['음성·녹음 파일', '영상·CCTV 파일', '음성과 영상 함께'],
      purposes: ['특정 구간의 내용 식별 가능성 검토', '편집·변경 흔적의 검토 가능성 상담', '영상 속 관심 장면과 시간대 정리'],
      scope: ['원본·사본 상태와 파일 특성, 분석 목적을 먼저 검토합니다.', '관심 구간의 내용 식별이나 편집 흔적 검토가 가능한지 협의합니다.'],
      prepare: ['원본 보유 여부, 파일 형식·재생 시간, 확보 경위를 확인해 주세요.', '확인이 필요한 구간과 구체적인 질문을 정리해 주세요.'],
      discuss: ['내용 식별과 편집 여부 검토 중 어떤 목적이 우선인가요?', '파일을 전달·변환·재녹음한 이력이 있나요?'],
      cost: '파일 수와 재생 시간, 음질·화질, 원본 확보 여부, 관심 구간과 분석 목적'
    },
    ransomware: {
      title: '랜섬웨어 사고 조사', description: '확보한 기록을 바탕으로 경위와 영향 범위 검토',
      targets: ['PC·노트북', '서버·NAS', '여러 시스템과 계정'],
      purposes: ['침입 경위와 관련 흔적 조사', '영향을 받은 시스템·자료 범위 검토', '복구와 별도로 사고 조사 범위 상담'],
      scope: ['피해 시스템과 기간, 확보할 수 있는 자료를 기준으로 조사 범위를 협의합니다.', '확보한 로그와 시스템 흔적으로 침입 경위와 영향 범위를 검토합니다.'],
      prepare: ['최초 발견 시점, 증상, 영향을 받은 시스템 목록을 정리해 주세요.', '이미 진행한 대응 조치와 백업·로그 보유 여부를 확인해 주세요.'],
      discuss: ['현재도 피해가 추가로 발생하고 있나요?', '업무 복구와 사고 원인 조사 중 시급한 목표는 무엇인가요?'],
      cost: '피해 시스템 수, 확보 가능한 로그·기간, 현장·원격 조사 범위, 긴급 대응 필요성'
    },
    email: {
      title: '이메일 해킹·계정 사고 조사', description: '계정 접근, 메일 송수신과 설정 변경 기록 검토',
      targets: ['기업 이메일 계정', '개인 이메일 계정', '메일 서버·관리 시스템'],
      purposes: ['의심되는 계정 접근 경위 조사', '무단 발송·송수신 기록 확인', '메일 설정 변경과 피해 관련 기록 검토'],
      scope: ['계정 접근과 메일 송수신 관련 기록의 확인 범위를 협의합니다.', '전달 규칙 등 메일 설정 변경과 피해 관련 내역을 검토합니다.'],
      prepare: ['사용하는 메일 서비스와 계정 유형, 의심 정황과 시점을 정리해 주세요.', '의심 메일 보유 여부와 관리자 기록을 확보할 수 있는지 확인해 주세요.'],
      discuss: ['의심 메일 수신, 무단 발송, 계정 접근 중 어떤 문제가 있었나요?', '메일 관리자 또는 서비스 운영자의 협조가 가능한가요?'],
      cost: '계정·메일 수, 조사 기간, 관리자 로그 확보 여부, 메일 서비스와 조사 범위'
    },
    personal: {
      title: '개인정보 관련 사고 조사', description: '영향 시스템·자료와 확인된 사실 정리',
      targets: ['웹서비스·업무 시스템', '서버·데이터베이스', '기기·계정·저장 자료'],
      purposes: ['의심되는 접근·반출 행위 조사', '영향을 받은 시스템과 자료 범위 검토', '확인된 사실과 추가 조사 항목 정리'],
      scope: ['영향이 의심되는 시스템과 자료, 기간을 정하고 조사 범위를 협의합니다.', '확인된 사실과 추가 검토가 필요한 사항을 구분해 정리합니다.'],
      prepare: ['관련 개인정보의 종류와 저장 위치, 사고 인지 경위를 정리해 주세요.', '접근 기록 등 확보한 자료의 종류와 보관 기간을 확인해 주세요.'],
      discuss: ['실제로 확인된 사실과 아직 의심하는 부분은 무엇인가요?', '어떤 시스템과 기간을 우선 조사해야 하나요?'],
      cost: '관련 시스템·자료의 규모, 로그 보관 기간, 접근·반출 관련 분석 범위, 결과 정리 범위'
    },
    remote: {
      title: '원격 보안 점검', description: '보안 설정·관리 현황과 개선 우선순위 확인',
      targets: ['업무용 PC·계정', '서버·업무 시스템', '여러 기기와 서비스'],
      purposes: ['현재 보안 설정과 관리 현황 점검', '개선 우선순위와 조치 항목 정리', '정기적인 점검 범위 상담'],
      scope: ['사전에 협의한 대상의 보안 설정과 관리 현황을 점검합니다.', '발견 사항과 개선 우선순위를 정리합니다.'],
      prepare: ['대상 시스템·계정·서비스 목록과 운영 담당자를 정리해 주세요.', '원격 접속 방식, 운영 시간, 변경 제한 사항을 확인해 주세요.'],
      discuss: ['설정 확인 중심의 점검인가요, 추가 기술 점검도 필요한가요?', '원격 접근을 승인하고 일정을 조율할 담당자가 있나요?'],
      cost: '점검 대상 수, 운영 환경, 점검 항목, 원격 접근 조건, 정기 점검 여부'
    },
    offboarding: {
      title: '퇴사자 보안 관리', description: '계정·기기 회수와 자료 인계 현황 점검',
      targets: ['반납 대상 PC·저장장치', '사용 계정·접근 권한', '퇴사 절차와 관리 체계'],
      purposes: ['기기 반납·권한 회수 현황 점검', '업무 자료 인계와 보존 범위 정리', '특정 행위의 추가 조사 필요성 상담'],
      scope: ['계정·권한·기기 회수 현황과 업무 자료 인계 상황을 점검합니다.', '일반적인 퇴사 절차와 특정 행위의 추가 조사 필요 사항을 구분합니다.'],
      prepare: ['퇴사 일정, 사용 기기·계정 목록, 관리 담당자를 정리해 주세요.', '자료 인계, 기기 반납, 권한 회수의 진행 상태를 확인해 주세요.'],
      discuss: ['일반적인 퇴사 절차 점검인가요, 특정 행위를 확인해야 하나요?', '보존해야 할 업무 자료와 인계 담당자는 누구인가요?'],
      cost: '대상 인원·기기·계정 수, 인계 진행 상태, 현황 점검 또는 추가 분석의 범위'
    },
    solutions: {
      title: '보안 솔루션·스토리지', description: '도입 목적과 운영 환경에 맞춘 구성 범위',
      targets: ['보안 솔루션 도입·개선', '서버·NAS 등 저장 환경', '백업 환경 구축·개선'],
      purposes: ['접근 통제·보안 관리 기능 개선', '저장 용량과 운영 환경 개선', '백업·복원 요구사항과 구성 검토'],
      scope: ['기존 환경과 도입 목적을 검토하고 필요한 기능을 정리합니다.', '사용자·용량·운영 조건에 맞춰 구성과 구축 범위를 협의합니다.'],
      prepare: ['사용자·기기 수와 기존 제품, 데이터 용량·증가량을 정리해 주세요.', '운영 담당자 유무와 자료 이전·기존 시스템 연동 필요성을 확인해 주세요.'],
      discuss: ['접근 통제, 보안 관리, 저장, 백업 중 우선 목표는 무엇인가요?', '기존 환경 연동과 자료 이전, 운영 지원이 필요한가요?'],
      cost: '사용자·대상 수, 제품 구성, 용량·증설 계획, 자료 이전·연동, 구축과 운영 지원 범위'
    }
  };
  const detailsForm = $('#mq-details-form');
  const contactForm = $('#mq-contact-form');
  const fields = ['target', 'quantity', 'purpose', 'condition', 'timeline'];
  const fieldLabels = { target: '확인할 대상', quantity: '대상 수량', purpose: '확인 목적', condition: '자료·운영 상태', timeline: '희망 일정' };
  const stepTitles = ['필요한 서비스를 선택해 주세요.', '의뢰 범위를 함께 정리해 볼까요?', '상담 전에 확인할 내용을 정리했어요.', '상담 입력 화면을 미리 살펴보세요.'];
  const stepDescriptions = ['상황과 가장 가까운 항목을 골라 주세요.', '아직 정해지지 않은 항목은 상담하며 확인할 수 있습니다.', '선택한 조건에 따른 안내입니다. 실제 업무 범위는 상담 후 확정합니다.', '현재 화면은 입력 예시이며 실제 상담 접수 기능은 제공하지 않습니다.'];
  const nextLabels = ['의뢰 범위 선택', '맞춤 안내 보기', '상담 내용 입력', '입력 내용 확인'];
  let state = { step: 0, furthest: 0, service: '', topic: '', completed: false };
  let opener = null;
  let scrollLock = null;
  let copyAttempt = 0;

  function renderServices() {
    $('#mq-services').innerHTML = Object.entries(services).map(([id, service]) => `<label class="mq-service-card"><input type="radio" name="mq-service" value="${id}"${state.service === id ? ' checked' : ''}><span class="mq-service-body">${service.icon}<strong>${service.title}</strong><small>${service.english}</small></span></label>`).join('');
  }
  function renderTopics() {
    const service = services[state.service];
    $('#mq-topic-fieldset').hidden = !service;
    $('#mq-selection-hint').hidden = Boolean(service);
    $('#mq-topics').innerHTML = service ? service.topics.map(id => `<label class="mq-topic-card"><input type="radio" name="mq-topic" value="${id}"${state.topic === id ? ' checked' : ''}><span class="mq-topic-body"><strong>${topics[id].title}</strong><small>${topics[id].description}</small></span></label>`).join('') : '';
  }
  function options(id, values) {
    $(`#mq-${id}`).innerHTML = '<option value="">선택해 주세요</option>' + [...values, '상담하며 확인'].map(value => `<option value="${escapeHTML(value)}">${escapeHTML(value === '상담하며 확인' ? '상담하며 확인하고 싶어요' : value)}</option>`).join('');
  }
  function prepareDetails() {
    const topic = topics[state.topic];
    if (!topic) return;
    detailsForm.reset();
    options('target', topic.targets);
    options('purpose', topic.purposes);
    const enterprise = state.service === 'enterprise';
    $('#mq-condition-label').textContent = enterprise ? '현재 운영 상태' : '자료 상태';
    options('condition', enterprise ? ['현재 운영 중', '새로 구축할 예정', '이관·인수인계 진행 중'] : ['원본 기기·자료 보유', '사본·백업 자료 보유', '접근·재생이 어려움']);
    $$('[data-mq-selection]').forEach(element => { element.textContent = `${services[state.service].title} · ${topic.title}`; });
  }
  function detailValues() {
    return Object.fromEntries(fields.map(field => [field, $(`#mq-${field}`).value]));
  }
  function summaryText() {
    if (!topics[state.topic]) return '';
    const topic = topics[state.topic];
    const values = detailValues();
    return [
      'MDFC 상담 전 의뢰 범위 정리',
      `${services[state.service].title} · ${topic.title}`,
      ...fields.map(field => `${fieldLabels[field]}: ${values[field] || '미선택'}`),
      '', '예상 업무 범위 (상담 후 확정)', ...topic.scope.map(value => `• ${value}`),
      '', '미리 확인할 자료', ...topic.prepare.map(value => `• ${value}`),
      '', '담당자와 확인할 사항', ...topic.discuss.map(value => `• ${value}`),
      '', '비용: 대상 수량·자료 상태·분석 범위 확인 후 안내',
      `비용 결정 요인: ${topic.cost}`,
      '', '이 요약은 의뢰 준비를 위한 안내이며 상담이 접수된 상태가 아닙니다.'
    ].join('\n');
  }
  function renderSummary() {
    const topic = topics[state.topic];
    const values = detailValues();
    $('#mq-result-title').textContent = topic.title;
    $('#mq-summary').innerHTML = fields.map(field => `<div><dt>${fieldLabels[field]}</dt><dd>${escapeHTML(values[field])}</dd></div>`).join('');
    $('#mq-guide').innerHTML = [
      ['01', '예상 업무 범위', topic.scope],
      ['02', '미리 확인할 자료', topic.prepare],
      ['03', '담당자 확인 사항', topic.discuss]
    ].map(([number, title, rows]) => `<article class="mq-guide-card"><h3><span>${number}</span>${title}</h3><ul>${rows.map(row => `<li>${escapeHTML(row)}</li>`).join('')}</ul></article>`).join('');
    $('#mq-cost-factors').textContent = `비용 결정 요인 · ${topic.cost}`;
    $('#mq-copy-status').textContent = '';
    $('#mq-copy-fallback').hidden = true;
    $('#mq-copy-text').value = '';
  }
  function setStep(step, focus = true) {
    const previousStep = state.step;
    state.step = step;
    state.furthest = Math.max(state.furthest, step);
    if (step === 2) renderSummary();
    $$('[data-mq-panel]').forEach(panel => { panel.hidden = Number(panel.dataset.mqPanel) !== step; });
    $$('[data-mq-step]').forEach(button => {
      const index = Number(button.dataset.mqStep);
      button.disabled = index > state.furthest;
      button.classList.toggle('mq-step-done', index < step);
      if (index === step) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    $('#mq-title').textContent = stepTitles[step];
    $('#mq-description').textContent = stepDescriptions[step];
    $('#mq-step-count').textContent = `0${step + 1} / 04`;
    $('#mq-progress').value = step + 1;
    const completed = step === 3 && state.completed;
    $('#mq-back').hidden = step === 0 || completed;
    $('#mq-next').disabled = step === 0 && !state.topic;
    $('#mq-next').innerHTML = completed ? '가이드 닫기 <span aria-hidden="true">×</span>' : `${nextLabels[step]} <span aria-hidden="true">→</span>`;
    $('#mq-footer-hint').hidden = step > 0 && !completed;
    $('#mq-footer-hint').textContent = completed ? '실제 상담은 전화로 문의해 주세요.' : '개인정보는 마지막 단계에서만 입력합니다.';
    contactForm.hidden = state.completed;
    $('#mq-complete').hidden = !state.completed;
    if (focus || previousStep !== step) $('#mq-content').scrollTop = 0;
    if (focus && dialog.open) requestAnimationFrame(() => { if (dialog.open) $('#mq-title').focus({ preventScroll: true }); });
  }
  function chooseService(id) {
    if (!services[id]) return;
    state.service = id;
    state.topic = '';
    state.furthest = 0;
    clearContact();
    detailsForm.reset();
    renderServices();
    renderTopics();
    setStep(0, false);
  }
  function chooseTopic(id) {
    if (!services[state.service]?.topics.includes(id)) return;
    if (state.topic !== id) {
      state.topic = id;
      state.furthest = 0;
      clearContact();
      prepareDetails();
    }
    renderTopics();
    setStep(0, false);
  }
  function syncContactMethod() {
    const method = contactForm.querySelector('[name="contactMethod"]:checked').value;
    const input = $('#mq-contact-value');
    input.type = method === 'email' ? 'email' : 'tel';
    input.inputMode = method === 'email' ? 'email' : 'tel';
    input.placeholder = method === 'email' ? 'name@company.com' : '010-0000-0000';
    input.setCustomValidity('');
  }
  function clearContact() {
    contactForm.reset();
    $('#mq-name').setCustomValidity('');
    $('#mq-contact-value').setCustomValidity('');
    state.completed = false;
    syncContactMethod();
    contactForm.hidden = false;
    $('#mq-complete').hidden = true;
  }
  function reset() {
    copyAttempt += 1;
    state = { step: 0, furthest: 0, service: '', topic: '', completed: false };
    detailsForm.reset();
    clearContact();
    renderServices();
    renderTopics();
    $('#mq-summary').replaceChildren();
    $('#mq-guide').replaceChildren();
    $('#mq-copy-status').textContent = '';
    $('#mq-copy-text').value = '';
    $('#mq-copy-fallback').hidden = true;
    $('#mq-content').scrollTop = 0;
    setStep(0, false);
  }
  function lockPage() {
    const body = document.body;
    const root = document.documentElement;
    const properties = ['position', 'top', 'left', 'right', 'width', 'overflow', 'padding-right'];
    scrollLock = {
      y: window.scrollY, x: window.scrollX,
      body: properties.map(property => [property, body.style.getPropertyValue(property), body.style.getPropertyPriority(property)]),
      rootOverflow: root.style.getPropertyValue('overflow'),
      rootPriority: root.style.getPropertyPriority('overflow')
    };
    const gap = Math.max(0, window.innerWidth - root.clientWidth);
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    root.style.setProperty('overflow', 'hidden');
    Object.assign(body.style, { position: 'fixed', top: `-${scrollLock.y}px`, left: '0', right: '0', width: '100%', overflow: 'hidden' });
    if (gap) body.style.paddingRight = `${padding + gap}px`;
  }
  function unlockPage() {
    if (!scrollLock) return;
    const saved = scrollLock;
    scrollLock = null;
    saved.body.forEach(([property, value, priority]) => value ? document.body.style.setProperty(property, value, priority) : document.body.style.removeProperty(property));
    if (saved.rootOverflow) document.documentElement.style.setProperty('overflow', saved.rootOverflow, saved.rootPriority);
    else document.documentElement.style.removeProperty('overflow');
    window.scrollTo({ left: saved.x, top: saved.y, behavior: 'instant' });
  }
  function open(trigger) {
    if (dialog.open) return;
    opener = trigger || document.activeElement;
    reset();
    const service = trigger?.dataset.quoteService || trigger?.dataset.openQuote;
    if (services[service]) chooseService(service);
    const topic = trigger?.dataset.quoteTopic;
    if (topic) {
      const category = Object.keys(services).find(id => services[id].topics.includes(topic));
      if (category && !state.service) chooseService(category);
      chooseTopic(topic);
    }
    dialog.showModal();
    lockPage();
    requestAnimationFrame(() => { if (dialog.open) $('#mq-title').focus({ preventScroll: true }); });
  }
  function advance() {
    if (state.completed && state.step === 3) { dialog.close(); return; }
    if (state.step === 0) {
      if (!state.topic) return;
      setStep(1);
    } else if (state.step === 1) {
      if (detailsForm.reportValidity()) setStep(2);
    } else if (state.step === 2) setStep(3);
    else contactForm.requestSubmit();
  }
  document.addEventListener('click', event => {
    const trigger = event.target instanceof Element ? event.target.closest('[data-open-quote]') : null;
    if (!trigger || event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open(trigger);
  });
  dialog.addEventListener('change', event => {
    const input = event.target;
    if (input.name === 'mq-service') {
      chooseService(input.value);
      $(`[name="mq-service"][value="${state.service}"]`)?.focus({ preventScroll: true });
    } else if (input.name === 'mq-topic') {
      chooseTopic(input.value);
      $(`[name="mq-topic"][value="${state.topic}"]`)?.focus({ preventScroll: true });
    }
    else if (input.name === 'contactMethod') { $('#mq-contact-value').value = ''; syncContactMethod(); }
    else if (detailsForm.contains(input)) {
      state.furthest = Math.min(state.furthest, 1);
      clearContact();
      setStep(1, false);
    }
  });
  dialog.addEventListener('click', event => {
    const button = event.target instanceof Element ? event.target.closest('button') : null;
    if (button?.matches('[data-mq-close]')) dialog.close();
    else if (button?.matches('[data-mq-edit-service]')) setStep(0);
    else if (button?.matches('[data-mq-step]') && !button.disabled) setStep(Number(button.dataset.mqStep));
    else if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  $('#mq-next').addEventListener('click', advance);
  $('#mq-back').addEventListener('click', () => setStep(Math.max(0, state.step - 1)));
  $('#mq-review-summary').addEventListener('click', () => { clearContact(); setStep(2); });
  detailsForm.addEventListener('submit', event => { event.preventDefault(); if (state.step === 1) advance(); });
  $('#mq-name').addEventListener('input', () => $('#mq-name').setCustomValidity(''));
  $('#mq-contact-value').addEventListener('input', () => $('#mq-contact-value').setCustomValidity(''));
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (state.step !== 3 || state.completed) return;
    const name = $('#mq-name');
    const contact = $('#mq-contact-value');
    name.setCustomValidity(name.value.trim() ? '' : '성함을 입력해 주세요.');
    if (contact.type === 'tel') {
      const value = contact.value.trim();
      const digits = value.replace(/\D/g, '');
      contact.setCustomValidity(/^[+\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 16 ? '' : '연락 가능한 전화번호를 입력해 주세요.');
    } else contact.setCustomValidity('');
    if (!contactForm.reportValidity()) return;
    // This preview intentionally has no network, browser storage, or submission endpoint.
    contactForm.reset();
    state.completed = true;
    setStep(3, false);
    requestAnimationFrame(() => { if (dialog.open) $('#mq-complete').focus({ preventScroll: true }); });
  });
  $('#mq-copy-summary').addEventListener('click', async () => {
    const text = summaryText();
    const attempt = ++copyAttempt;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if (dialog.open && attempt === copyAttempt) $('#mq-copy-status').textContent = '복사했습니다. 상담 시 붙여 넣어 주세요.';
    } catch {
      if (!dialog.open || attempt !== copyAttempt) return;
      $('#mq-copy-fallback').hidden = false;
      const field = $('#mq-copy-text');
      field.value = text;
      field.focus();
      field.select();
      $('#mq-copy-status').textContent = '자동 복사를 사용할 수 없어 요약을 선택했습니다. 직접 복사해 주세요.';
    }
  });
  dialog.addEventListener('cancel', event => { event.preventDefault(); dialog.close(); });
  dialog.addEventListener('close', () => {
    unlockPage();
    reset();
    const target = opener;
    opener = null;
    requestAnimationFrame(() => { if (target?.isConnected && typeof target.focus === 'function') target.focus({ preventScroll: true }); });
  });
  reset();
  if (new URLSearchParams(window.location.search).get('quote') === '1') requestAnimationFrame(() => open(null));
})();
