import React, { useState, useEffect, useContext } from "react";
import {
  CardImg,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Button from "@mui/material/Button";
import {
  fetchWbjeeQuestion,
  deleteQuestionWb,
} from "../../../../firebase/admin/exam/wbjee";
import { AuthContext } from "../../../../context/authContext";
import NotAuthorizeAdmin from "../../../../component/admin/shared/notAuthorize";
import { toast } from "react-toastify";
function QuestionWb(props) {
  const deleteQuestion = () => {
    deleteQuestionWb(props.id);
  };
  return (
    <div style={{ marginTop: 20 }}>
      <Card>
        <CardHeader>Question no. {props.index}</CardHeader>
        <CardBody style={{ width: "90%", overflowX: "auto" }}>
          {props.text && <CardText>{props.text}</CardText>}
          {props.imageurl && (
            <a href={props.imageurl} data-lightbox="photos">
              <img src={props.imageurl} />
            </a>
          )}
          {props.answer && (
            <div>
              {props.answer.length > 0 ? "Answers" : "Answer"}:
              {props.answer.map((item, index) => {
                return <CardText key={index}>{item}</CardText>;
              })}
            </div>
          )}
          <Button
            color="secondary"
            variant="outlined"
            style={{ marginTop: 5 }}
            onClick={() => {
              deleteQuestion();
            }}
          >
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default function QuestionsWb(props) {
  const [data, setData] = useState([]);
  const { examcatagory } = props;
  const [auth, setAuth] = useContext(AuthContext);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchWbjeeQuestion(examcatagory, setData);
  }, []);
  const deleteAll = () => {
    setDeleting(true);
    try {
      for (let i = 0; i < data.length; i++) {
        deleteQuestionWb(data[i].id);
      }
    } catch (err) {
      toast.error("Something went wrong please redo the work!!!");
    }
    setDeleting(false);
  };
  if (auth.isAdmin) {
    return (
      <div>
        {data.length > 0 && (
          <Button
            color="secondary"
            variant="contained"
            disabled={deleting}
            onClick={() => {
              deleteAll();
            }}
          >
            {deleting ? "Deleteting....." : "Delete all"}
          </Button>
        )}
        {data.map((item, index) => {
          return (
            <QuestionWb
              key={index}
              index={index}
              id={item.id}
              imageurl={item.image}
              text={item.text}
              catagory={item.catagory}
              answer={item.answer}
            />
          );
        })}
      </div>
    );
  } else {
    return <NotAuthorizeAdmin />;
  }
}
