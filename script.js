/* ============================
   PORTFOLIO JS — Mayank Kumar
   ============================ */

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (window.matchMedia('(hover: hover)').matches) {
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .project-card, .cert-card, .exp-card, .skill-pill, .tag').forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
  });
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HERO TYPEWRITER =====
const words = [
  'Full-Stack Developer',
  'AI/ML Enthusiast',
  'Blockchain Builder',
  'Problem Solver',
  'Open Source Contributor'
];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const dynamicText = document.getElementById('dynamicText');

function typeWriter() {
  const current = words[wordIndex];
  if (isDeleting) {
    dynamicText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    dynamicText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1800);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeWriter, isDeleting ? 60 : 90);
}
typeWriter();

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '108,99,255' : '168,85,247';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

function initParticles(count = 80) {
  particles = Array.from({ length: count }, () => new Particle());
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(108,99,255,${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  animFrame = requestAnimationFrame(animateParticles);
}

initParticles(window.innerWidth < 768 ? 40 : 80);
animateParticles();

// ===== SCROLL ANIMATIONS (AOS-like) =====
const aoElements = document.querySelectorAll('[data-aos]');
const aoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

aoElements.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  aoObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  let current = 0;
  const duration = 1200;
  const step = target / (duration / 16);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = true;
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== 3D TILT ON ABOUT CARD =====
const aboutCard = document.querySelector('.about-card-3d');
if (aboutCard) {
  aboutCard.addEventListener('mousemove', (e) => {
    const rect = aboutCard.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * 15;
    const ry = ((e.clientX - cx) / rect.width) * -15;
    aboutCard.querySelector('.card-inner').style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  aboutCard.addEventListener('mouseleave', () => {
    aboutCard.querySelector('.card-inner').style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.toggle('active-nav', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// Style active nav links
const styleEl = document.createElement('style');
styleEl.textContent = `.nav-link.active-nav { color: var(--text-primary) !important; } .nav-link.active-nav::after { width: 100% !important; }`;
document.head.appendChild(styleEl);

// ===== PROJECT CARD MOUSE MOVE GLOW =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(108,99,255,0.08) 0%, rgba(255,255,255,0.03) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--bg-card)';
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  if (!name || !email || !message) {
    showStatus('Please fill in all required fields.', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending...';

  // Simulate sending (no backend — open mailto link)
  await new Promise(r => setTimeout(r, 1000));

  const mailtoLink = `mailto:mayankthakur827@gmail.com?subject=${encodeURIComponent(subject || `Portfolio Contact: ${name}`)}&body=${encodeURIComponent(`Hi Mayank,\n\nName: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailtoLink;

  showStatus('✅ Your email client has been opened! Thanks for reaching out.', 'success');
  contactForm.reset();
  submitBtn.disabled = false;
  submitBtn.querySelector('.btn-text').textContent = 'Send Message';
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
  setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 6000);
}

// ===== SMOOTH SECTION REVEAL STAGGER =====
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('[data-aos]');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 120);
      });
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.section').forEach(s => staggerObserver.observe(s));

// ===== HERO PARALLAX =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
  }
}, { passive: true });

// ===== SKILL PILL HOVER RIPPLE =====
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = pill.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:100px; height:100px;
      background:rgba(108,99,255,0.25);
      transform:scale(0);
      animation:ripple 0.5s linear;
      left:${e.clientX - rect.left - 50}px;
      top:${e.clientY - rect.top - 50}px;
      pointer-events:none;
    `;
    pill.style.position = 'relative';
    pill.style.overflow = 'hidden';
    pill.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(3); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

console.log('%c✨ Mayank Kumar Portfolio', 'color:#6c63ff;font-size:18px;font-weight:bold;');
console.log('%cBuilt with passion and code 🚀', 'color:#a855f7;font-size:12px;');
