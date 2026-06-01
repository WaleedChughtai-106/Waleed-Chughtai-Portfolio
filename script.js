//Toggle Menu
let HamburgerIcon = document.getElementById("toggleBttn");
let CrossIcon = document.getElementById("toggleBttn2");
function ToggleMenuON() {
  let HamburgerIcon = document.getElementById("toggleBttn");
  let VerticalMenu = document.getElementById("vertical-Navbar");
  let CrossIcon = document.getElementById("toggleBttn2");
  HamburgerIcon.style.display = "none";
  VerticalMenu.style.display = "block";
  CrossIcon.style.display = "block";
}
function ToggleMenuOFF() {
  let HamburgerIcon = document.getElementById("toggleBttn");
  let VerticalMenu = document.getElementById("vertical-Navbar");
  let CrossIcon = document.getElementById("toggleBttn2");
  HamburgerIcon.style.display = "block";
  VerticalMenu.style.display = "none";
  CrossIcon.style.display = "none";
}

HamburgerIcon.addEventListener("click", ToggleMenuON);
CrossIcon.addEventListener("click", ToggleMenuOFF);
//For the Contact Form inputs
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  const nameInput = document.getElementById("Name");
  const emailInput = document.getElementById("Email");
  const phoneInput = document.getElementById("Password");
  const messageInput = document.getElementById("Message");
  const submitButton = document.querySelector(".form-submit-button");

  // Function to display error message
  function showError(input, message) {
    const existingError = input.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "0.7rem";
    error.style.marginTop = "0.3rem";
    error.textContent = message;
    input.parentElement.appendChild(error);
    input.style.borderColor = "red";
  }

  // Function to clear error message
  function clearError(input) {
    const existingError = input.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
    input.style.borderColor = "black";
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (value === "") {
      showError(nameInput, "Name is required");
      return false;
    }
    if (value.length < 2) {
      showError(nameInput, "Name must be at least 2 characters long");
      return false;
    }
    clearError(nameInput);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
      showError(emailInput, "Email is required");
      return false;
    }
    if (!emailRegex.test(value)) {
      showError(emailInput, "Please enter a valid email address");
      return false;
    }
    clearError(emailInput);
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const phoneRegex = /^\+?[\d\s-]{7,15}$/;
    if (value === "") {
      showError(phoneInput, "Phone number is required");
      return false;
    }
    if (!phoneRegex.test(value)) {
      showError(
        phoneInput,
        "Please enter a valid phone number (7-15 digits, spaces, or dashes)"
      );
      return false;
    }
    clearError(phoneInput);
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value === "") {
      showError(messageInput, "Message is required");
      return false;
    }
    if (value.length < 10) {
      showError(messageInput, "Message must be at least 10 characters long");
      return false;
    }
    clearError(messageInput);
    return true;
  }

  // Form submission handler
  form.addEventListener("submit", function (event) {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isMessageValid = validateMessage();

  if (!(isNameValid && isEmailValid && isPhoneValid && isMessageValid)) {
    event.preventDefault(); // only stop if invalid
  }
});

  [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
    input.addEventListener("input", function () {
      if (input === nameInput) validateName();
      if (input === emailInput) validateEmail();
      if (input === phoneInput) validatePhone();
      if (input === messageInput) validateMessage();
    });
  });
});
// ── 3D Scroll Reveal + Portfolio Card Tilt ──
document.addEventListener("DOMContentLoaded", function () {

  // Elements to animate on scroll
  const revealMap = [
    { selectors: ["#Hero .name", "#Hero .Prof"],              cls: "reveal"       },
    { selectors: ["#Hero2 .hero-left-content"],               cls: "reveal-left"  },
    { selectors: ["#Hero2 .hero-right-content"],              cls: "reveal-right" },
    { selectors: ["#mypassion .passion-heading"],             cls: "reveal"       },
    { selectors: ["#mypassion .brief-info-passion",
                   "#mypassion .readMore"],                   cls: "reveal"       },
    { selectors: ["#AboutMe .AboutMeBttn"],                   cls: "reveal"       },
    { selectors: ["#AboutMe .AboutMEFirstpara"],              cls: "reveal"       },
    { selectors: ["#AboutMe .AboutMESecondpara"],             cls: "reveal"       },
    { selectors: ["#AboutMe .ExploreBttn"],                   cls: "reveal"       },
    { selectors: ["#ProfessionalitySec .DDM"],                cls: "reveal"       },
    { selectors: ["#Skills .skills-Section-heading",
                   "#Skills .skills-textLine"],               cls: "reveal"       },
    { selectors: ["#Skills .skill-cards"],                    cls: "reveal"       },
    { selectors: [".portfolio-heading"],                      cls: "reveal"       },
    { selectors: [".pf-card"],                                cls: "reveal"       },
    { selectors: ["#contact .contact-heading",
                   "#contact .contact-info-desc",
                   "#contact .contact-form-container"],       cls: "reveal"       },
  ];

  revealMap.forEach(({ selectors, cls }) => {
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add(cls, `reveal-d${Math.min(i + 1, 6)}`);
      });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => observer.observe(el));

  // ── Portfolio card 3D mouse tilt ──
  document.querySelectorAll(".pf-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -9;
      const rotY = ((x - cx) / cx) * 9;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.02)`;
      card.style.boxShadow = `0 24px 55px rgba(0,0,0,0.55)`;
      card.style.transition = "box-shadow 0.15s ease";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
      card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
    });
  });
});

// ════════════════════════════════════════════
// EXTRA ANIMATIONS
// ════════════════════════════════════════════

// ── Custom cursor ──
(function () {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  const ring = document.createElement("div");
  ring.className = "custom-cursor-ring";
  document.body.appendChild(cursor);
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top  = my + "px";
  });

  (function animateRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll("a, button, .pf-card, .skill-cards, .DDM").forEach((el) => {
    el.addEventListener("mouseenter", () => { cursor.classList.add("hovered"); ring.classList.add("hovered"); });
    el.addEventListener("mouseleave", () => { cursor.classList.remove("hovered"); ring.classList.remove("hovered"); });
  });
})();

// ── Navbar glass on scroll ──
(function () {
  const navbar = document.getElementById("Navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });
})();

// ── Button ripple effect ──
(function () {
  document.querySelectorAll(".workCard-Bttn, .readMore, .ExploreBttn, .AboutMeBttn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
})();

// ── Hero section mouse parallax ──
(function () {
  const hero = document.getElementById("Hero2");
  if (!hero) return;
  const content = hero.querySelector(".Hero-content");
  if (!content) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    content.style.transition = "transform 0.08s linear";
    content.style.transform  = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
  });
  hero.addEventListener("mouseleave", () => {
    content.style.transition = "transform 0.6s ease";
    content.style.transform  = "";
  });
})();

// ── Floating particles canvas behind Hero ──
(function () {
  const section = document.getElementById("Hero") || document.getElementById("Hero2");
  if (!section) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.25;";
  section.style.position = "relative";
  section.insertBefore(canvas, section.firstChild);

  const ctx = canvas.getContext("2d");
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.45,
      dy: (Math.random() - 0.5) * 0.45,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // draw connecting lines
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach((b) => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fill();
      a.x += a.dx; a.y += a.dy;
      if (a.x < 0 || a.x > W) a.dx *= -1;
      if (a.y < 0 || a.y > H) a.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Counter animation on skill cards (count-up on first view) ──
(function () {
  // Animate the prof-content-heading symbols scale on scroll-in
  document.querySelectorAll(".prof-content-heading").forEach((h) => {
    h.style.display = "inline-block";
    h.style.transition = "letter-spacing 0.6s ease, opacity 0.6s ease";
  });

  const headObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.style.letterSpacing = "0.5rem";
        headObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".prof-content-heading").forEach((h) => {
    h.style.letterSpacing = "0rem";
    headObs.observe(h);
  });
})();

// ════════════════════════════════════════════
// MODERN ANIMATIONS v3
// ════════════════════════════════════════════

// ── Preloader ──
(function () {
  const loader = document.createElement("div");
  loader.id = "preloader";
  loader.innerHTML = `
    <span class="preloader-name">WALEED CHUGHTAI</span>
    <div class="preloader-bar-wrap"><div class="preloader-bar"></div></div>
  `;
  document.body.prepend(loader);
  document.body.style.overflow = "hidden";

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.style.overflow = "";
    }, 1800);
  });
})();

// ── Scroll progress bar ──
(function () {
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  document.body.prepend(bar);

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = ((scrolled / max) * 100).toFixed(2) + "%";
  }, { passive: true });
})();

// ── Spotlight on dark sections ──
(function () {
  const darkSections = ["#mypassion", "#portfolio", "#contact", "#Skills"];
  darkSections.forEach((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const light = document.createElement("div");
    light.className = "section-spotlight";
    el.style.position = "relative";
    el.style.overflow = "hidden";
    el.appendChild(light);

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      light.style.left = (e.clientX - rect.left) + "px";
      light.style.top  = (e.clientY - rect.top)  + "px";
      light.style.opacity = "1";
    }, { passive: true });
    el.addEventListener("mouseleave", () => { light.style.opacity = "0"; });
  });
})();

// ── Magnetic buttons ──
(function () {
  document.querySelectorAll(".workCard-Bttn, .readMore, .ExploreBttn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transition = "transform 0.12s ease";
      btn.style.transform  = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transition = "transform 0.55s cubic-bezier(0.34,1.56,0.64,1)";
      btn.style.transform  = "";
    });
  });
})();

// ── Card glare / light reflection ──
(function () {
  document.querySelectorAll(".pf-card").forEach((card) => {
    const glare = document.createElement("div");
    glare.className = "card-glare";
    card.appendChild(glare);

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.13) 0%, transparent 65%)`;
      glare.style.opacity = "1";
    }, { passive: true });
    card.addEventListener("mouseleave", () => { glare.style.opacity = "0"; });
  });
})();

