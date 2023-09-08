let backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", (event) => {
  console.log(this.scrollY);
  if (this.scrollY > 400) {
    backToTopButton.classList.remove("hidden");
  }
  else {
    backToTopButton.classList.add("hidden");
  }
});

var icon = document.getElementById("icon");
var icon1 = document.getElementById("a");
var icon2 = document.getElementById("b");
var icon3 = document.getElementById("c");
var nav = document.getElementById('nav');

let navFlex = document.getElementById('nav-flex');

icon.addEventListener('click', function() {
  icon1.classList.toggle('a');
  icon2.classList.toggle('c');
  icon3.classList.toggle('b');
  nav.classList.toggle('hidden');
});

const para = document.querySelector("p");
const mql = window.matchMedia("(max-width: 600px)");

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

mql.addEventListener("change", screenTest);

screenTest(mql);
