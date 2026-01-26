"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "گوشی موبایل سامسونگ گلکسی اس 23",
      description:
        "گوشی هوشمند سامسونگ با پردازنده قدرتمند اسنپدراگون 8 نسل 2 و دوربین 200 مگاپیکسلی",
      price: "۳۵,۹۹۹,۰۰۰",
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop",
      isOnSale: true,
      rating: 4.8,
    },
    {
      id: 2,
      name: "لپ تاپ ایسوس ویوو بوک 15",
      description:
        "لپ تاپ 15 اینچی سبک و قدرتمند با پردازنده اینتل کور i7 و کارت گرافیک اختصاصی",
      price: "۴۵,۵۰۰,۰۰۰",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop",
      isOnSale: false,
      rating: 4.6,
    },
    {
      id: 3,
      name: "هدفون بی سیم سونی WH-1000XM4",
      description:
        "هدفون نویزکنسلینگ با صدای استثنایی و باتری با دوام 30 ساعته",
      price: "۱۵,۷۵۰,۰۰۰",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
      isOnSale: true,
      rating: 4.9,
    },
    {
      id: 4,
      name: "اسمارت واچ اپل سری 8",
      description:
        "ساعت هوشمند اپل با صفحه نمایش همیشه روشن و قابلیت های سلامت پیشرفته",
      price: "۲۹,۹۹۹,۰۰۰",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop",
      isOnSale: false,
      rating: 4.7,
    },
    {
      id: 5,
      name: "دوربین کانن EOS R6",
      description:
        "دوربین فول فریم حرفه ای با قابلیت فیلمبرداری 4K و عکاسی 20 فریم بر ثانیه",
      price: "۱۵۰,۰۰۰,۰۰۰",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop",
      isOnSale: true,
      rating: 4.9,
    },
    {
      id: 6,
      name: "اسپیکر هوشمند گوگل نست مینی",
      description: "بلندگوی هوشمند با دستیار صوتی گوگل و کیفیت صدای عالی",
      price: "۸,۵۰۰,۰۰۰",
      image:
        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop",
      isOnSale: false,
      rating: 4.5,
    },
  ];

  const productsContainer = document.getElementById("productsContainer");

  function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = "";

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += "★";
      } else if (i === fullStars && hasHalfStar) {
        stars += "½";
      } else {
        stars += "☆";
      }
    }

    return `<div class="rating" title="${rating.toFixed(
      1
    )} از 5">${stars}</div>`;
  }

  function renderProducts() {
    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product_card";

      productCard.innerHTML = `
                ${
                  product.isOnSale
                    ? '<span class="sale-badge">فروش ویژه</span>'
                    : ""
                }
                <img src="${product.image}" alt="${
        product.name
      }" class="product_image">
                <div class="product_details">
                    <h3 class="product_title">${product.name}</h3>
                    ${createStarRating(product.rating)}
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="price">${product.price} تومان</span>
                        <button class="add-to-cart" data-id="${product.id}">
                            افزودن به سبد خرید
                        </button>
                    </div>
                </div>
            `;

      productsContainer.appendChild(productCard);
    });

    // Add event listeners to all add to cart buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = products.find((p) => p.id === productId);
        addToCart(product);
      });
    });
  }

  function addToCart(product) {
    // Here you would typically add the product to a shopping cart
    // For now, we'll just show an alert
    const message = `محصول ${product.name} به سبد خرید اضافه شد.\nقیمت: ${product.price} تومان`;
    alert(message);

    // Animation for the button
    const button = document.querySelector(
      `.add-to-cart[data-id="${product.id}"]`
    );
    button.textContent = "افزوده شد!";
    button.style.background = "#2ecc71";

    setTimeout(() => {
      button.textContent = "افزودن به سبد خرید";
      button.style.background = "linear-gradient(45deg, #6c63ff, #4a45b1)";
    }, 2000);
  }

  // Initialize the page
  renderProducts();
});
