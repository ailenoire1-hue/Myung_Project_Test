(() => {
 const buttons = [...document.querySelectorAll('[data-view-button]')];
 const panels = [...document.querySelectorAll('[data-view]')];
 for (const button of buttons) button.addEventListener('click', () => {
  for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
  for (const panel of panels) panel.hidden = panel.dataset.view !== button.dataset.viewButton;
 });
})();
