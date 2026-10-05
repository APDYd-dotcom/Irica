// U+FFFD (the "" replacement character) appears when text was saved through a
// mis-encoded source: the original byte sequence was unrecoverable and was stored
// as one replacement char per lost byte. The damage is done server-side, so these
// characters are removed at render time to avoid showing a broken diamond glyph.
const REPLACEMENT_CHARS = /\uFFFD+/g;

/**
 * Strip U+FFFD replacement characters from a string.
 * Safe on null/undefined/non-strings — always returns a string.
 */
export function stripReplacementChars(text) {
  if (text === null || text === undefined) return "";
  return String(text).replace(REPLACEMENT_CHARS, "");
}

/** True when the text contains at least one replacement character. */
export function hasReplacementChars(text) {
  return /\uFFFD/.test(String(text ?? ""));
}

export default stripReplacementChars;
