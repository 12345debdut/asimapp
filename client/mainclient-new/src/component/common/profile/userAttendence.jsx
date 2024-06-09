import React, { useState, useEffect } from "react";
import { Table, Row, Col } from "reactstrap";
import { Attendence } from "../../../firebase/common";
import { useTheme } from "@mui/material";
export default function UserAttendenceTab(props) {
  const [error, setError] = useState("");
  const [hsAttendence, setHsAttendence] = useState([]);
  const [jointAttendence, setJointAttendence] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    fetch();
  }, [props.uid]);
  const fetch = async () => {
    const { uid } = props;
    if (uid) {
      let res = await Attendence(uid);
      if (res.status == 200) {
        setHsAttendence(res.hs);
        setJointAttendence(res.joint);
      } else {
        setError(res.message);
      }
    }
  };
  return (
    <div>
      <Row>
        {hsAttendence.length > 0 && (
          <Col>
            <h4>HS Days</h4>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Not Attended dates</th>
                </tr>
              </thead>
              <tbody>
                {hsAttendence.map((item, index) => {
                  let date = new Date(item.date);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {date.getDate()}-{date.getMonth() + 1}-
                        {date.getFullYear()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        )}
        {jointAttendence.length > 0 && (
          <Col>
            <h4>Joint Days</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Not Attended dates</th>
                </tr>
              </thead>
              <tbody>
                {jointAttendence.map((item, index) => {
                  let date = new Date(item.date);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {date.getDate()}-{date.getMonth() + 1}-
                        {date.getFullYear()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        )}
      </Row>
      {error && (
        <p style={{ color: theme.palette.error.main, fontSize: 20 }}>{error}</p>
      )}
    </div>
  );
}
