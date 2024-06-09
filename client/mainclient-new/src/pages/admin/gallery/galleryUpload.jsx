import React,{useContext} from 'react'
import BaseLayout from '../../../component/shared/baseLayout'
import Footer from '../../../component/shared/footer'
import GalleryForm from '../../../component/admin/gallery/galleryForm';
import { AuthContext } from '../../../context/authContext';
import NotAuthorizeAdmin from '../../../component/admin/shared/notAuthorize';
import BottomNavBar from '../../../component/shared/bottomNavbar';
const GalleryUpload=()=>{
    const [auth,_]=useContext(AuthContext)
    if(auth.isAdmin){
        return(
            <div>
                <BaseLayout/>
                    <br/>
                    <br/>
                    <br/>
                    <GalleryForm/>
                <BottomNavBar/>
            </div>
        );
    }else{
        return(
            <NotAuthorizeAdmin/>
        );
    }
    
}
export default GalleryUpload