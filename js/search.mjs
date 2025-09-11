import {errorSnackbar, warnSnackbar, successSnackbar} from "./utils.js"

let searchForm = document.querySelector('#search-form');

export const handleSearch = (event) => {
    event.preventDefault();

    try {

        clearHighlights();

        console.log(event);
        const searchKey = event.target.q.value.trim();
        if (!searchKey) {
            warnSnackbar("Please enter a search term");
            return;
        }

        highlightText(searchKey);

    } catch (error) {
        console.error("Search error:", error);
        warnSnackbar("Please enter a search term");
    }
}

const clearHighlights = () => {
    const highlights = document.querySelectorAll('.highlight');

    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        if (parent) {
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize()
        }
    })
}

const highlightText = (searchKey) => {
    const article = document.querySelector('article');
    if (!article) {
        warnSnackbar("No article found for search");
        return;
    }

    const escapedSearchKey = searchKey.replace(/([.*+?^${}()|[\]\\])/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchKey})`, 'ig');

    let matchCount = 0;
    walkTextNodes(article, regex, () => matchCount++);

    if (matchCount === 0) {
        errorSnackbar(`No matches found for search ${searchKey}`);
    }
}

const walkTextNodes = (node, regex, onMatch = () => {}) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const match = node.nodeValue.match(regex);

        if (match) {
            const span = document.createElement("span");
            span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
            node.replaceWith(...span.childNodes)
            onMatch()
        }
    } else if (node.nodeType === Node.ELEMENT_NODE
        && !['SCRIPT', 'STYLE', 'FORM'].includes(node.nodeName)) {
        const children = node.childNodes;
        children.forEach(child => walkTextNodes(child, regex, onMatch));
    }
}

searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSearch)