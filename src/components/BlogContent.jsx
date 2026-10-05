import DOMPurify from "dompurify";
import { stripReplacementChars } from "../utils/sanitizeText";

// Anything that is not a known HTML tag => the content is plain text (old posts).
const HAS_HTML = /<\/?[a-z][\s\S]*>/i;

// Wingdings/Symbol bullets (U+E000–U+F8FF) and non-breaking spaces, which show up
// when text was pasted from Word into an old plain-text post.
function normalizeLegacyText(text) {
  return stripReplacementChars(text)
    .replace(/[\uE000-\uF8FF]/g, "\u2022")
    .replace(/\u00A0/g, " ")
    .replace(/\u2007|\u202F/g, " ");
}

/**
 * Renders blog content. New posts hold sanitised HTML; posts created before the
 * rich text editor hold plain text and are rendered as paragraphs/bullets.
 */
function BlogContent({ content = "", className = "" }) {
  if (!content) return null;

  const isHtml = HAS_HTML.test(content);

  if (!isHtml) {
    const lines = normalizeLegacyText(content).split("\n");

    return (
      <div className={`blog-content ${className}`}>
        {lines.map((line, index) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          const bullet = trimmed.match(/^([\u2022\-*])\s+(.*)$/);
          if (bullet) {
            return (
              <p key={index} className="mb-2 flex items-start gap-2">
                <span aria-hidden="true">{"\u2022"}</span>
                <span>{bullet[2]}</span>
              </p>
            );
          }

          return (
            <p key={index} className="mb-4 leading-relaxed">
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  }

  // Sanitise before injecting: blog content is author-supplied HTML.
  // ADD_ATTR keeps target/rel so links still open in a new tab after cleaning.
  const clean = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });

  return (
    <div
      className={`blog-content ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

/** Short plain-text excerpt for cards and admin list rows. */
export function blogExcerpt(content = "", maxLength = 160) {
  if (!content) return "";

  const text = HAS_HTML.test(content)
    ? new DOMParser().parseFromString(content, "text/html").body.textContent || ""
    : content;

  const clean = normalizeLegacyText(text).replace(/\s+/g, " ").trim();

  return clean.length > maxLength ? `${clean.slice(0, maxLength)}…` : clean;
}

export default BlogContent;
