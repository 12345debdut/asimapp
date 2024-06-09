import React, { useState, useEffect } from "react";
import "./feedback.css";
import { fetchReviews } from "../../firebase/commonUser/review";
import { useTheme } from "@mui/material";
const FeedBack = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    fetchReviews(setData);
  }, []);
  return (
    <section className="about-area">
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            <div className="about-title">
              <h2 className="text-uppercase">Ex-student's thought</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {data.map((item, index) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <div className="client row">
                <div className="col-lg-4">
                  <img src={item.imageurl} alt="img1" className="img-fluid" />
                </div>
                <div className="col-lg-8 about-client">
                  <h4 className="text-uppercase">
                    {item.name} of {item.passoutyear} batch
                  </h4>
                  <p className="para">{item.comments}</p>
                  <p style={{ fontSize: 15, color: theme.palette.grey }}>
                    Phone number- {item.phonenumber}
                  </p>
                  <p style={{ fontSize: 15, color: theme.palette.grey }}>
                    Profession: {item.proffession}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default FeedBack;
