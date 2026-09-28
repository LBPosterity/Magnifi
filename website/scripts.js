function toggleNav(which){
  var fm=document.getElementById('feat-menu'),rm=document.getElementById('res-menu');
  var fb=document.getElementById('feat-btn'),rb=document.getElementById('res-btn');
  if(which==='feat'){
    var o=fm.classList.contains('open');
    fm.classList.toggle('open',!o);fb.classList.toggle('open',!o);
    rm.classList.remove('open');rb.classList.remove('open');
  }else{
    var o=rm.classList.contains('open');
    rm.classList.toggle('open',!o);rb.classList.toggle('open',!o);
    fm.classList.remove('open');fb.classList.remove('open');
  }
}
document.addEventListener('click',function(e){
  if(!e.target.closest('#feat-btn')&&!e.target.closest('#feat-menu')){
    var m=document.getElementById('feat-menu'),b=document.getElementById('feat-btn');
    if(m)m.classList.remove('open');if(b)b.classList.remove('open');
  }
  if(!e.target.closest('#res-btn')&&!e.target.closest('#res-menu')){
    var m=document.getElementById('res-menu'),b=document.getElementById('res-btn');
    if(m)m.classList.remove('open');if(b)b.classList.remove('open');
  }
});
