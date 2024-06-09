import React, { useEffect, useState, useContext } from "react";
import "./profile.css";

import { fetchProfile } from "../../../firebase/users/profile/profileFetch";
import { toast } from "react-toastify";
import "../../../css/profile.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jscookie from "js-cookie";
import { updateProfileImage } from "../../../firebase/users/profile/profileUpdate";
import { AuthContext } from "../../../context/authContext";
import profileimage from "../../../image/profile.png";

const UserProfile = (props) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [auth, _] = useContext(AuthContext);

  const navigateTo = useNavigate();
  useEffect(() => {
    fetchProfile(props.uid, setProfile);
  }, []);
  useEffect(() => {
    try {
      if (file.name) {
        if (file.size < 1000000) submitFile();
        else alert("Please give file size under 1mb");
      }
    } catch (err) {}
  }, [file]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const submitFile = async () => {
    setLoading(true);
    const resp = await updateProfileImage(file, profile.imageurlpath);
    if (resp.status == 200) {
      toast.success(resp.message);
    } else {
      toast.error(resp.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row profile">
          <div className="col-md-12 left-side-card">
            <div className="profile-sidebar">
              <div className="profile-userpic">
                <img
                  src={profile.imageurl ? profile.imageurl : profileimage}
                  className="img-responsive"
                  alt=""
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <label className="labelInputadmin">
                  {" "}
                  {!loading ? "Enter Your File" : "Loading...."}
                  <input
                    type="file"
                    size="60"
                    className="inputFileadmin"
                    onChange={handleFile}
                  />
                </label>
              </div>
              <p style={{ textAlign: "center", color: "red" }}>
                Please give imagefile within 1mb size...
              </p>
              <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                  {profile.name ? profile.name : "No record"}
                </div>
                <div className="profile-usertitle-job">
                  Student of Asim Roy Chowdhury
                </div>
              </div>
              <div className="profile-userbuttons">
                {(!profile.name || auth.isAdmin) && (
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      props.handleOpen();
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    jscookie.set("profileuid", props.uid);
                    navigateTo("/profileSingle");
                  }}
                >
                  More Info
                </Button>
              </div>
              {/* <div className="deatils-profile">
                    <p className="details-profile-single">Parent Details</p>
                    <p className="details-profile-single">Exam Result</p>
                </div> */}
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};
export default UserProfile;
