import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";

export default function MarkSheet(props) {
  const [wbpercentage, setWbPercentage] = useState(0);
  const [jeepercentage, setJeePercentage] = useState(0);
  useEffect(() => {
    const { wbjeeoutof, jeeoutof, wbjeescore, jeescore } = props;
    if (wbjeeoutof && wbjeescore) {
      let wbp = (wbjeescore / wbjeeoutof) * 100;
      setWbPercentage(wbp);
    }
    if (jeeoutof && jeescore) {
      let jemp = (jeescore / jeeoutof) * 100;
      setJeePercentage(jemp);
    }
  }, [props.wbjeeoutof]);
  return (
    <div id="profile" role="tabpanel" aria-labelledby="profile-tab">
      <h5>Wbjee Table</h5>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className="profile-table-header">
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Catagories
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "white", fontWeight: "bold" }}
              >
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Total marks
              </TableCell>
              <TableCell align="right">{props.wbjeeoutof}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Getting Marks
              </TableCell>
              <TableCell align="right">{props.wbjeescore}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Percentage
              </TableCell>
              <TableCell align="right">{wbpercentage}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <h5>Jee Main Table</h5>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className="profile-table-header">
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Catagories
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "white", fontWeight: "bold" }}
              >
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Total marks
              </TableCell>
              <TableCell align="right">{props.jeeoutof}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Getting Marks
              </TableCell>
              <TableCell align="right">{props.jeescore}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Percentage
              </TableCell>
              <TableCell align="right">{jeepercentage}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
