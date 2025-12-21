<script lang="ts">
    import type { CommentItem } from "$lib/types/CommentItem";

    let showComments = $state(false);

    let newComment = $state<CommentItem>({
        name: '',
        comment: ''
    });

    let comments = $state<CommentItem[]>([
        {
            name: 'Bob Fossil',
            comment: 'Oh I am so glad you taught me all about the big brown angry guys...'
        },
    ]);

    const addComment = () => {
        comments.push(newComment)
    }

    const toggleComments = () => {
        showComments = !showComments;
    }
</script>

<section class="comments" aria-label="comments-heading">
  <h2 id="comments-heading">Comments Section</h2>

  <button
    class="show-hide"
    type="button"
    onclick={toggleComments}
    aria-expanded="false"
    aria-controls="comment-wrapper"
  >
    {showComments ? 'Hide' : 'Show'} comments
  </button>

  <div
    class="comment-wrapper"
    style="display: {showComments ? 'block' : 'none'}"
    role="region"
    aria-label="comments section"
  >
    <h3 id="add-comment-heading">Add comment</h3>
    <form class="comment-form" aria-labelledby="add-comment-heading">
      <div class="bottom-spacing">
        <label for="name">Your name:</label>
        <input
          type="text"
          name="name"
          id="name"
          bind:value={newComment.name}
          placeholder="Enter your name"
          aria-required="true"
          required
        />
      </div>

      <div class="bottom-spacing">
        <label for="comment">Your comment:</label>
        <input
          type="text"
          name="comment"
          id="comment"
          bind:value={newComment.comment}
          placeholder="Enter your comment"
          aria-required="true"
          aria-describedby="comment-help"
          required
        />
        <span id="comment-help" class="sr-only"
          >Enter your thoughts about the article</span
        >
      </div>

      <div>
        <input type="submit" value="Submit comment" onclick={addComment} aria-label="Submit your comment" />
      </div>
    </form>

    <h3 id="comments-list-heading">Comments</h3>
    <ul class="comment-container" role="list" aria-live="polite">
        {#each comments as comment}
            <li role="listitem" aria-label="Comment by {comment.name}">
                <p>{comment.name}</p>
                <p>{comment.comment}</p>
            </li>
        {/each}
    </ul>
  </div>
</section>

<style>
  /* Comment Section */
.comments {
    margin-top: 2rem;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
}

.comments h2 {
    margin-top: 1rem;
    margin-bottom: 0.6rem;
    color: #2f4f35;
}

/* Comment List */
.comment-container {
    list-style: none;
    padding: 0;
    margin: 0;
}

.comment-container li {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 0.8rem 1rem;
    margin-bottom: 0.8rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.comment-container li:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}

/* Author name */
.comment-container li p:first-child {
    font-weight: bold;
    margin-bottom: 0.3rem;
    color: #3c6e47;
}

/* Comment text */
.comment-container li p:last-child {
    margin: 0;
    color: #444;
    line-height: 1.4;
    font-size: 0.95rem;
}

/* === Comment Form === */
.comment-form {
    margin-top: 1rem;
    background: #fafafa;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
}

.comment-form label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.3rem;
    color: #2f4f35;
}

.comment-form input[type="text"] {
    width: 100%;
    padding: 0.5rem 0.7rem;
    margin-bottom: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 0.95rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.comment-form input[type="text"]:focus {
    border-color: #5a8f63;
    outline: none;
    box-shadow: 0 0 0 2px rgba(90, 143, 99, 0.25);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Submit Button */
button, .comment-form input[type="submit"] {
    background: #3c6e47;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.1s ease;
}

.comment-form input[type="submit"]:hover {
    background: #2f4f35;
}

.comment-form input[type="submit"]:active {
    transform: scale(0.97);
}
</style>