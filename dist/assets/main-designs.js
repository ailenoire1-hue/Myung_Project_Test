if (new URLSearchParams(location.search).get('gallery') === '1') document.documentElement.classList.add('main-design-embed');
document.querySelectorAll('.main-option-frame').forEach(frame => {
  const iframe = frame.querySelector('iframe');
  const resize = () => {
    const scale = frame.clientWidth / 1200;
    iframe.style.transform = `scale(${scale})`;
    frame.style.height = `${750 * scale}px`;
  };
  new ResizeObserver(resize).observe(frame);
  resize();
});
