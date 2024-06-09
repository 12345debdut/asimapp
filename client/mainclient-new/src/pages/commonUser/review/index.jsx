import React, { useState, useEffect } from "react";
import BaseLayout from "../../../component/shared/baseLayout";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Input,
  Row,
  Col,
} from "reactstrap";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SubmitReview } from "../../../firebase/commonUser/review";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import BottomNavBar from "../../../component/shared/bottomNavbar";
export default function ReviewSection() {
  const [year, setYear] = useState([]);
  const [passyear, setPassYear] = useState(new Date().getFullYear());
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [comments, setComments] = useState("");
  const [file, setFile] = useState("");
  const [proffession, setProffession] = useState("");
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(true);
  const navigateTo = useNavigate();
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const inputStyle = { borderColor: color };
  useEffect(() => {
    let curyear = new Date().getFullYear();
    let tempyear = [];
    for (let i = 2000; i <= curyear; i++) {
      tempyear.push(i);
    }
    setYear(tempyear);
  }, []);
  const submitInfo = async () => {
    setSubmit(true);
    let res = await SubmitReview(
      name,
      passyear,
      file,
      phonenumber,
      proffession,
      comments
    );
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setSubmit(false);
    setOpen(false);
    navigateTo("/");
  };
  const handleYearChange = (event) => {
    setPassYear(event.target.value);
  };
  return (
    <div>
      <BaseLayout />
      <div>
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
          <Card style={{ width: "100%", borderColor: color }}>
            <CardHeader style={{ backgroundColor: color }}>
              <CardTitle
                style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
              >
                Please give your valuable comments
              </CardTitle>
              <CardSubtitle
                style={{ fontSize: 16, color: "white", fontWeight: "bolder" }}
              >
                Asim Roy Chowdhury
              </CardSubtitle>
            </CardHeader>
            <CardBody>
              <Input
                placeholder="Name"
                style={inputStyle}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br />
              <Row>
                <Col md="4">
                  <label style={{ color }}>Passout year</label>
                  <Select onChange={handleYearChange} value={passyear}>
                    {year.length > 0 &&
                      year.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </Col>
                <Col md="6">
                  <CardText style={{ color }}>Image</CardText>
                  <Input
                    type="file"
                    style={inputStyle}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </Col>
              </Row>
              <br />
              <Input
                type="tel"
                placeholder="Phone Number"
                style={inputStyle}
                value={phonenumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <br />
              <CardText>What are you doing currently?</CardText>
              <Input
                style={inputStyle}
                value={proffession}
                onChange={(e) => {
                  setProffession(e.target.value);
                }}
              />
              <br />
              <CardText>Your thoughts</CardText>
              <textarea
                rows="3"
                cols="50"
                style={inputStyle}
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
              ></textarea>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  submitInfo();
                }}
              >
                {!submit ? "Submit" : "Submitting......"}
              </Button>
            </CardBody>
          </Card>
        </Dialog>
      </div>
      <BottomNavBar />
    </div>
  );
}
