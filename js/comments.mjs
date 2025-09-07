import {warnSnackbar, errorSnackbar} from "./utils.js";

const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');
const commentForm = document.querySelector('.comment-form');
const commentList = document.querySelector('.comment-container');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');

const handleToggleComments = () => {
    try {
        const isHidden = commentWrapper.style.display === 'none' || commentWrapper.style.display === '';

        if (isHidden) {
            showHideBtn.textContent = "Hide comments";
            commentWrapper.style.display = 'block';
        } else {
            showHideBtn.textContent = "Show comments";
            commentWrapper.style.display = 'none';
        }
    } catch (error) {
        console.error('Toggle comments error:', error);
    }
}

export const handleCommentSubmit = (e) => {
    e.preventDefault();

    try {
        const name = nameField.value;
        const comment = commentField.value;

        if (!name || !comment || name.trim().length === 0 || comment.trim().length === 0) {
            console.warn("Name or comment missing!")
            warnSnackbar("Name or comment missing!")
            return;
        }

        addComment(name, comment);

        nameField.value = '';
        commentField.value = '';

    } catch (e) {
        console.error('Error occurred while creating comment:', e);
        errorSnackbar("Error occurred while creating comment");
    }
}

const addComment = (name, comment) => {
    const commentListItem = document.createElement("li");
    const nameParagraph = document.createElement('p');
    const commentParagraph = document.createElement('p');

    nameParagraph.textContent = name;
    commentParagraph.textContent = comment;

    commentListItem.appendChild(nameParagraph);
    commentListItem.appendChild(commentParagraph);

    commentList.insertBefore(commentListItem, commentList.firstChild);
}

if (showHideBtn && commentWrapper && commentForm && commentList && nameField && commentField) {
    showHideBtn.addEventListener('click', handleToggleComments)
    commentForm.addEventListener('submit', handleCommentSubmit)
} else {
    console.warn('Comments module: Some DOM elements were not found!')
    warnSnackbar("Comments module: Some DOM elements were not found!")
}