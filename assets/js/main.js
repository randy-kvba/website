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
// Close mobile menu when a non-dropdown link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    // Only close if NOT the parent trigger of a dropdown on mobile
    if (window.innerWidth > 920) return;
    const isDropdownParent = link.closest('.has-dropdown') &&
                             !link.closest('.dropdown');
    if (!isDropdownParent) {
      navLinks?.classList.remove('open');
      if (navToggle) navToggle.textContent = '☰';
    }
  });
});

// ─── MOBILE DROPDOWN ACCORDION ─────────────────────────────────
document.querySelectorAll('.has-dropdown > a').forEach(trigger => {
  trigger.addEventListener('click', function (e) {
    if (window.innerWidth > 920) return; // desktop uses hover
    e.preventDefault();
    const parent = this.closest('.has-dropdown');
    const isOpen = parent.classList.contains('open');
    // Close all other open dropdowns
    document.querySelectorAll('.has-dropdown.open').forEach(el => {
      if (el !== parent) el.classList.remove('open');
    });
    parent.classList.toggle('open', !isOpen);
  });
});

// ─── AUTO-ACTIVE NAV LINK ──────────────────────────────────────
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    if (!href || href === '#') return;
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
      // If inside a dropdown, highlight the parent top-level link too
      const dropdownParent = a.closest('.dropdown');
      if (dropdownParent) {
        const parentLink = a.closest('.has-dropdown')?.querySelector(':scope > a');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
})();

// ─── HERO SCROLL INDICATOR ───────────────────────────────────────────────
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
  const next = document.querySelector('#events-preview') || document.querySelector('main');
  next?.scrollIntoView({ behavior: 'smooth' });
});

// ─── HERO SLIDESHOW ───────────────────────────────────────────────
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots   = document.querySelectorAll('.hero-dot');
let heroIdx   = 0;
let heroTimer = null;

function goToHeroSlide(idx) {
  heroSlides[heroIdx].classList.remove('active');
  heroDots[heroIdx]?.classList.remove('active');
  heroIdx = (idx + heroSlides.length) % heroSlides.length;
  heroSlides[heroIdx].classList.add('active');
  heroDots[heroIdx]?.classList.add('active');
}

function startHeroTimer() { heroTimer = setInterval(() => goToHeroSlide(heroIdx + 1), 5000); }
function stopHeroTimer()  { clearInterval(heroTimer); heroTimer = null; }

if (heroSlides.length > 1) {
  startHeroTimer();
  // Pause rotation while user hovers over the hero
  const heroEl = document.getElementById('hero');
  heroEl?.addEventListener('mouseenter', stopHeroTimer);
  heroEl?.addEventListener('mouseleave', startHeroTimer);
  // Dot clicks jump to that slide and reset the timer
  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopHeroTimer(); goToHeroSlide(i); startHeroTimer(); });
  });
  // Prev / Next arrow buttons
  document.getElementById('heroPrev')?.addEventListener('click', () => { stopHeroTimer(); goToHeroSlide(heroIdx - 1); startHeroTimer(); });
  document.getElementById('heroNext')?.addEventListener('click', () => { stopHeroTimer(); goToHeroSlide(heroIdx + 1); startHeroTimer(); });
}

// ─── ACTIVE NAV LINK ───────────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── GALLERY LIGHTBOX ───────────────────────────────────────────────
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lbCounter    = document.getElementById('lbCounter');
const lbFilmstrip  = document.getElementById('lbFilmstrip');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
let currentIdx = 0;

// Build filmstrip thumbnails once
if (lbFilmstrip && galleryItems.length) {
  galleryItems.forEach((item, i) => {
    const src = item.querySelector('img').src;
    const alt = item.querySelector('img').alt || '';
    const thumb = document.createElement('img');
    thumb.src = src;
    thumb.alt = alt;
    thumb.className = 'lb-thumb';
    thumb.addEventListener('click', () => goToSlide(i));
    lbFilmstrip.appendChild(thumb);
  });
}

function updateLightbox() {
  const img = galleryItems[currentIdx].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
  if (lbCounter) lbCounter.textContent = `${currentIdx + 1} / ${galleryItems.length}`;
  // Update filmstrip active state and scroll thumb into view
  if (lbFilmstrip) {
    Array.from(lbFilmstrip.children).forEach((t, i) => {
      t.classList.toggle('lb-thumb-active', i === currentIdx);
    });
    const activeThumb = lbFilmstrip.children[currentIdx];
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }
}

function openLightbox(idx) {
  if (!lightbox || !lightboxImg) return;
  currentIdx = ((idx % galleryItems.length) + galleryItems.length) % galleryItems.length;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
}
function goToSlide(idx) {
  currentIdx = ((idx % galleryItems.length) + galleryItems.length) % galleryItems.length;
  updateLightbox();
}
function shiftLightbox(dir) {
  goToSlide(currentIdx + dir);
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

// ─── MAILTO COPY HELPER ───────────────────────────────────────────────────────
// Many users (especially on desktop Macs) don't have a default mail app set up,
// so mailto: links silently fail.  This enhancer:
//   • Shows the email address as visible text when the link label isn't already an address
//   • Appends a small copy-to-clipboard button to every non-button mailto link
//   • Adds an "or email: address [copy]" line below button-style mailto links
(function () {
  const COPY_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const CHECK_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

  function doCopy(btn, email) {
    const finish = () => {
      btn.innerHTML = CHECK_SVG;
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = COPY_SVG; btn.classList.remove('copied'); }, 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(finish).catch(() => legacyCopy(btn, email, finish));
    } else {
      legacyCopy(btn, email, finish);
    }
  }

  function legacyCopy(btn, email, finish) {
    const ta = document.createElement('textarea');
    ta.value = email; ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); finish(); } catch(e) {}
    document.body.removeChild(ta);
  }

  function makeCopyBtn(email) {
    const btn = document.createElement('button');
    btn.className = 'mailto-copy';
    btn.title = 'Copy email address';
    btn.setAttribute('aria-label', 'Copy ' + email + ' to clipboard');
    btn.innerHTML = COPY_SVG;
    btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); doCopy(btn, email); });
    return btn;
  }

  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    const email = link.getAttribute('href').replace(/^mailto:/i, '').split('?')[0];
    const labelIsEmail = link.textContent.trim().toLowerCase() === email.toLowerCase();
    const isBtn = link.classList.contains('btn');

    if (isBtn) {
      // For button-style links, add a small "or email: …" line beneath the button
      const bar = document.createElement('p');
      bar.className = 'mailto-btn-bar';
      bar.innerHTML = 'or email: <span class="mailto-address">' + email + '</span>';
      bar.appendChild(makeCopyBtn(email));
      // Insert after the button (account for the button possibly being inside a wrapper)
      link.insertAdjacentElement('afterend', bar);
    } else {
      // Inline / footer links: wrap in a span, optionally show hint, add copy button
      const wrap = document.createElement('span');
      wrap.className = 'mailto-wrap';
      link.parentNode.insertBefore(wrap, link);
      wrap.appendChild(link);
      if (!labelIsEmail) {
        const hint = document.createElement('span');
        hint.className = 'mailto-hint';
        hint.textContent = email;
        hint.setAttribute('aria-hidden', 'true');
        wrap.appendChild(hint);
      }
      wrap.appendChild(makeCopyBtn(email));
    }
  });
}());
