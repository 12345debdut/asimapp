import React, { useState, useContext, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import ChipsArray from "./galleryChip";
import { Input } from "@mui/material";
import { AuthContext } from "../../../context/authContext";
import { galleryUploadSingle } from "../../../firebase/admin/gallery/galleryUpload";
import { toast } from "react-toastify";
import { fetchGalleryByTitle } from "../../../firebase/commonUser/gallery/gallery";
import { useTheme } from "@mui/material";
const cardContainer = { width: "80%", alignSelf: "center" };
export default function GalleryForm() {
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleries, setGalleries] = useState("");
  const [galleryDetails, setGalleryDetails] = useState("");
  const [galleryImage, setGalleryImage] = useState([{}]);
  const [galleryPurpose, setGalleryPurpose] = useState("about");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [auth, _] = useContext(AuthContext);
  const theme = useTheme();
  const handleDateChange = (event) => {
    let splittedDate = event.target.value.split("-");
    setSelectedDate(
      new Date(
        `${splittedDate[1]}-${splittedDate[2]}-${splittedDate[0]}`
      ).getTime()
    );
  };

  useEffect(() => {
    fetchGallery();
    setSelectedDate(Date.now());
  }, [galleryPurpose]);
  const fetchGallery = async () => {
    const galleries = await fetchGalleryByTitle(galleryPurpose);
    if (galleries.status == 200) {
      setGalleries(Object.keys(galleries.data));
      setGalleryDetails(galleries.data);
    } else {
      setGalleries("");
    }
  };
  const onChipClicked = (title) => {
    try {
      if (galleries.length > 0) {
        setGalleryTitle(title);
        setSelectedDate(galleryDetails[title][0].galleryDate);
      }
    } catch (err) {}
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    if (galleryImage.length > 0 && galleryTitle.length > 0) {
      const uploadRes = await galleryUploadSingle(
        galleryTitle,
        galleryDescription,
        galleryImage,
        galleryPurpose,
        selectedDate
      );
      if (uploadRes.status == 200) {
        toast.success(uploadRes.message);
        setGalleryDescription("");
        setGalleryTitle("");
        setSelectedDate(Date.now());
        setGalleryPurpose("about");
      } else {
        toast.error(uploadRes.message);
        setError(uploadRes.message);
      }
    } else {
      setError("Image and title is required for this upload");
    }
    setIsLoading(false);
  };

  if (!auth.isAdmin) {
    return (
      <div>
        <h1>You are not admin</h1>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="login-card" style={cardContainer}>
        <div
          className="form-group"
          style={{ width: "95%", paddingLeft: 20, paddingTop: 20 }}
        >
          <InputLabel id="demo-simple-select-label">Gallery Title</InputLabel>
          <TextField
            placeholder="Enter the Title of gallery section"
            style={{ width: "95%" }}
            value={galleryTitle}
            onChange={(e) => {
              setGalleryTitle(e.target.value);
            }}
          />
        </div>
        <ChipsArray galleries={galleries} onClick={onChipClicked} />
        <div className="form-group" style={{ width: "95%", padding: 20 }}>
          <InputLabel>Gallery Description</InputLabel>
          <textarea
            className="form-control"
            rows="5"
            id="comment"
            value={galleryDescription}
            onChange={(e) => {
              setGalleryDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="form-group" style={{ padding: 20 }}>
          <InputLabel>Image upload</InputLabel>
          <input
            type="file"
            id="usr"
            multiple={true}
            onChange={(e) => {
              setGalleryImage(e.target.files);
            }}
          />
        </div>
        <div style={{ padding: 20 }}>
          <InputLabel>Type of Occation</InputLabel>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={galleryPurpose}
              onChange={(e) => {
                setGalleryPurpose(e.target.value);
              }}
            >
              <MenuItem value={"about"}>About</MenuItem>
              <MenuItem value={"result"}>Result and Prize</MenuItem>
              <MenuItem value={"teacher"}>Teacher's Day</MenuItem>
              <MenuItem value={"reunion"}>Reunion</MenuItem>
              <MenuItem value={"knowledge"}>Knowledge</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ padding: 20 }}>
          <Input
            type="date"
            id="date"
            onChange={(event) => {
              handleDateChange(event);
            }}
          />
        </div>
        {error.length > 0 && (
          <p style={{ color: theme.palette.error.main, marginLeft: 20 }}>
            {error}
          </p>
        )}
        <div
          style={{
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            paddingBottom: 20,
          }}
        >
          <button
            type="button"
            className="btn button primary-button text-uppercase"
            onClick={handleSubmit}
          >
            {!isLoading ? (
              "Enter details"
            ) : (
              <CircularProgress size={24} color="secondary" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
