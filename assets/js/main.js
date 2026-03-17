// ─── NAVBAR SCROLL ───────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── MOBILE MENU ───────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.textContent = open ? '✕' : '☰';
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    if (navToggle) navToggle.textContent = '☰';
  });
});

// ─── HERO SCROLL INDICATOR ───────────────────────────────────────────────
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
  const next = document.querySelector('#events-preview') || document.querySelector('main');
  next?.scrollIntoView({ behavior: 'smooth' });
});

// ─── ACTIVE NAV LINK ───────────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── GALLERY LIGHTBOX ───────────────────────────────────────────────
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
let currentIdx = 0;

function openLightbox(idx) {
  if (!lightbox || !lightboxImg) return;
  currentIdx = idx;
  lightboxImg.src = galleryItems[idx].querySelector('img').src;
  lightboxImg.alt = galleryItems[idx].querySelector('img').alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
}
function shiftLightbox(dir) {
  currentIdx = (currentIdx + dir + galleryItems.length) % galleryItems.length;
  lightboxImg.src = galleryItems[currentIdx].querySelector('img').src;
}

galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
document.querySelector('.lb-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lb-next')?.addEventListener('click', () => shiftLightbox(1));
document.querySelector('.lb-prev')?.addEventListener('click', () => shiftLightbox(-1));
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') shiftLightbox(1);
  if (e.key === 'ArrowLeft')  shiftLightbox(-1);
});

// ─── SCROLL REVEAL (simple fade-in) ───────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}
