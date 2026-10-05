import { stripReplacementChars } from "./sanitizeText";

const URL_PATTERN = /(https?:\/\/[^\s]+)/;

export function linkifyText(text) {
  if (!text) return [];

  // Drop lost/replacement characters before splitting so they never reach the DOM.
  const cleaned = stripReplacementChars(text);
  const parts = cleaned.split(URL_PATTERN);

  return parts.map((part, index) => {
    if (part && URL_PATTERN.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-700 underline hover:text-primary-900 break-all"
        >
          {part}
        </a>
      );
    }
    return part || null;
  });
}

export function linkifyParagraphs(text) {
  if (!text) return [];

  // Strip replacement characters first, then normalise line endings.
  const cleaned = stripReplacementChars(text)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
  const paragraphs = cleaned.split("\n").filter((p) => p.length > 0);

  return paragraphs.map((paragraph, index) => (
    <p key={index} className="mb-4 leading-7 text-neutral-700 text-justify">
      {linkifyText(paragraph)}
    </p>
  ));
}

export default linkifyText;