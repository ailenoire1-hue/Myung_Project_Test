const contentDialog=document.querySelector('.content-sample-dialog');
if(contentDialog){
 document.querySelectorAll('[data-content-sample]').forEach(button=>button.addEventListener('click',()=>{
  contentDialog.querySelector('h2').textContent=button.dataset.contentSample+' 연결 예시';
  contentDialog.showModal();
 }));
 contentDialog.querySelectorAll('.sample-close,.sample-confirm').forEach(button=>button.addEventListener('click',()=>contentDialog.close()));
 contentDialog.addEventListener('click',event=>{if(event.target===contentDialog){const box=contentDialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)contentDialog.close();}});
}
