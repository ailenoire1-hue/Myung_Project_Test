(() => {
  'use strict';
  const browser = document.querySelector('[data-insight-browser]');
  if (browser) {
    const filters = [...browser.querySelectorAll('[data-insight-filter]')];
    const channelFilters = [...browser.querySelectorAll('[data-insight-channel-filter]')];
    const cards = [...browser.querySelectorAll('[data-insight-card]')];
    const groups = [...browser.querySelectorAll('[data-insight-group]')];
    const search = browser.querySelector('[data-insight-search]');
    const count = browser.querySelector('[data-insight-count]');
    const empty = browser.querySelector('[data-insight-empty]');
    const resetButtons = [...browser.querySelectorAll('[data-insight-reset]')];
    let category = 'all';
    const requestedChannel = new URLSearchParams(location.search).get('channel');
    let channel = ['article','blog','video','newsletter'].includes(requestedChannel) ? requestedChannel : 'all';
    function render() {
      const query = search.value.trim().toLocaleLowerCase('ko');
      let visible = 0;
      cards.forEach(card => {
        const matchCategory = category === 'all' || card.dataset.insightCategory === category;
        const matchChannel = channel === 'all' || card.dataset.insightChannel === channel;
        const text = `${card.dataset.insightSearch || ''} ${card.textContent}`.toLocaleLowerCase('ko');
        const matchSearch = !query || query.split(/\s+/).every(word => text.includes(word));
        card.hidden = !(matchCategory && matchChannel && matchSearch);
        if (!card.hidden) visible++;
      });
      groups.forEach(group => {
        const visibleInGroup = [...group.querySelectorAll('[data-insight-card]')].filter(card => !card.hidden).length;
        group.hidden = visibleInGroup === 0;
        const groupCount = group.querySelector('[data-insight-group-count]');
        if (groupCount) groupCount.textContent = `${visibleInGroup}개`;
      });
      filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.insightFilter === category)));
      channelFilters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.insightChannelFilter === channel)));
      count.textContent = `${visible}개 콘텐츠`;
      empty.hidden = visible !== 0;
      resetButtons.forEach(button => { if (!empty.contains(button)) button.hidden = category === 'all' && channel === 'all' && !query; });
    }
    filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.insightFilter; render(); }));
    channelFilters.forEach(button => button.addEventListener('click', () => { channel = button.dataset.insightChannelFilter; render(); }));
    resetButtons.forEach(button => button.addEventListener('click', () => { category = 'all'; channel = 'all'; search.value = ''; render(); }));
    search.addEventListener('input', render);
    render();
  }

  const topicKey = new URLSearchParams(location.search).get('topic');
  const topicArticle = document.querySelector('.mi-article-body');
  const topics = {
    email: {
      category:'사고 대응', title:'계정 도용이 의심된다면, 어떤 기록을 준비할까요?',
      deck:'낯선 로그인 알림이나 발신 메일을 발견했다면, 발생 시점과 계정 활동을 함께 살펴볼 필요가 있습니다. 상담 전에 정리할 기록의 종류를 소개합니다.',
      hero:'같은 계정, 여러 곳의 기록. / 시점과 활동을 함께 봅니다.', route:['LOGIN','MAIL ACTIVITY','SETTINGS'],
      keys:['의심되는 알림과 실제 활동 내역을 구분합니다.','로그인·메일·설정 변경 기록을 같은 기간에서 봅니다.','확인한 활동과 실제 영향 범위를 나눠 정리합니다.'],
      first:'의심 증상을 발견한 시점부터.', firstText:'모르는 로그인 알림을 받았거나 내 계정에서 낯선 메일이 발송됐다고 가정해 보겠습니다. 처음 발견한 시점과 화면, 이후 확인한 증상을 기록해 두면 조사할 기간과 대상을 논의하는 데 도움이 됩니다.',
      second:'기록의 출처를 나눠 살펴봅니다.',
      steps:[['01 · 접속','로그인 기록','접속 시각·위치·기기 등 확인 가능한 항목을 살펴봅니다. 알림만으로 실제 사용자를 단정하지 않습니다.'],['02 · 활동','메일·계정 활동','보낸 메일과 삭제·전달 흔적 등 확보한 활동을 발생 시점과 대조합니다.'],['03 · 설정','변경된 설정','자동 전달·권한·추가 인증 등 변경 이력이 있는지, 확인 가능한 범위에서 검토합니다.']],
      third:'접속 사실과 피해 범위는 다른 질문입니다.', thirdText:'계정에 접근한 흔적이 있다는 것과 특정 자료가 외부로 전달됐다는 것은 각각 확인할 질문입니다. 실제 활동과 자료 접근·전송 기록을 함께 검토해 근거와 남은 질문을 정리합니다.',
      fact:'접속·활동·설정 변경 기록', question:'실제 사용자와 자료 접근·전달 범위',
      prep:['발견 시점과 의심 증상, 관련 업무를 정리합니다.','메일과 로그인 알림 등 현재 보유한 자료의 종류를 확인합니다.','계정·서비스 관리 담당자와 기록을 확보할 수 있는 범위를 확인합니다.'],
      cta:'계정 활동이 의심된다면,\n조사할 기록부터 함께 확인하세요.', service:'incident-response.html#email-hacking', serviceLabel:'이메일·해킹 조사 살펴보기'
    },
    offboarding: {
      category:'기업 보안', title:'퇴사자 관리, 자료 보존과 권한 회수를 함께.',
      deck:'퇴사자 관리는 계정을 닫는 일에서 끝나지 않습니다. 업무 자료를 인계하고, 필요한 기록을 보존하고, 접근 권한을 정리하는 관점을 살펴봅니다.',
      hero:'업무는 이어지고, 권한은 정리되도록. / 자료와 계정을 함께 확인합니다.', route:['ASSETS','WORK DATA','ACCESS'],
      keys:['기기·계정·공유 자료의 관리 주체를 확인합니다.','업무 인계에 필요한 자료와 보존 범위를 정합니다.','권한 회수와 인계 결과를 담당자가 함께 확인합니다.'],
      first:'기기와 계정, 업무 자료의 위치부터.', firstText:'노트북 한 대를 돌려받더라도 업무 자료는 메일·공유 폴더·클라우드 등 여러 곳에 나뉘어 있을 수 있습니다. 대상과 관리 권한을 확인하고 어떤 자료를 인계·보존할지 먼저 논의합니다.',
      second:'인계의 흐름에서 놓친 항목을 찾습니다.',
      steps:[['01 · 확인','기기·계정 목록','반납할 기기와 업무 계정, 공유 자료의 위치를 정리합니다.'],['02 · 보존','업무 자료 인계','의뢰 권한과 범위를 확인하고 업무에 필요한 자료의 보존·인계를 협의합니다.'],['03 · 정리','권한 회수 확인','담당자와 회수 대상·시점을 정하고, 처리 결과와 인계 상태를 확인합니다.']],
      third:'자료 인계와 반출 정황 조사를 구분합니다.', thirdText:'원활한 업무 인계를 위한 자료 정리와, 의심되는 반출 행위를 분석하는 조사는 목적과 범위가 다릅니다. 추가 증거 분석이 필요한 경우에는 대상을 확인하고 디지털포렌식 범위를 별도로 협의합니다.',
      fact:'인계 자료·반납 기기·권한 처리 상태', question:'반출 여부 등 별도 분석이 필요한 사실관계',
      prep:['퇴사 일정과 관련 부서·담당자를 정리합니다.','업무 기기·계정·공유 자료의 목록을 확인합니다.','인계 목적과 의심 상황을 나눠 필요한 범위를 정리합니다.'],
      cta:'퇴사 전후의 자료와 계정,\n관리 범위부터 정리하세요.', service:'enterprise-security.html#employee-offboarding', serviceLabel:'퇴사자 관리 서비스 살펴보기'
    },
    backup: {
      category:'기업 보안', title:'NAS가 있어도 별도 백업을 살펴보는 이유',
      deck:'저장 공간을 마련하는 일과 복구할 사본을 준비하는 일은 역할이 다릅니다. 장치의 구성과 사본의 위치, 실제 복원 절차를 함께 봅니다.',
      hero:'저장하는 일, 복구를 준비하는 일. / 서로 다른 역할을 설계합니다.', route:['ORIGINAL','BACKUP COPY','RESTORE'],
      keys:['저장 장치의 구성과 별도 백업의 역할을 구분합니다.','사본의 위치·접근 권한·보관 주기를 확인합니다.','복원 시험과 담당자의 운영 절차까지 살펴봅니다.'],
      first:'저장 장치가 있다는 것만으로는 부족합니다.', firstText:'NAS나 RAID 구성은 자료를 저장하고 운영하는 데 쓰입니다. 별도 백업은 원본에 문제가 생겼을 때 복구할 사본을 준비하는 목적입니다. 장치 구성만으로 모든 삭제·오류·침해 상황의 복구를 보장할 수는 없습니다.',
      second:'원본에서 복원까지 한 흐름으로 봅니다.',
      steps:[['01 · 대상','지켜야 할 원본','업무에 중요한 데이터와 변경 주기, 필요한 복구 시점을 정리합니다.'],['02 · 사본','별도의 백업','사본의 위치와 접근 경로, 보관 주기가 운영 목적에 맞는지 검토합니다.'],['03 · 검증','복원 시험','필요한 자료를 복원할 수 있는지, 담당자가 절차를 실행할 수 있는지 확인합니다.']],
      third:'백업 완료 표시와 복원 가능성을 나눠 봅니다.', thirdText:'작업이 완료됐다는 표시와 실제 업무에 필요한 자료를 복원할 수 있는지는 다른 확인 항목입니다. 데이터와 운영 환경에 맞춰 복원 대상·절차·업무 영향을 함께 검토합니다.',
      fact:'백업 작업 상태와 보관된 사본', question:'필요한 시점의 복원 가능성과 운영 절차',
      prep:['중요한 자료와 현재 저장·백업 구성을 정리합니다.','사본의 보관 위치와 담당자, 접근 권한을 확인합니다.','마지막 복원 시험과 업무상 필요한 복구 조건을 정리합니다.'],
      cta:'저장부터 복원까지,\n업무에 맞는 구성을 살펴보세요.', service:'enterprise-security.html#infrastructure', serviceLabel:'서버·스토리지·백업 살펴보기'
    },
    mobile: {
      category:'디지털포렌식', title:'대화의 흔적이 남았다는 것과 내용을 확보했다는 것',
      deck:'화면에서 보이는 내용과 기기·백업에 남은 기록은 다를 수 있습니다. 기록의 존재와 실제 내용 확보를 구분해 설명하는 이유를 살펴봅니다.',
      hero:'흔적과 내용, 그리고 앞뒤 맥락. / 확보한 범위를 나눠 설명합니다.', route:['RECORD','CONTENT','CONTEXT'],
      keys:['대화 흔적의 존재와 내용 확보 여부를 구분합니다.','기기·백업 등 기록의 출처와 상태를 함께 설명합니다.','참여자·시각·첨부 자료를 맥락 속에서 대조합니다.'],
      first:'사라진 화면에서 곧바로 결론을 내리지 않습니다.', firstText:'삭제 표시나 파일을 가리키는 흔적이 있어도 실제 내용을 확보했다는 뜻은 아닐 수 있습니다. 기기·앱·백업 상태와 접근 조건에 따라 확인할 수 있는 범위가 달라집니다.',
      second:'기록의 출처와 실제 확보 내용을 함께 봅니다.',
      steps:[['01 · 출처','기기·백업 상태','어디에서 확보한 기록인지, 자료의 상태와 분석 조건을 구분합니다.'],['02 · 내용','대화·첨부 자료','참여자와 작성 시각, 실제 내용과 파일 확보 여부를 나눠 확인합니다.'],['03 · 맥락','앞뒤 기록 대조','관련 대화와 첨부 자료를 연결해 확인한 사실과 남은 질문을 정리합니다.']],
      third:'복구 가능성을 미리 확정하지 않습니다.', thirdText:'잔존 기록이 있다는 이유만으로 삭제된 모든 내용을 확보할 수 있는 것은 아닙니다. 분석에서는 실제 확인한 항목과 검토 범위를 구분하고, 확보하지 못한 내용도 함께 설명합니다.',
      fact:'기록의 출처와 실제 확보한 대화·파일', question:'미확보 내용과 추가 대조가 필요한 맥락',
      prep:['확인하려는 대화와 기간, 관련 기기를 정리합니다.','현재 보유한 기기·백업·원본 파일의 상태를 확인합니다.','보유 자료와 의뢰 권한, 확인 목적을 상담 때 설명합니다.'],
      cta:'필요한 대화와 기록,\n확보 조건부터 함께 살펴보세요.', service:'digital-forensics.html#messenger-analysis', serviceLabel:'스마트폰·메신저 분석 살펴보기'
    },
    incident: {
      category:'사고 대응', title:'사고를 발견한 담당자가 먼저 남겨 둘 기록',
      deck:'당황스러운 순간에도 발생 시점과 증상, 업무 영향을 정리하면 상담과 대응 범위를 논의하는 데 도움이 됩니다. 기록할 항목을 살펴봅니다.',
      hero:'언제, 무엇을 발견했나요? / 첫 관찰을 다음 판단의 자료로.', route:['TIME','SYMPTOMS','IMPACT'],
      keys:['처음 발견한 시점과 이후 변화를 정리합니다.','화면·메시지·의심 증상 등 관찰한 사실을 남깁니다.','관련 기기와 업무 영향을 담당자에게 공유합니다.'],
      first:'처음 발견한 사실을 시간과 함께.', firstText:'파일이 열리지 않거나 낯선 안내 화면을 발견했다면, 처음 확인한 시점과 증상부터 정리합니다. 확인한 사실과 추측을 나누면 관련된 기기와 기록, 필요한 지원 범위를 논의하기 쉽습니다.',
      second:'사고 발견 메모의 세 가지 축.',
      steps:[['01 · 시점','언제 발견했나요?','최초 발견 시점과 마지막 정상 사용 시점 등 알고 있는 시간 정보를 적습니다.'],['02 · 증상','무엇이 달라졌나요?','화면과 오류 메시지, 영향을 받은 파일·계정·기기를 정리합니다.'],['03 · 영향','어떤 업무가 멈췄나요?','사용할 수 없는 업무와 관련 담당자, 현재 확보한 자료를 정리합니다.']],
      third:'관찰한 증상과 사고 원인은 구분합니다.', thirdText:'같은 증상도 여러 원인에서 나타날 수 있습니다. 원인을 단정하기 전에 확보한 기록과 환경을 검토해야 합니다. 삭제·포맷 등 자료 상태를 바꾸는 조치 전에는 업무 영향과 자료 보존을 담당자·전문가와 함께 고려합니다.',
      fact:'발견 시점·관찰한 증상·업무 영향', question:'사고 원인·실제 영향 범위·대응 순서',
      prep:['최초 발견 시점과 화면·증상을 정리합니다.','관련 기기·계정·업무 시스템의 담당자를 확인합니다.','이미 시행한 조치와 보유 기록을 상담 때 설명합니다.'],
      cta:'상황을 설명하는 데서,\n필요한 지원을 함께 정리합니다.', service:'incident-response.html', serviceLabel:'침해사고 조사 서비스 살펴보기'
    }
  };
  if (topicArticle && topics[topicKey]) {
    const topic = topics[topicKey];
    document.title = `${topic.title} | MDFC 예시 기사`;
    document.querySelector('.mi-breadcrumb').lastElementChild.textContent = topic.category;
    document.querySelector('.mi-article-head .mp-kicker').textContent = 'MDFC INSIGHTS / ' + topic.category;
    document.querySelector('.mi-article-head h1').textContent = topic.title;
    document.querySelector('.mi-article-deck').textContent = topic.deck;
    document.querySelector('.mi-byline>span').innerHTML = 'MDFC INSIGHTS<br>2026.10.20 · 기획 미리보기 · 예시 기사 · 2분 읽기';
    const [heroFirst,heroSecond] = topic.hero.split(' / ');
    document.querySelector('.mi-article-hero').innerHTML = `<div><small>EDITORIAL CONCEPT / 예시 콘텐츠</small><h2>${heroFirst}<br><em>${heroSecond}</em></h2></div><div class="mi-topic-flow" aria-label="${topic.route.join(', ')}의 세 가지 관점을 나타낸 설명 그래픽">${topic.route.map((item,index) => `<div><span>0${index+1}</span><strong>${item}</strong></div>`).join('')}</div>`;
    const titleText = [topic.first,topic.second,topic.third,'상담 전 정리할 세 가지'];
    document.querySelectorAll('[data-article-toc] a').forEach((link,index) => { link.textContent = '0' + (index+1) + ' ' + titleText[index]; });
    document.querySelector('.mi-toc .mi-editorial-note').textContent = '기획 미리보기 · 예시 기사입니다. 개별 환경에 대한 실제 진단이나 분석 결과가 아닙니다.';
    topicArticle.innerHTML = `<div class="mi-key-points"><span>KEY TAKEAWAYS</span><ol>${topic.keys.map(item=>`<li>${item}</li>`).join('')}</ol></div>
      <section id="record"><h2><span>01 / STARTING POINT</span>${topic.first}</h2><p>${topic.firstText}</p></section>
      <section id="timeline"><h2><span>02 / THREE PERSPECTIVES</span>${topic.second}</h2><div class="mi-topic-points">${topic.steps.map(item=>`<div><span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></div>`).join('')}</div><p class="mi-caption">설명을 위한 기획 예시 도식입니다. 실제 사건·환경의 분석 자료가 아닙니다.</p></section>
      <section id="conclusion"><h2><span>03 / FACTS &amp; FURTHER REVIEW</span>${topic.third}</h2><p>${topic.thirdText}</p><div class="mi-fact-comparison"><div><span>WHAT WE REVIEW</span><h3>확인할 자료</h3><p>${topic.fact}</p></div><div><span>WHAT WE ASK NEXT</span><h3>함께 살필 질문</h3><p>${topic.question}</p></div></div></section>
      <section id="prepare"><h2><span>04 / BEFORE THE CONVERSATION</span>상담 전 정리할 세 가지</h2><ul class="mi-prep-list">${topic.prep.map((item,index)=>`<li><span>0${index+1}</span><div>${item}</div></li>`).join('')}</ul><div class="mi-article-cta"><h3>${topic.cta.replace('\n','<br>')}</h3><p>기획 미리보기 · 예시 콘텐츠입니다. 실제 수행 범위는 대상과 환경, 자료 확보 조건을 확인한 후 협의합니다.</p><div class="mi-article-actions"><button class="mp-btn mp-btn-dark" type="button" data-open-quote>상담 범위 미리보기 <span aria-hidden="true">↗</span></button><a class="mi-text-link" href="${topic.service}">${topic.serviceLabel} <span aria-hidden="true">↗</span></a></div></div></section>`;
  }

  const timeline = document.querySelector('[data-evidence-timeline]');
  if (timeline) {
    const detail = timeline.querySelector('[data-evidence-detail]');
    const notes = {
      connection: '이 시각에 외부 저장매체가 연결됐다는 기록입니다. 어떤 파일을 어느 방향으로 복사했는지, 누가 사용했는지는 이 기록 하나로 확인할 수 없습니다.',
      access: '연결 후 특정 문서를 가리키는 최근 사용 흔적이 있습니다. 실제 복사가 있었는지 판단하려면 파일 작업·원본과 사본·다른 기록을 더 대조해야 합니다.',
      hash: '분석 시 비교한 두 파일의 내용이 같다는 근거입니다. 해시 일치만으로 복사 방향·실제 복사 시각·승인 여부를 정할 수는 없습니다.'
    };
    timeline.querySelectorAll('[data-evidence-step]').forEach(button => button.addEventListener('click', () => {
      timeline.querySelectorAll('[data-evidence-step]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      detail.textContent = notes[button.dataset.evidenceStep];
    }));
  }

  const toc = document.querySelector('[data-article-toc]');
  if (toc && 'IntersectionObserver' in window) {
    const links = [...toc.querySelectorAll('a[href^="#"]')];
    const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const entry = entries.filter(item => item.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if (!entry) return;
      links.forEach(link => link.setAttribute('aria-current', String(link.hash === '#' + entry.target.id)));
    }, { rootMargin: '-16% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  const copy = document.querySelector('[data-copy-article]');
  if (copy) copy.addEventListener('click', async () => {
    const status = document.querySelector('[data-copy-status]');
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(location.href.split('#')[0]);
      status.textContent = '이 예시 기사의 주소를 복사했습니다.';
    } catch {
      status.textContent = '현재 환경에서는 자동 복사가 어렵습니다. 주소창의 주소를 복사해 주세요.';
    }
  });

  const archive = document.querySelector('[data-newsletter-archive]');
  if (archive) {
    const issues = {
      '10': { title: '기록을 읽는 관점', intro: '기록 하나를 결론으로 바꾸기 전에. USB 연결 흔적부터 계정 활동, 백업 점검까지 이번 달의 읽을거리를 모았습니다.', topics: [
        ['FORENSICS', 'USB 연결 기록만으로 자료 유출을 확정할 수 없는 이유', '연결 기록과 파일 작업, 확인된 사실과 추가 확인이 필요한 부분을 나눠 봅니다.'],
        ['INCIDENT RESPONSE', '계정 도용이 의심된다면 어떤 기록을 준비할까요?', '발생 시점과 의심 증상, 확보한 메일·접속 기록을 정리하는 관점을 소개합니다.'],
        ['SECURITY MANAGEMENT', '백업이 있다는 것과 복원할 수 있다는 것', '분리 보관과 복원 시험, 운영 담당자가 함께 확인할 지점을 살펴봅니다.']
      ] },
      '09': { title: '퇴사자 관리, 순서를 정하다', intro: '업무 자료를 보존하고, 접근 권한을 정리하고, 필요한 흔적을 검토하는 흐름. 퇴사 전후 담당자가 함께 살필 내용을 모은 예시호입니다.', topics: [
        ['OFFBOARDING', '자료 인계와 접근 권한 회수, 함께 확인할 항목', '기기·계정·공유 자료를 정리하고 담당자 간 확인할 지점을 살펴봅니다.'],
        ['FORENSICS', '대량 복사가 의심될 때 기록을 연결하는 방법', 'USB 연결 기록과 파일 작업 흔적을 같은 시간 흐름에서 보는 관점을 소개합니다.'],
        ['SECURITY MANAGEMENT', '공유 폴더의 권한은 누가 관리하고 있나요?', '필요한 사람에게 필요한 범위의 권한을 부여하는 운영 원칙을 살펴봅니다.']
      ] },
      '08': { title: '백업, 운영의 관점으로', intro: '저장 공간을 늘리는 일과 복구를 준비하는 일은 다릅니다. 사본의 위치와 권한, 복원 절차를 함께 생각해 보는 예시호입니다.', topics: [
        ['BACKUP', 'NAS가 있어도 별도 백업을 검토해야 하는 이유', '저장 장치 구성과 백업 사본의 역할을 나눠 봅니다.'],
        ['SECURITY MANAGEMENT', '백업 사본의 접근 권한도 점검해 보세요', '업무 계정과 백업 사본에 대한 접근 경로를 함께 살펴봅니다.'],
        ['OPERATIONS', '복원 시험에서 확인할 세 가지', '복원 대상과 소요 시간, 담당자의 실행 절차를 정리하는 관점입니다.']
      ] }
    };
    archive.querySelectorAll('[data-newsletter-issue]').forEach(button => button.addEventListener('click', () => {
      const month = button.dataset.newsletterIssue;
      const issue = issues[month];
      archive.querySelectorAll('[data-newsletter-issue]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelectorAll('[data-issue-month]').forEach(item => { item.textContent = month; });
      document.querySelector('[data-issue-month-name]').textContent = ({'10':'OCT','09':'SEP','08':'AUG'})[month] + ' / 2026 · 기획 예시';
      document.querySelectorAll('[data-issue-title]').forEach(item => { item.textContent = issue.title; });
      document.querySelector('[data-issue-intro]').textContent = issue.intro;
      document.querySelector('[data-issue-label]').textContent = `2026.${month} · 예시호`;
      document.querySelector('[data-issue-section-label]').textContent = `2026.${month} 예시호에서 만나볼 이야기`;
      document.querySelectorAll('[data-issue-topic]').forEach((topic,index) => {
        topic.querySelector('[data-topic-category]').textContent = issue.topics[index][0];
        topic.querySelector('h3').textContent = issue.topics[index][1];
        topic.querySelector('p').textContent = issue.topics[index][2];
        const link = topic.querySelector('a');
        const route = ({'10':['','email','backup'],'09':['offboarding','','offboarding'],'08':['backup','backup','backup']})[month][index];
        link.href = 'insight-article-preview.html' + (route ? '?topic=' + route : '');
        link.querySelector('[data-topic-link-label]').textContent = '예시 기사 읽기';
      });
    }));
  }

  const subscribe = document.querySelector('[data-newsletter-form]');
  if (subscribe) subscribe.addEventListener('submit', event => {
    event.preventDefault();
    if (!subscribe.reportValidity()) return;
    const status = subscribe.querySelector('[data-subscribe-status]');
    status.textContent = '입력 형식과 동의 선택을 확인했습니다. 미리보기이므로 구독 등록·이메일 전송·정보 저장은 이루어지지 않았습니다.';
    subscribe.reset();
    status.focus({preventScroll:true});
  });
})();
