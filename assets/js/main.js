/* Regina Pacis Academy — site interactions */
(function () {
  "use strict";

  var d = document;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ---------- Year in footer ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Mobile navigation ---------- */
  var burger = $(".burger");
  var menu = $("#primary-menu");
  var scrim = $(".nav-scrim");

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    if (scrim) scrim.classList.remove("show");
    if (burger) burger.setAttribute("aria-expanded", "false");
    d.body.style.overflow = "";
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      if (scrim) scrim.classList.toggle("show", open);
      d.body.style.overflow = open && window.innerWidth <= 1100 ? "hidden" : "";
    });
    if (scrim) scrim.addEventListener("click", closeMenu);
    $$("a", menu).forEach(function (a) { a.addEventListener("click", closeMenu); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1100) closeMenu(); });
  }

  /* ---------- Sticky header shadow + back to top ---------- */
  var header = $(".site-header");
  var toTop = $(".totop");

  function onScroll() {
    var y = window.pageYOffset || d.documentElement.scrollTop;
    if (header) header.classList.toggle("is-stuck", y > 8);
    if (toTop) toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealables = $$(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Animated counters ---------- */
  var counters = $$("[data-count]");
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = (String(target).split(".")[1] || "").length;
    var start = null;
    var dur = 1600;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(runCounter);
    }
  }

  /* ---------- Gallery filter ---------- */
  var filters = $$(".filter");
  if (filters.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filters.forEach(function (b) {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        $$(".gal figure").forEach(function (fig) {
          var show = f === "all" || fig.getAttribute("data-cat") === f;
          fig.classList.toggle("hide", !show);
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lb = $(".lightbox");
  if (lb) {
    var lbImg = $("img", lb);
    var lbCap = $("p", lb);
    var lastFocus = null;

    function openLb(src, alt) {
      lastFocus = d.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || "";
      lbCap.textContent = alt || "";
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      d.body.style.overflow = "hidden";
      $(".lb-close", lb).focus();
    }
    function closeLb() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      d.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    $$(".gal figure").forEach(function (fig) {
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      function open() {
        var img = $("img", fig);
        var cap = $("figcaption", fig);
        openLb(img.getAttribute("src"), cap ? cap.textContent : img.alt);
      }
      fig.addEventListener("click", open);
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });

    $(".lb-close", lb).addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("open")) closeLb();
    });
  }

  /* ---------- Front-end form validation ---------- */
  function validate(form) {
    var ok = true;
    $$("[required]", form).forEach(function (input) {
      var field = input.closest(".field");
      var value = (input.value || "").trim();
      var bad = !value;

      if (!bad && input.type === "email") {
        bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      }
      if (!bad && input.type === "tel") {
        bad = value.replace(/[^\d]/g, "").length < 9;
      }
      if (field) field.classList.toggle("invalid", bad);
      if (bad && ok && input.focus) input.focus();
      if (bad) ok = false;
    });
    return ok;
  }

  $$("form[data-validate]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var ok = $(".form-ok", form);
      if (ok) {
        ok.classList.add("show");
        ok.setAttribute("role", "status");
        ok.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
    $$("input,select,textarea", form).forEach(function (input) {
      input.addEventListener("input", function () {
        var field = input.closest(".field");
        if (field && field.classList.contains("invalid")) field.classList.remove("invalid");
      });
    });
  });
})();

/* ---------- Scrollspy: highlight the section you are reading ---------- */
(function () {
  "use strict";
  var d = document;
  var links = Array.prototype.slice.call(d.querySelectorAll('#primary-menu a[href^="#"]'));
  if (!links.length || !("IntersectionObserver" in window)) return;

  var map = {};
  var sections = [];
  links.forEach(function (a) {
    var el = d.getElementById(a.getAttribute("href").slice(1));
    if (el) { map[el.id] = a; sections.push(el); }
  });
  if (!sections.length) return;

  var visible = {};
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });

    var current = null;
    for (var i = 0; i < sections.length; i++) {
      if (visible[sections[i].id]) { current = sections[i].id; break; }
    }
    if (!current) return;
    links.forEach(function (a) { a.classList.remove("active"); });
    map[current].classList.add("active");
  }, { rootMargin: "-88px 0px -55% 0px", threshold: 0 });

  sections.forEach(function (s) { spy.observe(s); });
})();

/* ---------- Horizontal sliders ---------- */
(function () {
  "use strict";
  var d = document;
  Array.prototype.slice.call(d.querySelectorAll("[data-slider]")).forEach(function (slider) {
    var track = slider.querySelector(".slider-track");
    var prev = slider.querySelector('[data-slide="prev"]');
    var next = slider.querySelector('[data-slide="next"]');
    var dots = slider.querySelector(".slider-dots");
    if (!track) return;

    var slides = Array.prototype.slice.call(track.children);
    var timer = null;

    function step() { return track.clientWidth * 0.92; }
    function maxScroll() { return track.scrollWidth - track.clientWidth - 2; }

    function sync() {
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= maxScroll();
      if (dots && slides.length) {
        var per = track.clientWidth / (slides[0].offsetWidth + 12);
        var idx = Math.round(track.scrollLeft / (slides[0].offsetWidth + 12));
        Array.prototype.slice.call(dots.children).forEach(function (b, i) {
          b.classList.toggle("on", i === Math.min(idx, slides.length - Math.max(1, Math.floor(per))));
        });
      }
    }

    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", function () {
      window.clearTimeout(track._t);
      track._t = window.setTimeout(sync, 90);
    }, { passive: true });
    window.addEventListener("resize", sync);

    if (dots) {
      slides.forEach(function (s, i) {
        var b = d.createElement("button");
        b.type = "button";
        b.className = "dot-btn" + (i === 0 ? " on" : "");
        b.setAttribute("aria-label", "Go to item " + (i + 1));
        b.addEventListener("click", function () {
          track.scrollTo({ left: i * (s.offsetWidth + 12), behavior: "smooth" });
        });
        dots.appendChild(b);
      });
    }

    /* gentle autoplay, left to right */
    function play() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      stop();
      timer = window.setInterval(function () {
        if (track.scrollLeft >= maxScroll()) track.scrollTo({ left: 0, behavior: "smooth" });
        else track.scrollBy({ left: step(), behavior: "smooth" });
      }, 5000);
    }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", play);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", play);
    track.addEventListener("touchstart", stop, { passive: true });

    sync();
    play();
  });
})();
