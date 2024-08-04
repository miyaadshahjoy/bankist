'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const navEl = document.querySelector('.nav');
const tabButtons = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

// Modal window
const openModal = function (e) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  // e.currentTarget.removeEventListener('click', openModal);
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // implementing smooth scrolling
  const elementToScroll = document.querySelector(e.target.getAttribute('href'));
  elementToScroll.scrollIntoView({ behavior: 'smooth' });
});

// sticky navigation
const stickyCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navEl.classList.add('sticky');
    } else navEl.classList.remove('sticky');
  });
};

const stickyOptions = {
  root: null,
  threshold: 0,
  rootMargin: `${-Number.parseInt(getComputedStyle(navEl).height)}px`,
};

const targetEl = header;
const stickyObserver = new IntersectionObserver(stickyCallback, stickyOptions);
stickyObserver.observe(targetEl);

//Revealing elements on scroll
const sections = document.querySelectorAll('.section');
sections.forEach(section => section.classList.add('section--hidden'));

const revealCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  root: null,
  threshold: 0.15,
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

sections.forEach(section => {
  revealObserver.observe(section);
});

// image lazy loading

const featureImages = document.querySelectorAll('.features__img');

const lazyLoad = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetImage = entry.target;
      targetImage.src = targetImage.dataset.src;
      targetImage.addEventListener('load', function () {
        targetImage.classList.remove('lazy-img');
      });
      observer.unobserve(targetImage);
    }
  });
};

const lazyLoadingOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};

const lazyLoadObserver = new IntersectionObserver(lazyLoad, lazyLoadingOptions);
featureImages.forEach(image => {
  lazyLoadObserver.observe(image);
});

// building tabbed component

tabButtons.forEach(tabBtn => {
  tabBtn.addEventListener('click', function (e) {
    const clickedBtn = e.target.closest('.operations__tab');
    const tabContent = document.querySelector(
      `.operations__content--${clickedBtn.dataset.tab}`
    );
    tabButtons.forEach(tabBtn =>
      tabBtn.classList.remove('operations__tab--active')
    );
    clickedBtn.classList.add('operations__tab--active');
    tabContents.forEach(content =>
      content.classList.remove('operations__content--active')
    );
    tabContent.classList.add('operations__content--active');
  });
});

// creating slider component
// Globals
let currentSlide = 0;
const maxSlides = slides.length;
// functions
//create dots
const createDots = function () {
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dots__dot');
    dot.dataset.slide = `${i}`;
    dotsContainer.append(dot);
  });
};

const activateDot = function () {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  const slide = document.querySelector(
    `.dots__dot[data-slide="${currentSlide}"]`
  );

  slide.classList.add('dots__dot--active');
};
const changeSlide = function () {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - currentSlide) * 100}%)`)
  );
};

const nextSlide = function () {
  currentSlide++;
  currentSlide %= maxSlides;
  changeSlide();
  activateDot();
};

const previousSlide = function () {
  currentSlide--;
  currentSlide = currentSlide < 0 ? maxSlides + currentSlide : currentSlide;
  changeSlide();
  activateDot();
};
const init = function () {
  createDots();
  changeSlide();
  activateDot();
};
init();
// Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') previousSlide();
  if (e.key === 'ArrowRight') nextSlide();
});
dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    currentSlide = e.target.dataset.slide;
    changeSlide();
    activateDot();
  }
});
