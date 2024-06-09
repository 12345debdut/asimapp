import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Page } from "react-pdf";
import { Document } from "react-pdf";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [pagenumber, setPageNumber] = useState(1);
  const [numpages, setNumberPages] = useState(null);
  useEffect(() => {
    if (numpages) {
      document.getElementsByClassName("canvas-docs")[0].oncontextmenu =
        function () {
          toast.error("Please do not tamper pdf");
          return false;
        };
    }
  }, [numpages]);
  const handleClose = () => {
    props.setOpen(false);
  };
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumberPages(numPages);
  };
  const goToPrev = () => {
    if (pagenumber != 1) {
      setPageNumber(pagenumber - 1);
    } else {
      toast.warn("You are at the bigining of the pdf file");
    }
  };
  const goToNext = () => {
    if (pagenumber != numpages) {
      setPageNumber(pagenumber + 1);
    } else {
      toast.warn("You have reached on the last page");
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Document</Typography>
          </Toolbar>
        </AppBar>
        <br />
        <div className="row" style={{ justifyContent: "center" }}>
          <Button onClick={goToPrev} color="primary" variant="contained">
            Prev
          </Button>
          <Button
            onClick={goToNext}
            color="secondary"
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            Next
          </Button>
        </div>
        <Document
          file={props.docs ? props.docs : null}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(err) => {
            console.log(err.message);
          }}
          className="canvas-docs"
        >
          <Page pageNumber={pagenumber} />
        </Document>
      </Dialog>
    </div>
  );
}
