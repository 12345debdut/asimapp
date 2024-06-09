import React, { useState, useEffect, useContext } from "react";
import BaseLayout from "../../../component/shared/baseLayout";
import Footer from "../../../component/shared/footer";
import Fab from "@mui/material/Fab";
import {
  fetchPrefference,
  updatePrefference,
  fetchPrefferenceByGrant,
} from "../../../firebase/admin/users/userPrefference";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";
import Loading from "../../../component/shared/Loading";
import NotAuthorizeAdmin from "../../../component/admin/shared/notAuthorize";
import BottomNavBar from "../../../component/shared/bottomNavbar";

const singlePrefer = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  padding: 30,
};
export default function UserPrefference() {
  const [auth, setAuth] = useContext(AuthContext);
  const [hs11updated, setHs11Updated] = useState(false);
  const [hs12updated, setHs12Updated] = useState(false);
  const [joint11updated, setJoint11Updated] = useState(false);
  const [joint12updated, setJoint12Updated] = useState(false);
  const [joint1112updated, setJoint1112Updated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let responses = await fetchPrefference();
    if (responses[0].status == 200) {
      setHs11Updated(responses[0].preffer);
      setHs12Updated(responses[1].preffer);
      setJoint11Updated(responses[2].preffer);
      setJoint12Updated(responses[3].preffer);
      setJoint1112Updated(responses[4].preffer);
    }
    setIsLoading(false);
  };
  const handleSubmit = async (str) => {
    let resp;
    if (str === "11hs") {
      resp = await updatePrefference("HS11Prefference", hs11updated);
    } else if (str === "12hs") {
      resp = await updatePrefference("HS12Prefference", hs12updated);
    } else if (str === "11joint") {
      resp = await updatePrefference("JOINT11Prefference", joint11updated);
    } else if (str === "12joint") {
      resp = await updatePrefference("JOINT12Prefference", joint12updated);
    } else {
      resp = await updatePrefference("JOINT1112Prefference", joint1112updated);
    }
    if (resp.status == 200) {
      const res = await fetchPrefferenceByGrant(str);
      if (res.status === 200) {
        if (str === "11hs") {
          setHs11Updated(res.preffer);
        } else if (str === "12hs") {
          setHs12Updated(res.preffer);
        } else if (str === "11joint") {
          setJoint11Updated(res.preffer);
        } else if (str === "12joint") {
          setJoint12Updated(res.preffer);
        } else {
          setJoint1112Updated(res.preffer);
        }
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error(resp.message);
    }
  };
  if (!auth.isAdmin) {
    return <NotAuthorizeAdmin />;
  }
  return (
    <React.Fragment>
      <BaseLayout />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {!isLoading ? (
          <div
            className="login-card"
            style={{
              width: "80%",
              alignSelf: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={singlePrefer}>
              <p style={{ alignSelf: "center" }}>11 HS prefference</p>
              <Fab
                variant="extended"
                style={{ marginLeft: 10, backgroundColor: "#ffd600" }}
                onClick={() => {
                  handleSubmit("11hs");
                }}
              >
                {!hs11updated ? (
                  <i className="fas fa-times" style={{ fontSize: 18 }}></i>
                ) : (
                  <i
                    className="far fa-check-circle"
                    style={{ fontSize: 18 }}
                  ></i>
                )}
              </Fab>
            </div>
            <div style={singlePrefer}>
              <p style={{ alignSelf: "center" }}>12 HS prefference</p>
              <Fab
                variant="extended"
                style={{ marginLeft: 10, backgroundColor: "#ffd600" }}
                onClick={() => {
                  handleSubmit("12hs");
                }}
              >
                {!hs12updated ? (
                  <i className="fas fa-times" style={{ fontSize: 18 }}></i>
                ) : (
                  <i
                    className="far fa-check-circle"
                    style={{ fontSize: 18 }}
                  ></i>
                )}
              </Fab>
            </div>
            <div style={singlePrefer}>
              <p style={{ alignSelf: "center" }}>11 JOINT prefference</p>
              <Fab
                variant="extended"
                style={{ marginLeft: 10, backgroundColor: "#ffd600" }}
                onClick={() => {
                  handleSubmit("11joint");
                }}
              >
                {!joint11updated ? (
                  <i className="fas fa-times" style={{ fontSize: 18 }}></i>
                ) : (
                  <i
                    className="far fa-check-circle"
                    style={{ fontSize: 18 }}
                  ></i>
                )}
              </Fab>
            </div>
            <div style={singlePrefer}>
              <p style={{ alignSelf: "center" }}>12 JOINT prefference</p>
              <Fab
                variant="extended"
                style={{ marginLeft: 10, backgroundColor: "#ffd600" }}
                onClick={() => {
                  handleSubmit("12joint");
                }}
              >
                {!joint12updated ? (
                  <i className="fas fa-times" style={{ fontSize: 18 }}></i>
                ) : (
                  <i
                    className="far fa-check-circle"
                    style={{ fontSize: 18 }}
                  ></i>
                )}
              </Fab>
            </div>
            <div style={singlePrefer}>
              <p style={{ alignSelf: "center" }}>11 and 12 JOINT prefference</p>
              <Fab
                variant="extended"
                style={{ marginLeft: 10, backgroundColor: "#ffd600" }}
                onClick={() => {
                  handleSubmit("11and12joint");
                }}
              >
                {!joint1112updated ? (
                  <i className="fas fa-times" style={{ fontSize: 18 }}></i>
                ) : (
                  <i
                    className="far fa-check-circle"
                    style={{ fontSize: 18 }}
                  ></i>
                )}
              </Fab>
            </div>
          </div>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
      <BottomNavBar />
    </React.Fragment>
  );
}
