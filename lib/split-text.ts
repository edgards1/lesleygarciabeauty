/**
 * Splits every text node inside `element` into word-level mask spans.
 * Each word becomes:
 *   <span class="split-mask"><span class="split-word">word</span></span>
 * The mask clips vertically, so animating the inner word with
 * `yPercent: 110 -> 0` produces a clean reveal effect.
 *
 * Existing inline children (em, span, a) are preserved and their text
 * nodes are split in place, keeping their styling.
 *
 * Returns the inner word spans (`.split-word`) for GSAP targeting.
 */
export function splitWordsToMasks(element: HTMLElement): HTMLElement[] {
  const innerSpans: HTMLElement[] = [];

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.textContent && node.textContent.trim().length > 0) {
      textNodes.push(node);
    }
  }

  textNodes.forEach((node) => {
    const words = node.textContent!.split(/(\s+)/);
    if (words.length === 1) {
      return;
    }

    const fragment = document.createDocumentFragment();
    words.forEach((word) => {
      if (word.trim().length === 0) {
        fragment.appendChild(document.createTextNode(" "));
        return;
      }
      const mask = document.createElement("span");
      mask.className = "split-mask";
      const inner = document.createElement("span");
      inner.className = "split-word";
      inner.textContent = word;
      mask.appendChild(inner);
      innerSpans.push(inner);
      fragment.appendChild(mask);
    });

    node.replaceWith(fragment);
  });

  return innerSpans;
}

/**
 * Wraps every character of `text` in a span with the given class.
 * Used for character-split reveals (e.g. the final CTA marquee).
 */
export function splitChars(text: string, className: string): string[] {
  return Array.from(text).map(
    (char) => `<span class="${className}">${char}</span>`
  );
}
