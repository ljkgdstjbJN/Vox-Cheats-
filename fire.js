/**
 * fire.js — Efeito de fogo no canvas (base da tela)
 * Algoritmo de fire clássico com paleta roxa/violeta
 */

(function () {
  "use strict";

  const canvas = document.getElementById("fireCanvas");
  const ctx = canvas.getContext("2d");

  // Paleta de cores: preto → roxo escuro → roxo → lilás → branco
  const PALETTE = [];
  (function buildPalette() {
    for (let i = 0; i < 256; i++) {
      let r, g, b;
      if (i < 64) {
        // Preto → roxo escuro
        r = Math.floor((i / 64) * 80);
        g = 0;
        b = Math.floor((i / 64) * 60);
      } else if (i < 128) {
        // Roxo escuro → roxo vivo
        const t = (i - 64) / 64;
        r = Math.floor(80 + t * (148 - 80));
        g = 0;
        b = Math.floor(60 + t * (211 - 60));
      } else if (i < 192) {
        // Roxo vivo → lilás
        const t = (i - 128) / 64;
        r = Math.floor(148 + t * (200 - 148));
        g = Math.floor(t * 80);
        b = Math.floor(211 + t * (255 - 211));
      } else {
        // Lilás → branco
        const t = (i - 192) / 63;
        r = Math.floor(200 + t * 55);
        g = Math.floor(80 + t * 175);
        b = 255;
      }
      PALETTE.push([r, g, b]);
    }
  })();

  let W, H, COLS, ROWS, fire;

  const CELL = 4; // tamanho de cada célula em pixels

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    COLS = Math.ceil(W / CELL);
    ROWS = Math.ceil(H / CELL) + 2;
    fire = new Uint8Array(COLS * ROWS);
    // Acende a linha base
    for (let x = 0; x < COLS; x++) {
      fire[(ROWS - 1) * COLS + x] = 255;
    }
  }

  function spreadFire(src) {
    const rnd = (Math.random() * 3) | 0; // 0, 1 ou 2
    const dst = src - COLS - rnd + 1;
    if (dst < 0) return;
    const decay = (Math.random() * 2) | 0; // 0 ou 1
    fire[dst] = Math.max(0, fire[src] - decay);
  }

  function update() {
    // Reacende base aleatoriamente para efeito vivo
    for (let x = 0; x < COLS; x++) {
      const idx = (ROWS - 1) * COLS + x;
      if (Math.random() < 0.05) {
        fire[idx] = Math.max(200, fire[idx] - ((Math.random() * 40) | 0));
      } else {
        fire[idx] = 255;
      }
    }

    for (let y = 1; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        spreadFire(y * COLS + x);
      }
    }
  }

  function draw() {
    const imgData = ctx.createImageData(W, H);
    const data = imgData.data;

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const val = fire[y * COLS + x];
        const [r, g, b] = PALETTE[val];
        // Preenche CELL×CELL pixels
        for (let dy = 0; dy < CELL; dy++) {
          for (let dx = 0; dx < CELL; dx++) {
            const px = (y * CELL + dy) * W + (x * CELL + dx);
            if (px * 4 + 3 >= data.length) continue;
            data[px * 4 + 0] = r;
            data[px * 4 + 1] = g;
            data[px * 4 + 2] = b;
            data[px * 4 + 3] = val > 5 ? 255 : 0;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();
  loop();
})();
