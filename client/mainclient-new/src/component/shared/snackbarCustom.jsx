import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbar(props) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={() => {
        props.setOpen(false);
      }}
    >
      <Alert
        severity={props.type}
        onClose={() => {
          props.setOpen(false);
        }}
      >
        {props.title}
      </Alert>
    </Snackbar>
  );
}
