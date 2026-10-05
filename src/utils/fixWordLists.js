/**
 * Word / Google Docs "fake" lists.
 *
 * When a bulleted list is copied out of Word, the bullets are not <li> items:
 * Word emits a series of <p class="MsoListParagraph"> where the visible bullet is
 * an inline <span style="mso-list:Ignore"> containing a Wingdings/Symbol glyph
 * (U+F0B7, U+F0A7, ... — private-use characters that render as empty boxes).
 *
 * This rewrites that pattern into a real <ul><li> structure so the content can be
 * parsed and styled properly.
 *
 * @param {string} html pasted HTML
 * @returns {string} cleaned HTML (doc.body.innerHTML)
 */
export function fixWordLists(html) {
  if (!html || typeof html !== "string") return html || "";

  // Only usable in the browser; keep the input untouched on the server/SSR.
  if (typeof DOMParser === "undefined") return html;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const body = doc.body;

  const paragraphs = Array.from(body.querySelectorAll("p")).filter((p) =>
    /MsoListParagraph/i.test(p.className || "")
  );

  let currentList = null;

  for (const p of paragraphs) {
    // Nodes can be detached while we restructure the DOM — skip those.
    if (!p.isConnected) continue;

    // The fake bullet lives in this span; drop it, we render a real marker.
    p.querySelectorAll('span[style*="mso-list" i]').forEach((span) => span.remove());

    const clone = p.cloneNode(true);
    clone.querySelectorAll('span[style*="mso-list" i]').forEach((span) => span.remove());
    // <p> inside <li> is invalid; the text alone is what we want.
    const text = clone.textContent.replace(/\s+/g, " ").trim();

    // Close the previous list when the run of MsoListParagraph paragraphs ends.
    if (p.className !== currentList?.dataset.msoClass) {
      const list = doc.createElement("ul");
      list.dataset.msoClass = p.className || "";
      p.before(list);
      currentList = list;
    }

    const li = doc.createElement("li");
    li.textContent = text;
    currentList.appendChild(li);
    p.remove();
  }

  return body.innerHTML;
}

export default fixWordLists;
