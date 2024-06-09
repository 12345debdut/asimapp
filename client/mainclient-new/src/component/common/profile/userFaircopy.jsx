import React, { useState, useEffect, useContext } from "react";
import { Table, Row, Col } from "reactstrap";
import { FairCopyFetch, DeleteFairCopy } from "../../../firebase/common";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";
import { useTheme } from "@mui/material";
export default function UserFairCopyTab(props) {
  const [hsData, setHsData] = useState([]);
  const [jointData, setJointData] = useState([]);
  const [error, setError] = useState("");
  const [auth, _] = useContext(AuthContext);
  const theme = useTheme();
  useEffect(() => {
    fetch();
  }, [props.uid]);
  const fetch = async () => {
    const { uid } = props;
    if (uid) {
      let val = await FairCopyFetch(uid);
      if (val.status == 200) {
        setHsData(val.hs);
        setJointData(val.joint);
      } else {
        setError(val.message);
      }
    }
  };
  const handleDelete = async (id) => {
    let res = await DeleteFairCopy(id);
    if (res.status == 200) {
      toast.success(res.message);
      fetch();
    } else {
      setError(res.message);
    }
  };
  return (
    <div>
      <Row>
        {hsData.length > 0 && (
          <Col>
            <h4>HS table</h4>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Chapters</th>
                  <th>Date</th>
                  {auth.isAdmin && <th>Delete</th>}
                </tr>
              </thead>
              <tbody>
                {hsData.map((item, index) => {
                  let date = new Date(item.date);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.chapter}</td>
                      <td>
                        {date.getDate()}-{date.getMonth() + 1}-
                        {date.getFullYear()}
                      </td>
                      {auth.isAdmin && (
                        <td>
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                              handleDelete(item.fairid);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        )}
        {jointData.length > 0 && (
          <Col>
            <h4>JOINT table</h4>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Chapters</th>
                  <th>Date</th>
                  {auth.isAdmin && <th>Delete</th>}
                </tr>
              </thead>
              <tbody>
                {jointData.map((item, index) => {
                  let date = new Date(item.date);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.chapter}</td>
                      <td>
                        {date.getDate()}-{date.getMonth() + 1}-
                        {date.getFullYear()}
                      </td>
                      {auth.isAdmin && (
                        <td>
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                              handleDelete(item.fairid);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      )}
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
