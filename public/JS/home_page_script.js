// Homepage enhancements and event listeners

document.addEventListener("DOMContentLoaded", () => {
  console.log("HomePage.js loaded successfully.");

  // Example 1: Highlight nav link on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.textContent.toLowerCase().includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // Example 2: Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Example 3: Custom animation when sections appear
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    observer.observe(el);
  });
});
