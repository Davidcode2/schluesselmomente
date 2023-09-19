let haftungContent = document.getElementById("haftung-content");
let haftungButton = document.getElementById("haftung-button");

let datenschutzContent = document.getElementById("datenschutz-content");
let datenschutzButton = document.getElementById("datenschutz-button");

haftungButton.addEventListener("click", () => {
  haftungContent.classList.toggle("hidden");
  haftungButton.classList.toggle("rotate-180");
});

datenschutzButton.addEventListener("click", () => {
  datenschutzContent.classList.toggle("hidden");
  datenschutzButton.classList.toggle("rotate-180");
});


mobileMenu();

function mobileMenu() {
  var icon = document.getElementById('icon');
  var icon1 = document.getElementById('a');
  var icon2 = document.getElementById('b');
  var icon3 = document.getElementById('c');
  var nav = document.getElementById('nav');

  let navFlex = document.getElementById('nav-flex');

  icon.addEventListener('click', function() {
    icon1.classList.toggle('a');
    icon2.classList.toggle('c');
    icon3.classList.toggle('b');
    nav.classList.toggle('hidden');
  });

  const para = document.querySelector('p');
  const mql = window.matchMedia('(max-width: 720px)');

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
}
