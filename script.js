/* ==========================================
   script.js
   Part 1/3
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       LOADER
    ========================== */

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {

        if (loader) {

            setTimeout(() => {

                loader.classList.add("hidden");

            }, 600);

        }

    });

   /* ==========================
      DARK MODE
   ========================== */
   
   const themeToggle = document.getElementById("themeToggle");
   
   const currentTheme = localStorage.getItem("theme");
   
   if (currentTheme === "dark") {
       document.body.classList.add("dark");
       themeToggle.textContent = "☀️";
   }
   
   themeToggle?.addEventListener("click", () => {
   
       document.body.classList.toggle("dark");
   
       const dark = document.body.classList.contains("dark");
   
       localStorage.setItem(
           "theme",
           dark ? "dark" : "light"
       );
   
       themeToggle.textContent = dark ? "☀️" : "🌙";
   
   });

    /* ==========================
       MOBILE MENU
    ========================== */

    const menuButton = document.querySelector(".menu-btn");

    const navLinks = document.querySelector(".nav-links");

    menuButton?.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {

            menuButton.innerHTML = "✕";

        } else {

            menuButton.innerHTML = "☰";

        }

    });

    /* ==========================
       CLOSE MENU AFTER CLICK
    ========================== */

    document.querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                if (menuButton) {

                    menuButton.innerHTML = "☰";

                }

            });

        });

    /* ==========================
       SMOOTH SCROLLING
    ========================== */

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                const targetId = this.getAttribute("href");

                if (targetId === "#") return;

                const target = document.querySelector(targetId);

                if (!target) return;

                e.preventDefault();

                window.scrollTo({

                    top: target.offsetTop - 70,

                    behavior: "smooth"

                });

            });

        });

});

/* ==========================================
   script.js
   Part 2/3
========================================== */

/* ==========================
   SCROLL PROGRESS BAR
========================== */

const progressBar = document.querySelector(".progress-bar");

function updateProgressBar() {

    if (!progressBar) return;

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgressBar);

/* ==========================
   BACK TO TOP BUTTON
========================== */

const backToTop =
    document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop?.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================
   ACTIVE NAV LINK
========================== */

const sections =
    document.querySelectorAll("section");

const navItems =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});

/* ==========================
   FADE-IN ANIMATION
========================== */

const revealElements =
    document.querySelectorAll(
        ".fade-up, .reveal"
    );

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "show",
                    "active"
                );

            }

        });

    },

    {

        threshold: 0.15

    }

);

revealElements.forEach(element => {

    observer.observe(element);

});

/* ==========================
   HEADER SHADOW
========================== */

const header =
    document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 8px 30px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "none";

    }

});

/* ==========================
   PARALLAX HERO IMAGE
========================== */

const heroImage =
    document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {

    if (!heroImage) return;

    const offset =
        window.scrollY * 0.08;

    heroImage.style.transform =
        `translateY(${offset}px)`;

});

/* ==========================================
   script.js
   Part 3/3
========================================== */

/* ==========================
   TYPING EFFECT
========================== */

const typingElement = document.querySelector(".typing");

if (typingElement) {

    const words = [
        "iOS Developer",
        "Software Developer",
        "SwiftUI Enthusiast",
        "Apple Developer Academy Graduate"
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, letterIndex + 1);

            letterIndex++;

            if (letterIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);

                return;

            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, letterIndex - 1);

            letterIndex--;

            if (letterIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {

                    wordIndex = 0;

                }

            }

        }

        setTimeout(typeEffect, deleting ? 60 : 100);

    }

    typeEffect();

}

/* ==========================
   COPY EMAIL
========================== */

const emailButton = document.querySelector(".copy-email");

emailButton?.addEventListener("click", async () => {

    const email = "yousraagoub@gmail.com";

    try {

        await navigator.clipboard.writeText(email);

        emailButton.textContent = "Email Copied!";

        setTimeout(() => {

            emailButton.textContent = email;

        }, 2000);

    } catch {

        console.log("Clipboard not supported.");

    }

});

/* ==========================
   CURRENT YEAR
========================== */

const currentYear = document.querySelector(".current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}

/* ==========================
   BUTTON RIPPLE EFFECT
========================== */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const diameter = Math.max(
            this.clientWidth,
            this.clientHeight
        );

        ripple.style.width = ripple.style.height =
            `${diameter}px`;

        const rect = this.getBoundingClientRect();

        ripple.style.left =
            `${e.clientX - rect.left - diameter / 2}px`;

        ripple.style.top =
            `${e.clientY - rect.top - diameter / 2}px`;

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* ==========================
   IMAGE LAZY ANIMATION
========================== */

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {

        threshold: 0.1

    }

);

images.forEach(image => {

    image.style.opacity = "0";

    image.style.transform = "translateY(20px)";

    image.style.transition =
        "opacity .8s ease, transform .8s ease";

    imageObserver.observe(image);

});

/* ==========================
   PERFORMANCE
========================== */

window.addEventListener("pageshow", () => {

    document.body.classList.add("loaded");

});

/* ==========================
   CONSOLE MESSAGE
========================== */

console.log(
`
======================================

Hi there 👋

Thanks for checking out my portfolio!

Built with ❤️ by

Yousra Ali

Swift • SwiftUI • JavaScript

======================================
`
);

/* ==========================
   END
========================== */
