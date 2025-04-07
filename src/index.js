import ReferenceCarousel from './referenceCarousel.js';

backToTop();
mobileMenu();
referenceView();
contactForm();
backToForm();

function backToTop() {
  let backToTopButton = document.querySelector('#back-to-top-btn');

  window.addEventListener('scroll', (event) => {
    if (scrollY > 400) {
      backToTopButton.classList.remove('hidden');
    } else {
      backToTopButton.classList.add('hidden');
    }
  });
}

function mobileMenu() {
  var icon = document.getElementById('icon');
  var icon1 = document.getElementById('a');
  var icon2 = document.getElementById('b');
  var icon3 = document.getElementById('c');
  var nav = document.getElementById('nav');
  let hamburger = document.getElementById('hamburger');

  let navFlex = document.getElementById('nav-flex');

  icon.addEventListener('click', function () {
    icon1.classList.toggle('a');
    icon2.classList.toggle('c');
    icon3.classList.toggle('b');
    nav.classList.toggle('invisible');
    nav.classList.toggle('h-0');
    nav.classList.toggle('h-screen');
    nav.classList.toggle('opacity-0');
    nav.classList.toggle('opacity-100');
    hamburger.classList.toggle('fixed');
  });

  const mql = window.matchMedia('(max-width: 720px)');

  function screenTest(e) {
    if (e.matches) {
      icon.classList.remove('hidden');
      nav.classList.add('invisible');
      nav.classList.add('opacity-100');
      nav.classList.add('opacity-0');
      nav.classList.add('h-0');
      navFlex.classList.add('flex-col');
    } else {
      icon.classList.add('hidden');
      nav.classList.remove('invisible');
      nav.classList.remove('h-0');
      nav.classList.remove('h-screen');
      nav.classList.remove('opacity-0');
      nav.classList.remove('opacity-100');
      navFlex.classList.remove('flex-col');
      icon1.classList.remove('a');
      icon2.classList.remove('c');
      icon3.classList.remove('b');
      hamburger.classList.remove('fixed');
    }
  }

  mql.addEventListener('change', screenTest);

  screenTest(mql);
}

export function closeMobileMenu() {
  const mql = window.matchMedia('(max-width: 720px)');
  if (mql.matches) {
    let nav = document.getElementById('nav');
    let icon1 = document.getElementById('a');
    let icon2 = document.getElementById('b');
    let icon3 = document.getElementById('c');
    let hamburger = document.getElementById('hamburger');

    nav.classList.add('invisible');
    nav.classList.add('h-0');
    nav.classList.remove('h-screen');
    nav.classList.add('opacity-0');
    nav.classList.remove('opacity-100');
    hamburger.classList.remove('fixed');

    icon1.classList.remove('a');
    icon2.classList.remove('c');
    icon3.classList.remove('b');
  }
}

function referenceView() {
  let references = document.querySelectorAll("[id^='reference'");
  let referenceCarousel = new ReferenceCarousel(references);
  referenceCarousel.referenceView();
}

function contactForm() {
  let form = document.getElementById('kontakt-form');
  if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let url = 'sendMessage.php';
    let request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function () {
      displaySuccessMessage();
      hideForm();
    };
    request.onerror = function () {
      console.log('request failed ', request, e);
    };
    const formData = new FormData(e.target);
    request.send(formData);
    form.reset();
  });

  function displaySuccessMessage() {
    let message = document.getElementById('message-success-message');
    message.classList.remove('hidden');
  }

  function hideForm() {
    let form = document.getElementById('kontakt-form');
    form.classList.add('hidden');
  }
  } else {
    console.log('Form not found');
  }
}

function backToForm() {
  let message = document.getElementById('message-success-message');
  let form = document.getElementById('kontakt-form');
  message.addEventListener('click', () => {
    message.classList.add('hidden');
    form.classList.remove('hidden');
  });
}
