/* ===== Shared Navigation ===== */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  const isIndex = page === '' || page === 'index.html' || page === '/' ;

  const homeHref = isIndex ? '#hero' : 'index.html';
  const aboutHref = isIndex ? '#about' : 'index.html#about';

  const navHTML = `
  <nav class="navbar" id="navbar">
    <div class="nav-inner">
      <a href="${homeHref}" class="nav-logo"><img src="img/logo.svg" alt="Resistance LLC" class="nav-logo-img"></a>
      <ul class="nav-links">
        <li><a href="${homeHref}">HOME</a></li>
        <li><a href="${aboutHref}">ABOUT</a></li>
        <li><a href="contact.html">CONTACT</a></li>
      </ul>
    </div>
  </nav>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  /* Navbar shrink on scroll */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* Smooth scroll for same-page hash links */
  document.querySelectorAll('.nav-links a, .nav-logo').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
