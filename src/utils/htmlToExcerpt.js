const HAS_HTML = /<\/?[a-z][\s\S]*>/i;

// textContent concatenates block elements with NO whitespace between them
// ("<p>one</p><p>two</p>" would become "onetwo"), so a space is injected after
// every closing block tag before parsing.
const CLOSING_BLOCK = /<\/(p|div|h[1-6]|li|ul|ol|br)>/gi;

/**
 * Turns blog content — which may be HTML (rich text editor) or legacy plain
 * text — into a short, clean plain-text excerpt for cards and previews.
 * Never returns HTML, so it is safe to render directly (no innerHTML).
 */
export function htmlToExcerpt(content = "", maxLength = 160) {
  if (!content) return "";

  const source = String(content);

  const raw = HAS_HTML.test(source)
    ? (() => {
        // Guard for non-browser environments (SSR / unit tests).
        if (typeof DOMParser === "undefined") {
          return source.replace(CLOSING_BLOCK, "</$1> ").replace(/<[^>]*>/g, "");
        }
        const spaced = source.replace(CLOSING_BLOCK, "</$1> ");
        return new DOMParser().parseFromString(spaced, "text/html").body.textContent || "";
      })()
    : source;

  const clean = raw
    // Wingdings/Symbol bullets pasted from Word (private-use area) and the
    // replacement character U+FFFD that appears when bytes are mis-decoded.
    .replace(/[\uFFFD\uE000-\uF8FF]/g, "")
    .replace(/[\u00A0\u200B]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.length <= maxLength) return clean;

  // Cut on a word boundary and drop the partial word.
  const cut = clean.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;

  return `${base.trimEnd()}…`;
}

export default htmlToExcerpt;
