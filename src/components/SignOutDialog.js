import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { auth } from "../firebase";

function SignOutDialog({ open, setOpen }) {
  const setLogout = () => {
    auth.signOut();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ fontFamily: "inherit" }}>
          Logout?
        </DialogTitle>
        <DialogContent style={{ width: "300px" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontFamily: "inherit", fontWeight: 600 }}
          >
            Do you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={setLogout} color="primary" autoFocus>
            Sign out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SignOutDialog;
