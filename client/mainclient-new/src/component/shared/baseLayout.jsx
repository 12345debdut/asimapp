import React, { useState, useContext, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AuthContext } from "../../context/authContext";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { firebaseapp } from "../../firebase/init";
import CommonUserNavBar from "./commonNavBar";
import { logout } from "../util/logout";
import { Box } from "@mui/system";
const drawerWidth = 240;

//All Styles are done here
const iconStyle = { fontSize: 24, color: "#ffffff" };
const textStyle = { textDecoration: "none", color: "#ffffff" };
const dividerStyle = { color: "#ffffff", backgroundColor: "#ffffff" };

export default function BaseLayout(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useContext(AuthContext);
  const [disableProfile, setDisableProfile] = useState(true);
  const navigateTo = useNavigate();
  useEffect(() => {
    checkProfileButton();
  }, [props.uid]);
  const checkProfileButton = async () => {
    const { uid } = props;
    if (uid) {
      try {
        let res = await firebaseapp
          .firestore()
          .collection("users")
          .doc(uid)
          .get();
        if (res.exists) {
          if (res.data().name.length > 0) {
          } else {
            setDisableProfile(false);
          }
        } else {
        }
      } catch (Err) {}
    } else {
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    setOpen(open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!auth.isAdmin && !auth.isLoggedIn) {
    return <CommonUserNavBar />;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Row>
            <Box
              sx={{
                marginRight: theme.spacing(2),
                display: `${open ? "none" : "block"}`,
              }}
            >
              <IconButton
                aria-label="open drawer"
                onClick={toggleDrawer("left", true)}
                edge="start"
                style={{ marginLeft: 10 }}
              >
                <MenuIcon style={{ color: "#ffffff" }} />
              </IconButton>
            </Box>
            <Typography variant="h6" style={{ marginTop: 7 }}>
              Asim Math
            </Typography>
            {auth.isAdmin && (
              <Button
                color="secondary"
                size="small"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  logout(setAuth);
                  navigateTo("/login");
                }}
                variant="contained"
              >
                Logout
              </Button>
            )}
          </Row>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={toggleDrawer("left", true)}
        onClose={toggleDrawer("left", false)}
      >
        <div>
          <IconButton
            onClick={handleDrawerClose}
            style={{ backgroundColor: "#ffffff", fontSize: 25 }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider style={dividerStyle} />
        <Link to="/" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-home" style={iconStyle}></i>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Link>
        <Divider style={dividerStyle} />
        <Link to="/aboutus" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-address-card" style={iconStyle}></i>
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Link>
        <Divider style={dividerStyle} />
        {/* Admin Section starts here */}
        {auth.isAdmin && <Admin />}
        <Divider style={dividerStyle} />
        {/* Admin section ends here */}
        {/* User section starts here */}
        {auth.isLoggedIn && !auth.isAdmin && <UserSection />}
        <Divider style={dividerStyle} />
        {/* User section ends here */}
        <a href="/practice/" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="fa fa-question-circle" style={iconStyle}></i>
              </ListItemIcon>
              <ListItemText primary="Practice Section" />
            </ListItem>
          </List>
        </a>
        <Divider style={dividerStyle} />
        <Link to="/allGalleries" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-image" style={iconStyle}></i>
              </ListItemIcon>
              <ListItemText primary="Gallery section" />
            </ListItem>
          </List>
        </Link>
        <Divider style={dividerStyle} />
        <Link to="/videos" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-video" style={iconStyle}></i>
              </ListItemIcon>
              <ListItemText primary="Video Section" />
            </ListItem>
          </List>
        </Link>
        <Divider style={dividerStyle} />
        <Link to="/contactus" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="far fa-address-book" style={iconStyle}></i>
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
          </List>
        </Link>
        <Divider style={dividerStyle} />
        <Link to="/review" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-comments" style={iconStyle}></i>
              </ListItemIcon>
              <ListItemText primary="Review Us" />
            </ListItem>
          </List>
        </Link>
        <Divider style={dividerStyle} />
        <Link to="/faq" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-question" style={iconStyle}></i>
              </ListItemIcon>
              <ListItemText primary="Faq" />
            </ListItem>
          </List>
        </Link>
        <Divider style={dividerStyle} />
        <Link to="/courses" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-graduation-cap" style={iconStyle}></i>
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem>
          </List>
        </Link>
        <Divider style={dividerStyle} />
        {!auth.isLoggedIn ? (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              style={{
                backgroundColor: "#ffffff",
                color: "#3f51b5",
                justifyContent: "center",
                width: "80%",
                marginLeft: "10%",
                marginTop: 10,
              }}
            >
              Log in
            </Button>
          </Link>
        ) : (
          <Link to="/" style={textStyle}>
            <List>
              <ListItem
                button
                onClick={() => {
                  logout(setAuth);
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-sign-out-alt" style={iconStyle}></i>
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
            </List>
          </Link>
        )}
      </SwipeableDrawer>

      <div style={{ height: 64 }}></div>
    </Box>
  );
}

const UserSection = () => {
  return (
    <div>
      <Link to="/allNoticesUsers" style={textStyle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="far fa-file-word" style={iconStyle}></i>
            </ListItemIcon>
            <ListItemText primary="All Notices" />
          </ListItem>
        </List>
      </Link>
      <Divider style={dividerStyle} />
      <Link to="/userprofile" style={textStyle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-id-badge" style={iconStyle}></i>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Link>
      <Divider style={dividerStyle} />
      <a href="/exam/home" style={textStyle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-question" style={iconStyle}></i>
            </ListItemIcon>
            <ListItemText primary="Exam Section" />
          </ListItem>
        </List>
      </a>
    </div>
  );
};

const Admin = () => {
  const [userOpen, setUserOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  return (
    <div>
      {/*User Section*/}
      <Link to="/userList" style={textStyle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-address-card" style={iconStyle}></i>
            </ListItemIcon>
            <ListItemText primary="UserList" />
          </ListItem>
        </List>
      </Link>
      <Divider style={dividerStyle} />
      <Link to="/userCreation" style={textStyle}>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-address-card" style={iconStyle}></i>
            </ListItemIcon>
            <ListItemText primary="UserCreation" />
          </ListItem>
        </List>
      </Link>
      <Divider style={dividerStyle} />
      <ListItem
        button
        onClick={() => {
          setUserOpen(!userOpen);
        }}
      >
        <ListItemIcon>
          <i className="fa fa-users" style={iconStyle}></i>
        </ListItemIcon>
        <ListItemText primary="User Section" style={textStyle} />
        {userOpen ? (
          <ExpandLess style={iconStyle} />
        ) : (
          <ExpandMore style={iconStyle} />
        )}
      </ListItem>
      <Collapse in={userOpen} timeout="auto" unmountOnExit>
        <Link to="/userPrefference" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="Update User Prefference" />
            </ListItem>
          </List>
        </Link>
        <Link to="/userAttendenceResult" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="Attendence & Result" />
            </ListItem>
          </List>
        </Link>
      </Collapse>
      <Divider style={dividerStyle} />
      {/*Notice Section*/}
      <ListItem
        button
        onClick={() => {
          setNoticeOpen(!noticeOpen);
        }}
      >
        <ListItemIcon>
          <i className="far fa-file-word" style={iconStyle}></i>
        </ListItemIcon>
        <ListItemText primary="Notice Section" style={textStyle} />
        {noticeOpen ? (
          <ExpandLess style={iconStyle} />
        ) : (
          <ExpandMore style={iconStyle} />
        )}
      </ListItem>
      <Collapse in={noticeOpen} timeout="auto" unmountOnExit>
        <Link to="/noticeUpload" style={textStyle}>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText primary="Notice Upload" />
            </ListItem>
          </List>
        </Link>
        <Link to="/allNotices" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="All Notices" />
            </ListItem>
          </List>
        </Link>
      </Collapse>
      <Divider style={dividerStyle} />
      {/*Gallery section starts here*/}
      <Link to="/galleryUpload" style={textStyle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-image" style={iconStyle}></i>
            </ListItemIcon>
            <ListItemText primary="Gallery Upload" />
          </ListItem>
        </List>
      </Link>
      <Divider style={dividerStyle} />
      {/*Gallery section ends here*/}
      {/* Video section stars here */}
      <Link to="/videoUpload" style={textStyle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-video" style={iconStyle}></i>
            </ListItemIcon>
            <ListItemText primary="Video Upload" />
          </ListItem>
        </List>
      </Link>
      {/* Video section ends here */}
      {/* Payment related all things starts here */}
      <Divider style={dividerStyle} />
      <ListItem
        button
        onClick={() => {
          setPaymentOpen(!paymentOpen);
        }}
      >
        <ListItemIcon>
          <i className="fas fa-shopping-cart" style={iconStyle}></i>
        </ListItemIcon>
        <ListItemText primary="Payment Section" style={textStyle} />
        {paymentOpen ? (
          <ExpandLess style={iconStyle} />
        ) : (
          <ExpandMore style={iconStyle} />
        )}
      </ListItem>
      <Collapse in={paymentOpen} timeout="auto" unmountOnExit>
        <Link to="/userPaymentInfo" style={textStyle}>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText primary="User's payment Info" />
            </ListItem>
          </List>
        </Link>
        <Link to="/paymentInfo" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="All Payments" />
            </ListItem>
          </List>
        </Link>
        <Link to="/monthlyDone" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="Monthly Info" />
            </ListItem>
          </List>
        </Link>
      </Collapse>
      {/* Payment related all things ends here */}
      {/* Exam section starts here */}
      <Divider style={dividerStyle} />
      <ListItem
        button
        onClick={() => {
          setExamOpen(!examOpen);
        }}
      >
        <ListItemIcon>
          <i className="fas fa-question" style={iconStyle}></i>
        </ListItemIcon>
        <ListItemText primary="Exam Section" style={textStyle} />
        {examOpen ? (
          <ExpandLess style={iconStyle} />
        ) : (
          <ExpandMore style={iconStyle} />
        )}
      </ListItem>
      <Collapse in={examOpen} timeout="auto" unmountOnExit>
        <Link to="/wbjeequestionupload" style={textStyle}>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText primary="Wbjee Question Upload" />
            </ListItem>
          </List>
        </Link>
        <Link to="/wbjeequestions" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="Wbjee questions" />
            </ListItem>
          </List>
        </Link>
        <Link to="/jeemainquestionupload" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="JeeMain Question Upload" />
            </ListItem>
          </List>
        </Link>
        <Link to="/jeemainquestions" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="JeeMain Questions" />
            </ListItem>
          </List>
        </Link>
        <Link to="/hsquestionupload" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="Hs Question Upload" />
            </ListItem>
          </List>
        </Link>
        <Link to="/hsquestions" style={textStyle}>
          <List>
            <ListItem button>
              <ListItemText primary="Hs Questions" />
            </ListItem>
          </List>
        </Link>
      </Collapse>
      <Divider style={dividerStyle} />
      <Link to="/scoreboard" style={textStyle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-id-badge" style={iconStyle}></i>
            </ListItemIcon>
            <ListItemText primary="Online exam scorboard" />
          </ListItem>
        </List>
      </Link>
      {/* Exam section ends here */}
      <Divider style={dividerStyle} />
      <Link to="/allReviews" style={textStyle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-comments" style={iconStyle}></i>
            </ListItemIcon>
            <ListItemText primary="Review section" />
          </ListItem>
        </List>
      </Link>
    </div>
  );
};
