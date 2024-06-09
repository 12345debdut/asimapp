import { firebaseapp } from "../../init"
import Axios from "axios"

export const fetchUserList=async()=>{
    return await firebaseapp.firestore().collection("users").get()
    .then((res)=>{
        if(res.empty){
            return{
                status:400,
                message:"No user exists"
            }
        }else{
            return{
                status:200,
                message:"Users found",
                data:res.docs
            }
        }
    }).catch(err=>{
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    })
}

export const updateUserFees=async(id,fees)=>{
    return await firebaseapp.firestore().collection('users').doc(id).update({
        fees:fees
    }).then(res=>{
        Axios.post("/cloud/fees/update",{uid:id,fees})
        return {
            status:200,
            message:"Successfully updated"
        }
    }).catch(err=>{
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    })
}