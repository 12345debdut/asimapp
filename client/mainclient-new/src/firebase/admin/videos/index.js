import { firebaseapp } from "../../init"
import Axios from 'axios'
import { url } from "../../../url"
export const VideoUpload=async(link,title,access)=>{
    try{
        if(link){
         await firebaseapp.firestore().collection("videos").add({
             link:link.trim(),
             title:title.trim(),
             access,
             date:Date.now()
         })
         return{
             status:200,
             message:"Successfully uploaded video"
         }
    }else{
        return{
            status:400,
            message:"All feilds are required"
        }
    }
        
    }catch(err){
        return{
            status:400,
            message:"Error Ocuured: "+err.message
        }
    }
    
}