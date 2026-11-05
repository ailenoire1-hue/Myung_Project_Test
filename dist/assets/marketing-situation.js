(() => {
  'use strict';
  const allowed = ['forensics', 'incident', 'recovery', 'security'];
  const requested = new URLSearchParams(location.search).get('situation');

  document.querySelectorAll('[data-situation-insights]').forEach(root => {
    const tabs = [...root.querySelectorAll('[data-ms-tab]')]
      .filter(tab => allowed.includes(tab.dataset.msTab));
    const panels = [...root.querySelectorAll('[data-ms-panel]')];
    const status = root.querySelector('[data-ms-status]');
    if (!tabs.length) return;

    function activate(tab, moveFocus = false, announce = true) {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(panel => {
        panel.hidden = panel.dataset.msPanel !== tab.dataset.msTab;
      });
      if (announce && status) {
        const label = tab.dataset.msLabel || tab.textContent.trim();
        status.textContent = `${label} 관련 콘텐츠 3개를 표시합니다.`;
      }
      if (moveFocus) tab.focus({preventScroll: true});
    }

    const initialKey = allowed.includes(requested) ? requested : 'forensics';
    activate(tabs.find(tab => tab.dataset.msTab === initialKey) || tabs[0], false, false);
    if (status) status.textContent = '';

    root.addEventListener('click', event => {
      const tab = event.target?.closest?.('[data-ms-tab]');
      if (!tabs.includes(tab)) return;
      event.preventDefault();
      activate(tab, true);
    });

    root.addEventListener('keydown', event => {
      const tab = event.target?.closest?.('[data-ms-tab]');
      const index = tabs.indexOf(tab);
      if (index < 0 || event.altKey || event.ctrlKey || event.metaKey) return;
      let next;
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight': next = (index + 1) % tabs.length; break;
        case 'ArrowUp':
        case 'ArrowLeft': next = (index - 1 + tabs.length) % tabs.length; break;
        case 'Home': next = 0; break;
        case 'End': next = tabs.length - 1; break;
        default: return;
      }
      event.preventDefault();
      activate(tabs[next], true);
    });
  });
})();
