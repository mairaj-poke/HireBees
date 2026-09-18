/* =====================================================
   HireBees - Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     Sticky Navbar
  ========================================== */

  const navbar = document.querySelector(".navbar");

  function handleNavbar() {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", handleNavbar, { passive: true });
  handleNavbar();


  /* ==========================================
     Mobile Navigation
  ========================================== */

  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (!mobileMenu.classList.contains("open")) return;

      if (
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1080) {
        closeMobileMenu();
      }
    });
  }


  /* ==========================================
     Scroll To Top
  ========================================== */

  const scrollBtn = document.getElementById("scrollTop");

  if (scrollBtn) {

    const updateScrollButton = () => {
      const visible = window.scrollY > 600;

      scrollBtn.style.opacity = visible ? "1" : "0";
      scrollBtn.style.pointerEvents = visible ? "auto" : "none";
    };

    updateScrollButton();

    window.addEventListener(
      "scroll",
      updateScrollButton,
      { passive: true }
    );

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  /* ==========================================
     Smooth Anchor Scroll
  ========================================== */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

      const href = this.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /* ==========================================
     FAQ Accordion
  ========================================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (!question || !answer) return;

    /* Initial state */
    answer.style.display = "none";

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {

      const isOpen = item.classList.contains("active");

      /* Close all FAQ items */
      faqItems.forEach(otherItem => {

        otherItem.classList.remove("active");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        const otherIcon =
          otherItem.querySelector(".faq-icon");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        if (otherAnswer) {
          otherAnswer.style.display = "none";
        }

        if (otherIcon) {
          otherIcon.textContent = "+";
        }

        if (otherQuestion) {
          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      });


      /* Open clicked FAQ */
      if (!isOpen) {

        item.classList.add("active");

        answer.style.display = "block";

        question.setAttribute(
          "aria-expanded",
          "true"
        );

        if (icon) {
          icon.textContent = "−";
        }
      }
    });
  });


  /* ==========================================
     Animated Numbers
  ========================================== */

  const counters = document.querySelectorAll(".trust-card h2");

  if ("IntersectionObserver" in window && counters.length) {

    const counterObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const counter = entry.target;
          const txt = counter.innerText;

          const number = parseInt(
            txt.replace(/\D/g, ""),
            10
          );

          if (Number.isNaN(number)) return;

          let current = 0;

          const speed = Math.max(
            1,
            Math.ceil(number / 80)
          );

          const update = () => {

            current += speed;

            if (current > number) {
              current = number;
            }

            counter.innerText = current + "+";

            if (current < number) {
              requestAnimationFrame(update);
            }
          };

          update();

          counterObserver.unobserve(counter);
        });

      },
      {
        threshold: 0.6
      }
    );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }


  /* ==========================================
     Reveal Animation
  ========================================== */

  const revealItems = document.querySelectorAll(
    ".service-card," +
    ".industry-card," +
    ".process-card," +
    ".testimonial-card," +
    ".benefit-item," +
    ".glass-card," +
    ".trust-card"
  );

  if ("IntersectionObserver" in window) {

    revealItems.forEach(item => {

      item.style.opacity = "0";
      item.style.transform = "translateY(40px)";
      item.style.transition = ".7s ease";
    });


    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);
          }
        });

      },
      {
        threshold: 0.18
      }
    );


    revealItems.forEach(item => {
      revealObserver.observe(item);
    });
  }


  /* ==========================================
     Active Navigation
  ========================================== */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const activeObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
                "#" + entry.target.id
            );
          });
        });

      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );


    sections.forEach(section => {
      activeObserver.observe(section);
    });
  }


  /* ==========================================
     Floating Hero Cards
  ========================================== */

  const cards = document.querySelectorAll(".floating-card");

  if (
    cards.length &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    window.addEventListener(
      "mousemove",
      e => {

        const x =
          (e.clientX / window.innerWidth) - 0.5;

        const y =
          (e.clientY / window.innerHeight) - 0.5;


        cards.forEach((card, index) => {

          const depth = (index + 1) * 8;

          card.style.transform =
            `translate(${x * depth}px,${y * depth}px)`;
        });

      },
      {
        passive: true
      }
    );
  }


  /* ==========================================
     Button Ripple
  ========================================== */

  document.querySelectorAll(".primary-btn").forEach(btn => {

    btn.addEventListener("click", function (e) {

      if (
        this.tagName === "BUTTON" &&
        this.type === "submit"
      ) {
        return;
      }

      const ripple = document.createElement("span");

      ripple.className = "ripple";

      const rect = this.getBoundingClientRect();

      ripple.style.left =
        (e.clientX - rect.left) + "px";

      ripple.style.top =
        (e.clientY - rect.top) + "px";

      this.appendChild(ripple);


      setTimeout(() => {
        ripple.remove();
      }, 700);
    });
  });


  /* ==========================================
     HireBees Enquiry Form
     Static-site email delivery via FormSubmit
  ========================================== */

  const enquiryForm =
    document.getElementById("enquiryForm");

  const formStatus =
    document.getElementById("formStatus");

  const submitButton =
    document.getElementById("submitEnquiry");


  if (
    enquiryForm &&
    formStatus &&
    submitButton
  ) {

    enquiryForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        /* Validate form */
        if (!enquiryForm.checkValidity()) {

          enquiryForm.reportValidity();

          return;
        }


        /* Show sending state */
        formStatus.className =
          "form-status show";

        formStatus.textContent =
          "Sending your enquiry...";

        submitButton.disabled = true;
        submitButton.style.opacity = ".7";
        submitButton.style.cursor = "wait";


        try {

          const response = await fetch(
            "https://formsubmit.co/ajax/support@hirebees.co.in",
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },

              body: JSON.stringify(
                Object.fromEntries(
                  new FormData(enquiryForm)
                )
              )
            }
          );


          const data =
            await response.json().catch(
              () => ({})
            );


          if (
            !response.ok ||
            data.success === false
          ) {
            throw new Error(
              data.message ||
              "The enquiry could not be sent."
            );
          }


          /* Success */
          formStatus.className =
            "form-status show success";

          formStatus.textContent =
            "Thank you. Your enquiry has been sent successfully. We will get back to you shortly.";

          enquiryForm.reset();


        } catch (error) {

          /* Error */
          formStatus.className =
            "form-status show error";

          formStatus.textContent =
            "We couldn't send the enquiry right now. Please try again or email support@hirebees.co.in.";
        }


        /* Restore button */
        finally {

          submitButton.disabled = false;
          submitButton.style.opacity = "";
          submitButton.style.cursor = "";
        }
      }
    );
  }

});
