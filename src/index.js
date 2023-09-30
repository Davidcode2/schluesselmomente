backToTop();
mobileMenu();
referenceView();
contactForm();

function backToTop() {
  let backToTopButton = document.querySelector('#back-to-top-btn');

  window.addEventListener('scroll', (event) => {
    if (this.scrollY > 400) {
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

  icon.addEventListener('click', function() {
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

function closeMobileMenu() {
  const mql = window.matchMedia('(max-width: 720px)');
  if (mql.matches) {
    //setTimeout(function() {
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
    //}, 1000);
  }
}

function referenceView() {
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
  let previousReferenceButton = document.getElementById(
    'previous-reference-btn'
  );

  nextReferenceButton.addEventListener('click', function() {
    references[indexCurrentReference].classList.add('hidden');

    activeReferenceDisplayDisc.classList.remove(
      'reference-display-disc-active'
    );
    activeReferenceDisplayDisc.classList.add('reference-display-disc-inactive');

    indexCurrentReference = (indexCurrentReference + 1) % references.length;
    activeReferenceDisplayDisc = referenceDisplayDiscs[indexCurrentReference];

    references[indexCurrentReference].classList.remove('hidden');
    activeReferenceDisplayDisc.classList.add('reference-display-disc-active');
  });

  previousReferenceButton.addEventListener('click', function() {
    references[indexCurrentReference].classList.add('hidden');

    activeReferenceDisplayDisc.classList.remove(
      'reference-display-disc-active'
    );
    activeReferenceDisplayDisc.classList.add('reference-display-disc-inactive');

    indexCurrentReference =
      (indexCurrentReference - 1 + references.length) % references.length;
    activeReferenceDisplayDisc = referenceDisplayDiscs[indexCurrentReference];

    references[indexCurrentReference].classList.remove('hidden');
    activeReferenceDisplayDisc.classList.add('reference-display-disc-active');
  });
}

function contactForm() {
  let form = document.getElementById('kontakt-form');
  form.addEventListener('submit', function(e) {
    let url = 'sendMessage.php';
    let request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() {
      displaySuccessMessage();
    };
    request.onerror = function() {
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
}
