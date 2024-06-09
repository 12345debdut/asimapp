import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { UpdatePaymentInfo } from "../../../firebase/admin/payment/paymentInfo";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { url } from "../../../url";
import Cookie from "js-cookie";
import Search from "../common/search";
import { Pagination } from "@mui/lab";
import { firebaseapp } from "../../../firebase/init";
import { useTheme } from "@mui/material";
let globalBatch = 1;
export default function PaymentInfo() {
  const [infolist, setInfo] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(true);
  const [tempinfo, setTempInfo] = useState([]);
  const [month, setMonth] = useState("default");
  const [batchno, setBatchno] = useState(1);
  const theme = useTheme();
  useEffect(() => {
    fetch();
  }, [batchno]);
  const fetch = async () => {
    try {
      firebaseapp
        .firestore()
        .collection("payments")
        .where("batchno", "==", `${batchno}`)
        .orderBy("email")
        .onSnapshot(
          async (res) => {
            if (!res.empty) {
              console.log("Global Batch: ", globalBatch);
              if (
                res.docChanges()[0].doc.data().batchno ===
                globalBatch.toString()
              ) {
                let val = res.docs;
                let info = [];
                for (let i = 0; i < val.length; i++) {
                  let id = val[i].id;
                  let tempval = { id: id, ...val[i].data() };
                  info.push(tempval);
                }
                setTempInfo(info);
                setInfo(info);
              }
            } else {
              setError("No document found");
            }
          },
          (err) => {
            setError(err.message);
          }
        );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  const handleChange = async (str, id, bool, amount, email) => {
    let res = await UpdatePaymentInfo(str, id, !bool, amount);
    if (res.status == 200) {
    } else {
      setError(res.message);
    }
  };
  const handleMonth = (str) => {
    if (str === "default") {
      setInfo(tempinfo);
      return;
    }
    let tempin = tempinfo.filter((item, index) => {
      return item[`${str}`].flag == false;
    });
    setInfo(tempin);
  };
  const handleDownload = () => {
    let jwt = Cookie.get("userjwt");
    window.open(url + `/csvfile/payment/${jwt}`, "Downloading csv file....");
  };

  return (
    <div>
      <div style={{ marginLeft: 10 }}>
        <Search userList={tempinfo} setUserList={setInfo} />
        <br />
        <Pagination
          count={6}
          color="secondary"
          onChange={(event, pageno) => {
            setBatchno(pageno);
            globalBatch = pageno;
          }}
        />
        <FormControl style={{ marginTop: 20, marginLeft: 20 }}>
          <InputLabel id="demo-simple-select-label">Prefference</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              handleMonth(e.target.value);
            }}
          >
            <MenuItem value={"default"}>All</MenuItem>
            <MenuItem value={"april"}>April</MenuItem>
            <MenuItem value={"may"}>May</MenuItem>
            <MenuItem value={"jun"}>June</MenuItem>
            <MenuItem value={"july"}>July</MenuItem>
            <MenuItem value={"aug"}>August</MenuItem>
            <MenuItem value={"sept"}>September</MenuItem>
            <MenuItem value={"oct"}>October</MenuItem>
            <MenuItem value={"nov"}>November</MenuItem>
            <MenuItem value={"dec"}>December</MenuItem>
            <MenuItem value={"jan"}>January</MenuItem>
            <MenuItem value={"feb"}>February</MenuItem>
            <MenuItem value={"march"}>March</MenuItem>
          </Select>
        </FormControl>
      </div>
      <br />
      <br />

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Batch No</th>
            <th>Fees</th>
            <th>April</th>
            <th>May</th>
            <th>June</th>
            <th>July</th>
            <th>August</th>
            <th>September</th>
            <th>October</th>
            <th>November</th>
            <th>December</th>
            <th>January</th>
            <th>February</th>
            <th>March</th>
            <th>
              <i
                className="fas fa-download"
                style={{
                  fontWeight: "bolder",
                  fontSize: 30,
                  color: theme.palette.primary.dark,
                  cursor: "pointer",
                }}
                onClick={handleDownload}
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {infolist.length > 0 &&
            infolist.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.batchno}</td>
                  <td>{item.fees}</td>
                  <td>
                    <p>
                      <strong>April</strong>
                    </p>
                    <Checkbox
                      checked={item.april.flag}
                      onChange={() => {
                        handleChange(
                          "april",
                          item.id,
                          item.april.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.april.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>May</strong>
                    </p>
                    <Checkbox
                      checked={item.may.flag}
                      onChange={() => {
                        handleChange(
                          "may",
                          item.id,
                          item.may.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.may.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>June</strong>
                    </p>
                    <Checkbox
                      checked={item.jun.flag}
                      onChange={() => {
                        handleChange(
                          "jun",
                          item.id,
                          item.jun.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.jun.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>July</strong>
                    </p>
                    <Checkbox
                      checked={item.july.flag}
                      onChange={() => {
                        handleChange(
                          "july",
                          item.id,
                          item.july.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.july.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>August</strong>
                    </p>
                    <Checkbox
                      checked={item.aug.flag}
                      onChange={() => {
                        handleChange(
                          "aug",
                          item.id,
                          item.aug.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.aug.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>September</strong>
                    </p>
                    <Checkbox
                      checked={item.sept.flag}
                      onChange={() => {
                        handleChange(
                          "sept",
                          item.id,
                          item.sept.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.sept.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>October</strong>
                    </p>
                    <Checkbox
                      checked={item.oct.flag}
                      onChange={() => {
                        handleChange(
                          "oct",
                          item.id,
                          item.oct.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.oct.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>November</strong>
                    </p>
                    <Checkbox
                      checked={item.nov.flag}
                      onChange={() => {
                        handleChange(
                          "nov",
                          item.id,
                          item.nov.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.nov.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>December</strong>
                    </p>
                    <Checkbox
                      checked={item.dec.flag}
                      onChange={() => {
                        handleChange(
                          "dec",
                          item.id,
                          item.dec.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.dec.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>January</strong>
                    </p>
                    <Checkbox
                      checked={item.jan.flag}
                      onChange={() => {
                        handleChange(
                          "jan",
                          item.id,
                          item.jan.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.jan.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>February</strong>
                    </p>
                    <Checkbox
                      checked={item.feb.flag}
                      onChange={() => {
                        handleChange(
                          "feb",
                          item.id,
                          item.feb.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.feb.amount}</p>
                  </td>
                  <td>
                    <p>
                      <strong>March</strong>
                    </p>
                    <Checkbox
                      checked={item.march.flag}
                      onChange={() => {
                        handleChange(
                          "march",
                          item.id,
                          item.march.flag,
                          item.fees,
                          item.email
                        );
                      }}
                    />
                    <br />
                    <p style={{ fontWeight: "bold" }}>{item.march.amount}</p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <br />
      {error.length > 0 && (
        <p style={{ color: theme.palette.error.main, fontSize: 25 }}>{error}</p>
      )}
    </div>
  );
}
