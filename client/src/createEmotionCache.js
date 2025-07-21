// createEmotionCache.ts
import createCache from "@emotion/cache";
export default function createEmotionCache() {
  let nonce;
  nonce =
    document.querySelector("meta[name='csp-nonce']")?.getAttribute("content") ||
    window.__CSP_NONCE__;

  return createCache({
    key: "emotion-key",
    nonce,
    prepend: true,
    speedy: true,
  });
}
