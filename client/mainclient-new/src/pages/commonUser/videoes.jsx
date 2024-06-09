import React, { useEffect, useContext, useState } from "react";
import BaseLayout from "../../component/shared/baseLayout";
import { Row, Col, Card, CardBody, CardFooter } from "reactstrap";
import {
  fetchVideos,
  deleteVideoSingle,
} from "../../firebase/commonUser/videos";
import { AuthContext } from "../../context/authContext";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { url } from "../../url";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import copyTextToClipboard from "../../component/util/copy_clipboard";
import { useTheme } from "@mui/material";
import BottomNavBar from "../../component/shared/bottomNavbar";
export default function Videoes() {
  const [error, setError] = useState("");
  const [videos, setVideos] = useState([]);
  const [auth, _] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    fetchVideos(setVideos);
    let body = document.getElementsByTagName("body")[0];
    body.oncontextmenu = function () {
      toast.error("Right click disabled");
      return false;
    };
    return () => {
      body.oncontextmenu = function () {
        return true;
      };
    };
  }, []);
  const deleteVideo = async (id, link) => {
    setIsLoading([id]);
    let res = await deleteVideoSingle(id, link);
    if (res.status == 200) {
      toast.success(res.message);
    } else {
      setError(res.message);
    }
    setIsLoading([]);
  };

  function privateSection() {
    return (
      <Row id="disable-right">
        {videos.map((item, index) => {
          if (item.access === "private") {
            return (
              <div
                className="col-lg-6 col-md-6 col-sm-12"
                style={{ display: "flex", justifyContent: "center" }}
                key={index}
              >
                <Card style={{ width: "100%" }}>
                  <CardBody>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        window.open(`${url}/video/single/show/${item.link}`);
                      }}
                    >
                      {item.title}
                    </Button>
                    <p>{new Date(item.date).toString()}</p>
                  </CardBody>
                  {auth.isAdmin && (
                    <CardFooter>
                      {!isLoading.includes(item.id) ? (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            deleteVideo(item.id, item.link);
                          }}
                        >
                          Delete video
                        </Button>
                      ) : (
                        <CircularProgress
                          color="primary"
                          style={{ fontSize: 18 }}
                        />
                      )}
                      <Tooltip title="copy the link">
                        <IconButton
                          aria-label="copy link"
                          style={{ marginLeft: 10 }}
                          onClick={() => {
                            copyTextToClipboard(
                              `${url}/video/single/show/${item.link}`
                            );
                          }}
                        >
                          <i
                            className="fas fa-clipboard"
                            style={{
                              color: theme.palette.primary.dark,
                              padding: 5,
                            }}
                          ></i>
                        </IconButton>
                      </Tooltip>
                    </CardFooter>
                  )}
                </Card>
              </div>
            );
          }
        })}
      </Row>
    );
  }

  function publicSection() {
    return (
      <Row id="disable-right">
        {videos.map((item, index) => {
          if (item.access === "public") {
            return (
              <div
                className="col-lg-6 col-md-6 col-sm-12"
                style={{ display: "flex", justifyContent: "center" }}
                key={index}
              >
                <Card style={{ width: "100%" }}>
                  <CardBody>
                    <iframe
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${item.link}`}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                    <br />
                    <p>Upload date: {new Date(item.date).toString()}</p>
                  </CardBody>
                  {auth.isAdmin && (
                    <CardFooter>
                      {!isLoading.includes(item.id) ? (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            deleteVideo(item.id, item.link);
                          }}
                        >
                          Delete video
                        </Button>
                      ) : (
                        <CircularProgress
                          color="primary"
                          style={{ fontSize: 18 }}
                        />
                      )}
                    </CardFooter>
                  )}
                </Card>
              </div>
            );
          }
        })}
      </Row>
    );
  }

  return (
    <div>
      <BaseLayout />
      <br />
      <div>
        {auth.isLoggedIn ? (
          auth.isAdmin ? (
            <div>
              {privateSection()}
              {publicSection()}
            </div>
          ) : (
            privateSection()
          )
        ) : (
          publicSection()
        )}
        {error.length > 0 && (
          <p style={{ color: theme.palette.error.main, fontSize: 20 }}>
            {error}
          </p>
        )}
      </div>
      <BottomNavBar />
    </div>
  );
}
