// Keep previously shared preview links connected after service regrouping.
(()=>{
 const path=location.pathname.replace(/\.html$/,'').replace(/\/$/,'');
 const hash=location.hash;
 if(path.endsWith('/solutions-storage')){
  const forensic=['#forensic-solutions','#product-solutions','#mycro-mobile','#ddrc-rapid'].includes(hash);
  const target=forensic?'digital-forensics.html':'enterprise-security.html';
  location.replace(target+location.search+(forensic?'#analysis-fields':hash));
 }else if(path.endsWith('/digital-forensics')){
  if(['#remote-security','#employee-offboarding'].includes(hash))location.replace('enterprise-security.html'+location.search+hash);
  if(hash==='#mobile-system')location.replace('digital-forensics.html'+location.search+'#smartphone-forensics');
  if(['#forensic-solutions','#product-solutions','#mycro-mobile','#ddrc-rapid'].includes(hash))location.replace('digital-forensics.html'+location.search+'#analysis-fields');
 }
})();
