/**
 * app.js — Animações de UI e efeitos visuais
 * Vox Cheats © 2025
 */

(function () {
  "use strict";

  // ── Efeito de entrada (fade-in) ──────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");
    if (container) {
      container.style.opacity = "0";
      container.style.transform = "translateY(30px)";
      requestAnimationFrame(function () {
        container.style.transition = "opacity 1s ease, transform 1s ease";
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
      });
    }
  });

  // ── Efeito de brilho no botão ao passar o mouse ──────────────
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("discordBtn");
    if (!btn) return;

    btn.addEventListener("mousemove", function (e) {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty("--gx", x + "%");
      btn.style.setProperty("--gy", y + "%");
    });

    btn.addEventListener("mouseleave", function () {
      btn.style.setProperty("--gx", "50%");
      btn.style.setProperty("--gy", "50%");
    });
  });

  // ── Título com efeito de glitch ──────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    const vox = document.querySelector(".brand-vox");
    const cheats = document.querySelector(".brand-cheats");
    if (!vox || !cheats) return;

    function glitch(el) {
      el.classList.add("glitch-active");
      setTimeout(() => el.classList.remove("glitch-active"), 300);
    }

    setInterval(function () {
      if (Math.random() < 0.4) glitch(vox);
      if (Math.random() < 0.3) glitch(cheats);
    }, 2500);
  });

  // ── Contador de membros simulado (efeito visual) ─────────────
  document.addEventListener("DOMContentLoaded", function () {
    const dot = document.querySelector(".pulse-dot");
    if (dot) {
      // Pulso extra ao carregar
      dot.style.animation = "none";
      requestAnimationFrame(() => {
        dot.style.animation = "";
      });
    }
  });

})();
