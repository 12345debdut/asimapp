import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import BaseLayout from "../../../component/shared/baseLayout";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { VideoUpload } from "../../../firebase/admin/videos";
import { toast } from "react-toastify";
import NotAuthorizeAdmin from "../../../component/admin/shared/notAuthorize";
import BottomNavBar from "../../../component/shared/bottomNavbar";
const cardContainer = { width: "80%", alignSelf: "center" };
export default function VideosUpload() {
  const [auth, _] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [access, setAccess] = useState("public");
  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await VideoUpload(link, title, access);
    if (res.status == 200) {
      toast.success(res.message);
    } else {
      setError(res.message);
    }
    setIsLoading(false);
    setLink("");
    setTitle("");
    setAccess("public");
  };
  if (!auth.isAdmin) {
    return <NotAuthorizeAdmin />;
  }
  return (
    <div>
      <BaseLayout />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="login-card" style={cardContainer}>
          <div
            className="form-group"
            style={{ width: "95%", paddingLeft: 20, paddingTop: 20 }}
          >
            <InputLabel id="demo-simple-select-label">Video Link</InputLabel>
            <TextField
              placeholder="enter the embed video link"
              style={{ width: "95%" }}
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <br />
            <TextField
              placeholder="enter title here"
              style={{ width: "95%", marginTop: 20 }}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <Select
              value={access}
              onChange={(e) => {
                setAccess(e.target.value);
              }}
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
            <br />
            {!isLoading ? (
              <Button
                style={{ marginTop: 20 }}
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Upload
              </Button>
            ) : (
              <CircularProgress
                style={{ fontSize: 24, color: "green", marginTop: 20 }}
              />
            )}
          </div>
          {error.length > 0 && (
            <p style={{ color: "red", fontSize: 25 }}>{error}</p>
          )}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}
