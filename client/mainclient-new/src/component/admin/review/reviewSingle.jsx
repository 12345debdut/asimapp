import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardImg, CardText } from "reactstrap";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { UpdateFlag, DeleteDoc } from "../../../firebase/admin/reviews";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
export default function ReviewSingle(props) {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const theme = useTheme();
  const updateFlag = async () => {
    const { id, flag } = props;
    const res = await UpdateFlag(id, flag);
    if (res.status === 200) {
    } else {
      toast.error(res.message);
    }
  };
  const deleteDoc = async () => {
    const { id } = props;
    setDeleteLoading(true);
    const res = await DeleteDoc(id);
    if (res.status === 400) {
      toast.error(res.message);
    }
    setDeleteLoading(false);
  };
  return (
    <div style={{ marginTop: 20, marginLeft: 10 }}>
      <Card style={{ width: 300 }}>
        <a href={props.imageurl} data-lightbox="photos">
          <CardImg
            className="center-cropped"
            src={props.imageurl}
            style={{ cursor: "pointer" }}
            alt="Card image cap"
            onClick={() => {
              setModalOpen(!isModalOpen);
            }}
          />
        </a>
        <CardBody>
          <CardTitle
            style={{ color: theme.palette.primary.dark, fontSize: 20 }}
          >
            Name: {props.name}
          </CardTitle>
          <CardText style={{ color: theme.palette.primary.dark, fontSize: 16 }}>
            PhoneNumber: {props.phonenumber}
          </CardText>
          <CardText style={{ color: theme.palette.primary.dark, fontSize: 16 }}>
            Proffession: {props.proffession}
          </CardText>
          <CardText style={{ color: theme.palette.primary.dark, fontSize: 16 }}>
            Passout Year: {props.passoutyear}
          </CardText>
          <CardText style={{ color: theme.palette.primary.dark, fontSize: 16 }}>
            Review: {props.comments}
          </CardText>
          {!updateLoading ? (
            <Fab
              variant="extended"
              style={{
                marginLeft: 10,
                backgroundColor: theme.palette.secondary.light,
              }}
              onClick={updateFlag}
            >
              {!props.flag ? (
                <i className="fas fa-times" style={{ fontSize: 18 }}></i>
              ) : (
                <i className="far fa-check-circle" style={{ fontSize: 18 }}></i>
              )}
            </Fab>
          ) : (
            <Fab
              variant="extended"
              style={{
                marginLeft: 10,
                backgroundColor: theme.palette.secondary.light,
              }}
              onClick={updateFlag}
            >
              <CircularProgress size={18} color="secondary" />
            </Fab>
          )}
          {!deleteLoading ? (
            <Button
              style={{ marginLeft: 5 }}
              color="primary"
              variant="contained"
              onClick={deleteDoc}
            >
              Delete
            </Button>
          ) : (
            <Button
              style={{ marginLeft: 5 }}
              color="primary"
              variant="contained"
            >
              Deleting.....
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
