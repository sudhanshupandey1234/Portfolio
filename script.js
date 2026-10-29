// Sudhanshu Pandey — Portfolio interactions
(function () {
  "use strict";

  // Year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Active nav link on scroll
  var sections = ["home", "about", "skills", "projects", "community", "contact"];
  var links = {};
  document.querySelectorAll(".nav-link").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href && href.charAt(0) === "#") links[href.slice(1)] = a;
  });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Object.values(links).forEach(function (a) { a.classList.remove("active"); });
          var link = links[en.target.id];
          if (link) link.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  // Contact form -> mailto (no backend, nothing is stored)
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var OWNER_EMAIL = "pandeysudhanshu010@gmail.com";
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cfName").value.trim();
      var email = document.getElementById("cfEmail").value.trim();
      var message = document.getElementById("cfMessage").value.trim();
      status.className = "form-status";
      if (!name || !email || !message) {
        status.textContent = "Please fill in your name, email and message.";
        status.classList.add("err");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.classList.add("err");
        return;
      }
      var subject = encodeURIComponent("Portfolio Inquiry - Sudhanshu Pandey");
      var body = encodeURIComponent("Hi Sudhanshu,\n\n" + message + "\n\n— " + name + "\n" + email);
      window.location.href = "mailto:" + OWNER_EMAIL + "?subject=" + subject + "&body=" + body;
      status.textContent = "Opening your email app — your message is addressed to " + OWNER_EMAIL + ". Just press send there.";
      status.classList.add("ok");
    });
  }
})();
