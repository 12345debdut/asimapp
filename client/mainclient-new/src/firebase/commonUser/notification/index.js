import { firebaseapp } from "../../init"
import Cookie from 'js-cookie'
export const subscribeNotificationUser=async(push)=>{
    try{
        let id=Cookie.get("uid")
        await firebaseapp.firestore().collection('users').doc(id)
        .update({
            notificationToken:push
        })
        return{
            status:200,
            message:"Success"
        }
    }catch(err){
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    }
}