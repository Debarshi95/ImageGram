import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { addComment } from '../../services';
import './index.css';

function AddComment({ imageId }) {
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const createComment = async (e) => {
    e.preventDefault();
    try {
      await addComment(imageId, user.uid, comment);
    } catch (error) {
      //
    }
    setComment('');
  };

  return (
    <div className="addcomment__root">
      <textarea
        type="text"
        name="comment"
        placeholder="Add a comment.."
        autoComplete="off"
        aria-label="Add a comment.."
        onChange={({ target }) => setComment(target.value)}
        value={comment}
      />

      <button type="button" onClick={createComment} disabled={comment === ''}>
        Post
      </button>
    </div>
  );
}

export default AddComment;