// ── Typewriter on hero .Prof text ──
(function () {
  const el = document.querySelector(".Prof");
  if (!el) return;
  const text = el.textContent.trim();
  el.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  el.appendChild(cursor);

  let i = 0;
  function type() {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i++]), cursor);
      setTimeout(type, 65);
    }
  }
  setTimeout(type, 2200); // starts after preloader
})();

// ── Split-text char animation on headings ──
(function () {
  const targets = [
    ".portfolio-heading",
    ".skills-Section-heading",
    ".contact-heading",
    ".passion-heading",
  ];
  targets.forEach((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const text = el.textContent.trim();
    el.textContent = "";
    // remove shimmer from these since we're splitting chars
    el.style.animation = "none";
    el.style.webkitTextFillColor = "";
    el.style.backgroundImage = "none";

    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "split-char";
      span.style.transitionDelay = `${i * 0.04}s`;
      span.textContent = ch === " " ? " " : ch;
      el.appendChild(span);
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          el.querySelectorAll(".split-char").forEach((s) => s.classList.add("in"));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
  });
})();

// ── Active nav link on scroll ──
(function () {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".list-items a");

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((a) => a.classList.remove("nav-active"));
        const active = document.querySelector(`.list-items a[href="#${en.target.id}"]`);
        if (active) active.classList.add("nav-active");
      }
    });
  }, { threshold: 0.35 });

  sections.forEach((s) => obs.observe(s));
})();

