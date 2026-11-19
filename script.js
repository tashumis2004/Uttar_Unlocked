// ============================================================
// UTTAR UNLOCKED — INTERACTIONS
// This file controls the mobile menu, trip form, newsletter form,
// and small scroll-reveal animations.
// ============================================================

// 1) Mobile navigation menu: open or close when menu button is tapped.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // On mobile, close the menu after a navigation link is selected.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// 2) Trip planner: this is a front-end demo.
// It validates the form and displays a confirmation; it does not send data
// to a server or create an actual booking.
const tripForm = document.getElementById("tripForm");
const formMessage = document.getElementById("formMessage");

if (tripForm && formMessage) {
  tripForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop the browser from reloading the page.
    const formData = new FormData(tripForm);
    const destination = formData.get("destination");
    const date = formData.get("date");
    const travellers = formData.get("travellers");

    formMessage.textContent =
      `Your trip idea for ${destination} on ${date} (${travellers} traveller(s)) is ready. This demo doesn't submit a booking yet.`;
    tripForm.reset();
  });
}

// 3) Newsletter: demo-only feedback. No email is saved or sent.
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterForm && newsletterMessage) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterMessage.textContent = "Thanks! Newsletter signup is a demo and is not connected yet.";
    newsletterForm.reset();
  });
}

// 4) Reveal cards and sections gently as they enter the viewport.
const revealElements = document.querySelectorAll(
  ".section-heading, .destination-card, .experience-item, .food-card, .gallery-grid img, .trip-panel, .testimonial"
);
revealElements.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Animate each element once.
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  // Older browsers: show everything immediately instead of hiding content.
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// 5) Set the trip date picker minimum date to today, using local date format.
const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = localDate;
}
