"use strict";
let circularProgress = document.querySelector(".circular_progress"),
  progressValue = document.querySelector(".progress_value");

let progressStartValue = 0,
  progressEndValue = 90,
  speed = 100;

let progress = setInterval(() => {
  progressStartValue++;

  progressValue.textContent = `${progressStartValue}%`;
  circularProgress.style.background = `conic-gradient(#e82a93 ${
    progressStartValue * 3.6
  }deg, #ededed 0deg)`;

  if (progressStartValue == progressEndValue) {
    clearInterval(progress);
  }
}, speed);
