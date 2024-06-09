import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Input from "@mui/material/Input";
import { AuthContext } from "../../../context/authContext";
import ErrorBox from "../../../component/util/error";
import { CreateUser } from "../../../firebase/admin/users/userCreate";
import { toast } from "react-toastify";
import BaseLayout from "../../../component/shared/baseLayout";
import NotAuthorizeAdmin from "../../../component/admin/shared/notAuthorize";
import BottomNavBar from "../../../component/shared/bottomNavbar";
import logo from "../../../image/logo-main.png";

const InputStyle = { alignSelf: "center", width: "90%" };

const UserCreation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grant, setGrant] = useState("11hs");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [auth] = useContext(AuthContext);
  const [batchno, setBatchNo] = useState(0);
  const [fees, setFees] = useState(0);

  const setToDefault = () => {
    setEmail("");
    setGrant("11hs");
    setPassword("");
    setError("");
    setBatchNo("");
    setPasswordShow(false);
    setFees(0);
  };

  const submitInfo = async () => {
    setLoading(true);
    if (email && password && grant && batchno) {
      const response = await CreateUser(email, password, grant, batchno, fees);
      if (response.status == 200) {
        setToDefault();
        toast.success("User created successfully");
      } else {
        setError(response.message);
      }
    } else {
      setError("All Informations are required");
    }
    setLoading(false);
  };
  const generatePassword = () => {
    let len = 8;
    let length = len ? len : 10;
    let string = "abcdefghijklmnopqrstuvwxyz"; //to upper
    let numeric = "0123456789";
    let punctuation = "!@#$%&";
    let password = "";
    let character = "";
    while (password.length < length) {
      let entity1 = Math.ceil(string.length * Math.random() * Math.random());
      let entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
      let entity3 = Math.ceil(
        punctuation.length * Math.random() * Math.random()
      );
      let hold = string.charAt(entity1);
      hold = password.length % 2 == 0 ? hold.toUpperCase() : hold;
      character += hold;
      character += numeric.charAt(entity2);
      character += punctuation.charAt(entity3);
      password = character;
    }
    password = password
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
    setPassword(password.substr(0, len));
  };
  if (!auth.isAdmin) {
    return <NotAuthorizeAdmin />;
  }
  return (
    <div>
      <BaseLayout />
      <br />
      <br />
      <main className="sitemain">
        <div style={{ justifyContent: "center", display: "flex" }}>
          <div
            className="login-card"
            style={{ alignSelf: "center", width: "80%" }}
          >
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
                label="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onFocus={() => {
                  setError("");
                }}
                style={InputStyle}
                id="standard-basic"
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
              />
            </div>

            <div style={{ padding: 20 }}>
              <button onClick={generatePassword}>generate password</button>
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
            <div style={{ padding: 20 }}>
              <TextField
                label="Enter fees"
                value={fees}
                onChange={(e) => {
                  setFees(e.target.value);
                }}
                type="number"
                style={InputStyle}
                id="standard-basic"
              />
            </div>
            <div style={{ padding: 20 }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Prefference
                </InputLabel>
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
                  <MenuItem value={"11and12joint"}>11 and 12 JOINT</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ padding: 20 }}>
              <label>Enter batch no.</label>
              <br />
              <Input
                type="number"
                value={batchno}
                onChange={(e) => {
                  setBatchNo(e.target.value);
                }}
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
                className="btn button primary-button text-uppercase"
                onClick={submitInfo}
              >
                {loading ? <CircularProgress size={24} /> : "Provide"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
};
export default UserCreation;
