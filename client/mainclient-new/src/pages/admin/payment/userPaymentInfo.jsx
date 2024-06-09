import React,{useContext} from 'react'
import BaseLayout from '../../../component/shared/baseLayout'
import UserList from '../../../component/admin/payment/userList'
import { AuthContext } from '../../../context/authContext';
import NotAuthorizeAdmin from '../../../component/admin/shared/notAuthorize';
export default function UserPaymentInfo(){
    const [auth,_]=useContext(AuthContext)
    if(auth.isAdmin){
        return(
            <div>
                <BaseLayout/>
                <div>
                    <UserList/>
                </div>
            </div>
        );
    }else{
        return(
            <>
                <NotAuthorizeAdmin/>
            </>
        );
    }
   
}