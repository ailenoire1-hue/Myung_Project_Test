// Preserve previously shared service anchors after adopting the A1 chapters.
(() => {
 const path=location.pathname.replace(/\.html$/,'').replace(/\/$/,'');
 if(!path.endsWith('/digital-forensics'))return;
 const aliases={
  'analysis-fields':'data-leakage','pc-storage':'data-leakage',
  'smartphone-forensics':'mobile-evidence','mobile-forensics':'mobile-evidence','mobile-system':'mobile-evidence',
  'messenger-forensics':'messenger-analysis','messenger-media':'messenger-analysis',
  'audio-video':'media-authenticity',
  'pc-storage-approach':'data-leakage-analysis',
  'smartphone-forensics-approach':'mobile-evidence-analysis',
  'messenger-forensics-approach':'messenger-analysis',
  'audio-video-approach':'media-authenticity-analysis',
  'analysis-deliverables':'mobile-evidence-analysis','deliverables':'mobile-evidence-analysis',
  'process':'contact','analysis-process':'contact',
  'forensic-solutions':'overview','product-solutions':'overview','mycro-mobile':'overview','ddrc-rapid':'overview'
 };
 function normalizeHash(){
  const oldId=location.hash.slice(1);
  if(['remote-security','employee-offboarding'].includes(oldId)){
   location.replace('enterprise-security.html'+location.search+location.hash);
   return;
  }
  const target=aliases[oldId];
  if(target)history.replaceState(history.state,'',location.pathname+location.search+'#'+target);
 }
 normalizeHash();
 window.addEventListener('hashchange',normalizeHash);
})();
