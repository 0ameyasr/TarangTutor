
// document
//   .getElementById("transition-bar")
//   .setAttribute("id", "transition-bar-active");
// document.body.style.overflowY = "hidden";
// setTimeout(function () {
//   document.getElementById("transition-bar-active").remove();
//   document.body.style.overflowY = "auto";
// }, 2000);

// GET index
document.querySelector(".header-home").addEventListener("click", function () {
  window.location.href = "/";
});

// GET portfolio
document.querySelector(".header-portfolio").addEventListener("click", function () {
  window.location.href = "/portfolio";
});

// GET testimonials
document.querySelector(".header-testimonials").addEventListener("click", function () {
  window.location.href = "/testimonials";
});

// GET courses
document.querySelector(".header-courses").addEventListener("click", function () {
  window.location.href = "/courses";
});