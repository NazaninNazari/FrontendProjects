"use strict";
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let carousel = document.querySelector(".carousel");
let listHTML = document.querySelector(".carousel .list_carousel");
let seeMoreButtons = document.querySelectorAll(".button_see_more");
let backButton = document.getElementById("back");

// Button Next
nextButton.onclick = function () {
  showSlider("next");
};
// Button Prev
prevButton.onclick = function () {
  showSlider("prev");
};
let unAcceppClick;
// Show Slider
const showSlider = (type) => {
  nextButton.style.pointerEvents = "none";
  prevButton.style.pointerEvents = "none";

  carousel.classList.remove("next", "prev");
  let items = document.querySelectorAll(
    ".carousel .list_carousel .item_slider",
  );
  if (type === "next") {
    listHTML.appendChild(items[0]);
    carousel.classList.add("next");
  } else {
    listHTML.prepend(items[items.length - 1]);
    carousel.classList.add("prev");
  }
  clearTimeout(unAcceppClick);
  unAcceppClick = setTimeout(() => {
    nextButton.style.pointerEvents = "auto";
    prevButton.style.pointerEvents = "auto";
  }, 2000);
};
// Button See More
seeMoreButtons.forEach((button) => {
  button.onclick = function () {
    carousel.classList.remove("next", "prev");
    carousel.classList.add("showDetail");
  };
});
// Button Back
backButton.onclick = function () {
  carousel.classList.remove("showDetail");
};
