"use strict";
const questionContainer = document.querySelector(".container_question");
const resultContainer = document.querySelector(".container_result");
const gifResult = document.querySelector(".result_gif");
const heartLoader = document.querySelector(".cssload_main");
const yesBtn = document.querySelector(".button_yes_javascript");
const noBtn = document.querySelector(".button_no_javascript");

// yes button functionality
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  const timeoutId = setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    gifResult.play();
  }, 3000);
});
