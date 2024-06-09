import React,{useContext} from 'react'
import BaseLayout from '../../../component/shared/baseLayout'
import PaymentInfo from '../../../component/admin/payment/paymentInfo'
import { AuthContext } from '../../../context/authContext';
import NotAuthorizeAdmin from '../../../component/admin/shared/notAuthorize';
import BottomNavBar from '../../../component/shared/bottomNavbar';
export default function PaymentDone(){
    const [auth,setAuth]=useContext(AuthContext)
    if(!auth.isAdmin){
        return(
            <NotAuthorizeAdmin/>
        );
    }
    return(
        <React.Fragment>
            <BaseLayout/>
            <br/>
            <PaymentInfo/>
            <BottomNavBar/>
        </React.Fragment>
    );
}