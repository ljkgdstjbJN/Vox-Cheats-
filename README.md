# Vox Cheats — Site Oficial

Site roxo com efeito de fogo para o servidor do Discord da **Vox Cheats**.

---

## 🔧 Como alterar o link do Discord

> **Você só precisa editar UM arquivo:**

```
📁 config.js
```

Abra o arquivo `config.js` e localize esta linha:

```js
const DISCORD_INVITE = "https://discord.gg/GrVguzE5n";
```

Substitua o link pelo novo convite do Discord e salve o arquivo. Pronto!

---

## 📁 Estrutura de arquivos

| Arquivo        | Função                                                                 |
|----------------|------------------------------------------------------------------------|
| `index.html`   | Estrutura da página (não precisa editar)                               |
| `config.js`    | ⭐ **ÚNICO arquivo para alterar o link do Discord**                    |
| `style.css`    | Visual, cores e animações (não precisa editar)                         |
| `protect.js`   | Sistema de proteção do link em 10 camadas (não mexa)                   |
| `fire.js`      | Efeito de fogo no fundo (não precisa editar)                           |
| `particles.js` | Partículas flutuantes roxas (não precisa editar)                       |
| `app.js`       | Animações de UI (não precisa editar)                                   |

---

## 🛡️ Camadas de proteção do link

O sistema `protect.js` implementa **10 camadas** de segurança:

1. **Namespace privado (IIFE)** — nenhuma variável global exposta
2. **Codificação Base64** — link nunca aparece em texto puro no DOM
3. **Decodificação lazy** — link só é decodificado no momento do clique
4. **Abertura sem referrer** — `noopener, noreferrer` no `window.open`
5. **Limpeza de memória** — string decodificada descartada após uso
6. **Detecção de DevTools** — atrasa execução se DevTools estiver aberto
7. **Bloqueio de right-click** — botão não permite inspecionar via menu
8. **Sem href real** — botão nunca tem atributo `href` com o link
9. **MutationObserver** — remove `href` caso alguém injete via DevTools
10. **Rate-limit** — máximo 3 cliques por minuto por sessão

---

## 🚀 Como hospedar no GitHub Pages

1. Faça upload de todos os arquivos para um repositório no GitHub
2. Vá em **Settings → Pages**
3. Em **Source**, selecione `main` / `root`
4. Aguarde alguns minutos e acesse o link gerado

---

## 📝 Licença

© 2025 Vox Cheats — Todos os direitos reservados.
