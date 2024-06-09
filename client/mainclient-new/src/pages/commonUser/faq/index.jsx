import React from "react";
import "./index.css";
import BaseLayout from "../../../component/shared/baseLayout";
import BottomNavBar from "../../../component/shared/bottomNavbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import faqJson from "./faq.json";

export default function FAQ() {
  return (
    <React.Fragment>
      <BaseLayout />
      <div className="faq-heading-div">
        <p className="faq-heading-text">FAQ SECTION</p>
      </div>
      <div className="container ">
        {faqJson.data.map((item) => {
          return (
            <Accordion className="mt-4 faq-div">
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon className="faq-div-text" />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography className="faq-div-text">
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-div-text">{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <BottomNavBar />
      </div>
    </React.Fragment>
  );
}
