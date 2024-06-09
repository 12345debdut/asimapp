import { firebaseapp } from "../../init"
import Axios from 'axios'
import {url} from '../../../url'
import { toast } from "react-toastify"
import jsCookie from 'js-cookie'
export const fetchAllUsers=async()=>{
    try{
        let val=await firebaseapp.firestore().collection('users').get()
        if(!val.empty){
            let vals=val.docs
            let tempinfo=[]
            for(let i=0;i<vals.length;i++){
                tempinfo.push({
                    id:vals[i].id,
                    ...vals[i].data()
                })
            }
            return{
                status:200,
                data:tempinfo
            }
        }else{
            return{
                status:400,
                message:"No user found"
            }
        }
    }catch(err){
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    }
}
export const updateUser=async(id,grant)=>{
    const res= await firebaseapp.firestore().collection('users').doc(id).update({
        grantStatus:grant
    }).then(_=>{
        Axios.post("/cloud/prefference",{uid:id,preff:grant})
        return {
            status:200,
            message:"Successfully updated"
        }
    }).catch(err=>{
        return{
            status:400,
            message:err.message
        }
    })
    return res
}

export const updateBatchNoUser=async(id,batchno)=>{
    try{
        await firebaseapp.firestore().collection("users").doc(id).update({
            batchno
        })
        return {
            status:200,
            message:"Batch No updated successfully"
        }
    }catch(err){
        return {
            status:400,
            message:"Batch no updated failed due to: "+err.message
        }
    }
}

export const deleteUser=async(id)=>{
    let jwt=jsCookie.get('userjwt')
    let response=await Axios.get(url+'/userDelete/'+id+"/"+jwt)
    return{
        status:response.status,
        message:response.data
    }
}

export const UpdateExam=async(id,bool)=>{
    try{
    await firebaseapp.firestore().collection('users').doc(id).update({
        examenable:bool
    })
    return{
        status:200,
        message:"Successfully updated"
    }
}catch(err){
    return{
        status:400,
        message:err.message
    }
}
}

export const updateIsLoggedIn=async(id,bool)=>{
    try{
        await firebaseapp.firestore().collection("users").doc(id).update({isLoggedIn:bool})
    }catch(Err){
        toast.error(Err.message)
    }
}