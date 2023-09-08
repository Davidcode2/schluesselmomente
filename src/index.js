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
