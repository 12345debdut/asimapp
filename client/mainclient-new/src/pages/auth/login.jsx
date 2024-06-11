import React, { useState, useContext } from "react";
import Header from "../../component/shared/header";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { login } from "../../firebase/auth";
import swal from "sweetalert";
import { AuthContext } from "../../context/authContext";
import ErrorBox from "../../component/util/error";
import BaseLayout from "../../component/shared/baseLayout";
import { useNavigate } from "react-router-dom";
const InputStyle = { alignSelf: "center", width: 300 };
import logo from "../../image/logo-main.png";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordShow, setPasswordShow] = useState(false);
  const navigateTo = useNavigate();
  const submitInfo = async () => {
    setLoading(true);
    if (email && password) {
      const response = await login(email, password);
      if (response.status === 200) {
        setEmail("");
        setPassword("");
        setAuth(response.auth);
        swal({
          title: "Success",
          icon: "success",
          text: "You have successfully logged in",
          button: "ok",
        });
        navigateTo("/");
      } else {
        swal({
          title: "Error",
          icon: "error",
          text: response.message,
          button: "ok",
        });
      }
    } else {
      setError("All Informations are required");
    }
    setLoading(false);
  };
  if (auth.isLoggedIn) {
    return (
      <div>
        <BaseLayout />
        <br />
        <br />
        <div style={{ padding: 40 }}>
          <h1>You have already logged in</h1>
        </div>
      </div>
    );
  }
  return (
    <div>
      <BaseLayout />
      <br />
      <br />
      <main className="sitemain">
        <div style={{ justifyContent: "center", display: "flex" }}>
          <div className="login-card" style={{ alignSelf: "center" }}>
            <div
              style={{ height: 200, justifyContent: "center", display: "flex" }}
            >
              <img
                src={logo}
                height={200}
                width={200}
                style={{ alignSelf: "center" }}
              />
            </div>
            <div style={{ padding: 20 }}>
              <TextField
                label="Enter userid"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onFocus={() => {
                  setError("");
                }}
                style={InputStyle}
                id="standard-basic"
                variant="standard"
              />
            </div>

            <div style={{ padding: 20 }}>
              <TextField
                label="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={() => {
                  setError("");
                }}
                type={isPasswordShow ? "text" : "password"}
                style={InputStyle}
                id="standard-basic"
                variant="standard"
              />
            </div>
            <div style={{ padding: 20 }}>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={isPasswordShow}
                    onChange={() => {
                      setPasswordShow(!isPasswordShow);
                    }}
                  />
                }
                label={isPasswordShow ? "Hide password" : "Show Password"}
              />
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
                onClick={submitInfo}
                className="btn button primary-button text-uppercase"
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
