import React, { useState, useContext,useEffect } from 'react'
import BaseLayout from '../../../component/shared/baseLayout'
import UserProfile from '../../../component/users/profile/userProfile';
import {AuthContext} from '../../../context/authContext'
import ProfileUpdate from '../../../component/users/profile/update/updateForm';

import Cookie from 'js-cookie'
import BottomNavBar from '../../../component/shared/bottomNavbar';
const Profile=()=>{
    const [open,setOpen]=useState(false)
    const [auth,setAuth]=useContext(AuthContext)
    // const [uid,setUid]=useState("")

    const handleClose=()=>{
        setOpen(false)
    }
    const handleOpen=()=>{
        setOpen(true)
    }
    if(!auth.isLoggedIn){
        return(
          <div>
            <BaseLayout/>
            <br/>
            <h1>You are not authenticated</h1>
          </div>
        )
      }
    return(
        <React.Fragment>
            <BaseLayout/>
            <br/>
            <br/>
            <ProfileUpdate open={open} handleClose={handleClose} uid={auth.isAdmin?Cookie.get("profileuid"):Cookie.get("uid")} />
            <div style={{marginTop:20}}>
            <UserProfile handleOpen={handleOpen} handleClose={handleClose} open={open} uid={auth.isAdmin?Cookie.get("profileuid"):Cookie.get("uid")}/>
            </div>
            <BottomNavBar/>
        </React.Fragment>
    );

}
export default Profile