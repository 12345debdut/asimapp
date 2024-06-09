import React,{useContext} from 'react'
import BaseLayout from '../../../component/shared/baseLayout'
import UserListComp from '../../../component/admin/users/userListComp'
import { AuthContext } from '../../../context/authContext';
import NotAuthorizeAdmin from '../../../component/admin/shared/notAuthorize';
import BottomNavBar from '../../../component/shared/bottomNavbar';
export default function UserList(){
    const [auth,_]=useContext(AuthContext)
    if(auth.isAdmin){
        return(
            <div>
                <BaseLayout/>
                <div>
                    <UserListComp/>
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