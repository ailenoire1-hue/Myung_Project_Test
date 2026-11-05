(() => {
  'use strict';
  const allowed = ['all', 'forensics', 'incident', 'recovery', 'security'];
  const requested = new URLSearchParams(location.search).get('topic');

  document.querySelectorAll('[data-magazine-browser]').forEach(root => {
    const buttons = [...root.querySelectorAll('[data-mm-filter]')]
      .filter(button => allowed.includes(button.dataset.mmFilter));
    const groups = [...root.querySelectorAll('[data-mm-group]')];
    const status = root.querySelector('[data-mm-status]');
    if (!buttons.length || !groups.length) return;

    function select(key, announce = true) {
      const button = buttons.find(item => item.dataset.mmFilter === key)
        || buttons.find(item => item.dataset.mmFilter === 'all')
        || buttons[0];
      const group = groups.find(item => item.dataset.mmGroup === button.dataset.mmFilter) || groups[0];
      buttons.forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      groups.forEach(item => { item.hidden = item !== group; });
      if (announce && status) {
        const label = button.dataset.mmLabel || button.textContent.trim();
        status.textContent = `${label} 콘텐츠 4개를 표시합니다.`;
      }
    }

    select(allowed.includes(requested) ? requested : 'all', false);
    if (status) status.textContent = '';

    root.addEventListener('click', event => {
      const button = event.target?.closest?.('[data-mm-filter]');
      if (!buttons.includes(button)) return;
      event.preventDefault();
      select(button.dataset.mmFilter);
      button.focus({preventScroll: true});
    });
  });
})();
