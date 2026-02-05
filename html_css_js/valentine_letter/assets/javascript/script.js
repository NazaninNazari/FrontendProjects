"use strict";
// Elements
const envelope = document.getElementById("container_envelope");
const letter = document.getElementById("container_letter");
const noBtn = document.querySelector(".button_no");
const yesBtn = document.querySelector(".buttons[alt='yes']");

const title = document.getElementById("letter_title");
const catImg = document.getElementById("letter_cat");
const buttons = document.getElementById("letter_buttons");
const finalText = document.getElementById("final_text");

// Click Envelope
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter_window").classList.add("open");
  }, 50);
});

// Logic to move the NO btn
noBtn.addEventListener("mouseover", () => {
  const min = 200;
  const max = 200;
  const distance = Math.random() * (max - min) + min;
  const angle = Math.random() * Math.PI * 2;
  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

yesBtn.addEventListener("click", () => {
  title.textContent = "❤Yippeeee!❤";
  catImg.src = "../cat_dance.gif";
  document.querySelector(".letter_window").classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";
});
