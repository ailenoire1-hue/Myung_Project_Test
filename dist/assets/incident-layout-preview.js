const previewHeader = document.querySelector('.incident-preview-page .header');
const previewVisual = document.querySelector('.incident-split-visual');
const mobilePreview = matchMedia('(max-width:800px)');
let previewFrame;
function updatePreviewHeader(){
 previewFrame = null;
 previewHeader.classList.toggle('is-preview-light',mobilePreview.matches && previewVisual.getBoundingClientRect().bottom <= 96);
}
function queuePreviewHeader(){if(!previewFrame)previewFrame=requestAnimationFrame(updatePreviewHeader);}
window.addEventListener('scroll',queuePreviewHeader,{passive:true});
window.addEventListener('resize',queuePreviewHeader,{passive:true});
updatePreviewHeader();
