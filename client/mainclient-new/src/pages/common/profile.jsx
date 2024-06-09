import React, { useEffect, Suspense, lazy } from "react";
import BaseLayout from "../../component/shared/baseLayout";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookie from "js-cookie";
import LazyLoaded from "../../component/util/lazyloaded";
import BottomNavBar from "../../component/shared/bottomNavbar";

const UserAttendenceTab = lazy(() =>
  import("../../component/common/profile/userAttendence")
);
const UserDetailsTab = lazy(() =>
  import("../../component/common/profile/userDetails")
);
const UserResultTab = lazy(() =>
  import("../../component/common/profile/userResults")
);
const UserFaircopyTab = lazy(() =>
  import("../../component/common/profile/userFaircopy")
);
const UserPaymentTab = lazy(() =>
  import("../../component/common/profile/userPayment")
);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ProfileSingleUser(props) {
  const [value, setValue] = React.useState(0);
  const [uid, setUid] = React.useState("");

  useEffect(() => {
    let uid = Cookie.get("profileuid", "");
    if (uid) {
      // Cookie.remove("profileuid")
      setUid(uid);
    }
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <BaseLayout />
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="scrollable"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Payment section" {...a11yProps(1)} />
          <Tab label="Faircopy not submitted" {...a11yProps(2)} />
          <Tab label="Attendance" {...a11yProps(3)} />
          <Tab label="Results" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Suspense fallback={<LazyLoaded />}>
          <UserDetailsTab uid={uid} />
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Suspense fallback={<LazyLoaded />}>
          <UserPaymentTab uid={uid} />
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Suspense fallback={<LazyLoaded />}>
          <UserFaircopyTab uid={uid} />
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Suspense fallback={<LazyLoaded />}>
          <UserAttendenceTab uid={uid} />
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Suspense fallback={<LazyLoaded />}>
          <UserResultTab uid={uid} />
        </Suspense>
      </TabPanel>
      <BottomNavBar />
    </div>
  );
}
