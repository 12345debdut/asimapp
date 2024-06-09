import React, { useEffect, useState, useContext } from "react";
import { fetchUser, UpdateBatchNoFunc } from "../../../firebase/common";
import { Table } from "reactstrap";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";
import { useTheme } from "@mui/material";
export default function UserDetailsTab(props) {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [batchno, setBatchNo] = useState("");
  const [auth, _] = useContext(AuthContext);
  const theme = useTheme();
  useEffect(() => {
    fetch();
  }, [props.uid]);
  const fetch = async () => {
    const { uid } = props;
    if (uid) {
      let response = await fetchUser(uid);
      if (response.status == 200) {
        setUserData(response.data);
      } else {
        setError(response.message);
      }
    }
  };
  const updateBatchNo = async () => {
    const { uid } = props;
    if (uid && batchno) {
      let res = await UpdateBatchNoFunc(uid, batchno);
      if (res.status == 200) {
        toast.success(res.message);
        fetch();
      } else {
        toast.error(res.message);
      }
    }
  };
  return (
    <div>
      {auth.isAdmin && (
        <div style={{ padding: 10 }}>
          <label>Please enter the batch no. if you want to change it</label>
          <br />
          <Input
            type="number"
            value={batchno}
            placeholder="Enter batch no. to update..."
            onChange={(e) => {
              setBatchNo(e.target.value);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={() => {
              updateBatchNo();
            }}
          >
            Update
          </Button>
        </div>
      )}
      <br />
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>User id</td>
            <td>{userData.email ? userData.email : "No record"}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Password</td>
            <td>{userData.password ? userData.password : "No record"}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Name</td>
            <td>{userData.name ? userData.name : "No record"}</td>
          </tr>
          {userData.grantStatus?.includes("joint") && (
            <tr>
              <td>4</td>
              <td>Wbjee result</td>
              <td>
                Score: {userData.wbjeescore}, Outof: {userData.wbjeeoutof}
              </td>
            </tr>
          )}
          {userData.grantStatus?.includes("joint") && (
            <tr>
              <td>5</td>
              <td>Jeemain result</td>
              <td>
                Score: {userData.jeescore}, Outof: {userData.jeeoutof}
              </td>
            </tr>
          )}
          {userData.grantStatus?.includes("hs") && (
            <tr>
              <td>4</td>
              <td>Hs result</td>
              <td>
                Score: {userData.hsscore}, Outof: {userData.hsoutof}
              </td>
            </tr>
          )}
          <tr>
            <td>6</td>
            <td>Preference</td>
            <td>{userData.grantStatus ? userData.grantStatus : "No record"}</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Batch No</td>
            <td>{userData.batchno ? userData.batchno : "No record"}</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Batch Days and time</td>
            <td>{userData.batchtime ? userData.batchtime : "No record"}</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Date of admission</td>
            <td>
              {userData.dateofadmission
                ? userData.dateofadmission
                : "No record"}
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td>Phone no.</td>
            <td>{userData.phonenumber ? userData.phonenumber : "No record"}</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Whatsapp No.</td>
            <td>{userData.wpnumber ? userData.wpnumber : "No record"}</td>
          </tr>

          <tr>
            <td>12</td>
            <td>Email</td>
            <td>{userData.useremail ? userData.useremail : "No record"}</td>
          </tr>
          <tr>
            <td>13</td>
            <td>DOB</td>
            <td>{userData.dob ? userData.dob : "No record"}</td>
          </tr>
          <tr>
            <td>14</td>
            <td>Address</td>
            <td>{userData.address ? userData.address : "No record"}</td>
          </tr>
          <tr>
            <td>15</td>
            <td>Subject Combination</td>
            <td>
              {userData.subjectcombination
                ? userData.subjectcombination
                : "No record"}
            </td>
          </tr>
          <tr>
            <td>16</td>
            <td>12th standard School</td>
            <td>{userData.newschool ? userData.newschool : "No record"}</td>
          </tr>
          <tr>
            <td>17</td>
            <td>10th standard School</td>
            <td>{userData.oldschool ? userData.oldschool : "No record"}</td>
          </tr>
          <tr>
            <td>18</td>
            <td>Total & Math no. (%) in 10th</td>
            <td>{userData.total10 ? userData.total10 : "No record"}</td>
          </tr>

          <tr>
            <td>19</td>
            <td>Total & Math no. (%) in 11th/12th</td>
            <td>{userData.total12 ? userData.total12 : "No record"}</td>
          </tr>
          <tr>
            <td>20</td>
            <td>Father name</td>
            <td>{userData.fathername ? userData.fathername : "No record"}</td>
          </tr>
          <tr>
            <td>21</td>
            <td>Father Occupation</td>
            <td>
              {userData.fatheroccupation
                ? userData.fatheroccupation
                : "No record"}
            </td>
          </tr>
          <tr>
            <td>22</td>
            <td>Father Phone Number</td>
            <td>{userData.fatherphno ? userData.fatherphno : "No record"}</td>
          </tr>
          {/* <tr>
                        <td>21</td>
                        <td>Father Signature</td>
                        <td><a href={userData.fSignature?userData.fSignature:"#"} data-lightbox="photos">Click here</a></td>
                    </tr> */}
          <tr>
            <td>23</td>
            <td>Mother name</td>
            <td>{userData.mothername ? userData.mothername : "No record"}</td>
          </tr>
          <tr>
            <td>24</td>
            <td>Mother Occupation</td>
            <td>
              {userData.motheroccupation
                ? userData.motheroccupation
                : "No records"}
            </td>
          </tr>
          <tr>
            <td>25</td>
            <td>Mother Phone Number</td>
            <td>{userData.motherphno ? userData.motherphno : "No records"}</td>
          </tr>
          {/* <tr>
                        <td>25</td>
                        <td>Mother Signature</td>
                        <td><a href={userData.mSignature?userData.mSignature:"#"} data-lightbox="photos">Click here</a></td>
                    </tr> */}
          <tr>
            <td>26</td>
            <td>Class</td>
            <td>{userData.class ? userData.class : "No record"}</td>
          </tr>

          <tr>
            <td>27</td>
            <td>Image Url</td>
            <td>
              <a
                href={userData.imageurl ? userData.imageurl : "#"}
                data-lightbox="photos"
              >
                Click here
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
      {error && (
        <p style={{ color: theme.palette.error.main, fontSize: 20 }}>{error}</p>
      )}
    </div>
  );
}
