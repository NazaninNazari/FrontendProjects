"use strict";
const productsContainer = document.getElementById("productsContainer");
const popupOverlay = document.getElementById("popupOverlay");
const popupContent = document.getElementById("popupContent");
const popupImage = document.getElementById("popupImage");
const popupTitle = document.getElementById("popupTitle");
const popupDescription = document.getElementById("popupDescription");
const popupPrice = document.getElementById("popupPrice");
const popupStock = document.getElementById("popupStock");
const closePopup = document.getElementById("closePopup");

const products = [
  {
    id: 1,
    name: "آیفون 15 پرو",
    description: "گوشی اپل با دوربین 48 مگاپیکسل و طراحی جدید",
    price: "75 میلیون تومان",
    image:
      "https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 2,
    name: "سامسونگ گلکسی S24",
    description: "گوشی سامسونگ با صفحه AMOLED و عملکرد بالا",
    price: "45 میلیون تومان",
    image:
      "https://images.unsplash.com/photo-1583573636246-18cb2246697f?q=80&w=1338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: false,
  },
  {
    id: 3,
    name: "لپ‌تاپ مک‌بوک پرو",
    description: "لپ‌تاپ اپل با چیپ M2 و نمایشگر رتینا",
    price: "120 میلیون تومان",
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
  {
    id: 4,
    name: "هدفون سونی",
    description: "هدفون بی‌سیم با نویز کنسلینگ و کیفیت صدای عالی",
    price: "15 میلیون تومان",
    image:
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    available: true,
  },
];

products.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product_card";
  card.innerHTML = `
                <img class="product_image" src="${product.image}" alt="${product.name}">
                <span class="product_title">${product.name}</span>
                <div class="price">${product.price}</div>
                <button class="button_view" data-id="${product.id}">نمایش سریع</button>
            `;
  productsContainer.appendChild(card);
});

document.querySelectorAll(".button_view").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.getAttribute("data-id");
    const product = products.find((p) => p.id == productId);
    popupImage.src = product.image;
    popupTitle.textContent = product.name;
    popupDescription.textContent = product.description;
    popupPrice.textContent = product.price;
    popupStock.textContent = product.available ? "موجود" : "ناموجود";
    popupStock.className = `stock ${product.available ? "available" : "unavailable"}`;
    popupOverlay.classList.add("show");
    setTimeout(() => {
      popupContent.classList.add("show");
    }, 10);
  });
});

closePopup.addEventListener("click", () => {
  popupContent.classList.remove("show");
  setTimeout(() => {
    popupOverlay.classList.remove("show");
  }, 500);
});

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupContent.classList.remove("show");
    setTimeout(() => {
      popupOverlay.classList.remove("show");
    }, 500);
  }
});
