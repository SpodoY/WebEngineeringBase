import { warnSnackbar, errorSnackbar } from './utils.js';

const showHideBtn = document.querySelector(
  '.show-hide'
) as HTMLButtonElement | null;

const commentWrapper = document.querySelector(
  '.comment-wrapper'
) as HTMLElement | null;

const commentForm = document.querySelector(
  '.comment-form'
) as HTMLFormElement | null;

const commentList = document.querySelector(
  '.comment-container'
) as HTMLElement | null;

const nameField = document.querySelector('#name') as HTMLInputElement | null;
const commentField = document.querySelector(
  '#comment'
) as HTMLInputElement | null;

const handleToggleComments = () => {
  try {
    const isHidden =
      commentWrapper?.style.display === 'none' ||
      commentWrapper?.style.display === '';

    if (!showHideBtn)
      throw new Error("No hide button found on class 'show-hide' !");
    if (!commentWrapper)
      throw new Error("No comment wrapper found on class 'comment-wrapper' !");

    if (isHidden) {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.style.display = 'none';
    }
  } catch (error) {
    console.error('Toggle comments error:', error);
  }
};

export const handleCommentSubmit = (e: Event) => {
  e.preventDefault();

  if (!nameField || !commentField)
    throw new Error('Name and comment field is required');

  try {
    const name = nameField.value;
    const comment = commentField.value;

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

    addComment(name, comment);

    nameField.value = '';
    commentField.value = '';
  } catch (e) {
    console.error('Error occurred while creating comment:', e);
    errorSnackbar('Error occurred while creating comment');
  }
};

const addComment = (name: string, comment: string) => {
  if (!commentList) throw new Error('Comment list is required');

  const commentListItem = document.createElement('li');
  const nameParagraph = document.createElement('p');
  const commentParagraph = document.createElement('p');

  nameParagraph.textContent = name;
  commentParagraph.textContent = comment;

  commentListItem.appendChild(nameParagraph);
  commentListItem.appendChild(commentParagraph);

  commentList.insertBefore(commentListItem, commentList.firstChild);
};

if (
  showHideBtn &&
  commentWrapper &&
  commentForm &&
  commentList &&
  nameField &&
  commentField
) {
  showHideBtn.addEventListener('click', handleToggleComments);
  commentForm.addEventListener('submit', handleCommentSubmit);
} else {
  console.warn('Comments module: Some DOM elements were not found!');
  warnSnackbar('Comments module: Some DOM elements were not found!');
}
