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
  const reveals = document.querySelectorAll('.reveal, .slide-left, .service-card, .card, .about-bio');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>obs.observe(r));

  // Pricing Logic
  const eventSelect = document.getElementById('eventSelect');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const totalPriceEl = document.getElementById('totalPrice');
  const totalPriceInput = document.getElementById('totalPriceInput');

  function calculateTotal() {
    let total = 0;
    
    // Base event price
    if (eventSelect) {
      const selectedOption = eventSelect.options[eventSelect.selectedIndex];
      total += parseInt(selectedOption.getAttribute('data-price') || 0);
    }

    // Addons
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        total += parseInt(cb.getAttribute('data-price') || 0);
      }
    });

    if (totalPriceEl) totalPriceEl.textContent = `£${total}`;
    if (totalPriceInput) totalPriceInput.value = total;
  }

  if (eventSelect) {
    eventSelect.addEventListener('change', calculateTotal);
    addonCheckboxes.forEach(cb => cb.addEventListener('change', calculateTotal));
  }

  // EmailJS Integration
  const bookingForm = document.getElementById('bookingForm');
  const formFeedback = document.getElementById('formFeedback');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Collect add-ons
      const selectedAddons = [];
      addonCheckboxes.forEach(cb => {
        if (cb.checked) selectedAddons.push(cb.value);
      });

      const templateParams = {
        from_name: bookingForm.name.value,
        from_email: bookingForm.email.value,
        phone: bookingForm.phone.value,
        event_type: bookingForm.event.value,
        addons: selectedAddons.join(', ') || 'None',
        preferred_date: bookingForm.date.value,
        preferred_time: bookingForm.time.value,
        message: bookingForm.message.value,
        total_price: totalPriceInput.value
      };

      // Replace these with your actual Service ID and Template ID from EmailJS
      // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      //   .then(function() {
      //      formFeedback.textContent = 'Request sent successfully! We will contact you soon.';
      //      formFeedback.className = 'text-sm text-green-600';
      //      bookingForm.reset();
      //      calculateTotal();
      //   }, function(error) {
      //      formFeedback.textContent = 'Failed to send request. Please try again or contact us via WhatsApp.';
      //      formFeedback.className = 'text-sm text-red-600';
      //   })
      //   .finally(() => {
      //      submitBtn.textContent = originalBtnText;
      //      submitBtn.disabled = false;
      //   });

      // Simulation for now (since I don't have the user's IDs)
      console.log('Form submitted with:', templateParams);
      setTimeout(() => {
        formFeedback.textContent = 'Request sent successfully! (Simulation)';
        formFeedback.className = 'text-sm text-green-600';
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        bookingForm.reset();
        calculateTotal();
      }, 1500);
    });
  }
});
