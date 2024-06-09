import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import {
  DeleteNoticeSingle,
  updateNoticeEnable,
} from "../../../firebase/admin/notice/notices";
import { toast } from "react-toastify";
import FullScreenDialog from "./fullscreenDialog";

const SingleNotice = (props) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [noticeEnable, setNoticeEnable] = useState(props.noticeEnable);
  const date = new Date(props.time);
  const onFileOpen = () => {
    if (props.docs) {
      setOpen(!open);
    }
  };
  const updateEnable = async () => {
    setUpdateLoading(true);
    const res = await updateNoticeEnable(props.id, props.grant, noticeEnable);
    if (res.status == 200) {
      props.fetchNotices();
    } else {
      toast.error(res.message);
    }
    setUpdateLoading(false);
  };
  const deleteUserInfo = async () => {
    setDeleteLoading(true);
    let res;
    if (props.docs)
      res = await DeleteNoticeSingle(props.id, props.grant, props.urlpath);
    else res = await DeleteNoticeSingle(props.id, props.grant);
    if (res.status == 200) {
      toast.success("Successfully deleted");
    } else {
      toast.error(res.message);
    }
    props.fetchNotices();
    setDeleteLoading(false);
  };
  return (
    <div className="col-lg-4">
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div
          className="login-card"
          style={{ alignSelf: "center", width: "80%", padding: 30 }}
        >
          <p style={{ color: "gray", fontSize: 20 }}>{props.id}</p>
          {props.text && (
            <p style={{ color: "gray", fontSize: 20 }}>{props.text}</p>
          )}
          {props.docs && (
            <p
              style={{
                color: "blue",
                fontSize: 18,
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={onFileOpen}
            >
              {!open ? "open docs" : "close docs"}
            </p>
          )}
          {props.time && (
            <p style={{ color: "gray", fontSize: 18 }}>
              Date: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </p>
          )}
          {!updateLoading ? (
            <Fab
              variant="extended"
              style={{ marginLeft: 10, backgroundColor: "#ffd600" }}
              onClick={updateEnable}
            >
              {noticeEnable == 0 ? (
                <i className="fas fa-times" style={{ fontSize: 18 }}></i>
              ) : (
                <i className="far fa-check-circle" style={{ fontSize: 18 }}></i>
              )}
            </Fab>
          ) : (
            <Fab
              variant="extended"
              style={{ marginLeft: 10, backgroundColor: "#ffd600" }}
              onClick={updateEnable}
            >
              <CircularProgress size={18} color="secondary" />
            </Fab>
          )}
          {!deleteLoading ? (
            <Fab
              variant="extended"
              color="secondary"
              style={{ marginLeft: 10 }}
              onClick={deleteUserInfo}
            >
              <i
                className="fa fa-trash"
                aria-hidden="true"
                style={{ marginRight: 5 }}
              ></i>
              Delete
            </Fab>
          ) : (
            <CircularProgress size={24} color="secondary" />
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
