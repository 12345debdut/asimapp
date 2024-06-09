import React from "react";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { useTheme } from "@mui/material";
export default function AboutProfile(props) {
  const theme = useTheme();
  return (
    <div id="home" role="tabpanel" aria-labelledby="home-tab">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className="profile-table-header">
            <TableRow>
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "bold",
                }}
              >
                Catagories
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "bold",
                }}
              >
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                User Id
              </TableCell>
              <TableCell align="right">
                {props.userid ? props.userid : "No records found"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Email
              </TableCell>
              <TableCell align="right">
                {props.email ? props.email : "No records found"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Class
              </TableCell>
              <TableCell align="right">
                {props.class ? props.class : "No records found"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Batch Time
              </TableCell>
              <TableCell align="right">
                {props.batchtime ? props.batchtime : "No records found"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                New School
              </TableCell>
              <TableCell align="right">
                {props.newschool ? props.newschool : "No records found"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Old School
              </TableCell>
              <TableCell align="right">
                {props.oldschool ? props.oldschool : "No records found"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Subject Combination
              </TableCell>
              <TableCell align="right">
                {props.subjectcombination
                  ? props.subjectcombination
                  : "No records found"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Address
              </TableCell>
              <TableCell align="right">
                {props.address ? props.address : "No records found"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Total number of 10
              </TableCell>
              <TableCell align="right">
                {props.total10 ? props.total10 : "No records found"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Total number of 12
              </TableCell>
              <TableCell align="right">
                {props.total12 ? props.total12 : "No records found"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
