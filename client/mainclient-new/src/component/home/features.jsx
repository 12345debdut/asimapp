import React from 'react'
import './feature.css'
const Feature=()=>{
    return(
        <section className="brand-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 col-lg-12 col-md-12">
                        <div className="first-row row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="single-brand linear-gradiant-body color-1">
                                    <i className="fas fa-book-reader linear-gradiant-icon" ></i>
                                    <p className="para linear-gradiant-color">Positive Learning</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="single-brand linear-gradiant-body color-2">
                                <i className="fas fa-book-open linear-gradiant-icon"></i>
                                <p className="para linear-gradiant-color">Friendly learning environment</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="single-brand linear-gradiant-body color-3">
                                <i className="fas fa-check-circle linear-gradiant-icon"></i>
                                <p className="para linear-gradiant-color">Fresh tricks for quick problem solving</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="single-brand linear-gradiant-body color-4">
                                <i className="fas fa-unlock-alt linear-gradiant-icon"></i>
                                <p className="para linear-gradiant-color">Unlock your future</p>
                                </div>
                            </div>
                            {/* <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="single-brand">
                                <p className="para">Get in Touch with Teacher</p>
                                </div>
                            </div> */}
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="single-brand linear-gradiant-body color-5">
                                <i className="fas fa-camera linear-gradiant-icon"></i>
                                <p className="para linear-gradiant-color">CCTV Surveillance Exam System</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="single-brand linear-gradiant-body color-6">
                                <i className="fas fa-poll-h linear-gradiant-icon"></i>
                                <p className="para linear-gradiant-color">Mock Exam</p>
                                </div>
                            </div>
                            {/* <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="single-brand">
                                <p className="para">8th Feature</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="single-brand">
                                <p className="para">9th Feature</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12">
                        <div className="experience-area">
                            <div className="d-flex flex-row years-area">
                                <h2 className="p-3 years">20+</h2>
                                <h2>
                                    <span>Years</span>
                                    <span>Experience</span>
                                    <span>Working</span>
                                </h2>
                            </div>
                            <div className="d-flex flex-row flex-wrap call-area">
                                <span><i className="fas fa-phone-alt fa-3x px-3"></i></span>
                                <div className="call-now">
                                    <a href="tel:+91-943-325-5725" className="text-uppercase h4 font-roboto">Call Now</a>
                                    <span className="font-roboto py-2">(+91)-9433255725</span>
                                </div>
                            </div>
                            <div className="bg-panel"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Feature;