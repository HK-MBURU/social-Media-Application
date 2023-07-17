import React, { useState } from "react";

function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}) {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        className="comment-form-textarea"
        placeholder="type your comment here......."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >Cancel</button>
      )}
    </form>
  );
}

export default CommentForm;
