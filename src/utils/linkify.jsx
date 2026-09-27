const URL_PATTERN = /(https?:\/\/[^\s]+)/;

export function linkifyText(text) {
  if (!text) return [];

  const parts = String(text).split(URL_PATTERN);

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

  const normalized = String(text).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const paragraphs = normalized.split("\n").filter((p) => p.length > 0);

  return paragraphs.map((paragraph, index) => (
    <p key={index} className="mb-4 leading-7 text-neutral-700">
      {linkifyText(paragraph)}
    </p>
  ));
}

export default linkifyText;