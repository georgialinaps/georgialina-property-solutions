(function () {
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(
    ".service-card, .feature, .process-list li, .contact-form, .contact-info, .service-area-inner > div, .review-card, .reviews-summary"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  // Reviews show more/fewer toggle
  var reviewsToggle = document.getElementById("reviews-toggle");
  var reviewsGrid = document.getElementById("reviews-grid");
  if (reviewsToggle && reviewsGrid) {
    reviewsToggle.addEventListener("click", function () {
      var expanded = reviewsGrid.classList.toggle("show-all");
      reviewsToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      reviewsToggle.childNodes[0].nodeValue = expanded
        ? "Show Fewer Reviews "
        : "Show All 13 Reviews ";
      if (expanded) {
        reviewsGrid.querySelectorAll(".review-extra").forEach(function (el) {
          el.classList.add("is-visible");
        });
      } else {
        reviewsGrid.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    });
  }

  // Contact form -> mailto (no backend available yet)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("name").value.trim();
      var phone = document.getElementById("phone").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();

      var subject = "New project inquiry from " + name;
      var bodyLines = [
        "Name: " + name,
        "Phone: " + phone,
        "Email: " + (email || "(not provided)"),
        "",
        "Project details:",
        message,
      ];
      var mailto =
        "mailto:georgialinaps@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
    });
  }
})();
