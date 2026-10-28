
/* ==========================================
   ALI RESTAURANT FAST FOOD
   Interactive Website JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------------------
  // 1. HERO IMAGE SLIDER — EVERY 5 SECONDS
  // ----------------------------------------

  const slides = document.querySelectorAll(".hero-slide");
  const slideNumber = document.getElementById("slideNumber");
  const heroTitle = document.getElementById("heroTitle");
  const heroDescription = document.getElementById("heroDescription");
  const nextButton = document.getElementById("nextSlide");
  const prevButton = document.getElementById("prevSlide");

  const slideContent = [
    {
      title: 'GOOD FOOD.<br><span>HAPPY MOOD.</span>',
      description: "Big flavours, fresh ingredients and the kind of food that makes every bite memorable."
    },
    {
      title: 'CRUNCHY BITES.<br><span>BIG DELIGHT.</span>',
      description: "Treat yourself to delicious favourites made for your happiest cravings."
    },
    {
      title: 'A SLICE OF<br><span>HAPPINESS.</span>',
      description: "Discover irresistible flavours, delicious toppings and moments worth sharing."
    }
  ];

  let currentSlide = 0;
  let sliderTimer;

  function showSlide(index) {
    if (!slides.length) return;

    slides[currentSlide].classList.remove("active");

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    if (slideNumber) {
      slideNumber.textContent = String(currentSlide + 1).padStart(2, "0");
    }

    if (heroTitle && slideContent[currentSlide]) {
      heroTitle.innerHTML = slideContent[currentSlide].title;

      heroTitle.style.animation = "none";
      void heroTitle.offsetWidth;
      heroTitle.style.animation = "contentEnter .65s ease both";
    }

    if (heroDescription && slideContent[currentSlide]) {
      heroDescription.textContent =
        slideContent[currentSlide].description;
    }
  }

  function startSlider() {
    clearInterval(sliderTimer);

    sliderTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  if (slides.length) {
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        startSlider();
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        startSlider();
      });
    }

    startSlider();
  }

  // ----------------------------------------
  // 2. MOBILE NAVIGATION
  // ----------------------------------------

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link, .nav-order");

  function closeMenu() {
    if (!nav || !menuToggle) return;

    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // ----------------------------------------
  // 3. STICKY HEADER EFFECT
  // ----------------------------------------

  const header = document.getElementById("header");

  function updateHeader() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // ----------------------------------------
  // 4. SCROLL REVEAL ANIMATIONS
  // ----------------------------------------

  const revealElements = document.querySelectorAll(
    ".reveal, .food-card"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -25px 0px"
    });

    revealElements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  
  // ----------------------------------------
  // 5. MENU CATEGORY FILTERS
  // ----------------------------------------

  const filterButtons = document.querySelectorAll(".filter-btn");
  const foodCards = document.querySelectorAll(".food-card");

  function showMenu(category) {
    // Active filter button update
    filterButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );
    });

    // Products show/hide
    const shownCategories = {};

    foodCards.forEach(card => {
      const cardCategory = card.dataset.category;

      let shouldShow = false;

      if (category === "all") {
        // All Items: har category ka sirf pehla product
        if (!shownCategories[cardCategory]) {
          shouldShow = true;
          shownCategories[cardCategory] = true;
        }
      } else {
        // Specific filter: us category ke saare products
        shouldShow = cardCategory === category;
      }

      card.classList.toggle("hidden", !shouldShow);

      if (shouldShow) {
        card.classList.remove("visible");

        requestAnimationFrame(() => {
          card.classList.add("visible");
        });
      }
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      showMenu(button.dataset.filter);
    });
  });

  // Page load par har category ka ek product
  showMenu("all");


  // ----------------------------------------
  // 6. WHATSAPP ORDERING
  // ----------------------------------------

  // IMPORTANT:
  // Replace this demo number with the restaurant's
  // WhatsApp number, including country code.
  // Pakistan example format: 923001234567
  // Do not include +, spaces or dashes.

  const WHATSAPP_NUMBER = "923001234567";

  function orderOnWhatsApp(message) {
    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  const orderButtons = document.querySelectorAll(".order-item");

  orderButtons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.dataset.item;

      const message =
        `Assalam-o-Alaikum Ali Restaurant! I would like to order: ${item}. Please confirm availability and the total price.`;

      orderOnWhatsApp(message);
    });
  });

  const contactOrder = document.getElementById("contactOrder");

  if (contactOrder) {
    contactOrder.addEventListener("click", () => {
      orderOnWhatsApp(
        "Assalam-o-Alaikum Ali Restaurant! I would like to see your menu and place an order."
      );
    });
  }

  // ----------------------------------------
  // 7. AUTOMATIC COPYRIGHT YEAR
  // ----------------------------------------

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ----------------------------------------
  // 8. ACTIVE NAVIGATION LINK
  // ----------------------------------------

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    }, {
      rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  console.log("Ali Restaurant website is ready!");
});
