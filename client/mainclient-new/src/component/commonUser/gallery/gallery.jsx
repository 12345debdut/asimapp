import React, { useEffect, useState } from "react";
import { fetchGalleryByTitle } from "../../../firebase/commonUser/gallery/gallery";
import GallerySingle from "./gallerySingle";

const Gallery = (props) => {
  const [galleries, setGalleries] = useState({});
  const [message, setMessage] = useState("Loading...");
  useEffect(() => {
    fetchData();
  }, [props.catagory]);
  const fetchData = async () => {
    if (props.catagory) {
      let res = await fetchGalleryByTitle(props.catagory);
      if (res.status == 200) {
        setGalleries(res.data);
      } else {
        setMessage(res.message);
      }
    }
  };
  return (
    <div>
      {Object.keys(galleries).length > 0 ? (
        Object.keys(galleries).map((item, index) => {
          console.log(galleries[item]);
          return (
            <GallerySingle
              title={item}
              key={index}
              images={galleries[item]}
              {...props}
              setGalleries={setGalleries}
            />
          );
        })
      ) : (
        <h3>{message}</h3>
      )}
    </div>
  );
};

export default Gallery;
