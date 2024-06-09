import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import './introduction.css'
import {AuthContext} from '../../context/authContext'
import {logout} from '../util/logout'
const Introduction=()=>{
    const [auth,setAuth]=useContext(AuthContext)
    
    return(
    <section className="site-banner">
        <div className="intro-container">
            <div className="intro-overlay">
                <p className="intro-text intro-header">Asim Roy Chowdhury</p>
                <p className="intro-text">Mathematics Teacher</p>
                <p className="intro-text">Class 11,12 and JEE</p>
                <div className="site-buttons">
                        <div className="d-flex flex-row flex-wrap" style={{marginTop:20}}>
                            {!auth.isLoggedIn? <Link to="/allgalleries"><button type="button" 
                            className="btn button primary-button mr-4 text-uppercase intro-button">
                            Gallery</button></Link>:!auth.isAdmin &&<Link to="/userprofile"><button type="button" 
                            className="btn button primary-button mr-4 text-uppercase intro-button"
                            >Profile</button></Link>}
                            {auth.isLoggedIn&& !auth.isAdmin && <button type="button" onClick={()=>{
                                logout(setAuth)
                            }}
                            className="btn button primary-button mr-4 text-uppercase intro-button"
                            >Logout</button>}
                            {!auth.isAdmin &&<Link to="/videos"><button type="button" 
                            className="btn button primary-button mr-4 text-uppercase intro-button"
                            >Videos</button></Link>}
                            {!auth.isLoggedIn&& <Link to="/login"><button type="button" 
                            className="btn button primary-button mr-4 text-uppercase intro-button"
                            >Login</button></Link>}

                            {auth.isAdmin &&
                            <Link to="/userList"><button type="button" 
                            className="btn button primary-button mr-4 text-uppercase intro-button"
                            >User List</button></Link>}

                            {auth.isAdmin &&
                            <Link to="/paymentInfo"><button type="button" 
                            className="btn button primary-button mr-4 text-uppercase intro-button"
                            >PaymentInfo</button></Link>}

                            {auth.isAdmin &&
                            <Link to="/wbjeequestionupload"><button type="button" 
                            className="btn button primary-button mr-4 text-uppercase intro-button"
                            >Wbjee upload</button></Link>}

                            {auth.isAdmin &&
                            <Link to="/jeemainquestionupload"><button type="button" 
                            className="btn button primary-button mr-4 text-uppercase intro-button"
                            >Jeemain upload</button></Link>}

                        </div>
                </div>
            </div>
            
        </div>
    </section>
    );
}
export default Introduction;