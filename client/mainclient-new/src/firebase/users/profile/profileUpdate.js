import { firebaseapp } from "../../init";
import jsCookie from 'js-cookie'
import Axios from "axios";
import { url } from "../../../url";
export const updateProfile=async(profile,isPreffer,grant,fSignature,mSignature,uid)=>{
    let temp={}
    // try{
    //     if(typeof(fSignature)!=="string" && fSignature){
    //         let extension = "jpg"
    //         let res=await firebaseapp.storage().ref(`/signatures/f-${uid}.${extension}`).put(fSignature)
    //         let fres=await res.ref.getDownloadURL()
    //         temp.fSignature=fres
    //         temp.fSignPath=`/signatures/f-${uid}.${extension}`
    //     }
    //     if(typeof(mSignature)!=="string" && mSignature){
    //         let extension = "jpg"
    //         let res=await firebaseapp.storage().ref(`/signatures/m-${uid}.${extension}`).put(mSignature)
    //         let mres=await res.ref.getDownloadURL()
    //         temp.mSignature=mres
    //         temp.mSignPath=`/signatures/m-${uid}.${extension}`
    //     }
    // }catch(err){
    //     return{
    //         status:400,
    //         message:err.message
    //     }
    // }
    let profileTemp;
    if(isPreffer)
    {
        profileTemp={...profile,grantStatus:grant,...temp}
        try{
            await Axios.post("/cloud/prefference",{uid:uid,preff:grant})
        }catch(Err){

        }
    }else{
        profileTemp={...profile,...temp}
    }
    try{
    let res=await Axios.post(url+"/update/user",{uid:uid,profile:profileTemp})
    if(res.status===200){
        return {
            status:200,
            message:"Profile successfully updated!!"
        }
    }else{
        return {
            status:400,
            message:"Something went wrong!!"
        }
    }
    }catch(Err){
        return {
            status:400,
            message:Err.message
        }
    }
}
export const updateProfileImage=async(imagefile,imageurlpath)=>{
    if(imageurlpath)
    {
        await deleteProfileImage(imageurlpath)
    }
    const resp=await fileUpload(imagefile)
    if(resp.status==200)
    {
        const uid=jsCookie.get('uid')
        let res=await firebaseapp.firestore().collection('users').doc(uid)
        .update({
            imageurl:resp.url,
            imageurlpath:resp.urlpath
        }).then(_=>{
            return {
                status:200,
                message:"Successfully uploaded image"
            }
        }).catch(err=>{
            return {
                status:400,
                message:err.message
            }
        })
        return res
    }else{
        return resp
    }
}
const fileUpload=async(imagefile)=>{
    let response=await firebaseapp.storage().ref(`/profileimages/${imagefile.name}`)
    .put(imagefile).then(async res=>{
            let url=await res.ref.getDownloadURL().then(url=>{
            return url
        }).catch(err=>{
            return null
        })
        if(url==null)
        {
            return {
                status:400,
                message:"Something went wrong in uploading the file"
            }
        }else{
            return {
                status:200,
                url:url,
                urlpath:`/profileimages/${imagefile.name}`
            }
        }
    }).catch(err=>{
        return {
            status:400,
            message:err.message
        }
    })
    return response
}

const deleteProfileImage=async(imageurlpath)=>{
    return await firebaseapp.storage().ref(imageurlpath).delete().then(res=>{
        return{
            status:200,
            message:""
        }
    }).catch(err=>{
        if(err.message.split(" ").join("").includes("doesnotexist"))
        {
            return {
                status:200,
                message:"Successfully deleted"
            }
        }
        return{
            status:400,
            message:err.message
        }
    })
}