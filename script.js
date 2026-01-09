document.addEventListener('DOMContentLoaded',function(){
  // Year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // Nav toggle for small screens
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  
  if(navToggle && siteNav){
    navToggle.addEventListener('click',()=>{
      const isOpen = siteNav.classList.toggle('open');
      navToggle.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href && href.length > 1){
        const t = document.querySelector(href);
        if(t) {
          e.preventDefault();
          t.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal, .service-card, .card, .about-bio');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>obs.observe(r));
});
