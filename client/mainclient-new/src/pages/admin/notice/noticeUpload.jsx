import React,{useContext} from 'react'
import Header from '../../../component/shared/header'
import { AuthContext } from '../../../context/authContext';
import NoticeUploadComponent from '../../../component/admin/notice/noticeUpload';
import BaseLayout from '../../../component/shared/baseLayout';
import NotAuthorizeAdmin from '../../../component/admin/shared/notAuthorize';
import BottomNavBar from '../../../component/shared/bottomNavbar';
const NoticeUpload=(props)=>{
    const [auth]=useContext(AuthContext)
    if(!auth.isAdmin)
    {
        return(
            <NotAuthorizeAdmin/>
        );
    }
    return (
        <div>
            <BaseLayout/>
            <br/>
            <br/>
            <main className="site-main">
                <NoticeUploadComponent/>
            </main>
            <BottomNavBar/>
        </div>
    );
}
export default NoticeUpload