(() => {
  'use strict';
  const guide = document.querySelector('.fr-guide[data-fr-tabbed-guide]');
  if (!guide) return;
  const serviceTabs = Array.from(guide.querySelectorAll('[data-fr-service-tab]'));
  const servicePanels = Array.from(guide.querySelectorAll('[data-fr-service-panel]'));
  if (!serviceTabs.length || serviceTabs.length !== servicePanels.length) return;
  const services = servicePanels.map(panel => ({
    panel,
    tabs: Array.from(panel.querySelectorAll('[data-fr-page-tab]')),
    pages: Array.from(panel.querySelectorAll('[data-fr-page-panel]')),
    selectedPage: 0
  }));
  if (services.some(service => !service.tabs.length || service.tabs.length !== service.pages.length)) return;
  const destinations = new Map();
  services.forEach((service, serviceIndex) => {
    destinations.set(service.panel.dataset.frServiceId, { serviceIndex, pageIndex: 0 });
    service.pages.forEach((page, pageIndex) => destinations.set(page.id, { serviceIndex, pageIndex }));
  });
  let selectedService = 0;

  function selectPage(serviceIndex, pageIndex) {
    const service = services[serviceIndex];
    service.selectedPage = pageIndex;
    service.tabs.forEach((tab, index) => {
      const selected = index === pageIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      service.pages[index].hidden = !selected;
    });
  }

  function alignGuide() {
    guide.scrollIntoView({ block: 'start', behavior: 'auto' });
  }

  function activate(serviceIndex, pageIndex = services[serviceIndex].selectedPage, options = {}) {
    if (!services[serviceIndex] || !services[serviceIndex].pages[pageIndex]) return;
    selectedService = serviceIndex;
    serviceTabs.forEach((tab, index) => {
      const selected = index === serviceIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      services[index].panel.hidden = !selected;
    });
    selectPage(serviceIndex, pageIndex);
    const page = services[serviceIndex].pages[pageIndex];
    if (options.updateHash && location.hash !== `#${page.id}`) history.pushState(null, '', `#${page.id}`);
    if (options.align) alignGuide();
    if (options.focusPage) page.focus({ preventScroll: true });
  }

  function bindKeyboard(list, tabs, select) {
    list.addEventListener('keydown', event => {
      const index = tabs.indexOf(event.target.closest('[role="tab"]'));
      if (index < 0) return;
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(next);
      tabs[next].focus({ preventScroll: true });
    });
  }

  const primaryList = guide.querySelector('[data-fr-service-tabs]');
  serviceTabs.forEach((tab, index) => tab.addEventListener('click', () => activate(index, services[index].selectedPage, { updateHash: true })));
  bindKeyboard(primaryList, serviceTabs, index => activate(index, services[index].selectedPage, { updateHash: true }));
  services.forEach((service, serviceIndex) => {
    selectPage(serviceIndex, 0);
    service.tabs.forEach((tab, pageIndex) => tab.addEventListener('click', () => activate(serviceIndex, pageIndex, { updateHash: true })));
    bindKeyboard(service.panel.querySelector('[data-fr-page-tabs]'), service.tabs, pageIndex => activate(serviceIndex, pageIndex, { updateHash: true }));
  });

  function hashDestination(hash) {
    try { return destinations.get(decodeURIComponent(hash.replace(/^#/, ''))); }
    catch { return undefined; }
  }

  function applyHash(align = true) {
    const destination = hashDestination(location.hash);
    if (!destination) return false;
    activate(destination.serviceIndex, destination.pageIndex, { align });
    return true;
  }

  activate(0, 0);
  guide.dataset.frReady = 'true';
  const initialHash = location.hash;
  if (applyHash(false)) {
    requestAnimationFrame(alignGuide);
    if (document.readyState !== 'complete') window.addEventListener('load', () => {
      if (location.hash === initialHash) alignGuide();
    }, { once: true });
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    let url;
    try { url = new URL(link.href, location.href); }
    catch { return; }
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
    const destination = hashDestination(url.hash);
    if (!destination) return;
    event.preventDefault();
    activate(destination.serviceIndex, destination.pageIndex, { updateHash: true, align: true, focusPage: true });
  });

  let navigationFrame;
  function scheduleHashNavigation() {
    if (navigationFrame) cancelAnimationFrame(navigationFrame);
    navigationFrame = requestAnimationFrame(() => {
      navigationFrame = undefined;
      applyHash(true);
    });
  }
  window.addEventListener('hashchange', scheduleHashNavigation);
  window.addEventListener('popstate', scheduleHashNavigation);
})();
