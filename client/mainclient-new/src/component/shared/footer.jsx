import React from 'react'

const Footer=()=>{
    return(
        <footer className="footer-area">
        <div className="container">
            <div className="">
                
                <div className="social text-center">
                    <h5 className="text-uppercase">Follow me</h5>
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
                <div className="copyrights text-center">
                    <p className="para">
                        Copyright �2019 All rights reserved | This template is made with by
                        <a href="#"><span>Daily Tuition</span></a>
                        <br/>
                        Copyright �2020 All rights reserved | This website is made by
                        <a href="#"><span>Debdut Saha</span></a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    );
}
export default Footer