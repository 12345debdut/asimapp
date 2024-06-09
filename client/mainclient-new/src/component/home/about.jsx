import React from "react";
import { Link } from "react-router-dom";
const hometext =
  "Asim Roy Chowdhury is an eloquent Higher Secondary Mathematics teacher, teaching higher secondary students since 2000. During this 20 years..........";
const aboutusfirst =
  "Asim Roy Chowdhury is an eloquent Higher Secondary Mathematics teacher, teaching higher secondary students since 2000. During this 20 years, numerous students have touched down their Higher Secondary marks with impressive figures in Mathematics as well as their aggregates and carried on the same impact in the JEE’s also. See his Alumni in the Testimonials.";
const aboutussecond =
  "The quality teaching, sincere study guide, comfortable batch scheduling and friendly behavior towards pupils leads to a vibrant atmosphere which creates learning way more interesting as great Mathematician Georg Cantor once said “The essence of Mathematics lies in its freedom”.";
import aboutUs from "../../image/about_us.webp";
const AboutHome = (props) => {
  return (
    <section className="about-area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="about-image">
              <img src={aboutUs} alt="About us" width="100%" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12" style={{ marginTop: 20 }}>
            <h2 className="text-uppercase">
              <span>About myself</span>
            </h2>
            <div className="paragraph py-4 w-75">
              <p className="para">
                {props.type === "home" ? hometext : aboutusfirst}
              </p>
              <p className="para">
                {props.type === "home" ? "" : aboutussecond}
              </p>
            </div>
            <Link to="/aboutus">
              <button
                type="button"
                className="btn button primary-button text-uppercase"
              >
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutHome;
