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
import { createHsQuestion } from "../../../../firebase/admin/exam/hs";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
const InputStyle = { padding: 20 };
export default function HsForm() {
  const [examcatagory, setExamCatagory] = useState("11hs");
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
    let res = await createHsQuestion(text, image, examcatagory, answer);
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
            HS examination question upload
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
              <MenuItem value={"11hs"}>HS 11</MenuItem>
              <MenuItem value={"12hs"}>HS 12</MenuItem>
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
