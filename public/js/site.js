// FAQ accordion (works on homepage and faq page)
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  if(!q) return;
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      // only collapse siblings within the same faq-list to allow per-category accordion
      if(o.parentElement === item.parentElement) o.classList.remove('open');
    });
    if(!isOpen) item.classList.add('open');
  });
});

// dynamic year in footer
const yrEl = document.getElementById('yr');
if(yrEl) yrEl.textContent = new Date().getFullYear();

// mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if(navToggle && mobileMenu){
  const setMenu = open => {
    navToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  };
  const isOpen = () => mobileMenu.classList.contains('open');
  navToggle.addEventListener('click', () => setMenu(!isOpen()));
  // close on link click
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  // close on Escape
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && isOpen()) setMenu(false); });
  // close on outside click (tap outside nav + menu)
  document.addEventListener('click', e => {
    if(isOpen() && !mobileMenu.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
  });
}

// hide the sticky mobile CTA bar while the #book form is on screen
const ctaBar = document.getElementById('mobile-cta-bar');
const bookSection = document.getElementById('book');
if(ctaBar && bookSection && 'IntersectionObserver' in window){
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => ctaBar.classList.toggle('mcb-hide', entry.isIntersecting));
  }, { threshold: 0 });
  io.observe(bookSection);
}

// click-to-load YouTube facade: no iframe until the user asks for it
document.querySelectorAll('.video-facade').forEach(facade => {
  const btn = facade.querySelector('.video-play');
  if(!btn) return;
  btn.addEventListener('click', () => {
    const id = (facade.getAttribute('data-video-id') || '').trim();
    if(!id){
      // no clip supplied yet -> send them to the channel
      const url = facade.getAttribute('data-channel-url');
      if(url) window.open(url, '_blank', 'noopener');
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.className = 'video-embed';
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    iframe.title = 'Free Hat video';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');
    facade.appendChild(iframe);
    btn.remove();
  });
});

// pricing CTA -> scroll to #book form and preselect the Plan <select>
const planMap = {
  trial: 'Free trial lesson',
  monthly: 'Weekly lessons ($159/mo)',
  alacarte: 'Single lesson ($50)'
};
document.querySelectorAll('[data-plan]').forEach(el => {
  el.addEventListener('click', e => {
    const plan = el.getAttribute('data-plan');
    const select = document.getElementById('bf-plan');
    if(select && planMap[plan]) select.value = planMap[plan];
    // let the native #book anchor jump handle scrolling
  });
});
