import React, { useState } from "react";
import FullScreenDialog from "./fullScreenDialog";
import { useTheme } from "@mui/material";
const SingleNotice = (props) => {
  const [open, setOpen] = useState(false);
  const date = new Date(props.time);
  const theme = useTheme();
  const onFileOpen = () => {
    if (props.docs) {
      setOpen(!open);
    }
  };
  return (
    <div className="col-lg-4">
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div
          className="login-card"
          style={{ alignSelf: "center", width: "80%", padding: 30 }}
        >
          <p style={{ color: theme.palette.grey, fontSize: 20 }}>{props.id}</p>
          {props.text && (
            <p style={{ color: theme.palette.grey, fontSize: 20 }}>
              {props.text}
            </p>
          )}
          {props.docs && (
            <p
              style={{
                color: theme.palette.primary.dark,
                fontSize: 18,
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={onFileOpen}
            >
              {!open ? "open docs" : "close docs"}
            </p>
          )}
          {/* {props.docs&&<a href={`/pdf/?path="${props.docs}"`}>Open docs</a>} */}
          {props.time && (
            <p style={{ color: theme.palette.grey, fontSize: 18 }}>
              Date: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </p>
          )}
        </div>
      </div>
      <br />
      <div
        style={{ justifyContent: "center", display: "flex" }}
        id="disable-iframe"
      >
        {open && (
          <FullScreenDialog open={open} setOpen={setOpen} docs={props.docs} />
        )}
      </div>
      <br />
      <br />
    </div>
  );
};
export default SingleNotice;
