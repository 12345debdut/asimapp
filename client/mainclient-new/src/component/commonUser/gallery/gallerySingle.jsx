import React, { useContext, useState } from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../../context/authContext";
import { galleryDelete } from "../../../firebase/admin/gallery/gallery";
import { toast } from "react-toastify";
import CustomizedSnackbar from "../../shared/snackbarCustom";
import "./gallery.css";
import { useTheme } from "@mui/material";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const GallerySingleCard = (props) => {
  const [auth, _] = useContext(AuthContext);
  const { item, setSnackBarOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const handleSingleDelete = async (id, galleryPath) => {
    setIsLoading(true);
    let res = await galleryDelete(id, galleryPath, props.catagory);
    console.log(res);
    if (res.status == 200) {
      props.onCardDeleted();
      toast.success(res.message);
      setSnackBarOpen(true);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  };
  return (
    <div style={{ marginTop: 20 }}>
      <Card style={{ minWidth: 350 }}>
        <div onClick={() => props.onCardClick(item.galleryImageUrl)}>
          <CardImg
            className="center-cropped"
            src={item.galleryImageUrl}
            style={{ cursor: "pointer" }}
            alt="Card image cap"
            onClick={() => {
              setModalOpen(!isModalOpen);
            }}
          />
        </div>
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
  const [previewIndex, setPreviewIndex] = useState(-1);
  const [imagesState, setImagesState] = useState(props.images);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  if (imagesState.length === 0) return <h3>No data found!!</h3>;
  return (
    <Box style={{ padding: 20 }} sx={{ flexGrow: 1 }}>
      <div style={{ display: "flex" }}>
        <div style={{ padding: 20 }}>
          <h3 style={{ color: theme.palette.primary.dark }}>{props.title}</h3>
          <h6
            style={{ color: theme.palette.primary.dark }}
          >{`Event date:- ${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`}</h6>
        </div>
      </div>
      <Grid container spacing={2}>
        {imagesState.map((item, index) => {
          return (
            <Grid item>
              <Item>
                <GallerySingleCard
                  {...props}
                  item={item}
                  key={index}
                  setSnackBarOpen={setSnackBarOpen}
                  onCardClick={(selectedUrl) => {
                    setPreviewIndex(index);
                  }}
                  onCardDeleted={() => {
                    console.log("On card deleted: " + item.id);
                    setImagesState((prevState) =>
                      prevState.filter((imageItem) => imageItem.id != item.id)
                    );
                  }}
                />
              </Item>
            </Grid>
          );
        })}
      </Grid>
      <CustomizedSnackbar
        title="Please change the tab to view the latest update"
        open={snackbarOpen}
        type={snackBarType}
        setOpen={setSnackBarOpen}
      />
      <Lightbox
        open={previewIndex != -1}
        close={() => setPreviewIndex(-1)}
        slides={[
          {
            src: `${props.images[previewIndex]?.galleryImageUrl}`,
            alt: "image 1",
          },
          ...props.images
            .filter(
              (item) =>
                props.images[previewIndex]?.galleryImageUrl !=
                item?.galleryImageUrl
            )
            .map((item, index) => {
              return { src: item?.galleryImageUrl };
            }),
        ]}
      />
    </Box>
  );
}
