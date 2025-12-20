import { errorSnackbar, warnSnackbar } from "$lib/utils/snackbar";

export function handleSearch(event: SubmitEvent, rootSelector = "article") {
  event.preventDefault();

  try {
    clearHighlights();

    const form = event.target as HTMLFormElement;
    const searchKey = form.q?.value?.trim();

    if (!searchKey) {
      warnSnackbar("Please enter a search term");
      return;
    }

    highlightText(searchKey, rootSelector);
  } catch (err) {
    console.error("Search error:", err);
    warnSnackbar("Please enter a search term");
  }
}

export function clearHighlights() {
  const highlights = document.querySelectorAll("mark.highlight");

  highlights.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) return;

    parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
    parent.normalize();
  });
}

export function highlightText(searchKey: string, rootSelector: string) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    warnSnackbar("No content area found for search");
    return;
  }

  const escaped = searchKey.replace(/([.*+?^${}()|[\]\\])/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");

  let matchCount = 0;
  walkTextNodes(root, regex, () => matchCount++);

  if (matchCount === 0) {
    errorSnackbar(`No matches found for "${searchKey}"`);
  }
}

export function walkTextNodes(
  node: Node,
  regex: RegExp,
  onMatch: () => void
) {
  // Text node
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue || "";
    if (!text.trim()) return;

    if (regex.test(text)) {
      const temp = document.createElement("span");
      temp.innerHTML = text.replace(
        regex,
        `<mark class="highlight bg-yellow-300 px-1 rounded">${"$1"}</mark>`
      );

      node.replaceWith(...temp.childNodes);
      onMatch();
    }

    return;
  }

  // Element node — skip elements we should not modify
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;

    // Avoid recursive injection into forms/nav/scripts
    const forbidden = ["SCRIPT", "STYLE", "FORM", "NAV"];
    if (forbidden.includes(el.tagName)) return;

    el.childNodes.forEach((child) => walkTextNodes(child, regex, onMatch));
  }
}
