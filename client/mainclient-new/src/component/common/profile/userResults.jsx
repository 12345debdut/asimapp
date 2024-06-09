import React, { useState, useEffect } from "react";
import { Table, Row, Col } from "reactstrap";
import { ResultFetch, updateMarks } from "../../../firebase/common";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Input from "@mui/material/Input";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
export default function UserResultTab(props) {
  const [hsResult, setHsResult] = useState([]);
  const [jointResult, setJointResult] = useState([]);
  const [error, setError] = useState("");
  const [updatemarks, setUpdateMarks] = useState(0);
  const theme = useTheme();
  useEffect(() => {
    fetch();
  }, [props.uid]);
  const fetch = async () => {
    const { uid } = props;
    if (uid) {
      let val = await ResultFetch(uid);
      if (val.status == 200) {
        setHsResult(val.hs);
        setJointResult(val.joint);
        setUpdateMarks(0);
      } else {
        setError(val.message);
      }
    }
  };
  const updateMarksSingle = async (id) => {
    const res = await updateMarks(id, updatemarks);
    if (res.status == 200) {
      toast.success(res.message);
      fetch();
    } else {
      setError(res.message);
    }
  };
  return (
    <div>
      <label>The number whatever you want to update</label>
      <br />
      <Input
        value={updatemarks}
        type="number"
        onChange={(e) => {
          setUpdateMarks(e.target.value);
        }}
      />
      <br />
      <Row style={{ marginTop: 10 }}>
        {hsResult.length > 0 && (
          <Col>
            <h5>HS Results</h5>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Marks</th>
                  <th>Out of Marks</th>
                  <th>Date</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {hsResult.map((item, index) => {
                  let date = new Date(item.date);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.marks}</td>
                      <td>{item.outof}</td>
                      <td>
                        {date.getDate()}-{date.getMonth() + 1}-
                        {date.getFullYear()}
                      </td>
                      <td>
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() => {
                            updateMarksSingle(item.itemid);
                          }}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        )}
        {jointResult.length > 0 && (
          <Col>
            <h5>JOINT Results</h5>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Marks</th>
                  <th>Out of Marks</th>
                  <th>Date</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {jointResult.map((item, index) => {
                  let date = new Date(item.date);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.marks}</td>
                      <td>{item.outof}</td>
                      <td>
                        {date.getDate()}-{date.getMonth() + 1}-
                        {date.getFullYear()}
                      </td>
                      <td>
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() => {
                            updateMarksSingle(item.itemid);
                          }}
                        >
                          Update
                        </Button>
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
