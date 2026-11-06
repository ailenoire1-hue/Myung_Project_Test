/* A1 only: native document scrolling, with one desktop wheel gesture per screen. */
(() => {
  'use strict';
  const body = document.body;
  if (!body?.classList.contains('fr-a1')) return;
  const screens = [...document.querySelectorAll('.fr-main [data-fr-screen]')];
  if (!screens.length) return;

  const desktop = matchMedia('(min-width: 1100px) and (min-height: 680px) and (hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const navLinks = [...document.querySelectorAll('.fr-chapter-nav a[href*="#"]')];
  const counters = [...document.querySelectorAll('.fr-screen-count')];
  const idleGap = 280;
  const edgeTolerance = 4;
  let headerOffset = 0;
  let heroOffset = 0;
  let activeIndex = -1;
  let animation = null;
  let scrollFrame = 0;
  let resizeFrame = 0;
  let manualInput = false;
  let touchUntil = 0;
  let wheel = { last: -Infinity, sum: 0, direction: 0, consumed: false, native: false, nativeIndex: null };

  const topOf = element => scrollY + element.getBoundingClientRect().top;
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const clamp = value => Math.max(0, Math.min(maxScroll(), value));
  const isVisible = element => !!element && !!element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden';

  function measure() {
    const header = document.querySelector('body.fr-a1 > .header');
    const declared = parseFloat(getComputedStyle(body).getPropertyValue('--fr-screen-offset'));
    const topbar = document.querySelector('.fr-topbar');
    heroOffset = header?.getBoundingClientRect().height || 0;
    headerOffset = Math.max(heroOffset + (topbar?.getBoundingClientRect().height || 0), Number.isFinite(declared) ? declared : 0);
    body.style.setProperty('--fr-a1-header-height', `${headerOffset}px`);
    body.classList.toggle('fr-paged-enabled', desktop.matches);
  }

  function bounds(index) {
    const screen = screens[index];
    const top = topOf(screen);
    const start = clamp(top - (index === 0 ? heroOffset : headerOffset));
    return { start, end: Math.max(start, clamp(top + screen.getBoundingClientRect().height - innerHeight)) };
  }

  function currentIndex() {
    const readingLine = scrollY + headerOffset + edgeTolerance;
    let index = 0;
    for (let i = 0; i < screens.length; i++) {
      if (topOf(screens[i]) <= readingLine) index = i;
      else break;
    }
    return index;
  }

  function targetForHash(hash) {
    if (!hash || hash === '#') return null;
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch { return null; }
  }

  function screenFor(target) {
    return screens.findIndex(screen => screen === target || screen.contains(target));
  }

  function offsetFor(target) { return screenFor(target) === 0 ? heroOffset : headerOffset; }

  function updateNavigation(index = currentIndex()) {
    if (activeIndex !== index) {
      screens[activeIndex]?.classList.remove('is-fr-active');
      screens[index].classList.add('is-fr-active');
      activeIndex = index;
    }
    let selected = null;
    let selectedIndex = -1;
    for (const link of navLinks) {
      const target = targetForHash(new URL(link.href, location.href).hash);
      const candidate = target ? screenFor(target) : -1;
      if (candidate >= 0 && candidate <= index && candidate >= selectedIndex) {
        selected = link;
        selectedIndex = candidate;
      }
    }
    for (const link of navLinks) {
      link.classList.toggle('is-active', link === selected);
      if (link === selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    for (const counter of counters) {
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(screens.length).padStart(2, '0')}`;
      counter.setAttribute('aria-label', `전체 ${screens.length}개 화면 중 ${index + 1}번째 화면`);
    }
  }

  function stopAnimation() {
    if (animation) cancelAnimationFrame(animation.frame);
    animation = null;
    body.classList.remove('fr-screen-moving');
  }

  function moveTo(y, smooth = true) {
    stopAnimation();
    const destination = clamp(y);
    const animate = smooth && !reducedMotion.matches && Math.abs(scrollY - destination) > 2;
    window.scrollTo({ top: destination, behavior: animate ? 'smooth' : 'instant' });
    if (!animate) { updateNavigation(); return; }
    const motion = { start: performance.now(), stable: 0, previous: scrollY, frame: 0 };
    animation = motion;
    body.classList.add('fr-screen-moving');
    const settle = now => {
      if (animation !== motion) return;
      const stopped = Math.abs(scrollY - motion.previous) < .5;
      motion.stable = stopped ? motion.stable + 1 : 0;
      motion.previous = scrollY;
      if ((now - motion.start > 350 && Math.abs(scrollY - destination) < 3 && motion.stable > 4) || now - motion.start > 1400) {
        stopAnimation();
        updateNavigation();
      } else motion.frame = requestAnimationFrame(settle);
    };
    motion.frame = requestAnimationFrame(settle);
  }

  function goTo(index, direction = 1) {
    if (index < 0 || index >= screens.length) return false;
    const range = bounds(index);
    // Returning to a tall screen exposes its bottom first; all content remains reachable.
    moveTo(direction < 0 ? range.end : range.start);
    return true;
  }

  function modalOrMenuOpen() {
    if ([...document.querySelectorAll('dialog[open], [role="dialog"][aria-modal="true"]')].some(isVisible)) return true;
    return [...document.querySelectorAll('body.fr-a1 > .header [aria-expanded="true"]')].some(isVisible);
  }

  function excludedTarget(target, keyboard = false) {
    if (!(target instanceof Element)) return false;
    const common = 'input,textarea,select,form,[contenteditable]:not([contenteditable="false"]),[role="textbox"],[role="slider"],[role="spinbutton"],dialog,[role="dialog"],.header,.fr-topbar';
    return !!target.closest(keyboard ? `${common},button,a,summary,[role="button"],[role="tab"],[role="listbox"]` : common);
  }

  function nestedScrollerCanMove(target, direction) {
    for (let element = target instanceof Element ? target : null; element && element !== body; element = element.parentElement) {
      if (!/(auto|scroll)/.test(getComputedStyle(element).overflowY) || element.scrollHeight <= element.clientHeight + 2) continue;
      if (direction > 0 ? element.scrollTop + element.clientHeight < element.scrollHeight - 2 : element.scrollTop > 2) return true;
    }
    return false;
  }

  function onWheel(event) {
    manualInput = true;
    const now = performance.now();
    if (!desktop.matches || now < touchUntil || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || modalOrMenuOpen() || excludedTarget(event.target)) return;
    if (!event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight - headerOffset : 1);
    const direction = Math.sign(delta);
    if (now - wheel.last > idleGap && !animation) wheel = { last: now, sum: 0, direction, consumed: false, native: false, nativeIndex: null };
    wheel.last = now;
    if (nestedScrollerCanMove(event.target, direction)) { wheel.native = true; return; }
    if (animation || wheel.consumed) { event.preventDefault(); return; }

    const index = currentIndex();
    const range = bounds(index);
    const remaining = direction > 0 ? range.end - scrollY : scrollY - range.start;
    if (remaining > edgeTolerance) {
      wheel.native = true;
      wheel.nativeIndex = index;
      // Let long content scroll naturally, but keep the final wheel delta inside this screen.
      if (Math.abs(delta) >= remaining) {
        event.preventDefault();
        wheel.consumed = true;
        moveTo(direction > 0 ? range.end : range.start, false);
      }
      return;
    }
    if (wheel.native) { event.preventDefault(); wheel.consumed = true; return; }
    const next = index + direction;
    if (next < 0 || next >= screens.length) return;
    event.preventDefault();
    if (wheel.direction !== direction) { wheel.sum = 0; wheel.direction = direction; }
    wheel.sum += Math.abs(delta);
    if (wheel.sum < 32) return;
    wheel.consumed = true;
    goTo(next, direction);
  }

  function onKey(event) {
    const supported = ['PageDown','PageUp','ArrowDown','ArrowUp',' ','Spacebar','Home','End'];
    if (!supported.includes(event.key)) return;
    manualInput = true;
    if (!desktop.matches || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.isComposing || modalOrMenuOpen() || excludedTarget(event.target, true)) return;
    if (event.shiftKey && event.key !== ' ' && event.key !== 'Spacebar') return;
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) return;
    const direction = ['PageUp','ArrowUp'].includes(event.key) || ([' ','Spacebar'].includes(event.key) && event.shiftKey) ? -1 : 1;
    if (nestedScrollerCanMove(event.target, direction)) return;
    event.preventDefault();
    if (event.repeat || animation) return;
    wheel.consumed = true;
    if (event.key === 'Home') { goTo(0); return; }
    if (event.key === 'End') { goTo(screens.length - 1); return; }
    const index = currentIndex();
    const range = bounds(index);
    const remaining = direction > 0 ? range.end - scrollY : scrollY - range.start;
    if (remaining > edgeTolerance) {
      const distance = event.key.startsWith('Arrow') ? 72 : Math.max(120, (innerHeight - headerOffset) * .85);
      moveTo(direction > 0 ? Math.min(range.end, scrollY + distance) : Math.max(range.start, scrollY - distance));
    } else goTo(index + direction, direction);
  }

  function alignHash(smooth = false) {
    const target = targetForHash(location.hash);
    if (target && screenFor(target) >= 0) moveTo(topOf(target) - offsetFor(target), smooth);
  }

  document.addEventListener('click', event => {
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
    const target = targetForHash(url.hash);
    if (!target || screenFor(target) < 0) return;
    event.preventDefault();
    manualInput = true;
    if (location.hash !== url.hash) history.pushState(null, '', url.hash);
    moveTo(topOf(target) - offsetFor(target));
  });

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKey);
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      // Native wheel smoothing can finish after the final event. Keep its tail within the long screen.
      if (desktop.matches && !animation && wheel.nativeIndex !== null && performance.now() - wheel.last < idleGap + 80) {
        const range = bounds(wheel.nativeIndex);
        if ((wheel.direction > 0 && scrollY > range.end + edgeTolerance) || (wheel.direction < 0 && scrollY < range.start - edgeTolerance)) {
          wheel.consumed = true;
          window.scrollTo({ top: wheel.direction > 0 ? range.end : range.start, behavior: 'instant' });
        }
      }
      updateNavigation();
    });
  }, { passive: true });
  window.addEventListener('pointerdown', event => {
    manualInput = true;
    wheel = { last: -Infinity, sum: 0, direction: 0, consumed: false, native: false, nativeIndex: null };
    if (event.pointerType === 'touch') touchUntil = performance.now() + 1200;
    if (animation) { stopAnimation(); window.scrollTo({ top: scrollY, behavior: 'instant' }); }
  }, { passive: true });
  window.addEventListener('hashchange', () => { measure(); alignHash(); });
  const resize = () => {
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      stopAnimation();
      wheel = { last: -Infinity, sum: 0, direction: 0, consumed: false, native: false, nativeIndex: null };
      measure();
      updateNavigation();
    });
  };
  window.addEventListener('resize', resize, { passive: true });
  desktop.addEventListener('change', resize);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && animation) { stopAnimation(); window.scrollTo({ top: scrollY, behavior: 'instant' }); }
  });
  measure();
  updateNavigation();
  requestAnimationFrame(() => { if (!manualInput) alignHash(); });
  window.addEventListener('load', () => { measure(); if (!manualInput) alignHash(); updateNavigation(); }, { once: true });
})();
