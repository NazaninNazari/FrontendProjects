"use strict";
class AlertManager {
  constructor() {
    this.alerts = {
      success: document.getElementById("alert1"),
      warning: document.getElementById("alert2"),
      error: document.getElementById("alert3"),
      info: document.getElementById("alert4"),
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.setupIntersectionObserver();
  }

  bindEvents() {
    // Control buttons
    document
      .getElementById("showSuccess")
      .addEventListener("click", () => this.showAlert("success"));
    document
      .getElementById("showWarning")
      .addEventListener("click", () => this.showAlert("warning"));
    document
      .getElementById("showError")
      .addEventListener("click", () => this.showAlert("error"));
    document
      .getElementById("showInfo")
      .addEventListener("click", () => this.showAlert("info"));
    document
      .getElementById("showAll")
      .addEventListener("click", () => this.showAllAlerts());
    document
      .getElementById("hideAll")
      .addEventListener("click", () => this.hideAllAlerts());

    // Close buttons
    Object.values(this.alerts).forEach((alert) => {
      const closeBtn = alert.querySelector(".alert_close");
      closeBtn.addEventListener("click", () => this.hideAlert(alert));
    });

    // Auto-hide after 5 seconds
    Object.values(this.alerts).forEach((alert) => {
      alert.addEventListener("animationend", () => {
        if (alert.classList.contains("show")) {
          setTimeout(() => this.hideAlert(alert), 5000);
        }
      });
    });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.willChange = "transform, opacity";
          } else {
            entry.target.style.willChange = "auto";
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(this.alerts).forEach((alert) => {
      observer.observe(alert);
    });
  }

  showAlert(type) {
    const alert = this.alerts[type];
    if (!alert) return;

    // Reset animation
    alert.style.animation = "none";
    alert.offsetHeight; // Trigger reflow
    alert.style.animation = null;

    // Show alert with staggered animation
    setTimeout(() => {
      alert.classList.remove("hide");
      alert.classList.add("show");
      this.addRippleEffect(alert);
    }, 100);
  }

  hideAlert(alert) {
    alert.classList.remove("show");
    alert.classList.add("hide");

    // Clean up after animation
    setTimeout(() => {
      alert.classList.remove("hide");
    }, 600);
  }

  showAllAlerts() {
    Object.values(this.alerts).forEach((alert, index) => {
      setTimeout(() => {
        alert.classList.remove("hide");
        alert.classList.add("show");
        this.addRippleEffect(alert);
      }, index * 200);
    });
  }

  hideAllAlerts() {
    Object.values(this.alerts).forEach((alert) => {
      this.hideAlert(alert);
    });
  }

  addRippleEffect(element) {
    const ripple = document.createElement("div");
    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;

    element.style.position = "relative";
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Advanced animation methods
  createCustomAlert(type, title, message, duration = 5000) {
    const alertContainer = document.querySelector(".alert_container");
    const newAlert = document.createElement("div");

    newAlert.className = `alert alert-${type}`;
    newAlert.innerHTML = `
            <div class="alert-icon">
                ${this.getIconSVG(type)}
            </div>
            <div class="alert-content">
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
            <button class="alert-close">&times;</button>
        `;

    // Add to container
    alertContainer.appendChild(newAlert);

    // Bind close event
    const closeBtn = newAlert.querySelector(".alert_close");
    closeBtn.addEventListener("click", () => this.hideAlert(newAlert));

    // Show with animation
    setTimeout(() => {
      newAlert.classList.add("show");
      this.addRippleEffect(newAlert);
    }, 100);

    // Auto-hide
    setTimeout(() => {
      this.hideAlert(newAlert);
      setTimeout(() => newAlert.remove(), 600);
    }, duration);

    return newAlert;
  }

  getIconSVG(type) {
    const icons = {
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
            </svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>`,
      error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>`,
      info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>`,
    };
    return icons[type] || icons.info;
  }
}

// Add ripple animation to CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const alertManager = new AlertManager();

  // Demo: Show welcome alert
  setTimeout(() => {
    alertManager.createCustomAlert(
      "info",
      "Welcome!",
      "The interactive alert system is ready with advanced animations.",
      4000
    );
  }, 1000);
});

// Performance optimization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    // Preload animations
    document.body.style.willChange = "auto";
  });
}
