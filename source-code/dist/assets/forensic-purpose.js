(() => {
 const header = document.querySelector('.dp-page .header');
 if (!header) return;
 const updateHeight = () => document.documentElement.style.setProperty('--dp-header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
 const updateScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
 new ResizeObserver(updateHeight).observe(header);
 window.addEventListener('scroll', updateScroll, {passive:true});
 updateHeight(); updateScroll();
})();
