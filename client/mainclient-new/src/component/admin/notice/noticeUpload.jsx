import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorBox from "../../util/error";
import { NoticeUploadFirebase } from "../../../firebase/admin/notice/noticeUpload";
import { toast } from "react-toastify";
const InputStyle = { alignSelf: "center", width: 300 };
import Logo from "../../../image/logo-main.png";

const NoticeUploadComponent = () => {
  const [grant, setGrant] = useState("11hs");
  const [loading, setLoading] = useState(false);
  const [noticeText, setNoticeText] = useState("");
  const [noticeDocs, setNoticeDocs] = useState("");
  const [error, setError] = useState("");
  const submitInfo = async () => {
    setLoading(true);
    {
      const response = await NoticeUploadFirebase(
        noticeText,
        noticeDocs,
        grant
      );
      if (response.status == 200) {
        toast.success(response.message);
        setNoticeText("");
        setError("");
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    }
    setLoading(false);
  };
  return (
    <div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div
          className="login-card"
          style={{ alignSelf: "center", width: "80%" }}
        >
          <div
            style={{ height: 200, justifyContent: "center", display: "flex" }}
          >
            <img
              src={Logo}
              height={200}
              width={200}
              style={{ alignSelf: "center" }}
            />
          </div>
          <div style={{ padding: 20 }}>
            <p>Notice Text</p>
            <br />
            <textarea
              rows="4"
              onChange={(e) => {
                setNoticeText(e.target.value);
              }}
              value={noticeText}
              style={{ width: "100%", background: "white", color: "black" }}
            />
          </div>
          <div style={{ padding: 20 }}>
            <label>Doc's</label>
            <br />
            <input
              type="file"
              onChange={(e) => {
                setNoticeDocs(e.target.files[0]);
              }}
            />
          </div>
          <div style={{ padding: 20 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Prefference</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={grant}
                onChange={(e) => {
                  setGrant(e.target.value);
                }}
              >
                <MenuItem value={"11hs"}>11 HS</MenuItem>
                <MenuItem value={"12hs"}>12 HS</MenuItem>
                <MenuItem value={"11joint"}>11 JOINT</MenuItem>
                <MenuItem value={"12joint"}>12 JOINT</MenuItem>
              </Select>
            </FormControl>
          </div>
          {error.length > 0 && <ErrorBox title={error} />}
          <div
            style={{
              alignSelf: "center",
              justifyContent: "center",
              display: "flex",
              paddingBottom: 20,
            }}
          >
            <button
              type="button"
              className="btn button primary-button text-uppercase"
              onClick={submitInfo}
            >
              {loading ? <CircularProgress size={24} /> : "Enter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoticeUploadComponent;
