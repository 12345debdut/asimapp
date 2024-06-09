import React,{useEffect,useState,useContext} from 'react'
import BaseLayout from '../../../component/shared/baseLayout'
import { Col,Row } from 'reactstrap'
import { fetchReviews } from '../../../firebase/admin/reviews'
import ReviewSingle from '../../../component/admin/review/reviewSingle'
import { AuthContext } from '../../../context/authContext'
import NotAuthorizeAdmin from '../../../component/admin/shared/notAuthorize'
import BottomNavBar from '../../../component/shared/bottomNavbar'
export default function AllReviews(){
    const [reviews,setReviews]=useState([])
    const [auth,_]=useContext(AuthContext)
    useEffect(()=>{
        fetch()
    },[])

    const fetch=()=>{
        fetchReviews(setReviews)
    }
    if(auth.isAdmin){
        return(
            <div>
            <BaseLayout/>
            <br/>
            <div>
            <Row>
                {reviews.map((item,index)=>{
                    return(
                        <Col key={index}>
                            <ReviewSingle imageurl={item.imageurl} 
                            name={item.name}
                            phonenumber={item.phonenumber}
                            proffession={item.proffession}
                            passoutyear={item.passoutyear}
                            comments={item.comments}
                            flag={item.flag}
                            id={item.id}
                            />
                        </Col>
                    );
                })}
            </Row>
            </div>
            <BottomNavBar/>
        </div>
        );
    }else{
        return(
            <NotAuthorizeAdmin/>
        );
    }
   
}