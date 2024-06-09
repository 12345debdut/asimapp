import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Input,
} from "reactstrap";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { createJeeMainQuestion } from "../../../../firebase/admin/exam/jeemain";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
const InputStyle = { padding: 20 };
export default function JeeMainForm() {
  const [examcatagory, setExamCatagory] = useState("11joint");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const theme = useTheme();
  const handleExamCatagory = (e) => {
    setExamCatagory(e.target.value);
  };
  const handleSubmit = async () => {
    setSubmitting(true);
    let res = await createJeeMainQuestion(text, image, examcatagory, answer);
    if (res.status === 200) {
      setText("");
      setAnswer("");
    } else {
      toast.error(res.message);
    }
    setSubmitting(false);
  };
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Card
        style={{
          width: "70%",
          alignSelf: "center",
          marginLeft: "15%",
          marginTop: "5%",
          marginBottom: "3%",
        }}
      >
        <CardHeader style={{ backgroundColor: theme.palette.primary.main }}>
          <CardTitle
            style={{
              color: theme.palette.primary.contrastText,
              fontSize: 20,
              justifyContent: "center",
            }}
          >
            Jeemain examination question upload
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div style={InputStyle}>
            <Input
              placeholder="Enter question text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div style={InputStyle}>
            <Input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div style={InputStyle}>
            <Input
              placeholder="Enter the answer"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
          </div>
          <div style={InputStyle}>
            <Select
              labelId="examcatagory"
              id="examcatagory"
              value={examcatagory}
              onChange={handleExamCatagory}
            >
              <MenuItem value={"11joint"}>Joint 11</MenuItem>
              <MenuItem value={"12joint"}>Joint 12</MenuItem>
              <MenuItem value={"11and12joint"}>Joint 11 and 12</MenuItem>
            </Select>
          </div>
        </CardBody>
        <CardFooter style={{ backgroundColor: theme.palette.primary.main }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            {!submitting ? "Submit" : "Submitting...."}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
