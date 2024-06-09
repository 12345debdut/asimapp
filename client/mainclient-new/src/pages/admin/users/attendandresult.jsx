import React, { useState, useEffect, useContext } from "react";
import BaseLayout from "../../../component/shared/baseLayout";
import { Table } from "reactstrap";
import AttendenceDialog from "../../../component/admin/users/popups/attendence";
import ResultDialog from "../../../component/admin/users/popups/result";
import FaircopyDialog from "../../../component/admin/users/popups/faircopy";
import { fetchAllUsers } from "../../../firebase/admin/users/useList";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Search from "../../../component/admin/common/search";
import { AuthContext } from "../../../context/authContext";
import NotAuthorizeAdmin from "../../../component/admin/shared/notAuthorize";
import BottomNavBar from "../../../component/shared/bottomNavbar";
export default function AttendAndResult() {
  const [userList, setUserList] = useState([]);
  const [attendencePopup, setAttendencePopup] = useState(false);
  const [resultpopup, setResultPopup] = useState(false);
  const [fairCopypopup, setFairCopyPopup] = useState(false);
  const [tempUserList, setTempUserList] = useState([]);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [auth, _] = useContext(AuthContext);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const val = await fetchAllUsers();
    if (val.status == 200) {
      let data = val.data;
      setUserList(data);
      setTempUserList(data);
    } else {
      setError(val.message);
    }
  };
  if (auth.isAdmin) {
    return (
      <div>
        <BaseLayout />
        <br />
        <Search userList={tempUserList} setUserList={setUserList} />
        <div>
          <Table bordered striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Batch No</th>
                <th>Attendence</th>
                <th>Results</th>
                <th>Fair Copy not submitted</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 &&
                userList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.email}</td>
                      <td>{item.batchno}</td>
                      <td>
                        <Tooltip title={`Add attendence ${item.email}`}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              setAttendencePopup(true);
                              setCurrentUser({
                                id: item.id,
                                email: item.email,
                              });
                            }}
                          >
                            <i
                              className="fas fa-plus-circle"
                              style={{ color: "green" }}
                            ></i>
                          </IconButton>
                        </Tooltip>
                      </td>
                      <td>
                        <Tooltip title={`Add result ${item.email}`}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              setResultPopup(true);
                              setCurrentUser({
                                id: item.id,
                                email: item.email,
                              });
                            }}
                          >
                            <i
                              className="fas fa-folder-plus"
                              style={{ color: "green" }}
                            ></i>
                          </IconButton>
                        </Tooltip>
                      </td>
                      <td>
                        <Tooltip title={`Faircopy ${item.email}`}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              setFairCopyPopup(true);
                              setCurrentUser({
                                id: item.id,
                                email: item.email,
                              });
                            }}
                          >
                            <i
                              className="fas fa-folder-plus"
                              style={{ color: "green" }}
                            ></i>
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        {error && <p style={{ color: "red", fontSize: 20 }}>{error}</p>}
        <AttendenceDialog
          open={attendencePopup}
          setOpen={setAttendencePopup}
          id={currentUser.id}
          email={currentUser.email}
          setError={setError}
        />
        <ResultDialog
          open={resultpopup}
          setOpen={setResultPopup}
          id={currentUser.id}
          email={currentUser.email}
          setError={setError}
        />
        <FaircopyDialog
          open={fairCopypopup}
          setOpen={setFairCopyPopup}
          id={currentUser.id}
          email={currentUser.email}
          setError={setError}
        />

        <BottomNavBar />
      </div>
    );
  } else {
    return <NotAuthorizeAdmin />;
  }
}
