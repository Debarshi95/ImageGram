import React, { memo, useEffect, useState, useRef } from 'react';
import { CardActions, CardContent, Divider, IconButton, Typography } from '@material-ui/core';
import { FavoriteBorder, FavoriteRounded } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../../providers/AuthProvider';
import { updatePostLikes } from '../../services';
import AddComment from '../AddComment';
import CommentList from '../CommentList';
import CardHeader from '../CardHeader';
import CardMedia from '../CardMedia';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './index.css';

function ImageCard({ post }) {
  const [postLiked, setPostLiked] = useState(false);
  const { user } = useAuth();
  const { addToast } = useToasts();
  const ref = useRef();
  const { visible } = useIntersectionObserver(ref);

  // Set Like button status based on current user
  useEffect(() => {
    if (user) {
      setPostLiked(post.likedBy.includes(user.uid));
    } else {
      setPostLiked(false);
    }
  }, [post.likedBy, user]);

  // Update current user's like/dislike
  const handleLike = async () => {
    if (!user) {
      addToast('You must be logged in to like posts', {
        autoDismiss: true,
        appearance: 'error',
      });
      return;
    }
    const { likedBy, id: postId } = post;
    if (!likedBy.includes(user.uid)) {
      await updatePostLikes(postId, [...likedBy, user.uid]);
    } else {
      const oldUsers = likedBy.filter((id) => id !== user.uid);
      await updatePostLikes(postId, oldUsers);
    }
  };
  return (
    <div className="imagecard__root">
      <div ref={ref} className="imagecard__wrapper">
        {visible && (
          <>
            <CardHeader uploadedBy={post.uploadedBy} />
            <CardMedia url={post.imageUrl} alt={post.caption} />
            <CardContent className="imagecard__cardcontent">
              <Typography className="imagecard__caption" variant="subtitle1">
                {post.caption}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className="imagecard__actions">
              <IconButton aria-label="like" onClick={handleLike}>
                {postLiked ? <FavoriteRounded color="error" /> : <FavoriteBorder />}
              </IconButton>

              <span>
                {post.likedBy.length}
                <span>{post.likedBy.length > 1 ? ' likes' : ' like'}</span>
              </span>
            </CardActions>

            <CommentList imageId={post.id} />
            {user && (
              <>
                <Divider />
                <AddComment imageId={post.id} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

ImageCard.whyDidYouRender = true;
// function areImagesEqual(prevProps, nextProps) {
//   return (
//     prevProps.image.id === nextProps.image.id &&
//     prevProps.image.likedBy.length === nextProps.image.likedBy.length
//   );
// }
export default memo(ImageCard);
