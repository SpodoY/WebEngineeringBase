let showHideBtn = document.querySelector('.showHideBtn');
let commentWrapper = document.querySelector('.comment-wrapper');
let commentForm = document.querySelector('.comment-form');
let commentList = document.querySelector('.comment-list');
let nameField = document.querySelector('#name');
let commentField = document.querySelector('#comment');

showHideBtn.addEventListener('click', (e) => handleToggleComments)
commentForm.addEventListener('submit', (e) => handleCommentSubmit)

const handleToggleComments = (e) => {
    try {
        const isHidden = commentWrapper.style.display === 'none';

        if (isHidden) {
            showHideBtn.textContent = "Show comments";
            commentWrapper.style.display = 'none';
        } else {
            showHideBtn.textContent = "Hide comments";
            commentWrapper.style.display = 'block';
        }
    } catch (error) {
        console.error('Toggle comments error:', error);
    }
}

const handleCommentSubmit = (e) => {
    e.preventDefault();

    try {
        const name = nameField.value;
        const comment = commentField.value;

        if (!name || !comment) {
            console.warn("Name or comment missing!")
            return;
        }


    }
}