import React, { useState } from "react";
import clsx from "clsx";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Search from "../common/search";
import { useTheme } from "@mui/material";
import Cookie from "js-cookie";
import { url } from "../../../url";

const handleDownload = () => {
  let jwt = Cookie.get("userjwt");
  window.open(
    url + "/csvfile/userInfo/" + jwt,
    "Downloading the csv file from server"
  );
};

export default function EnhancedTableToolbar(props) {
  const { numSelected, deleteUsers } = props;
  const theme = useTheme();
  return (
    <React.Fragment>
      <Toolbar>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Users list
          </Typography>
        )}
        {/* <Button color="primary" variant="contained" onClick={()=>{
          search()
        }}>Search</Button> */}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => {
                deleteUsers();
              }}
            >
              <DeleteIcon style={{ color: theme.palette.error.main }} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Download Excel file">
            <IconButton
              aria-label="filter list"
              onClick={() => {
                handleDownload();
              }}
            >
              <i className="fas fa-download" style={{ color: "blue" }}></i>
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <Search {...props} />
    </React.Fragment>
  );
}
