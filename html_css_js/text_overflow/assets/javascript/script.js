"use strict";
document.querySelector(".more_btn").addEventListener("click", function () {
  const textContent = document.querySelector(".text_content");
  textContent.classList.toggle("expanded");
  this.textContent = textContent.classList.contains("expanded")
    ? "بستن"
    : "مشاهده بیشتر";
});

// Animate text
window.addEventListener("load", () => {
  const animatedText = document.querySelector(".animated_text");
  animatedText.classList.add("visible");
});
