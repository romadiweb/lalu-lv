import "server-only";

import sanitizeHtml from "sanitize-html";

const blockTagPattern = /^\s*<(p|div|ul|ol)\b/i;
const richTagPattern = /<(strong|b|em|i|u|a|span|br)\b/i;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function sanitizeRichText(value: string) {
  return sanitizeHtml(value, {
    allowedTags: ["p", "div", "br", "strong", "b", "em", "i", "u", "a", "ul", "ol", "li", "span"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      span: ["style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedStyles: {
      span: {
        color: [
          /^#[0-9a-f]{3,8}$/i,
          /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i,
        ],
      },
    },
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    },
  });
}

export function prepareRichTextForEditor(value: unknown) {
  const blocks = Array.isArray(value) ? value.map(String) : [];

  return blocks
    .map((block) => {
      if (blockTagPattern.test(block)) return block;
      if (richTagPattern.test(block)) return `<p>${block}</p>`;
      return `<p>${escapeHtml(block)}</p>`;
    })
    .map(sanitizeRichText)
    .join("");
}

export function prepareRichTextForDisplay(value: string[]) {
  return sanitizeRichText(prepareRichTextForEditor(value));
}
