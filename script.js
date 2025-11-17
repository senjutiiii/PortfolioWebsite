document.addEventListener("DOMContentLoaded", () => {
  // --- Set current year in footer ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Theme toggle with localStorage ---
  const themeToggle = document.querySelector(".theme-toggle");
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark") {
    document.body.classList.add("theme-dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("theme-dark");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
      // --- Scroll-spy for navigation ---
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const topOffset = rect.top + window.scrollY - 140;
      const bottomOffset = topOffset + section.offsetHeight;

      if (window.scrollY >= topOffset && window.scrollY < bottomOffset) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      const href = link.getAttribute("href");
      if (href === "#" + currentSectionId) {
        link.classList.add("active-link");
      }
    });
  });
});
  }

  // --- Back to top button ---
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Scroll reveal animations ---
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));

  // --- Project filter buttons ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // update active button
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // filter cards
      projectCards.forEach((card) => {
        const type = card.getAttribute("data-type");
        if (filter === "all" || filter === type) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // --- Animate skill bars when section appears ---
  const skillBars = document.querySelectorAll(".skill-bar");

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const fill = bar.querySelector(".bar-fill");
          const level = bar.getAttribute("data-level");
          if (fill && level) {
            fill.style.width = level + "%";
          }
          skillsObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => skillsObserver.observe(bar));
});
