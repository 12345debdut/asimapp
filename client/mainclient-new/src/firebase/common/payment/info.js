import { firebaseapp } from "../../init"
import Cookies from 'js-cookie'

export const PaymentInfoSingle=async(uid)=>{
    return await firebaseapp.firestore().collection('payments').doc(uid)
    .get().then(response=>{
        if(response.exists){
            return{
                status:200,
                data:response.data()
            }
        }else{
            return{
                status:400,
                message:"No Payment yet"
            }
        }
    }).catch(err=>{
        return{
            status:400,
            message:"Error Occured:"+err.message
        }
    })
}