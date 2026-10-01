// =====================================================================
// scripts.js - shared behaviour for every page.
// Loads the shared header (nav.html) and footer (footer.html), runs the
// header menus and the FAQ accordion. Bump the ?v= number in every page's
// <script src="scripts.js?v=..."> after changing this file.
// =====================================================================

// ---------- header dropdowns (Features mega menu, Resources) ----------
var NAV_MENUS = ['features', 'resources'];   // each has #<name>-btn and #<name>-menu

function setMenu(name, open){
  var btn = document.getElementById(name + '-btn'), menu = document.getElementById(name + '-menu');
  if(!btn || !menu) return;
  menu.classList.toggle('is-open', open);
  btn.classList.toggle('is-open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function toggleNav(name){
  var menu = document.getElementById(name + '-menu');
  var open = menu && !menu.classList.contains('is-open');
  NAV_MENUS.forEach(function(n){ setMenu(n, n === name && open); });
}

document.addEventListener('click', function(e){
  // close a dropdown when clicking anywhere outside it
  NAV_MENUS.forEach(function(n){
    if(!e.target.closest('#' + n + '-btn') && !e.target.closest('#' + n + '-menu')) setMenu(n, false);
  });
  // mobile menu: close when a link inside it is followed, or when the backdrop (the dialog itself) is clicked
  var mobileNav = document.getElementById('mobile-nav');
  if(mobileNav && mobileNav.open && (e.target === mobileNav || e.target.closest('#mobile-nav a'))) closeMobileNav();
});

// ---------- mobile menu (below 1000px) - a native <dialog>, so Esc and focus trapping come for free ----------
function openMobileNav(){
  var dialog = document.getElementById('mobile-nav');
  if(!dialog || dialog.open) return;
  dialog.showModal();
  document.getElementById('mobile-nav-btn').setAttribute('aria-expanded', 'true');
}

function closeMobileNav(){
  var dialog = document.getElementById('mobile-nav');
  if(dialog && dialog.open) dialog.close();
  var btn = document.getElementById('mobile-nav-btn');
  if(btn) btn.setAttribute('aria-expanded', 'false');
}

// close the mobile menu if the window is widened past the breakpoint
window.matchMedia('(min-width:62.5rem)').addEventListener('change', function(e){ if(e.matches) closeMobileNav(); });

// ---------- FAQ accordion: opening one question closes the others ----------
document.querySelectorAll('.faq details').forEach(function(item){
  item.addEventListener('toggle', function(){
    if(item.open) document.querySelectorAll('.faq details').forEach(function(other){ if(other !== item) other.removeAttribute('open'); });
  });
});

// ---------- shared header & footer ----------
// Loads a partial (e.g. nav.html) into the element with the given id, replacing it.
// Uses fetch, so the site must be served over http (e.g. Live Server), not opened via file://
function loadPartial(id, file, onLoad){
  var mount = document.getElementById(id);
  if(!mount) return;
  fetch(file, {cache: 'no-cache'})
    .then(function(r){ if(!r.ok) throw new Error(r.status); return r.text(); })
    .then(function(html){
      // Strip Live Server's injected reload script and the trailing marker/note that keeps its injection in one place (see end of nav.html)
      html = html.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/g, '')
                 .replace(/<!-- Keep the tag below[\s\S]*?-->\s*<\/body>\s*$/i, '');
      mount.outerHTML = html;
      if(onLoad) onLoad(mount);
    })
    .catch(function(err){ console.warn('Could not load ' + file + ' (open the site via Live Server, not file://):', err); });
}

function injectLayout(){
  loadPartial('site-nav', 'nav.html', function(mount){
    // highlight the current page's link in both the desktop and mobile menus, set via data-page on #site-nav
    var page = mount.getAttribute('data-page');
    if(page) document.querySelectorAll('[data-nav="' + page + '"]').forEach(function(link){ link.classList.add('is-current'); });
    // arriving via a link like magnifi-homepage.html#pricing: the browser scrolled before the header was inserted and the
    // web font loaded (both shift the content), so re-align to the target once they're done
    var target = location.hash && document.getElementById(location.hash.slice(1));
    if(target) document.fonts.ready.then(function(){ target.scrollIntoView({behavior: 'instant'}); });
    // keep the burger's aria-expanded in sync however the dialog closes (Esc, link, backdrop, close button)
    var mobileNav = document.getElementById('mobile-nav');
    if(mobileNav) mobileNav.addEventListener('close', function(){ document.getElementById('mobile-nav-btn').setAttribute('aria-expanded', 'false'); });
  });
  loadPartial('site-footer', 'footer.html');
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectLayout);
else injectLayout();
