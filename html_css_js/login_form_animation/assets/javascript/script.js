"use strict";
// Animation input
document.querySelectorAll(".form-input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});

// Animation buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mousedown", function () {
    this.style.transform = "scale(0.95)";
  });

  button.addEventListener("mouseup", function () {
    this.style.transform = "scale(1)";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});
