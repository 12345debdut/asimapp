import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Table } from "reactstrap";
import { UpdatePaymentInfo } from "../../../firebase/admin/payment/paymentInfo";
import { toast } from "react-toastify";
export default function ConfirmDialog(props) {
  const { data, open, setOpen } = props;
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let obj = Object.keys(data);
      let info = [];
      for (let i = 0; i < obj.length; i++) {
        let j = obj[i];
        info.push(
          UpdatePaymentInfo(data[j].str, j, data[j].bool, data[j].amount)
        );
      }
      let res = await Promise.all(info);
      let isDone = true;
      if (res.length === info.length) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].status === 400) {
            console.log(res[i].message);
            isDone = false;
            break;
          }
        }
      }
      if (isDone) {
        toast.success("Successfully updated all the record");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent style={{ overflow: "auto" }}>
          <DialogContentText>List of operation confirmation</DialogContentText>
          <DialogContentText>
            Do not refresh the page or leave the page after submitting the form.
            It will give you the status after successfull completion or else
            give you a red alert.
          </DialogContentText>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>User id</th>
                <th>Amount</th>
                <th>Month</th>
                <th>Payment status</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data[item].email}</td>
                    <td>{data[item].amount}</td>
                    <td>{data[item].str}</td>
                    <td>{data[item].bool ? "Payment done" : "Payment due"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            {!loading ? "Agree and Submit" : "Submitting...."}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