// ── Section number watermarks ──
(function () {
  const secs = [
    { id: "mypassion",        num: "01" },
    { id: "AboutMe",          num: "02" },
    { id: "ProfessionalitySec", num: "03" },
    { id: "Skills",           num: "04" },
    { id: "portfolio",        num: "05" },
    { id: "contact",          num: "06" },
  ];
  secs.forEach(({ id, num }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.position = "relative";
    const stamp = document.createElement("span");
    stamp.className = "section-num";
    stamp.textContent = num;
    el.appendChild(stamp);
  });
})();

// ── Fix: Re-observe split-char containers with lower threshold ──
// (Previous threshold of 0.4 was too high — chars stayed invisible)
(function () {
  const splitHeadings = document.querySelectorAll(
    ".portfolio-heading, .skills-Section-heading, .contact-heading, .passion-heading"
  );

  const fixObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.querySelectorAll(".split-char").forEach((s) => s.classList.add("in"));
          fixObs.unobserve(en.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  splitHeadings.forEach((el) => fixObs.observe(el));
})();

// ── Inertia / lerp scroll (desktop only — mobile uses native inertia) ──
(function () {
  // Mobile devices already have smooth native inertia — skip lerp entirely
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouchDevice) {
    // Keep smooth scroll on mobile for anchor links
    document.documentElement.style.scrollBehavior = "smooth";
    return;
  }

  // ── Desktop lerp scroll ──
  document.documentElement.style.scrollBehavior = "auto";

  let currentY = window.scrollY;
  let targetY  = window.scrollY;
  const EASE   = 0.07;

  function clamp() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    targetY = Math.max(0, Math.min(targetY, max));
  }

  // Mouse wheel
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    targetY += e.deltaY;
    clamp();
  }, { passive: false });

  // Anchor clicks (including back-to-top href="#")
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      e.preventDefault();
      if (href === "#") {
        targetY = 0; // back to top
        return;
      }
      const target = document.getElementById(href.slice(1));
      if (target) {
        targetY = target.getBoundingClientRect().top + window.scrollY - 20;
        clamp();
      }
    });
  });

  // Lerp loop
  function lerp(a, b, t) { return a + (b - a) * t; }

  function loop() {
    currentY = lerp(currentY, targetY, EASE);
    if (Math.abs(targetY - currentY) < 0.5) currentY = targetY;
    window.scrollTo(0, currentY);
    requestAnimationFrame(loop);
  }

  loop();
})();
