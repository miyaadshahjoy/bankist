'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
*/
