let backToTopButton = document.querySelector('#back-to-top-btn');

window.addEventListener('scroll', (event) => {
  if (this.scrollY > 400) {
    backToTopButton.classList.remove('hidden');
  } else {
    backToTopButton.classList.add('hidden');
  }
});

var icon = document.getElementById('icon');
var icon1 = document.getElementById('a');
var icon2 = document.getElementById('b');
var icon3 = document.getElementById('c');
var nav = document.getElementById('nav');

let navFlex = document.getElementById('nav-flex');

icon.addEventListener('click', function () {
  icon1.classList.toggle('a');
  icon2.classList.toggle('c');
  icon3.classList.toggle('b');
  nav.classList.toggle('hidden');
});

const para = document.querySelector('p');
const mql = window.matchMedia('(max-width: 600px)');

function screenTest(e) {
  if (e.matches) {
    icon.classList.remove('hidden');
    nav.classList.add('hidden');
    navFlex.classList.add('flex-col');
  } else {
    icon.classList.add('hidden');
    nav.classList.remove('hidden');
    navFlex.classList.remove('flex-col');
    icon1.classList.remove('a');
    icon2.classList.remove('c');
    icon3.classList.remove('b');
  }
}

mql.addEventListener('change', screenTest);

screenTest(mql);

let reference1 = document.getElementById('reference1');
let reference2 = document.getElementById('reference2');
let reference3 = document.getElementById('reference3');

let references = [reference1, reference2, reference3];
let indexCurrentReference = 0;

let referenceDisplayDiscList = document.getElementById(
  'reference-display-discs'
);
let activeReferenceDisplayDisc = null;
let referenceDisplayDiscs = [];

for (let i = 0; i < references.length; i++) {
  let disc = document.createElement('li');
  disc.classList.add('reference-display-disc-inactive');
  if (i == 0) {
    disc.classList.add('reference-display-disc-active');
    activeReferenceDisplayDisc = disc;
  }
  referenceDisplayDiscList.appendChild(disc);
  referenceDisplayDiscs.push(disc);
}

let nextReferenceButton = document.getElementById('next-reference-btn');
let previousReferenceButton = document.getElementById('previous-reference-btn');

nextReferenceButton.addEventListener('click', function () {
  references[indexCurrentReference].classList.add('hidden');

  activeReferenceDisplayDisc.classList.remove('reference-display-disc-active');
  activeReferenceDisplayDisc.classList.add('reference-display-disc-inactive');

  indexCurrentReference = (indexCurrentReference + 1) % references.length;
  activeReferenceDisplayDisc = referenceDisplayDiscs[indexCurrentReference];

  references[indexCurrentReference].classList.remove('hidden');
  activeReferenceDisplayDisc.classList.add('reference-display-disc-active');
});

previousReferenceButton.addEventListener('click', function () {
  references[indexCurrentReference].classList.add('hidden');

  activeReferenceDisplayDisc.classList.remove('reference-display-disc-active');
  activeReferenceDisplayDisc.classList.add('reference-display-disc-inactive');

  indexCurrentReference =
    (indexCurrentReference - 1 + references.length) % references.length;
  activeReferenceDisplayDisc = referenceDisplayDiscs[indexCurrentReference];

  references[indexCurrentReference].classList.remove('hidden');
  activeReferenceDisplayDisc.classList.add('reference-display-disc-active');
});

let form = document.getElementById('kontakt-form');
form.addEventListener('submit', function (e) {
  let url = 'sendMessage.php';
  let request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.onload = function () {
    displaySuccessMessage();
  };
  request.onerror = function () {
    console.log('request failed ', request, e);
  };
  formData = new FormData(e.target);
  request.send(formData);
  e.preventDefault();
});

function displaySuccessMessage() {
  let message = document.getElementById('message-success-message');
  message.classList.remove('hidden');
}
