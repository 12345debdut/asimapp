import React,{useContext} from 'react'
import BaseLayout from '../../../../component/shared/baseLayout'
import WbjeeForm from './form'
import { AuthContext } from '../../../../context/authContext';
import NotAuthorizeAdmin from '../../../../component/admin/shared/notAuthorize';
import BottomNavBar from '../../../../component/shared/bottomNavbar';
export default function WbjeeQuestionUpload(){
    const [auth,_]=useContext(AuthContext)
    if(auth.isAdmin){
        return(
            <div>
                <BaseLayout/>
                <div>
                    <WbjeeForm/>
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