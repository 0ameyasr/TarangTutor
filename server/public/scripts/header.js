
document.getElementById("transition-bar").setAttribute("id", "transition-bar-active");
document.body.style.overflowY = "hidden";
document.getElementById("toTop").style.display = "none";

setTimeout(function () {
  document.getElementById("transition-bar-active").remove();
  document.body.style.overflowY = "auto";
  document.getElementById("toTop").style.display = "block";
}, 2000);

// GET index
document.querySelector(".header-home-icon").addEventListener("click", function () {
  window.location.href = "/";
});

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