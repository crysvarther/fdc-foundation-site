/* Friend de Coup Foundation — interactions */
(function () {
  "use strict";

  /* ---- Sticky header shade ---- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => menu.classList.remove("open"))
    );
  }

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Count-up stats ---- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const dur = 1500;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.floor(eased * target);
      el.textContent = prefix + val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => animateCount(el));
  }

  /* ---- Progress bar fill on view ---- */
  const fills = document.querySelectorAll(".progress__fill");
  if ("IntersectionObserver" in window && fills.length) {
    const pio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.getAttribute("data-fill") + "%";
            pio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    fills.forEach((el) => pio.observe(el));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq__q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq__item");
      const ans = item.querySelector(".faq__a");
      const isOpen = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(isOpen));
      ans.style.maxHeight = isOpen ? ans.scrollHeight + "px" : null;
    });
  });

  /* ---- Donate page: amount + frequency selectors ---- */
  const amountBtns = document.querySelectorAll(".amount-grid button");
  const customInput = document.getElementById("custom-amount");
  amountBtns.forEach((b) => {
    b.addEventListener("click", () => {
      amountBtns.forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      if (customInput) customInput.value = b.getAttribute("data-amount");
    });
  });
  if (customInput) {
    customInput.addEventListener("input", () =>
      amountBtns.forEach((x) => x.classList.remove("active"))
    );
  }
  document.querySelectorAll(".freq-toggle button").forEach((b) => {
    b.addEventListener("click", () => {
      document
        .querySelectorAll(".freq-toggle button")
        .forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
    });
  });

  /* ---- Placeholder donate / form handlers ---- */
  document.querySelectorAll("[data-donate]").forEach((el) => {
    el.addEventListener("click", (e) => {
      // TODO: replace this handler with your real donation URL / provider.
      if (el.getAttribute("href") === "#donate-placeholder") {
        e.preventDefault();
        alert(
          "Donation processing isn't connected yet.\n\nReplace the placeholder link with your GoFundMe, Givebutter, PayPal, or school donation portal URL. See README.md for instructions."
        );
      }
    });
  });

  const giveForm = document.getElementById("give-form");
  if (giveForm) {
    giveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Thank you! This is a demo form.\n\nConnect it to a payment provider (Givebutter, Stripe, PayPal) to accept live gifts. See README.md."
      );
    });
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
