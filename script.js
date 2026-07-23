/* ==========================================================
   Yousra Abdelrahman — Portfolio
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Dark mode ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("[data-lucide]");
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark");
  }

  function syncThemeIcon() {
    if (!themeIcon) return;
    const dark = document.body.classList.contains("dark");
    themeIcon.setAttribute("data-lucide", dark ? "sun" : "moon");
    if (window.lucide) lucide.createIcons();
  }
  syncThemeIcon();

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    syncThemeIcon();
  });

  /* ---------- Mobile menu ---------- */
  const menuButton = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const menuIcon = menuButton?.querySelector("[data-lucide]");

  function closeMenu() {
    navLinks?.classList.remove("active");
    if (menuIcon) {
      menuIcon.setAttribute("data-lucide", "menu");
      if (window.lucide) lucide.createIcons();
    }
    menuButton?.setAttribute("aria-expanded", "false");
  }

  menuButton?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("active");
    if (menuIcon) {
      menuIcon.setAttribute("data-lucide", isOpen ? "x" : "menu");
      if (window.lucide) lucide.createIcons();
    }
    menuButton.setAttribute("aria-expanded", String(!!isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (!navLinks?.classList.contains("active")) return;
    if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Smooth scroll (same page only) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navbarH = document.querySelector(".navbar")?.offsetHeight || 64;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navbarH - 24,
        behavior: "smooth"
      });
    });
  });

  /* ---------- Ripple effect ---------- */
  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const rect = this.getBoundingClientRect();
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;
      ripple.classList.add("ripple");
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  if (window.lucide) lucide.createIcons();
});

/* ---------- Scroll progress bar ---------- */
const progressBar = document.getElementById("progress-bar");

function updateProgressBar() {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateProgressBar, { passive: true });
updateProgressBar();

/* ---------- Header shadow on scroll ---------- */
const header = document.querySelector("header");
function updateHeaderShadow() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", updateHeaderShadow, { passive: true });
updateHeaderShadow();

/* ---------- Active nav link (index page only) ---------- */
const sections = document.querySelectorAll("main section[id], section[id]");
const navItems = document.querySelectorAll(".nav-links a");

if (sections.length) {
  window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 160;
      if (window.scrollY >= sectionTop) currentSection = section.getAttribute("id");
    });
    navItems.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
  }, { passive: true });
}

/* ---------- Reveal on scroll ---------- */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach(el => revealObserver.observe(el));

/* ---------- Back to top ---------- */
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("show", window.scrollY > 500);
}, { passive: true });
backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Typing effect ---------- */
const typingElement = document.querySelector(".typing");
if (typingElement) {
  const words = [
    "Software Developer",
    "iOS Developer"
  ];
  let wordIndex = 0, letterIndex = 0, deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (!deleting) {
      typingElement.textContent = currentWord.substring(0, letterIndex + 1);
      letterIndex++;
      if (letterIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }
    } else {
      typingElement.textContent = currentWord.substring(0, letterIndex - 1);
      letterIndex--;
      if (letterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeEffect, deleting ? 45 : 90);
  }
  typeEffect();
}

/* ---------- Footer year ---------- */
const currentYear = document.querySelector(".current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

console.log(
`Hi there 👋 thanks for checking the console too.
Built by Yousra Abdelrahman — Swift • SwiftUI • JavaScript`
);
