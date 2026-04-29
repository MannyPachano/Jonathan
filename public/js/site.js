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
