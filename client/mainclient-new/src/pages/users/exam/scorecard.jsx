import React, { useEffect, useState, useContext } from "react";
import { Table, Row, Col } from "reactstrap";
import BaseLayout from "../../../component/shared/baseLayout";
import {
  fetchScoreWbjee,
  fetchScoreJeemain,
  fetchScoreHs,
} from "../../../firebase/users/exam/scorecard";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";
import NotAuthorizedUser from "../../../component/users/shared/notAuthorize";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import BottomNavBar from "../../../component/shared/bottomNavbar";
export default function ScoreBoard() {
  const [wbjee, setWbjee] = useState([]);
  const [jeemain, setJeemain] = useState([]);
  const [auth, _] = useContext(AuthContext);
  const [wbjeeGrant, setWbjeeGrant] = useState("11joint");
  const [jeemainGrant, setJeemainGrant] = useState("11joint");
  const [hsGrant, setHsGrant] = useState("11hs");
  const [hs, setHs] = useState([]);
  useEffect(() => {
    fetchWbjee();
  }, [wbjeeGrant]);

  useEffect(() => {
    fetchJeemain();
  }, [jeemainGrant]);

  useEffect(() => {
    fetchHs();
  }, [hsGrant]);

  const fetchWbjee = async () => {
    let res = await fetchScoreWbjee(wbjeeGrant);
    if (res.status === 200) {
      setWbjee(res.wbjee);
    } else {
      toast.error(res.message);
    }
  };

  const fetchJeemain = async () => {
    let res = await fetchScoreJeemain(jeemainGrant);
    if (res.status === 200) {
      setJeemain(res.jeemain);
    } else {
      toast.error(res.message);
    }
  };

  const fetchHs = async () => {
    let res = await fetchScoreHs(hsGrant);
    if (res.status === 200) {
      setHs(res.hs);
    } else {
      console.log(res.message);
      toast.error(res.message);
    }
  };

  if (!auth.isLoggedIn) {
    return <NotAuthorizedUser />;
  }
  return (
    <div>
      <BaseLayout />
      <Row>
        <Col style={{ margin: 20 }}>
          <h4>Wbjee Scoreboard</h4>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Prefference</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={wbjeeGrant}
              onChange={(e) => {
                setWbjeeGrant(e.target.value);
              }}
            >
              <MenuItem value={"11joint"}>11 JOINT</MenuItem>
              <MenuItem value={"12joint"}>12 JOINT</MenuItem>
              <MenuItem value={"11and12joint"}>11 and 12 JOINT</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Table striped responsive bordered style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>#</th>
                <th>User id</th>
                <th>Batch no</th>
                <th>Preference</th>
                <th>Position</th>
                <th>Points</th>
                <th>Out of</th>
              </tr>
            </thead>
            <tbody>
              {wbjee.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.batchno}</td>
                    <td>{item.grantStatus}</td>
                    <td>{item.position}</td>
                    <td>{item.wbjeescore}</td>
                    <td>{item.wbjeeoutof}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col style={{ margin: 20 }}>
          <h4>Jeemain Scoreboard</h4>

          <FormControl>
            <InputLabel id="demo-simple-select-label">Prefference</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={jeemainGrant}
              onChange={(e) => {
                setJeemainGrant(e.target.value);
              }}
            >
              <MenuItem value={"11joint"}>11 JOINT</MenuItem>
              <MenuItem value={"12joint"}>12 JOINT</MenuItem>
              <MenuItem value={"11and12joint"}>11 and 12 JOINT</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Table striped responsive bordered style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>#</th>
                <th>User id</th>
                <th>Batch no</th>
                <th>Preference</th>
                <th>Position</th>
                <th>Points</th>
                <th>Out of</th>
              </tr>
            </thead>
            <tbody>
              {jeemain.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.batchno}</td>
                    <td>{item.grantStatus}</td>
                    <td>{item.position}</td>
                    <td>{item.jeescore}</td>
                    <td>{item.jeeoutof}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col style={{ margin: 20 }}>
          <h4>Hs Scoreboard</h4>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Prefference</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={hsGrant}
              onChange={(e) => {
                setHsGrant(e.target.value);
              }}
            >
              <MenuItem value={"11hs"}>11 Hs</MenuItem>
              <MenuItem value={"12hs"}>12 Hs</MenuItem>
            </Select>
          </FormControl>
          <Table striped responsive bordered style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>#</th>
                <th>User id</th>
                <th>Batch no</th>
                <th>Preference</th>
                <th>Position</th>
                <th>Points</th>
                <th>Out of</th>
              </tr>
            </thead>
            <tbody>
              {hs.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.batchno}</td>
                    <td>{item.grantStatus}</td>
                    <td>{item.position}</td>
                    <td>{item.jeescore}</td>
                    <td>{item.jeeoutof}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <BottomNavBar />
    </div>
  );
}
