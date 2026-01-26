(function () {
  "use strict";

  // عناصر
  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");
  const input = document.getElementById("captchaInput");
  const verifyBtn = document.getElementById("verifyBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const clearBtn = document.getElementById("clearBtn");
  const result = document.getElementById("resultMessage");
  const confettiCanvas = document.getElementById("confettiCanvas");
  const confettiCtx = confettiCanvas.getContext("2d");

  // تنظیم اندازه کنفِتی
  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  resizeConfettiCanvas();
  window.addEventListener("resize", resizeConfettiCanvas);

  // تنظیمات کپچا
  const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // حذف موارد مبهم
  const CAPTCHA_LENGTH = 6;
  let currentCaptcha = "";

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }
  function randomColor(alpha = 1) {
    const h = randomInt(15, 45); // نارنجی
    const s = randomInt(60, 90);
    const l = randomInt(50, 80);
    return `hsla(${h} ${s}% ${l}% / ${alpha})`;
  }

  function generateCaptchaText(length) {
    let out = "";
    for (let i = 0; i < length; i++) {
      out += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }
    return out;
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawNoise() {
    // زمینه ملایم
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "rgba(255,255,255,0.06)");
    grad.addColorStop(1, "rgba(255,255,255,0.02)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // خطوط اغتشاش
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(randomInt(0, canvas.width / 3), randomInt(0, canvas.height));
      for (let x = 0; x < canvas.width; x += randomInt(20, 30)) {
        ctx.lineTo(
          x + randomInt(-4, 4),
          Math.sin((x + randomInt(-6, 6)) / randomFloat(20, 30)) * 4 +
            randomInt(10, canvas.height - 10)
        );
      }
      ctx.strokeStyle = randomColor(0.15);
      ctx.lineWidth = randomFloat(0.3, 0.8);
      ctx.stroke();
    }

    // نقاط ریز
    const dots = Math.floor((canvas.width * canvas.height) / 1500);
    for (let i = 0; i < dots; i++) {
      ctx.fillStyle = randomColor(0.25);
      ctx.beginPath();
      ctx.arc(
        randomInt(0, canvas.width),
        randomInt(0, canvas.height),
        randomFloat(0.3, 0.8),
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  function drawCaptchaText(text) {
    const letterCount = text.length;
    // تنظیم موقعیت متن برای نمایش کامل
    const baseY = canvas.height * 0.6;
    const cellW = canvas.width / (letterCount + 1);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for (let i = 0; i < letterCount; i++) {
      const ch = text[i];
      const x = cellW * (i + 1);
      const y = baseY + randomInt(-6, 6);
      const angle = randomFloat(-0.2, 0.2);
      const fontSize = Math.min(canvas.height * 0.3, 28); // اندازه فونت کوچکتر

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // لایه سایه
      ctx.font = `bold ${fontSize + 1}px Vazirmatn, Arial, sans-serif`;
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillText(ch, 1, 1);

      // لایه اصلی با گرادیان
      const g = ctx.createLinearGradient(-10, -10, 10, 10);
      g.addColorStop(0, randomColor(0.9));
      g.addColorStop(1, randomColor(0.9));
      ctx.fillStyle = g;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 0.8;
      ctx.font = `bold ${fontSize}px Vazirmatn, Arial, sans-serif`;
      ctx.fillText(ch, 0, 0);
      ctx.strokeText(ch, 0, 0);

      ctx.restore();
    }
  }

  function fitCanvasToContainer() {
    // تنظیم اندازه canvas بر اساس container با اندازه ثابت
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();

    // تنظیم اندازه ثابت برای canvas
    const fixedWidth = Math.min(rect.width, 400);
    const fixedHeight = Math.min(rect.height, 120);

    canvas.width = fixedWidth;
    canvas.height = fixedHeight;

    // تنظیم اندازه CSS برای نمایش صحیح
    canvas.style.width = fixedWidth + "px";
    canvas.style.height = fixedHeight + "px";

    // تنظیم context برای کیفیت بهتر
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
  }

  function drawCaptcha(text) {
    fitCanvasToContainer();
    clearCanvas();
    drawNoise();
    drawCaptchaText(text);
  }

  function regenerateCaptcha() {
    currentCaptcha = generateCaptchaText(CAPTCHA_LENGTH);
    drawCaptcha(currentCaptcha);
    result.textContent = "";
    result.className = "result-message";
    input.classList.remove("is-valid", "is-invalid");
    input.value = "";
  }

  function normalizeValue(val) {
    return (val || "").replace(/\s+/g, "").toUpperCase();
  }

  function shake(el) {
    el.classList.remove("shake");
    // reflow
    void el.offsetWidth;
    el.classList.add("shake");
  }

  // ساده‌ترین پیاده‌سازی کنفِتی
  const confettiParticles = [];
  function spawnConfetti(x, y, amount = 120) {
    confettiParticles.length = 0;
    for (let i = 0; i < amount; i++) {
      confettiParticles.push({
        x,
        y,
        vx: Math.cos(Math.random() * Math.PI * 2) * randomFloat(2, 6),
        vy: Math.sin(Math.random() * Math.PI * 2) * randomFloat(2, 6) - 6,
        g: randomFloat(0.08, 0.16),
        size: randomFloat(2, 4),
        rot: Math.random() * Math.PI,
        vr: randomFloat(-0.1, 0.1),
        color: Math.random() < 0.5 ? "#ff6b35" : "#e55a2b",
      });
    }
  }
  let confettiRAF = null;
  function runConfetti(durationMs = 1200) {
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    spawnConfetti(cx, cy, 140);
    const start = performance.now();

    function frame(t) {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      for (const p of confettiParticles) {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate(p.rot);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
        confettiCtx.restore();
      }
      if (t - start < durationMs) {
        confettiRAF = requestAnimationFrame(frame);
      }
    }
    cancelAnimationFrame(confettiRAF);
    confettiRAF = requestAnimationFrame(frame);
  }

  function verify() {
    const ok = normalizeValue(input.value) === normalizeValue(currentCaptcha);
    if (ok) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      result.textContent = "درست";
      result.className = "result-message success";
      runConfetti();
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      result.textContent = "خطا";
      result.className = "result-message error";
      shake(input);
      regenerateCaptcha();
      input.focus();
      input.select?.();
    }
  }

  // رویدادها
  verifyBtn.addEventListener("click", verify);
  refreshBtn.addEventListener("click", regenerateCaptcha);

  // بهبود resize برای ریسپانسیو
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (currentCaptcha) {
        drawCaptcha(currentCaptcha);
      }
    }, 200);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    result.textContent = "";
    input.classList.remove("is-valid", "is-invalid");
    input.focus();
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") verify();
  });

  // اطمینان از بارگذاری فونت
  function waitForFonts() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        regenerateCaptcha();
      });
    } else {
      // fallback برای مرورگرهای قدیمی
      setTimeout(() => {
        regenerateCaptcha();
      }, 200);
    }
  }

  // راه‌اندازی اولیه
  waitForFonts();
})();
