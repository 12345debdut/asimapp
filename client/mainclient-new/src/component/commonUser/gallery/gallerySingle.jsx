import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../../context/authContext";
import { galleryDelete } from "../../../firebase/admin/gallery/gallery";
import { toast } from "react-toastify";
import CustomizedSnackbar from "../../shared/snackbarCustom";
import "./gallery.css";
//import "react-image-lightbox/style.css";
import { useTheme } from "@mui/material";
const GallerySingleCard = (props) => {
  const [auth, _] = useContext(AuthContext);
  const { item, setSnackBarOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const handleSingleDelete = async (id, galleryPath) => {
    setIsLoading(true);
    let res = await galleryDelete(id, galleryPath, props.catagory);
    if (res.status == 200) {
      toast.success(res.message);
      setSnackBarOpen(true);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  };
  return (
    <div style={{ marginTop: 20 }}>
      <Card style={{ width: 300 }}>
        <a href={item.galleryImageUrl} data-lightbox="photos">
          <CardImg
            className="center-cropped"
            src={item.galleryImageUrl}
            style={{ cursor: "pointer" }}
            alt="Card image cap"
            onClick={() => {
              setModalOpen(!isModalOpen);
            }}
          />
        </a>
        <CardBody>
          <CardTitle
            style={{ color: theme.palette.primary.dark, fontSize: 25 }}
          >
            {item.galleryDescription}
          </CardTitle>
          {auth.isAdmin && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setIsLoading(!isLoading);
                console.log(isLoading);
                handleSingleDelete(item.id, item.galleryImagePath);
                setIsLoading(!isLoading);
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Delete one single"
              )}
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
export default function GallerySingle(props) {
  const [auth, _] = useContext(AuthContext);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackBarType, setSnackBarType] = useState("success");
  const theme = useTheme();
  const date = new Date(props.images[0].galleryDate);
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ padding: 20 }}>
          <h3 style={{ color: theme.palette.primary.dark }}>{props.title}</h3>
          <h6
            style={{ color: theme.palette.primary.dark }}
          >{`Event date:- ${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`}</h6>
        </div>
      </div>
      <Row>
        {props.images.map((item, index) => {
          return (
            <Col key={index}>
              <GallerySingleCard
                {...props}
                item={item}
                key={index}
                setSnackBarOpen={setSnackBarOpen}
              />
            </Col>
          );
        })}
      </Row>
      <CustomizedSnackbar
        title="Please change the tab to view the latest update"
        open={snackbarOpen}
        type={snackBarType}
        setOpen={setSnackBarOpen}
      />
    </div>
  );
}
