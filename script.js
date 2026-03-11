document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const navbar = document.querySelector('.navbar');

  function applyTheme(isDark) {
    body.classList.toggle('dark-mode', isDark);

    if (themeToggleBtn) {
      themeToggleBtn.textContent = isDark ? '🌙' : '☀️';
      themeToggleBtn.setAttribute(
        'aria-label',
        isDark ? 'Aktifkan light mode' : 'Aktifkan dark mode'
      );
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    applyTheme(true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const isDarkNow = !body.classList.contains('dark-mode');
      applyTheme(isDarkNow);
    });
  }

  function updateNavbarOnScroll() {
    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbarOnScroll);
  updateNavbarOnScroll();

  const navLinks = document.querySelectorAll('.navbar__menu a, .home__actions a');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');

      if (!targetId || !targetId.startsWith('#')) return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      event.preventDefault();

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const formFeedback = document.getElementById('form-feedback');

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = 'form-feedback show ' + type;
  }

  function isValidEmail(email) {
  return email.includes('@') && email.includes('.');
}

  if (contactForm && nameInput && emailInput && messageInput && formFeedback) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const nameValue = nameInput.value.trim();
      const emailValue = emailInput.value.trim();
      const messageValue = messageInput.value.trim();

      if (nameValue === '' || emailValue === '' || messageValue === '') {
        showFeedback('Semua field wajib diisi.', 'error');
        return;
      }

      if (nameValue.length < 3) {
        showFeedback('Nama minimal 3 karakter.', 'error');
        return;
      }

      if (!isValidEmail(emailValue)) {
        showFeedback('Format email belum valid. Contoh: nama@email.com', 'error');
        return;
      }

      if (messageValue.length < 10) {
        showFeedback('Pesan minimal 10 karakter.', 'error');
        return;
      }

      showFeedback('Pesan valid. Aplikasi email akan dibuka untuk mengirim pesan.', 'success');

      setTimeout(function () {
        contactForm.submit();
      }, 500);
    });
  }

  const counters = document.querySelectorAll('.stat-card__number');
  let counterStarted = false;

  function animateCounter(counter) {
    const target = Number(counter.getAttribute('data-target'));
    const duration = 1400;
    const stepTime = 20;
    const totalSteps = Math.max(1, Math.floor(duration / stepTime));
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(function () {
      current += increment;

      if (current >= target) {
        counter.textContent = target + (target === 100 ? '%' : '+');
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
      }
    }, stepTime);
  }

  function runCountersIfVisible() {
    const statsSection = document.querySelector('.home__stats');
    if (!statsSection || counterStarted) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      counters.forEach(function (counter) {
        animateCounter(counter);
      });
      counterStarted = true;
    }
  }

  window.addEventListener('scroll', runCountersIfVisible);
  runCountersIfVisible();
});

