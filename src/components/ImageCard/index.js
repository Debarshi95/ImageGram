import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Divider, IconButton } from '@material-ui/core';
import { FavoriteBorder, FavoriteRounded } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useAuth } from '../../providers/AuthProvider';
import { getUserInfo, updatePostLikes } from '../../services';
import AddComment from '../AddComment';
import CommentList from '../CommentList';
import './index.css';

function ImageCard({ image }) {
  const [userInfo, setUserInfo] = useState(null);
  const [postLiked, setPostLiked] = useState(false);
  const imgRef = useRef(null);
  const { user } = useAuth();
  const { addToast } = useToasts();
  const { visible } = useIntersectionObserver(imgRef);

  // get user asociated with image/post
  useEffect(() => {
    getUserInfo(image.uploadedBy)
      .then((doc) => {
        setUserInfo({ id: doc.id, ...doc.data() });
      })
      .catch(() => {
        addToast('Some error occurred! Please refresh the page', {
          autoDismiss: true,
          appearance: 'error',
        });
      });
  }, [addToast, image.uploadedBy]);

  // Set Like button status based on current user
  useEffect(() => {
    if (user) {
      setPostLiked(image.likedBy.includes(user.uid));
    } else {
      setPostLiked(false);
    }
  }, [image.likedBy, user]);

  // Update current user's like/dislike
  const handleLike = async () => {
    if (!user) {
      addToast('You must be logged in to like posts', {
        autoDismiss: true,
        appearance: 'error',
      });
      return;
    }

    if (!image.likedBy.includes(user.uid)) {
      await updatePostLikes(image.id, [...image.likedBy, user.uid]);
    } else {
      const oldUsers = image.likedBy.filter((id) => id !== user.uid);
      await updatePostLikes(image.id, oldUsers);
    }
  };
  return (
    <div className="imagecard__root">
      <Box className="imagecard__userinfo">
        <Avatar>{userInfo?.username?.split('')[0].toUpperCase()}</Avatar>
        <p>{userInfo?.fullname}</p>
      </Box>
      <Box ref={imgRef} className="imagecard__img">
        {visible && <img src={image.imageUrl} alt={image.caption} />}
      </Box>
      <Box className="imagecard__stats">
        <>
          <IconButton onClick={handleLike}>
            {postLiked ? <FavoriteRounded color="error" /> : <FavoriteBorder />}
          </IconButton>
          <span>
            {image.likedBy.length}
            <span>{image.likedBy.length > 1 ? ' likes' : ' like'}</span>
          </span>
        </>
      </Box>
      <p className="imagecard__caption">{image.caption}</p>
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

ImageCard.whyDidYouRender = true;

export default ImageCard;
