import React, { useContext } from "react";
import BaseLayout from "../../../../component/shared/baseLayout";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import QuestionsHs from "./Questions";
import { AuthContext } from "../../../../context/authContext";
import NotAuthorizeAdmin from "../../../../component/admin/shared/notAuthorize";

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
export default function AllHsQuestions() {
  const [value, setValue] = React.useState(0);
  const [auth, _] = useContext(AuthContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (auth.isAdmin) {
    return (
      <div>
        <BaseLayout />
        <div>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
            >
              <Tab label="Hs 11" {...a11yProps(0)} />
              <Tab label="Hs 12" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <QuestionsHs examcatagory={"11hs"} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <QuestionsHs examcatagory={"12hs"} />
          </TabPanel>
        </div>
      </div>
    );
  } else {
    return <NotAuthorizeAdmin />;
  }
}
