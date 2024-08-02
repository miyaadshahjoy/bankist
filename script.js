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
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
// Exercises :
/*
// Event propagation : bubbling and capturing

document.documentElement.addEventListener('click', function (e) {
  console.log(e.currentTarget);
  console.log(e.target);
});



// Going downwards : child
// -----------------------
console.log(document.querySelector('.nav__links').childNodes); // returns node list
console.log(document.querySelector('.nav__links').children); // returns html collection
console.log(document.querySelector('.nav__links').firstElementChild);
console.log(document.querySelector('.nav__links').lastElementChild);

// Going upwards : parent
// ----------------------
console.log(document.querySelector('.nav__link').parentElement);
console.log(document.querySelector('.nav__link').parentNode);
console.log(document.querySelector('.nav__link').closest('.nav__links'));

// Going sideways: siblings
// ------------------------
console.log(document.querySelector('.header').nextSibling);
console.log(document.querySelector('.header').nextElementSibling);
console.log(document.querySelector('.header').previousSibling);
console.log(document.querySelector('#section--2').previousElementSibling);

// Event Delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // implementing smooth scrolling
  const elementToScroll = document.querySelector(e.target.getAttribute('href'));
  elementToScroll.scrollIntoView({ behavior: 'smooth' });
});

const sayHi = function (e) {
  console.log(e.target);
  console.log(`Hi ${this.name}`);
  console.log(this);
};

document
.querySelector('.nav__links')
.addEventListener('click', sayHi.bind({ name: 'joy', age: 25 }));

// Intersection Observer API
// -------------------------
const header = document.querySelector('.header');
const navEl = document.querySelector('.nav');
const targetEl = header;
const stickyCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
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

const stickyObserver = new IntersectionObserver(stickyCallback, stickyOptions);
stickyObserver.observe(targetEl);


// image lazy loading

const featureImages = document.querySelectorAll('.features__img');
console.log(featureImages);

const lazyLoad = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
      });
      observer.unobserve(entry.target);
    }
  });
};

const lazyLoadingOptions = {
  root: null,
  threshold: 0,
};

const lazyLoadObserver = new IntersectionObserver(lazyLoad, lazyLoadingOptions);
featureImages.forEach(image => {
  lazyLoadObserver.observe(image);
});


// building tabbed component

console.log(document.querySelectorAll('.operations__tab'));
const tabButtons = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');
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
*/

// creating slider component

const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');

const slides = document.querySelectorAll('.slide');

slides.forEach(
  (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
);

// Globals
let currentSlide = 1;
// 1. add eventListeners to the buttons
// i. slide the slides to the left

const slideLeft = function () {
  currentSlide = currentSlide || slides.length;
  console.log('Slide Left');
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i + 1 - currentSlide)}%)`)
  );
  currentSlide--;
};
leftBtn.addEventListener('click', slideLeft);
// ii. slide the slides to the right
const slideRight = function () {
  currentSlide %= slides.length;
  console.log('Slide Right');
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
  );
  currentSlide++;
};
rightBtn.addEventListener('click', slideRight);
// 2. add eventListeners to the dots
// i. create dots
const dotsContainer = document.querySelector('.dots');
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dots__dot', `dots__dot--${i + 1}`);
  dot.setAttribute('data-dot-no', `${i + 1}`);
  dotsContainer.append(dot);
});
// ii. attaching event listener to the dots
dotsContainer.addEventListener('click', function (e) {
  currentSlide = e.target.dataset.dotNo;
  slideLeft();
});
// 3. change dot styles according to the active image
