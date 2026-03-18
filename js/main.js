/* ===== Navbar shrink on scroll ===== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== Hero canvas — animated network/particle background ===== */
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

/* Node shapes */
const SHAPES = ['hexagon', 'diamond', 'square', 'ring'];

function drawShape(x, y, size, shape, color, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;

  if (shape === 'hexagon') {
    ctx.beginPath();
    for (let a = 0; a < 6; a++) {
      const angle = (Math.PI / 3) * a - Math.PI / 6;
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      if (a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  } else if (shape === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.7, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size * 0.7, y);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  } else if (shape === 'square') {
    const half = size * 0.7;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect(x - half, y - half, half * 2, half * 2);
  } else if (shape === 'ring') {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.restore();
}

function createParticles() {
  particles = [];
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const count = Math.floor((w * h) / 18000);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 4 + 3,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      opacity: Math.random() * 0.3 + 0.25,
      pulse: Math.random() * Math.PI * 2,
    });
  }
}

function drawParticles() {
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  ctx.clearRect(0, 0, w, h);

  /* Draw connections — visible teal/cyan lines */
  const maxDist = 150;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.35;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 180, 180, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  /* Draw nodes & update positions */
  for (const p of particles) {
    p.pulse += 0.015;
    const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.08;
    const nodeColor = `rgba(110, 100, 240, 1)`;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    drawShape(0, 0, p.size, p.shape, nodeColor, pulseOpacity);
    ctx.restore();

    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotSpeed;

    if (p.x < -20 || p.x > w + 20) p.vx *= -1;
    if (p.y < -20 || p.y > h + 20) p.vy *= -1;
  }

  animationId = requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener('resize', () => {
  cancelAnimationFrame(animationId);
  resizeCanvas();
  createParticles();
  drawParticles();
});


/* ===== Scroll reveal (Intersection Observer) ===== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ===== Smooth scroll for nav links ===== */
document.querySelectorAll('.nav-links a, .nav-logo').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
