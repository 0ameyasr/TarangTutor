 // GET index
 document.querySelector(".footer-home").addEventListener("click", function () {
    window.location.href = "/";
  });

  // GET portfolio
  document.querySelector(".footer-portfolio").addEventListener("click", function () {
    window.location.href = "/portfolio";
  });

  // GET testimonials
  document.querySelector(".footer-testimonials").addEventListener("click", function () {
    window.location.href = "/testimonials";
  });

  // GET courses
  document.querySelector(".footer-courses").addEventListener("click", function () {
    window.location.href = "/courses";
  });

  document.querySelector(".footer-contact").addEventListener("click", function () {
    const modal = new bootstrap.Modal(document.getElementById('modalTour'));
    modal.show();
  });