import { Avatar, CardHeader as Header, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { memo, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { getUserInfo } from '../../services';
import './index.css';

function CardHeader({ uploadedBy }) {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();

  useEffect(() => {
    setLoading(true);

    getUserInfo(uploadedBy)
      .then((doc) => {
        setUserInfo({ id: doc.id, ...doc.data() });
        setLoading(false);
      })
      .catch(() => {
        addToast('Some error occurred! Please refresh the page', {
          autoDismiss: true,
          appearance: 'error',
        });
        setLoading(false);
      });
  }, [addToast, uploadedBy]);
  return (
    <div className="cardheader__root">
      <Header
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          ) : (
            <Avatar>{userInfo?.username?.split('')[0].toUpperCase()}</Avatar>
          )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={10} width="8rem" />
          ) : (
            <Typography variant="subtitle2">{userInfo?.fullname}</Typography>
          )
        }
      />
    </div>
  );
}

export default memo(CardHeader);
