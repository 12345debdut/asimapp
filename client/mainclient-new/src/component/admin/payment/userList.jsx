import React, { useEffect, useState } from "react";
import {
  fetchUserList,
  updateUserFees,
} from "../../../firebase/admin/payment/userList";
import {
  Table,
  FormGroup,
  FormText,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import { toast } from "react-toastify";
import Search from "../common/search";
import { firebaseapp } from "../../../firebase/init";
import { Pagination } from "@mui/lab";
import { useTheme } from "@mui/material";
let globalBatchNo = 1;
export default function UserListTable() {
  const [userslist, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [fees, setFees] = useState(0);
  const [currentId, setCurrentId] = useState("");
  const [currentEmail, setCurrentMail] = useState("");
  const [isFound, setIsFound] = useState(true);
  const [tempusers, setTempUsers] = useState([]);
  const [batchno, setBatchNo] = useState(1);
  const theme = useTheme();
  useEffect(() => {
    fetch();
  }, [batchno]);
  const fetch = async () => {
    firebaseapp
      .firestore()
      .collection("users")
      .where("batchno", "==", `${batchno}`)
      .onSnapshot(
        (snap) => {
          if (!snap.empty) {
            if (
              snap.docChanges()[0].doc.data().batchno ===
              globalBatchNo.toString()
            ) {
              let usersTemp = [];
              let data = snap.docs;
              for (let i = 0; i < data.length; i++) {
                usersTemp.push({ id: data[i].id, ...data[i].data() });
              }
              setUsers(usersTemp);
              setTempUsers(usersTemp);
            }
          }
        },
        (err) => {
          setError(err.message);
        }
      );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const update = async () => {
    try {
      if (fees > 0) {
        let res = await updateUserFees(currentId, fees);
        if (res.status == 200) {
          toast.success("Successfully updated fees for " + currentEmail);
          fetch();
        } else {
          setError(res.message);
        }
      } else {
        setError("Please give correct value");
      }
    } catch (err) {
      setError("Please give correct value" + err.message);
    }
  };
  return (
    <div>
      <br />
      <Search userList={tempusers} setUserList={setUsers} />

      <Pagination
        count={6}
        color="primary"
        onChange={(event, pageno) => {
          setBatchNo(pageno);
          globalBatchNo = pageno;
        }}
        style={{ margin: 20 }}
      />
      <Table striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Batch No</th>
            <th>Fees</th>
            <th>Update fees</th>
          </tr>
        </thead>
        <tbody>
          {userslist.length > 0 &&
            userslist.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.batchno}</td>
                  <td>{item.fees ? item.fees : "Not set yet"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-warning btn-xs"
                      onClick={() => {
                        setOpen(true);
                        setCurrentId(item.id);
                        setCurrentMail(item.email);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <p style={{ color: theme.palette.error.main, fontSize: 20 }}>{error}</p>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update the fees of {currentEmail}
            </DialogContentText>
            <Input
              type="number"
              onChange={(e) => {
                setFees(e.target.value);
              }}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                update();
              }}
            >
              Update
            </Button>
          </DialogContent>
        </DialogTitle>
      </Dialog>
    </div>
  );
}
