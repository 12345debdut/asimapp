import { firebaseapp } from "../../init"
import Axios from "axios"
import jsCookie from 'js-cookie'
import { toast } from "react-toastify"
import { url } from "../../../url"
export const fetchVideos=async(setData)=>{
    try{
        firebaseapp.firestore().collection('videos').onSnapshot(res=>{
            if(!res.empty){
                let val=res.docs
                let info=[]
                for(let i=0;i<val.length;i++){
                    info.push({
                        id:val[i].id,
                        ...val[i].data()
                    })
                }
                setData(info)
            }else{
                setData([])
            }
        },err=>{
            toast.error(err.message)
        })
    }catch(err){
        toast.error(err.message)
    }
}
export const deleteVideoSingle=async(id,link)=>{
    try{
        await firebaseapp.firestore().collection('videos').doc(id).delete()
        return{
            status:200,
            message:"Successfully deleted"
        }
    }catch(Err){
        return{
            status:400,
            message:"Error occured: "+Err.message
        }
    }
}