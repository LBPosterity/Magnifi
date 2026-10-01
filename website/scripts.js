var LOGO_SRC = "data:image/jpeg;base64,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";

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
  // Mobile menu: close when a link inside it is followed, or when the backdrop (the dialog itself, outside its content) is clicked
  var mnav=document.getElementById('m-nav');
  if(mnav&&mnav.open&&(e.target===mnav||e.target.closest('#m-nav a'))) closeMobileNav();
});

// Mobile menu (below 1000px) - a native <dialog>, so Esc and focus trapping come for free
function openMobileNav(){
  var d=document.getElementById('m-nav');
  if(!d||d.open) return;
  d.showModal();
  document.getElementById('m-nav-btn').setAttribute('aria-expanded','true');
}
function closeMobileNav(){
  var d=document.getElementById('m-nav');
  if(d&&d.open) d.close();
  var b=document.getElementById('m-nav-btn');
  if(b) b.setAttribute('aria-expanded','false');
}
// Close the mobile menu if the window is widened past the breakpoint
window.matchMedia('(min-width:62.5rem)').addEventListener('change',function(e){ if(e.matches) closeMobileNav(); });

// FAQ accordion: close other open <details> when one opens
document.querySelectorAll('details').forEach(function(d){
  d.addEventListener('toggle',function(){
    if(d.open) document.querySelectorAll('details').forEach(function(o){ if(o!==d) o.removeAttribute('open'); });
  });
});

// Loads a shared partial (e.g. nav.html) into the element with the given id, replacing it.
// Uses fetch, so the site must be served over http (e.g. Live Server), not opened via file://
function loadPartial(id,file,onLoad){
  var mount=document.getElementById(id);
  if(!mount) return;
  fetch(file,{cache:'no-cache'})
    .then(function(r){ if(!r.ok) throw new Error(r.status); return r.text(); })
    .then(function(html){
      // Strip Live Server's injected reload script and the trailing marker/note that keeps its injection in one place (see end of nav.html)
      html=html.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/g,'')
               .replace(/<!-- Keep the tag below[\s\S]*?-->\s*<\/body>\s*$/i,'');
      mount.outerHTML=html;
      document.querySelectorAll('img[data-logo]').forEach(function(img){ img.src=LOGO_SRC; });
      if(onLoad) onLoad(mount);
    })
    .catch(function(err){ console.warn('Could not load '+file+' (open the site via Live Server, not file://):',err); });
}

function injectLayout(){
  loadPartial('site-nav','nav.html',function(mount){
    // Highlight the current page's link in both the desktop and mobile menus, set via data-page on #site-nav
    var page=mount.getAttribute('data-page');
    if(page) document.querySelectorAll('[data-nav="'+page+'"]').forEach(function(a){ a.classList.add('current'); });
    // Arriving via a link like magnifi-homepage.html#pricing: the browser scrolled before the nav was inserted and the web font loaded
    // (both shift the content), so re-align to the target once they're done
    var target=location.hash&&document.getElementById(location.hash.slice(1));
    if(target) document.fonts.ready.then(function(){ target.scrollIntoView({behavior:'instant'}); });
    // Keep the burger's aria-expanded in sync however the dialog closes (Esc, link, backdrop, close button)
    var mnav=document.getElementById('m-nav');
    if(mnav) mnav.addEventListener('close',function(){ document.getElementById('m-nav-btn').setAttribute('aria-expanded','false'); });
  });
  loadPartial('site-footer','footer.html');
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',injectLayout);
else injectLayout();
