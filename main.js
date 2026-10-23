/**
 * THE INTENTIONAL CHIC - Interactive Logic & UI Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mainNav.classList.toggle('active');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
      mobileBtn.innerHTML = isExpanded ? '&times;' : '&#9776;';
    });
  }

  // 2. FAQ Accordion Functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', !isExpanded);
      if (answer) {
        answer.style.display = isExpanded ? 'none' : 'block';
      }
    });
  });

  // 3. Interactive Cost-Per-Wear & Intentional Purchase Calculator
  const calcBtn = document.getElementById('calculate-cpw');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const priceInput = document.getElementById('item-price');
      const wearsInput = document.getElementById('estimated-wears');
      const resultBox = document.getElementById('cpw-result');
      const verdictBox = document.getElementById('cpw-verdict');

      const price = parseFloat(priceInput.value);
      const wears = parseInt(wearsInput.value, 10);

      if (isNaN(price) || isNaN(wears) || wears <= 0 || price < 0) {
        alert('Please enter a valid price and estimated wears (minimum 1 wear).');
        return;
      }

      const cpw = (price / wears).toFixed(2);
      if (resultBox) {
        resultBox.textContent = `£${cpw}`;
      }

      if (verdictBox) {
        if (cpw <= 2.50) {
          verdictBox.innerHTML = '<span style="color: #4ade80;">Excellent Intentional Investment</span> — High utility asset that beats fast-fashion disposable turnover.';
        } else if (cpw <= 7.00) {
          verdictBox.innerHTML = '<span style="color: #facc15;">Solid Capsule Staple</span> — Healthy ratio for intentional occasions and classic staples.';
        } else {
          verdictBox.innerHTML = '<span style="color: #f87171;">Potential Insecurity / Impulse Spend</span> — Consider waiting 30 days or exploring archival second-hand alternatives.';
        }
      }
    });
  }

  // 4. Newsletter & Free Guides Capture Handler
  const forms = document.querySelectorAll('.newsletter-form, #lead-capture-form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn ? btn.textContent : 'Subscribe';
        if (btn) btn.textContent = 'Welcome Aboard!';
        
        // Show success state
        setTimeout(() => {
          alert(`Thank you for subscribing to The Intentional Chic! Your free starter guides and weekly dispatch will be delivered to ${emailInput.value}.`);
          emailInput.value = '';
          if (btn) btn.textContent = originalText;
        }, 300);
      }
    });
  });

  // 5. Contact Form Handler
  const contactForm = document.getElementById('site-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      alert(`Thank you, ${name}! Your inquiry has been sent to the editorial team at The Intentional Chic. We typically respond within 24-48 business hours.`);
      contactForm.reset();
    });
  }

  // 6. Articles Archive Category Filter (Substack / Magazine Style)
  const filterTabs = document.querySelectorAll('.filter-tab');
  const articleCards = document.querySelectorAll('.archive-article-card');

  if (filterTabs.length > 0 && articleCards.length > 0) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const selectedCategory = tab.getAttribute('data-filter');

        articleCards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (selectedCategory === 'all' || cardCat === selectedCategory) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
