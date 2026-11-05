const incidentReference = document.querySelector('.home-incident-concept');
const incidentReferencePhoto = document.querySelector('.home-incident-reference-visual');
const incidentReferenceHeader = document.querySelector('.header');
let incidentReferenceTick;
function updateIncidentReferenceHeader(){
 incidentReferenceTick = null;
 const sample = Math.max(1,Math.min(incidentReferenceHeader.getBoundingClientRect().bottom - 1,60));
 const upperPanel = [...document.querySelectorAll('[data-home-stack-panel]')].filter(panel=>{const r=panel.getBoundingClientRect();return r.top<=sample&&r.bottom>sample;}).at(-1);
 const r = incidentReferencePhoto.getBoundingClientRect();
 incidentReferenceHeader.classList.toggle('is-incident-reference',upperPanel===incidentReference && r.top<=sample && r.bottom>sample);
}
function queueIncidentReferenceHeader(){if(!incidentReferenceTick)incidentReferenceTick=requestAnimationFrame(updateIncidentReferenceHeader);}
['scroll','resize','load','hashchange'].forEach(event=>addEventListener(event,queueIncidentReferenceHeader,{passive:true}));
updateIncidentReferenceHeader();
