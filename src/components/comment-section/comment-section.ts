import { warnSnackbar, errorSnackbar } from '@/modules/utils.js';
import templateHTML from './comment-section.html?raw';
import styles from './comment-section.css?inline';

// I hope this was done right - I mostly followed https://dev.to/mukhilpadmanabhan/shadow-dom-building-perfectly-encapsulated-web-components-441f

// For the lifecycle callbacks I used https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements

class CommentSection extends HTMLElement {
  private showHideBtn: HTMLButtonElement | null = null;
  private commentWrapper: HTMLElement | null = null;
  private commentForm: HTMLFormElement | null = null;
  private commentList: HTMLElement | null = null;
  private nameField: HTMLInputElement | null = null;
  private commentField: HTMLInputElement | null = null;

  constructor() {
    super();

    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });

    // Create template with styles and HTML
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${styles}</style>
      ${templateHTML}
    `;

    // Clone template content and add to shadow DOM
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  // Called each time the element is added to the document
  connectedCallback() {
    this.initializeElements();
    this.attachEventListeners();
  }

  // Called each time the element is removed from the document
  disconnectedCallback() {
    this.removeEventListeners();
  }

  private initializeElements() {
    // Query elements from shadow DOM
    this.showHideBtn = this.shadowRoot!.querySelector('.show-hide');
    this.commentWrapper = this.shadowRoot!.querySelector('.comment-wrapper');
    this.commentForm = this.shadowRoot!.querySelector('.comment-form');
    this.commentList = this.shadowRoot!.querySelector('.comment-container');
    this.nameField = this.shadowRoot!.querySelector('#name');
    this.commentField = this.shadowRoot!.querySelector('#comment');

    if (
      !this.showHideBtn ||
      !this.commentWrapper ||
      !this.commentForm ||
      !this.commentList ||
      !this.nameField ||
      !this.commentField
    ) {
      console.warn('Comments component: Some DOM elements were not found!');
      warnSnackbar('Comments component: Some DOM elements were not found!');
    }
  }

  private attachEventListeners() {
    if (this.showHideBtn) {
      this.showHideBtn.addEventListener('click', this.handleToggleComments);
    }
    if (this.commentForm) {
      this.commentForm.addEventListener('submit', this.handleCommentSubmit);
    }
  }

  private removeEventListeners() {
    if (this.showHideBtn) {
      this.showHideBtn.removeEventListener('click', this.handleToggleComments);
    }
    if (this.commentForm) {
      this.commentForm.removeEventListener('submit', this.handleCommentSubmit);
    }
  }

  private handleToggleComments = () => {
    try {
      const isHidden =
        this.commentWrapper?.style.display === 'none' ||
        this.commentWrapper?.style.display === '';

      if (!this.showHideBtn)
        throw new Error("No hide button found on class 'show-hide'!");
      if (!this.commentWrapper)
        throw new Error("No comment wrapper found on class 'comment-wrapper'!");

      if (isHidden) {
        this.showHideBtn.textContent = 'Hide comments';
        this.commentWrapper.style.display = 'block';
      } else {
        this.showHideBtn.textContent = 'Show comments';
        this.commentWrapper.style.display = 'none';
      }
    } catch (error) {
      console.error('Toggle comments error:', error);
    }
  };

  private handleCommentSubmit = (e: Event) => {
    e.preventDefault();

    if (!this.nameField || !this.commentField)
      throw new Error('Name and comment field is required');

    try {
      const name = this.nameField.value;
      const comment = this.commentField.value;

      if (
        !name ||
        !comment ||
        name.trim().length === 0 ||
        comment.trim().length === 0
      ) {
        console.warn('Name or comment missing!');
        warnSnackbar('Name or comment missing!');
        return;
      }

      this.addComment(name, comment);

      this.nameField.value = '';
      this.commentField.value = '';
    } catch (e) {
      console.error('Error occurred while creating comment:', e);
      errorSnackbar('Error occurred while creating comment');
    }
  };

  private addComment(name: string, comment: string) {
    if (!this.commentList) throw new Error('Comment list is required');

    const commentListItem = document.createElement('li');
    const nameParagraph = document.createElement('p');
    const commentParagraph = document.createElement('p');

    nameParagraph.textContent = name;
    commentParagraph.textContent = comment;

    commentListItem.appendChild(nameParagraph);
    commentListItem.appendChild(commentParagraph);

    this.commentList.insertBefore(commentListItem, this.commentList.firstChild);
  }
}

// Register the custom element
customElements.define('comment-section', CommentSection);

export default CommentSection;
