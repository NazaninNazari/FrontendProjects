"use strict";
// Form submission handler
document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Add loading state
  const button = document.querySelector(".button_login");
  const originalText = button.textContent;
  button.textContent = "در حال ورود.";
  button.disabled = true;

  // Simulate login process
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    alert("ورود موفقیت‌آمیز بود!");
  }, 2000);
});

// Add floating animation to form inputs
document.querySelectorAll(".inputs").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.querySelector(".label_input").style.color = "#7c7cff";
  });

  input.addEventListener("blur", function () {
    this.parentElement.querySelector(".label_input").style.color =
      "rgba(255, 255, 255, 0.9)";
  });
});
