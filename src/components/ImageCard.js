import { Avatar, Divider, IconButton } from "@material-ui/core";
import { FavoriteBorder, FavoriteRounded } from "@material-ui/icons";
import React from "react";
import { useToasts } from "react-toast-notifications";
import { updatePostLikes } from "../firebase";
import { useAuth } from "../provider/AuthProvider";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import "./ImageCard.css";

function ImageCard({ image }) {
  const { user } = useAuth();

  const { addToast } = useToasts();
  const [userInfo, setUserInfo] = React.useState(null);
  const [hasLiked, setHasLiked] = React.useState(false);

  ///get user asociated with image/post
  React.useEffect(() => {
    image.user.get().then((doc) => setUserInfo({ ...doc.data(), id: doc.id }));
  }, [image]);

  //Set Like button status based on current user
  React.useEffect(() => {
    if (user !== null) {
      setHasLiked(image.likedBy.includes(user.uid));
    } else {
      setHasLiked(false);
    }
  }, [image.likedBy, user]);

  //Update current user's like/dislike
  const updateLike = () => {
    if (user) {
      if (!image.likedBy.includes(user.uid)) {
        updatePostLikes(image.id, [...image.likedBy, user.uid]);
        setHasLiked(true);
      } else {
        const oldUsers = image.likedBy.filter((id) => id !== user.uid);
        updatePostLikes(image.id, oldUsers);
        setHasLiked(false);
      }
    } else {
      addToast("You must be logged in", {
        autoDismiss: true,
        appearance: "error",
      });
    }
  };
  return (
    <div className="imagecard__root">
      <div className="image__userinfo">
        {userInfo && (
          <>
            <div>
              <Avatar>{userInfo.username?.split("")[0].toUpperCase()}</Avatar>
              <p>{userInfo.fullname}</p>
            </div>
          </>
        )}
      </div>
      <img src={image.url} alt={image.caption} />
      <div className="imagecard__stats">
        <div>
          <IconButton onClick={updateLike}>
            {hasLiked ? <FavoriteRounded color="error" /> : <FavoriteBorder />}
          </IconButton>
          <p>
            {image.likedBy.length} {image.likedBy.length > 1 ? "likes" : "like"}
          </p>
        </div>
      </div>
      <p>{image.caption}</p>
      <CommentList imageId={image.id} />
      {user && (
        <>
          <Divider />
          <AddComment imageId={image.id} />
        </>
      )}
    </div>
  );
}

export default ImageCard;
