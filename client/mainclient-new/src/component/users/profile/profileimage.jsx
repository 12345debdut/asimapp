import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { updateProfileImage } from "../../../firebase/users/profile/profileUpdate";
import { toast } from "react-toastify";
import profileimage from "../../../image/profile.png";
export default function ProfileImage(props) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  useEffect(() => {
    try {
      if (file.name) submitFile();
      console.log(props.email);
    } catch (err) {}
  }, [file]);
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const submitFile = async () => {
    setLoading(true);
    const resp = await updateProfileImage(file, props.imageurlpath);
    if (resp.status == 200) {
      toast.success(resp.message);
      props.fetchUserProfile();
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };
  return (
    <div className="col-md-4">
      <div className="profile-img">
        <img src={props.image ? props.image : profileimage} alt="" />
        <div className="file btn btn-lg btn-primary">
          {loading ? (
            <CircularProgress size={20} style={{ color: "#ffd600" }} />
          ) : (
            "Change photo"
          )}
          <input
            type="file"
            name="file"
            disabled={loading}
            onChange={(e) => {
              console.log(e.target.files[0].type);
              handleFile(e);
            }}
          />
        </div>
      </div>
      <p style={{ color: "red" }}>file size should be under 200kb</p>
      <p style={{ color: "red" }}>
        File name should be like: filename_
        {props.email && props.email.split("@")[0]}.ext
      </p>
      <p>Here ext means extension</p>
    </div>
  );
}
