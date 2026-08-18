/* Friend de Coup Foundation — interactions */
(function () {
  "use strict";

  /* ============================================================
     GO LIVE: paste your donation page URL below (in the quotes).
     e.g. "https://givebutter.com/fdc"  or a GoFundMe / PayPal link.
     Leave it "" to keep the "not connected yet" reminder.
     The chosen amount & frequency are appended automatically when
     your provider supports ?amount= and ?frequency= parameters.
     ============================================================ */
  const DONATE_URL = "";
  const DONATE_PASS_AMOUNT = true; // set false if your provider ignores/errors on ?amount=

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

  /* ---- Donate button: route to the live provider (or show reminder) ---- */
  const getSelectedAmount = () => {
    const custom = document.getElementById("custom-amount");
    if (custom && custom.value) return parseInt(custom.value, 10) || null;
    const active = document.querySelector(".amount-grid button.active");
    return active ? parseInt(active.getAttribute("data-amount"), 10) : null;
  };
  const getFrequency = () => {
    const active = document.querySelector(".freq-toggle button.active");
    return active && /month/i.test(active.textContent) ? "monthly" : "once";
  };
  /* ---- Generic modal helpers (used by donate + contact thank-you) ---- */
  const openModal = (m) => {
    if (!m) return;
    m.classList.add("open");
    document.body.style.overflow = "hidden";
    const c = m.querySelector(".modal__close");
    if (c) c.focus();
  };
  const closeModal = (m) => {
    if (!m) return;
    m.classList.remove("open");
    document.body.style.overflow = "";
  };
  document.querySelectorAll(".modal").forEach((m) => {
    m.querySelectorAll("[data-close]").forEach((el) =>
      el.addEventListener("click", () => closeModal(m))
    );
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const open = document.querySelector(".modal.open");
      if (open) closeModal(open);
    }
  });

  /* Donate thank-you modal (shown while online giving isn't connected yet) */
  const thanksModal = document.getElementById("thanks-modal");
  const openThanks = () => {
    if (!thanksModal) return;
    const amtEl = document.getElementById("thanks-amount");
    const amt = getSelectedAmount();
    if (amtEl) {
      if (amt) {
        const freq = getFrequency() === "monthly" ? " / month" : "";
        amtEl.innerHTML = "Your intended gift: <b>$" + amt.toLocaleString() + freq + "</b>";
        amtEl.hidden = false;
      } else {
        amtEl.hidden = true;
      }
    }
    openModal(thanksModal);
  };

  document.querySelectorAll("[data-donate]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (!DONATE_URL) {
        // Online giving not wired yet — thank them and point to Darren/Chris.
        openThanks();
        return;
      }
      let url = DONATE_URL;
      if (DONATE_PASS_AMOUNT) {
        const amt = getSelectedAmount();
        const params = new URLSearchParams();
        if (amt) params.set("amount", amt);
        params.set("frequency", getFrequency());
        url += (url.includes("?") ? "&" : "?") + params.toString();
      }
      window.open(url, "_blank", "noopener");
    });
  });

  /* Contact form: thank the sender and open a pre-filled email to the Foundation */
  const giveForm = document.getElementById("give-form");
  const contactModal = document.getElementById("contact-modal");
  if (giveForm) {
    giveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = (id) => (document.getElementById(id) || {}).value || "";
      const name = val("name"), email = val("email"), topic = val("topic"), message = val("message");
      if (contactModal) {
        const nameSpan = contactModal.querySelector("[data-name]");
        if (nameSpan) nameSpan.textContent = name ? ", " + name.trim().split(/\s+/)[0] : "";
        const sendBtn = contactModal.querySelector("[data-send]");
        if (sendBtn) {
          const subject = "FDC Foundation — " + (topic || "Website message");
          const body =
            "Name: " + name + "\nEmail: " + email + "\nInterested in: " + topic + "\n\n" + message;
          sendBtn.setAttribute(
            "href",
            "mailto:info@fdc-foundation.org?subject=" +
              encodeURIComponent(subject) +
              "&body=" +
              encodeURIComponent(body)
          );
        }
        openModal(contactModal);
        giveForm.reset();
      } else {
        alert(
          "Thanks for reaching out! Please email info@fdc-foundation.org or call Darren 605-350-5866 / Chris 605-770-0844."
        );
      }
    });
  }

  /* ---- House lights (Hall of Fame wall page) ---- */
  const lightsBtn = document.querySelector("[data-lights]");
  if (lightsBtn) {
    const label = lightsBtn.lastChild;
    lightsBtn.addEventListener("click", () => {
      const down = document.body.classList.toggle("lights-down");
      lightsBtn.setAttribute("aria-pressed", String(down));
      label.nodeValue = down ? " House lights up" : " House lights down";
    });
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
