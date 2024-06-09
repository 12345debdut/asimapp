import React, { useContext } from 'react'
import BaseLayout from '../../../../component/shared/baseLayout'
import { AuthContext } from '../../../../context/authContext';
import NotAuthorizeAdmin from '../../../../component/admin/shared/notAuthorize';
import HsForm from './HsForm';
import BottomNavBar from '../../../../component/shared/bottomNavbar';
export default function HsQuestionUpload(){
    const [auth,_]=useContext(AuthContext)
    if(auth.isAdmin){
        return(
            <div>
                <BaseLayout/>
                <div>
                    <HsForm/>
                </div>
                <BottomNavBar/>
            </div>
        );
    }
    else{
        return(
            <NotAuthorizeAdmin/>
        )
    }
    }
    