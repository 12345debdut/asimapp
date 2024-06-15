import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

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
        elevation={6}
        variant="filled"
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
