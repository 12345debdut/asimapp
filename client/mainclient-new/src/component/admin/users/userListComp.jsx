import React, { useState, useEffect, useContext } from "react";
import { Table } from "reactstrap";
import {
  fetchAllUsers,
  deleteUser,
  updateUser,
  UpdateExam,
  updateIsLoggedIn,
  updateBatchNoUser,
} from "../../../firebase/admin/users/useList";
import { Checkbox } from "@mui/material";
import EnhancedToolBar from "./enhancedToolBar";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Tooltip,
  Input,
} from "@mui/material";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { firebaseapp } from "../../../firebase/init";
import copyTextToClipboard from "../../util/copy_clipboard";
import { Pagination } from "@mui/lab";
import { useTheme } from "@mui/material";
let globalBatch = 1;
function UserListComp(props) {
  const [userDeleteArray, setUserDeleteArray] = useState([]);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [tempUserList, setTempUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [updateloading, setUpdateLoading] = useState(false);
  const navigateTo = useNavigate();
  const [auth, _] = useContext(AuthContext);
  const [updateBatchNo, setUpdateBatchNo] = useState("");
  const [batchno, setBatchNo] = useState(1);
  const theme = useTheme();
  useEffect(() => {
    fetch();
  }, [batchno]);
  console.log("batch no outside: ", batchno);
  const fetch = async () => {
    let db = firebaseapp
      .firestore()
      .collection("users")
      .where("batchno", "==", `${batchno}`)
      .orderBy("email")
      .onSnapshot(
        (snap) => {
          if (!snap.empty) {
            let info = [];
            if (
              snap.docChanges()[0].doc.data().batchno === globalBatch.toString()
            ) {
              let temp = snap.docs;
              for (let i = 0; i < temp.length; i++) {
                info.push({ id: temp[i].id, ...temp[i].data() });
              }
              setUserList(info);
              setTempUserList(info);
            }
          } else {
            setError("No data found");
            setUserList([]);
          }
        },
        (err) => {
          setError(err.message);
        }
      );
  };
  const handleChange = (id) => {
    if (userDeleteArray.includes(id)) {
      let temp = userDeleteArray.filter((item, index) => {
        return item !== id;
      });
      setUserDeleteArray(temp);
    } else {
      let temp = [...userDeleteArray, id];
      setUserDeleteArray(temp);
    }
  };

  // const search=(str)=>{
  //     let temp=tempUserList.filter((item,index)=>{
  //         return item.email.includes(str)
  //     })
  //     setUserList(temp)
  // }
  const updateExamenable = async (id, bool) => {
    let res = await UpdateExam(id, bool);
    if (res.status == 200) {
      toast.success(res.message);
    } else {
      setError(res.message);
    }
  };
  const deleteUsers = async () => {
    setLoading(true);
    setOpen(true);
    try {
      let info = [];
      for (let i = 0; i < userDeleteArray.length; i++) {
        info.push(deleteUser(userDeleteArray[i]));
      }
      let response = await Promise.all(info);
      let flag = true;
      if (response.length == userDeleteArray.length) {
        for (let i = 0; i < response.length; i++) {
          flag = flag && response[i].status == 200;
        }
        if (flag) {
          toast.success(
            "Successfully deleted All users that you have selected"
          );
          setUserDeleteArray([]);
        } else {
          toast.success("Some of your user deleted");
          setUserDeleteArray([]);
        }
      } else {
        setError(response[response.length - 1].message);
      }
    } catch (err) {
      toast.error("User session expires!!! Please login again!!");
      setError("User session expires!!! Please login again!!");
    }
    setLoading(false);
    setOpen(false);
  };
  const handleUpdate = (id, email, grant) => {
    setCurrentUser({
      id,
      email,
      grant,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (id) => {
    Cookie.set("profileuid", id);
    navigateTo("/userprofile");
  };
  const updateUserInfo = async () => {
    setUpdateLoading(true);
    let response = await updateUser(currentUser.id, currentUser.grant);
    if (response.status == 200) {
      toast.success(response.message);
      fetch();
    } else {
      toast.error(response.message);
    }
    setUpdateLoading(false);
  };
  const doLogout = async (id) => {
    try {
      firebaseapp.firestore().collection("users").doc(id).update({
        isLoggedIn: false,
      });
      return "done";
    } catch (Err) {
      return "error";
    }
  };
  const AllLogout = async () => {
    try {
      let temp = [];
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].isLoggedIn) {
          temp.push(doLogout(userList[i].id));
        }
      }
      let response = await Promise.all(temp);
      if (response.includes("error")) {
        toast.error("Some thing went wrong please redo the thing!!");
      } else {
        toast.success("All users are logged out!!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const singleExamEnable = async (id) => {
    try {
      firebaseapp.firestore().collection("users").doc(id).update({
        examenable: true,
      });
      return "done";
    } catch (Err) {
      return "error";
    }
  };
  const updateBatchNoFunc = async () => {
    let res = await updateBatchNoUser(currentUser.id, updateBatchNo);
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const allExamEnable = async () => {
    try {
      let temp = [];
      for (let i = 0; i < userList.length; i++) {
        if (!userList[i].examenable) {
          temp.push(singleExamEnable(userList[i].id));
        }
      }
      let response = await Promise.all(temp);
      if (response.includes("error")) {
        toast.error("Some thing went wrong please redo the thing!!");
      } else {
        toast.success("Exam enabled for selected users!!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!auth.isAdmin) {
    return (
      <div>
        <h1>You are not authorized to access the site</h1>
      </div>
    );
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Update User {currentUser.email}
        </DialogTitle>
        <DialogContent>
          {!loading && (
            <DialogContentText>
              You can only update the prefference and batchno of the user below.
            </DialogContentText>
          )}
          <div style={{ padding: 20 }}>
            {!loading ? (
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Prefference
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentUser.grant}
                  onChange={(e) => {
                    setCurrentUser({ ...currentUser, grant: e.target.value });
                  }}
                >
                  <MenuItem value={"11hs"}>11 HS</MenuItem>
                  <MenuItem value={"12hs"}>12 HS</MenuItem>
                  <MenuItem value={"11joint"}>11 JOINT</MenuItem>
                  <MenuItem value={"12joint"}>12 JOINT</MenuItem>
                  <MenuItem value={"11and12joint"}>11 and 12 JOINT</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <div>
                <CircularProgress color="secondary" style={{ fontSize: 20 }} />
                <p style={{ marginLeft: 10 }}>Deleting users....</p>
              </div>
            )}
            <p style={{ marginTop: 10, fontSize: 20 }}>
              Update Batch no. of {currentUser.email}
            </p>
            <Input
              value={updateBatchNo}
              onChange={(e) => {
                setUpdateBatchNo(e.target.value);
              }}
            />
            <br />
            <Button
              style={{ marginTop: 10 }}
              onClick={() => {
                updateBatchNoFunc();
              }}
            >
              UpdateBatchNo
            </Button>
          </div>
        </DialogContent>
        {!loading && (
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {!updateloading ? (
              <Button onClick={updateUserInfo} color="primary">
                Update
              </Button>
            ) : (
              <CircularProgress color="primary" />
            )}
          </DialogActions>
        )}
      </Dialog>
      <EnhancedToolBar
        numSelected={userDeleteArray.length}
        setUserList={setUserList}
        userList={tempUserList}
        deleteUsers={deleteUsers}
      />
      <div className="row" style={{ marginLeft: 10 }}>
        <Pagination
          count={6}
          defaultValue={batchno}
          color="secondary"
          onChange={(event, pageno) => {
            setBatchNo(pageno);
            globalBatch = pageno;
          }}
          style={{ margin: 10 }}
        />
      </div>
      <Table bordered striped hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User id</th>
            <th>Password</th>
            <th>All copy</th>
            <th>Userid copy</th>
            <th>Pass copy</th>
            <th>Batch No.</th>
            <th>Profile?</th>
            <th>
              Login
              <br />
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={() => {
                  AllLogout();
                }}
              >
                All Logout
              </Button>
            </th>
            <th>
              Exam enable
              <br />
              <Button
                onClick={() => {
                  allExamEnable();
                }}
                color="secondary"
                variant="contained"
                size="small"
              >
                Enable all
              </Button>
            </th>
            <th>Preference</th>
            <th>
              Delete{" "}
              <Checkbox
                checked={
                  userDeleteArray.length == userList.length &&
                  userList.length > 0
                }
                onChange={() => {
                  if (userDeleteArray.length == userList.length) {
                    setUserDeleteArray([]);
                  } else {
                    let temp = [];
                    for (let i = 0; i < userList.length; i++) {
                      temp.push(userList[i].id);
                    }
                    setUserDeleteArray(temp);
                  }
                }}
                color="secondary"
              ></Checkbox>
            </th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((item, index) => {
              return (
                <tr key={index} style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    {item.email}
                  </td>
                  <td>{item.password}</td>
                  <td>
                    <i
                      onClick={() => {
                        copyTextToClipboard(
                          `Please login in https://asimsirmath.in \nUserid: ${item.email}\nPassword: ${item.password}`
                        );
                      }}
                      className="fa fa-clipboard"
                      style={{
                        fontSize: 20,
                        color: theme.palette.primary.light,
                      }}
                      aria-hidden="true"
                    ></i>
                  </td>
                  <td>
                    <i
                      onClick={() => {
                        copyTextToClipboard(item.email);
                      }}
                      className="fa fa-clipboard"
                      style={{
                        fontSize: 20,
                        color: theme.palette.primary.dark,
                      }}
                      aria-hidden="true"
                    ></i>
                  </td>
                  <td>
                    <i
                      onClick={() => {
                        copyTextToClipboard(item.password);
                      }}
                      className="fa fa-clipboard"
                      style={{
                        fontSize: 20,
                        color: theme.palette.secondary.main,
                      }}
                      aria-hidden="true"
                    ></i>
                  </td>

                  <td>{item.batchno}</td>
                  <td>
                    <Checkbox
                      checked={
                        item.name && item.batchtime && item.address
                          ? true
                          : false
                      }
                    />
                  </td>
                  <td>
                    <Checkbox
                      checked={item.isLoggedIn}
                      onChange={() => {
                        updateIsLoggedIn(item.id, !item.isLoggedIn);
                      }}
                    />
                  </td>
                  <td>
                    <Checkbox
                      checked={item.examenable}
                      onChange={() => {
                        updateExamenable(item.id, !item.examenable);
                      }}
                    />
                  </td>
                  <td>{item.grantStatus}</td>
                  <td>
                    <Checkbox
                      checked={userDeleteArray.includes(item.id)}
                      onChange={() => {
                        handleChange(item.id);
                      }}
                    />
                  </td>
                  <td>
                    <Tooltip title={`update ${item.email}`}>
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={() => {
                          handleUpdate(item.id, item.email, item.grantStatus);
                        }}
                      >
                        Update
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {error !== "" && (
        <p style={{ color: theme.palette.error.main, fontSize: 25 }}>{error}</p>
      )}
    </div>
  );
}

export default UserListComp;
