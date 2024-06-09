import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import { CircularProgress, Select, MenuItem } from "@mui/material";
import { attendenceUpdate } from "../../../../firebase/admin/users/attendandresult";
import { toast } from "react-toastify";

export default function AttendenceDialog(props) {
  const { open, setOpen } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const [filter, setFilter] = React.useState("HS");
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { setError, email, id } = props;
    let val = await attendenceUpdate(
      id,
      Date.parse(selectedDate),
      filter,
      email
    );
    if (val.status == 200) {
      toast.success(val.message);
    } else {
      setError(val.message);
    }
    setLoading(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add attendence {props.email && props.email.slice(0, 10)}...
        </DialogTitle>
        <DialogContent>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider> */}
          <br />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <MenuItem value={"HS"}>HS</MenuItem>
            <MenuItem value={"JOINT"}>JOINT</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {!loading ? (
            <Button onClick={handleSubmit} color="primary" autoFocus>
              Upload
            </Button>
          ) : (
            <CircularProgress
              style={{ color: theme.palette.secondary.light, fontSize: 20 }}
            />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
