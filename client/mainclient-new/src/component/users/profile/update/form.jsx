import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { updateProfile } from "../../../../firebase/users/profile/profileUpdate";
import { toast } from "react-toastify";
import { fetchUserPrefference } from "../../../../firebase/users/profile/profileFetch";
import { AuthContext } from "../../../../context/authContext";
import { firebaseapp } from "../../../../firebase/init";
import { useTheme } from "@mui/material";
export default function ProfileForm(props) {
  const [auth, _] = useContext(AuthContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [fathername, setFathername] = useState("");
  const [fatheroccupation, setFatherOccupation] = useState("");
  const [fatherphno, setFatherPhonenumber] = useState("");
  const [mothername, setMotherName] = useState("");
  const [motheroccupation, setMotherOccupation] = useState("");
  const [motherphno, setMotherPhonenumber] = useState(0);
  const [oldschool, setOldSchool] = useState("");
  const [newschool, setNewSchool] = useState("");
  const [subjectcombination, setSubjectCombo] = useState("");
  const [total10, setTotal10] = useState("");
  const [total12, setTotal12] = useState("");
  const [grant, setGrant] = useState("11hs");
  const [batchtime, setBatchTime] = useState("");
  const [classuser, setClassUser] = useState(0);
  const [isPreffer, setIsPreffer] = useState(false);
  const [fSignature, setFSignature] = useState("");
  const [mSignature, setMSignature] = useState("");
  // const [fSignPath,setFSignPath]=useState("")
  // const [mSignPath,setMSignPath]=useState("")
  const [wpnumber, setWpNumber] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [pherror, setPhError] = useState("");
  const [wperror, setWpError] = useState("");
  const [nameerror, setNameError] = useState("");
  const [dateofadmission, setDateOfAdmission] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    fetchProfile();
  }, []);

  // const handleSignature=(file,type)=>{
  //     if(type==="father")
  //     setFSignature(file)
  //     else
  //     setMSignature(file)
  // }

  const fetchProfile = async () => {
    setLoading(true);
    let profile = {};
    try {
      profile = (
        await firebaseapp.firestore().collection("users").doc(props.uid).get()
      ).data();
    } catch (E) {
      console.log(E.message);
      return;
    }
    if (profile) {
      const responses = await fetchUserPrefference(profile.grantStatus);
      if (responses.status == 200 && responses.preffer) {
        setIsPreffer(responses.preffer);
      }
      setName(profile.name || "");
      setAddress(profile.address || "");
      setPhonenumber(profile.phonenumber || "");
      setFathername(profile.fathername || "");
      setFatherOccupation(profile.fatheroccupation || "");
      setFatherPhonenumber(profile.fatherphno || "");
      setMotherName(profile.mothername || "");
      setMotherOccupation(profile.motheroccupation || "");
      setMotherPhonenumber(profile.motherphno || "");
      setSubjectCombo(profile.subjectcombination || "");
      setBatchTime(profile.batchtime || "");
      setClassUser(profile.class || "");
      setOldSchool(profile.oldschool || "");
      setNewSchool(profile.newschool || "");
      setTotal10(profile.total10 || "");
      setTotal12(profile.total12 || "");
      setGrant(profile.grantStatus || "");
      // setFSignPath(profile.fSignPath||"")
      // setMSignPath(profile.mSignPath||"")
      setWpNumber(profile.wpnumber || "");
      setUserEmail(profile.useremail || "");
      setDob(profile.dob || "");
      setDateOfAdmission(profile.dateofadmission || "");
      setFSignature(profile.fSignature);
      setMSignature(profile.mSignature);
    }
    setLoading(false);
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (phonenumber && !(phonenumber.toString().length == 10)) {
      setPhError("Phone number must be length of 10");
      return;
    }
    if (wpnumber && !(wpnumber.toString().length == 10)) {
      setWpError("Whatsapp number must be length of 10");
      return;
    }
    if (
      (name &&
        address &&
        phonenumber &&
        fathername &&
        fatheroccupation &&
        fatherphno &&
        mothername &&
        motheroccupation &&
        motherphno &&
        oldschool &&
        newschool &&
        subjectcombination &&
        batchtime &&
        classuser &&
        total10 &&
        total12 &&
        wpnumber &&
        useremail &&
        dob &&
        dateofadmission) ||
      auth.isAdmin
    ) {
      setError("");
      let profile = {
        name,
        address,
        phonenumber,
        fathername,
        fatheroccupation,
        fatherphno,
        mothername,
        motheroccupation,
        motherphno,
        oldschool,
        newschool,
        subjectcombination,
        batchtime,
        class: classuser,
        total10,
        total12,
        wpnumber,
        useremail,
        dob,
        dateofadmission,
      };
      const response = await updateProfile(
        profile,
        auth.isAdmin,
        grant,
        fSignature,
        mSignature,
        props.uid
      );
      if (response.status == 200) {
        console.log("Hiii");
        toast.success(response.message);
        setLoading(false);
        props.handleClose();
      } else {
        console.log("HI");
        toast.error(response.message);
        setLoading(false);
        props.handleClose();
      }
    } else {
      console.log("HII");
      setLoading(false);
      setError("All feilds are required");
    }
  };
  if (loading) {
    return (
      <div
        style={{
          margin: 20,
          color: theme.palette.secondary.dark,
          fontSize: 35,
        }}
      >
        Loading......
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%", alignSelf: "center" }}>
        <div>
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Name*</label>
              <TextField
                placeholder="enter name here"
                value={name || ""}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
              <p style={{ color: theme.palette.error.dark, fontSize: 15 }}>
                {nameerror.length > 0 && nameerror}
              </p>
            </div>
            <br />
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Address*</label>
              <TextField
                placeholder="enter address"
                value={address}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Date of admission*</label>
              <TextField
                placeholder="enter Date of admission"
                value={dateofadmission}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setDateOfAdmission(e.target.value);
                }}
                required
              />
              <p style={{ color: theme.palette.error.dark, fontSize: 18 }}>
                Please enter date as DD/MM/YYYY format
              </p>
            </div>
            <br />
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>DOB*</label>
              <TextField
                placeholder="enter date of birth"
                value={dob}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                required
              />
              <p style={{ color: theme.palette.error.dark, fontSize: 18 }}>
                Please enter date as DD/MM/YYYY format
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Batch days and time*</label>
              <TextField
                placeholder="enter Batch Time"
                value={batchtime}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setBatchTime(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Class*</label>
              <TextField
                placeholder="enter your class"
                value={classuser}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setClassUser(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Phone number*</label>
              <TextField
                placeholder="enter phone number"
                type="number"
                value={phonenumber}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setPhonenumber(e.target.value);
                }}
                required
              />
              {pherror.length > 0 && (
                <p style={{ color: theme.palette.error.dark }}>{pherror}</p>
              )}
            </div>
            <br />
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Whatsapp number*</label>
              <TextField
                placeholder="enter whatsapp number"
                type="number"
                value={wpnumber}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setWpNumber(e.target.value);
                }}
                required
              />
              {wperror.length > 0 && (
                <p style={{ color: theme.palette.error.dark }}>{wperror}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Email Id*</label>
              <TextField
                placeholder="enter email id"
                value={useremail}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Father's Name*</label>
              <TextField
                placeholder="enter father's name"
                value={fathername}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setFathername(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Father occupation*</label>
              <TextField
                placeholder="enter father's occupation"
                value={fatheroccupation}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setFatherOccupation(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Father phone number*</label>
              <TextField
                placeholder="enter father's phonenumber"
                type="number"
                value={fatherphno}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setFatherPhonenumber(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Mother's Name*</label>
              <TextField
                placeholder="enter mother's name"
                value={mothername}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setMotherName(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Mother's Occupation*</label>
              <TextField
                placeholder="enter mother's occupation"
                value={motheroccupation}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setMotherOccupation(e.target.value);
                }}
                required
              />
            </div>
          </div>
          {/* <div className="row" >
                    <div className="col-md-5" style={{padding:20}}>
                    <label>Father's Signature*</label>
                        <input type="file"
                            onChange={(e)=>{
                                handleSignature(e.target.files[0],"father")
                            }}
                        required
                        />
                    </div>
                    <br/>
                    <div className="col-md-5" style={{padding:20}}>
                        <label>Mother's Signature*</label>
                        <input type="file"
                            onChange={(e)=>{
                                handleSignature(e.target.files[0],"mother")
                            }}
                        required
                        />
                    </div>
                </div> */}
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Mother's Phone number*</label>
              <TextField
                placeholder="enter mother's number"
                type="number"
                value={motherphno}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setMotherPhonenumber(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>10th Standard School</label>
              <TextField
                placeholder="enter old school of you"
                value={oldschool}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setOldSchool(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>12th Standard School</label>
              <TextField
                placeholder="enter new school of you "
                value={newschool}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setNewSchool(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Subject Combination</label>
              <TextField
                placeholder="Enter subject combination"
                value={subjectcombination}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setSubjectCombo(e.target.value);
                }}
                required
              />
              <p style={{ color: theme.palette.error.dark, fontSize: 18 }}>
                Please enter subjects by ',' separated
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Total and math no. in 10th</label>
              <TextField
                placeholder="enter total marks of 10th "
                value={total10}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setTotal10(e.target.value);
                }}
                required
              />
              <p style={{ color: theme.palette.error.dark, fontSize: 18 }}>
                Please enter numbers by ',' separated
              </p>
            </div>
            <br />
            <div className="col-md-5" style={{ padding: 20 }}>
              <label>Total and math no. in 11th or 12th</label>
              <TextField
                placeholder="enter total marks of 12th"
                value={total12}
                style={{ width: "100%" }}
                color="secondary"
                onChange={(e) => {
                  setTotal12(e.target.value);
                }}
                required
              />
              <p style={{ color: theme.palette.error.dark, fontSize: 18 }}>
                Please enter numbers by ',' separated
              </p>
            </div>
            {auth.isAdmin && (
              <div className="col-md-5" style={{ padding: 20 }}>
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
            )}
          </div>
          <p style={{ color: theme.palette.error.dark, fontSize: 20 }}>
            {error.length > 0 && error}
          </p>
          <div style={{ marginTop: 20, marginLeft: 20 }}>
            <Button color="primary" variant="outlined" onClick={handleSubmit}>
              Submit Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
