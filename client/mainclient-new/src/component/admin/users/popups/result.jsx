import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, TextField, Select, MenuItem } from "@mui/material";
import { resultUpdate } from "../../../../firebase/admin/users/attendandresult";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
export default function ResultDialog(props) {
  const { open, setOpen } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const [filter, setFilter] = React.useState("HS");
  const [loading, setLoading] = React.useState(false);
  const [marks, setMarks] = React.useState("");
  const [outof, setOutOf] = React.useState("");
  const theme = useTheme();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const { id, email, setError } = props;
    setLoading(true);
    let response = await resultUpdate(
      id,
      Date.parse(selectedDate),
      filter,
      marks,
      outof,
      email
    );
    if (response.status == 200) {
      toast.success(response.message);
    } else {
      setError(response.message);
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
          Add results {props.email && props.email.slice(0, 10)}...
        </DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            value={marks}
            placeholder="Enter the marks"
            onChange={(e) => {
              setMarks(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            type="number"
            value={outof}
            placeholder="Enter the outof marks"
            onChange={(e) => {
              setOutOf(e.target.value);
            }}
          />
          <br />
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
