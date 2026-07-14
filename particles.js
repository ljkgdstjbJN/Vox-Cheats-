/**
 * particles.js — Partículas flutuantes brilhantes
 * Cria estrelinhas/faíscas roxas que sobem pela tela
 */

(function () {
  "use strict";

  const container = document.getElementById("particles");
  const COUNT = 55;

  const colors = [
    "#c084fc", "#a855f7", "#7c3aed", "#e879f9",
    "#f0abfc", "#d946ef", "#9333ea", "#ffffff",
  ];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    const p = document.createElement("div");
    p.className = "particle";

    const size = rand(2, 6);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = rand(0, 100);
    const duration = rand(6, 18);
    const delay = rand(0, 12);
    const blur = rand(0, 2);

    p.style.cssText = `
      position: fixed;
      bottom: -10px;
      left: ${left}vw;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      box-shadow: 0 0 ${size * 3}px ${color};
      opacity: 0;
      filter: blur(${blur}px);
      animation: floatUp ${duration}s ${delay}s infinite ease-in;
      pointer-events: none;
      z-index: 1;
    `;

    container.appendChild(p);
  }

  // Injeta keyframes dinamicamente
  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatUp {
      0%   { transform: translateY(0) scale(1);   opacity: 0; }
      10%  { opacity: 1; }
      80%  { opacity: 0.6; }
      100% { transform: translateY(-110vh) scale(0.3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < COUNT; i++) {
    createParticle();
  }
})();
