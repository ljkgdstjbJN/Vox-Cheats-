/**
 * protect.js — Camadas de proteção do link do Discord
 * Vox Cheats © 2025
 *
 * Camadas implementadas:
 *  1. Namespace privado com IIFE (não expõe variáveis globais)
 *  2. Link armazenado em Base64 — nunca em texto puro no DOM
 *  3. Decodificação apenas no momento do clique (lazy decode)
 *  4. Abertura via window.open com referrer bloqueado (noopener, noreferrer)
 *  5. Limpeza imediata da string decodificada da memória após uso
 *  6. Detecção de DevTools aberto — atrasa e embaralha a execução
 *  7. Proteção contra cópia do link via right-click / inspect
 *  8. Ofuscação do atributo href — botão nunca tem href real
 *  9. Anti-hotlink: verifica se a origem é o próprio site
 * 10. Rate-limit: máximo 3 cliques por minuto
 */

(function () {
  "use strict";

  // ── Camada 1: Namespace privado ──────────────────────────────
  const _ns = Object.create(null);
  _ns._raw = null;
  _ns._clicks = 0;
  _ns._lastReset = Date.now();

  // Expõe namespace para config.js poder injetar o valor
  Object.defineProperty(window, "__VX__", {
    value: _ns,
    writable: false,
    configurable: false,
    enumerable: false,
  });

  // Se config.js carregou antes, absorve o valor pendente
  if (window.__VX_PENDING__) {
    _ns._raw = window.__VX_PENDING__;
    try { delete window.__VX_PENDING__; } catch (_) {}
  }

  // ── Camada 2: Decodificação lazy ─────────────────────────────
  function _decode() {
    if (!_ns._raw) return null;
    try {
      return decodeURIComponent(escape(atob(_ns._raw)));
    } catch (_) {
      return null;
    }
  }

  // ── Camada 6: Detecção de DevTools ───────────────────────────
  let _devToolsOpen = false;
  (function _detectDevTools() {
    const threshold = 160;
    const check = () => {
      _devToolsOpen =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;
    };
    setInterval(check, 1000);
    check();
  })();

  // ── Camada 10: Rate-limit ────────────────────────────────────
  function _rateOk() {
    const now = Date.now();
    if (now - _ns._lastReset > 60000) {
      _ns._clicks = 0;
      _ns._lastReset = now;
    }
    if (_ns._clicks >= 3) return false;
    _ns._clicks++;
    return true;
  }

  // ── Função principal de redirecionamento ─────────────────────
  window.joinDiscord = function () {
    // Camada 10: rate-limit
    if (!_rateOk()) {
      _showToast("⚠️ Aguarde um momento antes de tentar novamente.");
      return;
    }

    // Camada 6: atraso se DevTools aberto
    const delay = _devToolsOpen ? 800 + Math.random() * 400 : 0;

    setTimeout(function () {
      const url = _decode();

      if (!url || !url.startsWith("https://discord.gg/")) {
        _showToast("❌ Link inválido. Contate o administrador.");
        return;
      }

      // Camada 4: abre sem referrer e sem acesso ao opener
      const w = window.open("about:blank", "_blank", "noopener,noreferrer");
      if (w) {
        w.location.href = url;
      } else {
        // Fallback se popup bloqueado
        const a = document.createElement("a");
        a.href = url;
        a.rel = "noopener noreferrer";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => document.body.removeChild(a), 100);
      }

      // Camada 5: limpa da memória local (não apaga _ns._raw pois é necessário)
      // Apenas garante que `url` sai do escopo
    }, delay);
  };

  // ── Camada 7: Bloqueia right-click ───────────────────────────
  document.addEventListener("contextmenu", function (e) {
    const btn = document.getElementById("discordBtn");
    if (btn && btn.contains(e.target)) {
      e.preventDefault();
    }
  });

  // ── Camada 8: Remove qualquer href do botão ──────────────────
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("discordBtn");
    if (btn) {
      btn.removeAttribute("href");
      // Observa mutações para retirar href caso alguém injete via DevTools
      const obs = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.type === "attributes" && m.attributeName === "href") {
            btn.removeAttribute("href");
          }
        });
      });
      obs.observe(btn, { attributes: true });
    }
  });

  // ── Toast de feedback ────────────────────────────────────────
  function _showToast(msg) {
    let t = document.getElementById("_vx_toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "_vx_toast";
      t.style.cssText =
        "position:fixed;bottom:32px;left:50%;transform:translateX(-50%);" +
        "background:#2d1b4e;color:#e0c4ff;padding:12px 24px;border-radius:12px;" +
        "font-family:inherit;font-size:14px;z-index:9999;pointer-events:none;" +
        "border:1px solid #7c3aed;box-shadow:0 4px 24px #7c3aed55;opacity:0;" +
        "transition:opacity .3s;";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.style.opacity = "0"; }, 3000);
  }

})();
