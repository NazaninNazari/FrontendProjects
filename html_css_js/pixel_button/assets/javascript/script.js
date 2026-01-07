"use strict";
let buttons = document.querySelectorAll(".pixel_btn");
buttons.forEach((button) => {
  let pixelcontainer = button.querySelector(".pixel_container");
  let pixSize = 10;
  let btnwidth = button.offsetWidth;
  let btnheight = button.offsetHeight;

  let cols = Math.floor(btnwidth / pixSize);
  let rows = Math.floor(btnheight / pixSize);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.style.left = `${col * pixSize}px`;
      pixel.style.top = `${row * pixSize}px`;

      let dealy = Math.random() * 0.5;
      pixel.style.transitionDelay = `${dealy}s`;

      let tx = (Math.random() - 0.5) * 30;
      let ty = (Math.random() - 0.5) * 30;

      pixel.style.setProperty("--tx", `${tx}px`);
      pixel.style.setProperty("--ty", `${ty}px`);

      pixelcontainer.appendChild(pixel);
    }
  }
});
