import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { noticeDecodeHelper } from "../../../firebase/admin/notice/notices";
import ErrorBox from "../../../component/util/error";
import SingleNotice from "../../../component/admin/notice/singleNotice";
import BaseLayout from "../../../component/shared/baseLayout";
import { firebaseapp } from "../../../firebase/init";
import NotAuthorizeAdmin from "../../../component/admin/shared/notAuthorize";
import BottomNavBar from "../../../component/shared/bottomNavbar";

const AllNotices = () => {
  const [auth] = useContext(AuthContext);
  const [grant, setGrant] = useState("11hs");
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchNotices();
  }, [grant]);
  const fetchNotices = async () => {
    setNotices([]);
    setError("");
    const str = noticeDecodeHelper(grant);
    firebaseapp
      .firestore()
      .collection(str)
      .onSnapshot(
        (docs) => {
          if (!docs.empty) {
            let temp1 = [];
            for (let i = 0; i < docs.docs.length; i++) {
              temp1.push({
                id: docs.docs[i].id,
                data: docs.docs[i].data(),
              });
            }
            setNotices(temp1);
          } else {
            setError("No data found");
          }
        },
        (err) => {
          setError(err.message);
        }
      );
  };
  if (!auth.isAdmin) {
    return <NotAuthorizeAdmin />;
  }
  return (
    <div>
      <BaseLayout />
      <main className="site-main">
        <div style={{ padding: 20 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Prefference</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={grant}
              onChange={(e) => {
                setGrant(e.target.value);
              }}
            >
              <MenuItem value={"11hs"}>11 HS</MenuItem>
              <MenuItem value={"12hs"}>12 HS</MenuItem>
              <MenuItem value={"11joint"}>11 JOINT</MenuItem>
              <MenuItem value={"12joint"}>12 JOINT</MenuItem>
            </Select>
          </FormControl>
        </div>
        {error.length > 0 && <ErrorBox title={error} />}
        <div className="row">
          {notices.length > 0 &&
            notices.map((item, index) => {
              return (
                <SingleNotice
                  key={index}
                  id={item.id}
                  text={item.data.noticeText}
                  docs={item.data.noticeDocs}
                  time={item.data.timestamp}
                  urlpath={item.data.urlpath}
                  grant={grant}
                  fetchNotices={fetchNotices}
                  noticeEnable={item.data.noticeEnable}
                />
              );
            })}
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
};
export default AllNotices;
