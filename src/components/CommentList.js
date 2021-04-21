import React from "react";
import { firestore } from "../firebase";

import "./CommentList.css";

function CommentList({ imageId }) {
  const [comments, setComments] = React.useState([]);
  const docRef = React.useRef(firestore.collection("uploads").doc(imageId));

  React.useEffect(() => {
    const unsub = firestore
      .collection("comments")
      .orderBy("createdAt", "desc")
      .where("image", "==", docRef.current)
      .limit(4)
      .onSnapshot(
        async (snapshot) => {
          let allComments = [];
          console.log(snapshot.docs.length);
          for (let i = 0; i < snapshot.docs.length; i++) {
            const comment = snapshot.docs[i].data();
            const user = await comment.user.get();

            comment.id = snapshot.docs[i].id;
            comment.user = user.data();

            allComments.push(comment);
          }
          setComments([...allComments.reverse()]);
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
