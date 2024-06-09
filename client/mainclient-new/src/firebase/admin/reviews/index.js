import { firebaseapp } from "../../init"
import { toast } from "react-toastify"

export const fetchReviews=async(setReviews)=>{
    try{
        firebaseapp.firestore().collection("reviews").onSnapshot((snap)=>{
            if(!snap.empty){
                let valarr=snap.docs
                let info=[]
                for(let i=0;i<valarr.length;i++){
                    info.push({
                        id:valarr[i].id,
                        ...valarr[i].data()
                    })
                }
                setReviews(info)
            }else{
                setReviews([])
            }
        },(err)=>{
            toast.error(err.message)
        })
    }catch(err){
        return{
            status:400,
            message:err.message
        }
    }
}

export const UpdateFlag=async(id,flagt)=>{
    try{
        await firebaseapp.firestore().collection("reviews").doc(id).update({
            flag:!flagt
        })
        return{
            status:200
        }
    }catch(err){
        return{
            status:400,
            message:err.message
        }
    }
}

export const DeleteDoc=async(id)=>{
    try{
        await firebaseapp.firestore().collection("reviews").doc(id).delete()
        return{
            status:200,
            message:"successfully deleted"
        }
    }catch(err){
        return{
            status:400,
            message:err.message
        }
    }
}