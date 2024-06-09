import React from "react";
import BaseLayout from "../../component/shared/baseLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Gallery from "../../component/commonUser/gallery/gallery";
import BottomNavBar from "../../component/shared/bottomNavbar";

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

const AllGallery = (props) => {
  const [value, setValue] = React.useState(0);

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
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Result and Prize" {...a11yProps(1)} />
          <Tab label="Teacher's Day" {...a11yProps(2)} />
          <Tab label="Reunion" {...a11yProps(3)} />
          <Tab label="Knowledge" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Gallery catagory="about" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Gallery catagory="result" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Gallery catagory="teacher" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Gallery catagory="reunion" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Gallery catagory="knowledge" />
      </TabPanel>
      <BottomNavBar />
    </div>
  );
};
export default AllGallery;
