/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                     VOX CHEATS — CONFIG                     ║
 * ║                                                              ║
 * ║  Este é o ÚNICO arquivo que você precisa editar.             ║
 * ║  Troque o valor de DISCORD_INVITE pelo novo link do Discord. ║
 * ║                                                              ║
 * ║  Exemplo:  "https://discord.gg/SeuNovoLink"                  ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ──────────────────────────────────────────────────────────────
//  🔧  ALTERE APENAS ESTA LINHA:
// ──────────────────────────────────────────────────────────────
const DISCORD_INVITE = "https://discord.gg/GrVguzE5n";
// ──────────────────────────────────────────────────────────────
//  NÃO MEXA NO RESTANTE DESTE ARQUIVO
// ──────────────────────────────────────────────────────────────

// Exporta de forma segura para o sistema de proteção
(function () {
  "use strict";

  // Codifica o link em Base64 para dificultar leitura direta no DevTools
  const _enc = btoa(unescape(encodeURIComponent(DISCORD_INVITE)));

  // Armazena no objeto global protegido (definido em protect.js)
  if (typeof window.__VX__ !== "undefined") {
    window.__VX__._raw = _enc;
  } else {
    // protect.js ainda não carregou — guarda temporariamente
    window.__VX_PENDING__ = _enc;
  }
})();
