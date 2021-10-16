import React from 'react';
import './index.css';
import { addCommentToPost } from '../../firebase';
import { useAuth } from '../../provider/AuthProvider';

function AddComment({ imageId }) {
  const [comment, setComment] = React.useState('');
  const { user } = useAuth();

  const handleComment = async (e) => {
    console.log('clicked', { e });
    e.preventDefault();
    await addCommentToPost(imageId, user.uid, comment);
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

      <button type="button" onClick={handleComment} disabled={comment === ''}>
        Post
      </button>
    </div>
  );
}

export default AddComment;
