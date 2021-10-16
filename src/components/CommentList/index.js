import React from 'react';
import { firestore } from '../../firebase';
import './index.css';

function CommentList({ imageId }) {
  const [comments, setComments] = React.useState([]);
  const docRef = React.useRef(firestore.collection('uploads').doc(imageId));

  React.useEffect(() => {
    const unsub = firestore
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .where('image', '==', docRef.current)
      .limit(4)
      .onSnapshot(
        async (snapshot) => {
          const commentList = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const comment = doc.data();
              comment.id = doc.id;

              const user = await comment.user.get();
              comment.user = user.data();

              return { ...comment };
            })
          );
          setComments([...commentList]);
        },
        (err) => console.log(err)
      );

    return () => unsub();
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
