const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.primary-nav a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.track').forEach((track) => {
  track.addEventListener('click', () => {
    document.querySelectorAll('.track').forEach((item) => item.classList.remove('active'));
    track.classList.add('active');
  });
});

const gallery = document.querySelector('.gallery-track');
document.querySelector('.gallery-next')?.addEventListener('click', () => gallery?.scrollBy({ left: gallery.clientWidth * 0.55, behavior: 'smooth' }));
document.querySelector('.gallery-prev')?.addEventListener('click', () => gallery?.scrollBy({ left: -gallery.clientWidth * 0.55, behavior: 'smooth' }));

const galleryImages = [...document.querySelectorAll('[data-gallery]')];
const galleryModal = document.querySelector('.gallery-modal');
const galleryModalImage = document.querySelector('.gallery-modal-image');
const galleryCaption = document.querySelector('#gallery-modal-caption');
let galleryIndex = 0;
const closeGallery = () => {
  galleryModal?.classList.remove('open');
  galleryModal?.setAttribute('aria-hidden', 'true');
};
const showGalleryImage = (index) => {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[galleryIndex];
  if (!image || !galleryModalImage || !galleryCaption) return;
  galleryModalImage.src = image.src;
  galleryModalImage.alt = image.alt;
  galleryCaption.textContent = image.dataset.gallery;
};
galleryImages.forEach((image, index) => image.addEventListener('click', () => { showGalleryImage(index); galleryModal?.classList.add('open'); galleryModal?.setAttribute('aria-hidden', 'false'); }));
document.querySelector('.gallery-modal-close')?.addEventListener('click', closeGallery);
document.querySelector('.gallery-modal-prev')?.addEventListener('click', () => showGalleryImage(galleryIndex - 1));
document.querySelector('.gallery-modal-next')?.addEventListener('click', () => showGalleryImage(galleryIndex + 1));
galleryModal?.addEventListener('click', (event) => { if (event.target === galleryModal) closeGallery(); });
document.addEventListener('keydown', (event) => { if (!galleryModal?.classList.contains('open')) return; if (event.key === 'Escape') closeGallery(); if (event.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1); if (event.key === 'ArrowRight') showGalleryImage(galleryIndex + 1); });

const beerCarousel = document.querySelector('.beer-grid');
const beerCards = [...document.querySelectorAll('.beer-card')];
if (beerCarousel && beerCards.length) {
  const getBeerStep = () => {
    if (window.matchMedia('(max-width: 800px)').matches) {
      const cardWidth = beerCards[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(beerCarousel).columnGap || getComputedStyle(beerCarousel).gap || '0');
      return cardWidth + gap;
    }
    return beerCarousel.clientWidth * .72;
  };
  document.querySelector('.beer-carousel-prev')?.addEventListener('click', () => beerCarousel.scrollBy({ left: -getBeerStep(), behavior: 'smooth' }));
  document.querySelector('.beer-carousel-next')?.addEventListener('click', () => beerCarousel.scrollBy({ left: getBeerStep(), behavior: 'smooth' }));
  let isDragging = false;
  let suppressBeerClick = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  beerCarousel.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    isDragging = true;
    suppressBeerClick = false;
    dragStartX = event.clientX;
    dragStartScroll = beerCarousel.scrollLeft;
    beerCarousel.classList.add('is-dragging');
    beerCarousel.setPointerCapture?.(event.pointerId);
  });
  beerCarousel.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    const distance = event.clientX - dragStartX;
    if (Math.abs(distance) > 6) suppressBeerClick = true;
    beerCarousel.scrollLeft = dragStartScroll - distance;
  });
  const stopBeerDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    beerCarousel.classList.remove('is-dragging');
    beerCarousel.releasePointerCapture?.(event.pointerId);
  };
  beerCarousel.addEventListener('pointerup', stopBeerDrag);
  beerCarousel.addEventListener('pointercancel', stopBeerDrag);
  beerCarousel.addEventListener('click', (event) => {
    if (!suppressBeerClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressBeerClick = false;
  }, true);
  let beerAutoplayTimer;
  const stopBeerAutoplay = () => {
    window.clearInterval(beerAutoplayTimer);
    beerAutoplayTimer = undefined;
  };
  const advanceBeerAutoplay = () => {
    const lastScroll = beerCarousel.scrollWidth - beerCarousel.clientWidth;
    const step = getBeerStep();
    const nextScroll = beerCarousel.scrollLeft + step;
    if (nextScroll >= lastScroll - 12) {
      beerCarousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      beerCarousel.scrollBy({ left: step, behavior: 'smooth' });
    }
  };
  const startBeerAutoplay = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || beerAutoplayTimer) return;
    beerAutoplayTimer = window.setInterval(advanceBeerAutoplay, 3800);
  };
  beerCarousel.addEventListener('mouseenter', stopBeerAutoplay);
  beerCarousel.addEventListener('mouseleave', startBeerAutoplay);
  beerCarousel.addEventListener('pointerdown', stopBeerAutoplay);
  const updateCenteredBeer = () => {
    const carouselCenter = beerCarousel.getBoundingClientRect().left + beerCarousel.clientWidth / 2;
    let closestCard = beerCards[0];
    let closestDistance = Infinity;
    beerCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - carouselCenter);
      if (distance < closestDistance) { closestDistance = distance; closestCard = card; }
      const normalized = Math.min(distance / (rect.width * 1.65), 1.35);
      const side = cardCenter < carouselCenter ? -1 : 1;
      card.style.setProperty('--fish-scale', (1.035 - normalized * .14).toFixed(3));
      card.style.setProperty('--fish-rotate', `${(side * normalized * 8).toFixed(2)}deg`);
      card.style.setProperty('--fish-y', `${(normalized * 10).toFixed(1)}px`);
    });
    beerCards.forEach((card) => card.classList.toggle('is-centered', card === closestCard));
  };
  beerCarousel.addEventListener('scroll', updateCenteredBeer, { passive: true });
  window.addEventListener('resize', updateCenteredBeer);
  updateCenteredBeer();
  startBeerAutoplay();
}

const resourceObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-resource-visible'); resourceObserver.unobserve(entry.target); } }), { threshold: 0.15 });
document.querySelectorAll('.about-copy > *, .about-image, .hours > *, .gallery-track, .beer-card, .banner img, .section-intro > *, .post-grid a, .agenda-copy > *, .playlist, .agenda-image, .delivery-image, .delivery > div:last-child > *, .contact-grid > *, footer > *').forEach((element) => { element.classList.add('fade-resource'); resourceObserver.observe(element); });

