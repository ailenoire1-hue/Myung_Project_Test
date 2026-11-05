/* (주)명정보기술 - 공통 스크립트 (의존성 없음) */
(function () {
  'use strict';

  var doc = document;
  var body = doc.body;
  var DATA_V = '20261105';

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function qs(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }
  function getJSON(url) {
    return fetch(url + '?v=' + DATA_V, { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  /* ---------- Header ---------- */
  var header = $('#siteHeader');
  var toTop = $('#toTop');
  function onScroll() {
    var y = window.pageYOffset || doc.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (toTop) toTop.classList.toggle('is-show', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var toggle = $('#menuToggle');
  var backdrop = $('#gnbBackdrop');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '전체 메뉴 닫기' : '전체 메뉴 열기');
    }
    if (backdrop) backdrop.hidden = !open;
    body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  if (backdrop) backdrop.addEventListener('click', function () { setMenu(false); });
  $$('.gnb-expand').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentNode;
      var open = !li.classList.contains('is-open');
      li.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  // 모바일 메뉴: 현재 섹션 펼쳐두기
  var cur = $('.gnb-item.is-current');
  if (cur) { cur.classList.add('is-open'); var b = $('.gnb-expand', cur); if (b) b.setAttribute('aria-expanded', 'true'); }
  window.addEventListener('resize', function () { if (window.innerWidth > 1024 && body.classList.contains('menu-open')) setMenu(false); });

  /* ---------- Modal ---------- */
  var lastFocus = null;
  function openModal(id) {
    var m = doc.getElementById(id);
    if (!m) return;
    setMenu(false);
    lastFocus = doc.activeElement;
    m.hidden = false;
    body.classList.add('modal-open');
    var f = $('input:not([type=hidden]):not([tabindex="-1"]), textarea, button', m);
    if (f) setTimeout(function () { f.focus(); }, 30);
  }
  function closeModal(m) {
    if (!m) return;
    m.hidden = true;
    if (!$('.modal:not([hidden])')) body.classList.remove('modal-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  doc.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-open-modal]') : null;
    if (t) { e.preventDefault(); openModal(t.getAttribute('data-open-modal')); return; }
    var c = e.target.closest ? e.target.closest('[data-close-modal]') : null;
    if (c) { closeModal(c.closest('.modal')); return; }
    if (e.target.classList && e.target.classList.contains('modal')) closeModal(e.target);
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      var open = $$('.modal:not([hidden])');
      if (open.length) closeModal(open[open.length - 1]);
      else if (body.classList.contains('menu-open')) setMenu(false);
    }
  });
  window.MyungModal = { open: openModal, close: function (id) { closeModal(doc.getElementById(id)); } };

  /* ---------- Inquiry forms ---------- */
  function setMsg(form, text, ok) {
    var box = $('.form-msg', form);
    if (!box) { if (text) alert(text); return; }
    box.textContent = text || '';
    box.className = 'form-msg' + (text ? (ok ? ' is-success' : ' is-error') : '');
  }
  function validate(form) {
    $$('.is-invalid', form).forEach(function (el) { el.classList.remove('is-invalid'); });
    var name = form.elements.name, phone = form.elements.phone, email = form.elements.email, content = form.elements.content, agree = form.elements.agree;
    function fail(el, msg) { if (el && el.classList) { el.classList.add('is-invalid'); el.focus(); } return msg; }
    if (name && name.value.trim().length < 2) return fail(name, '성명을 입력해 주세요.');
    if (phone) {
      var digits = phone.value.replace(/[^0-9]/g, '');
      if (digits.length < 8 || !/^[0-9+\-() ]+$/.test(phone.value.trim())) return fail(phone, '연락처를 정확히 입력해 주세요.');
    }
    if (email && email.required && !email.value.trim()) return fail(email, '이메일을 입력해 주세요.');
    if (email && email.value.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim())) return fail(email, '이메일 형식이 올바르지 않습니다.');
    var reqs = $$('[required]', form);
    for (var i = 0; i < reqs.length; i++) {
      var el = reqs[i];
      if (el.type === 'checkbox') continue;
      if (!String(el.value || '').trim()) {
        var label = el.closest('.field');
        var t = label ? ($('.field-label', label) || {}).textContent : '';
        return fail(el, (t ? t.replace('*', '').trim() + ' 항목을 ' : '필수 항목을 ') + '입력해 주세요.');
      }
    }
    if (content && content.required && !content.value.trim()) return fail(content, '문의 내용을 입력해 주세요.');
    if (agree && !agree.checked) { agree.focus(); return '개인정보 수집 및 이용에 동의해 주세요.'; }
    return null;
  }
  $$('form[data-inquiry]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = validate(form);
      if (err) { setMsg(form, err, false); return; }
      setMsg(form, '', true);
      var btn = $('[type=submit]', form);
      var btnText = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = '접수 중...'; }

      var params = new URLSearchParams();
      $$('input, select, textarea', form).forEach(function (el) {
        if (!el.name || el.disabled) return;
        if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
        params.append(el.name, el.value);
      });
      params.append('page', location.pathname);

      fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.toString(),
        credentials: 'same-origin'
      }).then(function (r) {
        return r.json().catch(function () { return { ok: false, message: '서버 응답을 확인할 수 없습니다.' }; });
      }).then(function (res) {
        if (res.ok) {
          if (form.hasAttribute('data-replace-on-success')) {
            form.innerHTML = '<div class="form-done"><div class="form-done-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></div>' +
              '<h3>접수가 완료되었습니다</h3><p>' + esc(res.message) + '</p><p class="text-muted">급하신 경우 고객센터 <a href="tel:1577-1377" class="text-primary"><b>1577-1377</b></a> 로 연락 주세요.</p>' +
              '<a class="btn btn-outline mt-2" href="/">홈으로</a></div>';
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            form.reset();
            setMsg(form, res.message, true);
          }
          if (window.dataLayer) window.dataLayer.push({ event: 'inquiry_submit', inquiry_type: form.getAttribute('data-inquiry') });
        } else {
          setMsg(form, res.message || '접수 중 오류가 발생했습니다.', false);
        }
      }).catch(function () {
        setMsg(form, '네트워크 오류로 접수하지 못했습니다. 잠시 후 다시 시도하시거나 1577-1377 로 전화 주세요.', false);
      }).then(function () {
        if (btn && btn.isConnected !== false && btn.parentNode) { btn.disabled = false; btn.textContent = btnText; }
      });
    });
  });

  /* ---------- Reveal / Counter ---------- */
  var reveals = $$('.reveal');
  var counters = $$('[data-count]');
  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var v = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString('ko-KR');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var t = en.target;
        if (t.hasAttribute('data-count')) runCounter(t); else t.classList.add('is-in');
        io.unobserve(t);
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
    counters.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- In-page tabs (data-tabs) ---------- */
  $$('[data-tabs]').forEach(function (wrap) {
    var btns = $$('[data-tab]', wrap);
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        var group = wrap.getAttribute('data-tabs');
        $$('[data-panel-group="' + group + '"]').forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== btn.getAttribute('data-tab'); });
      });
    });
  });

  /* ---------- Boards (static JSON snapshot) ---------- */
  function pager(el, total, per, page, go) {
    var pages = Math.max(1, Math.ceil(total / per));
    if (pages <= 1) { el.innerHTML = ''; return; }
    var start = Math.max(1, page - 2), end = Math.min(pages, start + 4);
    start = Math.max(1, end - 4);
    var h = '<button type="button" data-p="' + (page - 1) + '"' + (page <= 1 ? ' disabled' : '') + ' aria-label="이전">‹</button>';
    for (var i = start; i <= end; i++) h += '<button type="button" data-p="' + i + '"' + (i === page ? ' class="is-active" aria-current="page"' : '') + '>' + i + '</button>';
    h += '<button type="button" data-p="' + (page + 1) + '"' + (page >= pages ? ' disabled' : '') + ' aria-label="다음">›</button>';
    el.innerHTML = h;
    $$('button', el).forEach(function (b) { b.addEventListener('click', function () { go(parseInt(b.getAttribute('data-p'), 10)); }); });
  }

  var boards = {
    /* 공지/뉴스레터 목록 */
    list: function (el) {
      var src = el.getAttribute('data-src'), viewUrl = el.getAttribute('data-view');
      var listEl = $('.board-list', el), pageEl = $('.pagination', el), countEl = $('.board-count b', el), form = $('.board-search', el);
      var per = 10, all = [], rows = [], page = parseInt(qs('page'), 10) || 1, q = qs('q');
      if (form && q) form.elements.q.value = q;
      function render() {
        rows = all.filter(function (r) { return !q || r.title.toLowerCase().indexOf(q.toLowerCase()) > -1; });
        if (countEl) countEl.textContent = rows.length;
        var pages = Math.max(1, Math.ceil(rows.length / per));
        if (page > pages) page = pages;
        var slice = rows.slice((page - 1) * per, page * per);
        if (!slice.length) { listEl.innerHTML = '<li class="board-empty">등록된 게시물이 없습니다.</li>'; pageEl.innerHTML = ''; return; }
        listEl.innerHTML = slice.map(function (r, i) {
          var num = r.pinned ? '<span class="badge">공지</span>' : (rows.length - ((page - 1) * per + i));
          var title = String(r.title).replace(/<br\s*\/?>/gi, ' ');
          return '<li' + (r.pinned ? ' class="is-pinned"' : '') + '><a href="' + viewUrl + '?no=' + r.no + '">' +
            '<span class="no">' + num + '</span><span class="title">' + esc(title) + '</span><span class="date">' + esc(r.date) + '</span></a></li>';
        }).join('');
        pager(pageEl, rows.length, per, page, function (p) { page = p; render(); history.replaceState(null, '', '?page=' + p + (q ? '&q=' + encodeURIComponent(q) : '')); el.scrollIntoView({ behavior: 'smooth' }); });
      }
      if (form) form.addEventListener('submit', function (e) { e.preventDefault(); q = form.elements.q.value.trim(); page = 1; render(); history.replaceState(null, '', q ? '?q=' + encodeURIComponent(q) : location.pathname); });
      getJSON(src).then(function (d) {
        var pinned = d.filter(function (r) { return r.pinned; }), normal = d.filter(function (r) { return !r.pinned; });
        all = pinned.concat(normal);
        render();
      }).catch(function () { listEl.innerHTML = '<li class="board-empty">게시물을 불러오지 못했습니다.</li>'; });
    },

    /* 게시물 상세 */
    view: function (el) {
      var src = el.getAttribute('data-src'), listUrl = el.getAttribute('data-list');
      var no = parseInt(qs('no'), 10);
      getJSON(src).then(function (d) {
        var idx = -1;
        for (var i = 0; i < d.length; i++) if (d[i].no === no) { idx = i; break; }
        if (idx < 0) { el.innerHTML = '<p class="board-empty">게시물을 찾을 수 없습니다.</p><div class="post-actions"><a class="btn btn-outline" href="' + listUrl + '">목록</a></div>'; return; }
        var r = d[idx], prev = d[idx + 1], next = d[idx - 1];
        var title = String(r.title).replace(/<br\s*\/?>/gi, ' ');
        doc.title = title + ' | (주)명정보기술';
        el.innerHTML = '<div class="post-head"><h2>' + esc(title) + '</h2><p class="post-meta">작성일 ' + esc(r.date) + '</p></div>' +
          '<div class="post-body">' + r.content + '</div>' +
          '<ul class="post-nav">' +
          '<li><span>이전글</span>' + (prev ? '<a href="?no=' + prev.no + '">' + esc(String(prev.title).replace(/<br\s*\/?>/gi, ' ')) + '</a>' : '<em class="text-muted">이전 글이 없습니다.</em>') + '</li>' +
          '<li><span>다음글</span>' + (next ? '<a href="?no=' + next.no + '">' + esc(String(next.title).replace(/<br\s*\/?>/gi, ' ')) + '</a>' : '<em class="text-muted">다음 글이 없습니다.</em>') + '</li>' +
          '</ul><div class="post-actions"><a class="btn btn-outline" href="' + listUrl + '">목록으로</a></div>';
      }).catch(function () { el.innerHTML = '<p class="board-empty">게시물을 불러오지 못했습니다.</p>'; });
    },

    /* FAQ */
    faq: function (el) {
      var tabs = $('.tabs', el), acc = $('.acc', el), tag = '';
      getJSON('/resources/data/faq.json').then(function (d) {
        var tags = [];
        d.forEach(function (r) { if (tags.indexOf(r.tag) < 0) tags.push(r.tag); });
        tabs.innerHTML = '<button type="button" class="is-active" data-t="">전체</button>' + tags.map(function (t) { return '<button type="button" data-t="' + esc(t) + '">' + esc(t) + '</button>'; }).join('');
        function render() {
          var rows = d.filter(function (r) { return !tag || r.tag === tag; });
          acc.innerHTML = rows.map(function (r) {
            return '<details><summary><span><span class="badge badge-gray">' + esc(r.tag) + '</span> ' + esc(r.q) + '</span></summary><div class="acc-body">' + r.a + '</div></details>';
          }).join('') || '<p class="board-empty">등록된 FAQ가 없습니다.</p>';
        }
        $$('button', tabs).forEach(function (b) {
          b.addEventListener('click', function () {
            tag = b.getAttribute('data-t');
            $$('button', tabs).forEach(function (x) { x.classList.toggle('is-active', x === b); });
            render();
          });
        });
        render();
      }).catch(function () { acc.innerHTML = '<p class="board-empty">FAQ를 불러오지 못했습니다.</p>'; });
    },

    /* 복구 후기 */
    review: function (el) {
      var tabs = $('.tabs', el), grid = $('.review-grid', el), pageEl = $('.pagination', el), countEl = $('.board-count b', el);
      var per = 12, page = 1, type = qs('type'), all = [];
      var photo = function (p) { return '/uploadFiles/images/review/' + encodeURIComponent(p); };
      function render() {
        var rows = all.filter(function (r) { return !type || r.type === type; });
        if (countEl) countEl.textContent = rows.length;
        var slice = rows.slice((page - 1) * per, page * per);
        grid.innerHTML = slice.map(function (r) {
          var img = r.photos && r.photos.length ? '<img src="' + photo(r.photos[0]) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' : '';
          return '<button type="button" class="card review-card is-hover" data-no="' + r.no + '" style="text-align:left;width:100%">' +
            '<div class="thumb">' + img + '<span class="badge">' + esc(r.type) + '</span></div>' +
            '<div class="body"><h3>' + esc(r.maker || r.title) + ' ' + esc(r.model && r.model !== '-' ? r.model : '') + '</h3><p>' + esc(String(r.symptom || '').replace(/<br\s*\/?>/gi, ' ')) + '</p></div></button>';
        }).join('') || '<p class="board-empty" style="grid-column:1/-1">등록된 후기가 없습니다.</p>';
        pager(pageEl, rows.length, per, page, function (p) { page = p; render(); el.scrollIntoView({ behavior: 'smooth' }); });
      }
      function detail(no) {
        var r = null;
        all.forEach(function (x) { if (x.no === no) r = x; });
        if (!r) return;
        var rowsHtml = [['구분', r.type], ['제조사', r.maker], ['모델명', r.model], ['용량', r.capacity], ['증상', String(r.symptom || '').replace(/<br\s*\/?>/gi, ' ')], ['복구 데이터 종류', r.data], ['증상 진단 결과', r.diagnosis], ['작업 내용', r.work]]
          .map(function (x) { return '<dt>' + x[0] + '</dt><dd>' + esc(x[1] || '-') + '</dd>'; }).join('');
        var photos = (r.photos || []).map(function (p) { return '<img src="' + photo(p) + '" alt="복구 작업 사진" loading="lazy" onerror="this.style.display=\'none\'">'; }).join('');
        $('#reviewModalBody').innerHTML = '<div class="review-detail"><dl>' + rowsHtml + '</dl>' + (photos ? '<div class="review-photos">' + photos + '</div>' : '') + '</div>';
        $('#reviewModalTitle').textContent = r.title + ' 복구 사례';
        openModal('reviewModal');
      }
      grid.addEventListener('click', function (e) {
        var c = e.target.closest('[data-no]');
        if (c) detail(parseInt(c.getAttribute('data-no'), 10));
      });
      getJSON('/resources/data/review.json').then(function (d) {
        all = d;
        var types = ['HDD', 'SSD', 'USB', '메모리 카드', 'CCTV', '블랙박스', '스마트폰', '서버'];
        d.forEach(function (r) { if (types.indexOf(r.type) < 0) types.push(r.type); });
        tabs.innerHTML = '<button type="button" data-t="">전체</button>' + types.map(function (t) { return '<button type="button" data-t="' + esc(t) + '">' + esc(t) + '</button>'; }).join('');
        $$('button', tabs).forEach(function (b) {
          if (b.getAttribute('data-t') === type) b.classList.add('is-active');
          b.addEventListener('click', function () {
            type = b.getAttribute('data-t'); page = 1;
            $$('button', tabs).forEach(function (x) { x.classList.toggle('is-active', x === b); });
            render();
          });
        });
        render();
      }).catch(function () { grid.innerHTML = '<p class="board-empty">후기를 불러오지 못했습니다.</p>'; });
    },

    /* 메인 - 공지 미리보기 */
    homeNotice: function (el) {
      getJSON('/resources/data/notice.json').then(function (d) {
        el.innerHTML = d.slice(0, 5).map(function (r) {
          return '<li><a href="/community/notice/view?no=' + r.no + '"><span class="t">' + esc(String(r.title).replace(/<br\s*\/?>/gi, ' ')) + '</span><span class="d">' + esc(r.date) + '</span></a></li>';
        }).join('');
      }).catch(function () { el.innerHTML = ''; });
    },

    /* 메인 - 후기 미리보기 */
    homeReview: function (el) {
      getJSON('/resources/data/review.json').then(function (d) {
        el.innerHTML = d.slice(0, 4).map(function (r) {
          var img = r.photos && r.photos.length ? '<img src="/uploadFiles/images/review/' + encodeURIComponent(r.photos[0]) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' : '';
          return '<a class="card review-card" href="/community/review?type=' + encodeURIComponent(r.type) + '"><div class="thumb">' + img + '<span class="badge">' + esc(r.type) + '</span></div>' +
            '<div class="body"><h3>' + esc(r.maker || r.title) + '</h3><p>' + esc(String(r.symptom || '').replace(/<br\s*\/?>/gi, ' ')) + '</p></div></a>';
        }).join('');
      }).catch(function () { el.innerHTML = ''; });
    }
  };
  $$('[data-board]').forEach(function (el) {
    var fn = boards[el.getAttribute('data-board')];
    if (fn) fn(el);
  });
})();
