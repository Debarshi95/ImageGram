import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase';
import { getUserInfo } from '../../services';
import './index.css';

function CommentList({ imageId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsub = firestore()
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .where('imageId', '==', imageId)
      .limit(4)
      .onSnapshot(async (snapshot) => {
        const commentList = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const comment = doc.data();
            comment.id = doc.id;

            const user = await getUserInfo(comment.userId);
            comment.user = user.data();

            return { ...comment };
          })
        );
        setComments([...commentList]);
      });

    return unsub;
  }, [imageId]);

  return (
    <div className="commentlist__root">
      {comments.length > 0 &&
        comments.map((comment) => (
          <p key={comment.id}>
            <span>{comment.user.fullname} </span>
            {comment.comment}
          </p>
        ))}
    </div>
  );
}

export default CommentList;
