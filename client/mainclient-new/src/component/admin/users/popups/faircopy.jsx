import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, TextField, Select, MenuItem } from "@mui/material";
import { faircopyUpdate } from "../../../../firebase/admin/users/attendandresult";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
export default function FaircopyDialog(props) {
  const { open, setOpen } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const [filter, setFilter] = React.useState("HS");
  const [loading, setLoading] = React.useState(false);
  const [topics, setTopics] = React.useState("");
  const theme = useTheme();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const { id, setError, email } = props;
    let chapters = topics.split(",");
    setLoading(true);
    let res = await faircopyUpdate(
      id,
      email,
      chapters,
      Date.parse(selectedDate),
      filter
    );
    if (res.status == 200) {
      toast.success(res.message);
      setSelectedDate(new Date(Date.now()));
      setFilter("HS");
      setTopics("");
    } else {
      setError(res.message);
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
          Enter Faircopy not submitted {props.email && props.email.slice(0, 10)}
          ...
        </DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            value={topics}
            placeholder="Enter the chapters"
            onChange={(e) => {
              setTopics(e.target.value);
            }}
          />
          <br />
          <p>
            Please do remmember to write multiple chapters name ',' seperated{" "}
          </p>
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
