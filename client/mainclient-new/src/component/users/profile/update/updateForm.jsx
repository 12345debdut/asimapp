import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ProfileForm from "./form";
import { fetchProfile } from "../../../../firebase/users/profile/profileFetch";
import { useTheme } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfileUpdate(props) {
  const [profile, setProfile] = useState({});
  const theme = useTheme();
  fetchProfile(props.uid, setProfile);
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{ backgroundColor: theme.palette.secondary.dark }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              Profile Update of{" "}
              {props.email
                ? props.email.slice(0, 10) + "..."
                : "No record found"}
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <br />
        <div style={{ marginTop: 20 }}>
          <ProfileForm {...props} />
        </div>
      </Dialog>
    </div>
  );
}
