import { firebaseapp } from "../init"
import Axios from "axios"

export const fetchUser=async(id)=>{
    try{
        let res=await firebaseapp.firestore().collection('users').doc(id).get()
        if(res.exists){
            return{
                status:200,
                id:res.id,
                data:res.data()
            }
        }else{
            return{
                status:400,
                message:"Invalid userid"
            }
        }
    }catch(err){
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    }
}
export const UpdateBatchNoFunc=async(uid,batchno)=>{
    try{
        await firebaseapp.firestore().collection('users').doc(uid).update({
            batchno
        })
        await Axios.post("/cloud/payments/uid",{uid,batchno})
        return{
            status:200,
            message:"Successfully updated batch no"
        }
    }catch(err){
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    }
}

export const Attendence=async(uid)=>{
    try{
        let res=await firebaseapp.firestore().collection('attendence').where("id","==",uid).get()
        if(!res.empty){
            let val=res.docs
            let hs=[]
            let joint=[]
            for(let i=0;i<val.length;i++){
                let id=val[i].id
                let temp=val[i].data()
                if(temp.filter==="HS"){
                    hs.push({docid:id,...temp})
                }else{
                    joint.push({docid:id,...temp})
                }
            }
            return{
                status:200,
                hs,
                joint
            }
        }else{
            return{
                status:400,
                message:"No data found"
            }
        }
    }catch(err){
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    }
}

export const ResultFetch=async(uid)=>{
    try{
        let result=await firebaseapp.firestore().collection('results').where("id","==",uid).get()
        if(!result.empty){
            let val=result.docs
            let hs=[]
            let joint=[]    
            for(let i=0;i<val.length;i++){
                let id=val[i].id
                if(val[i].data().filter==="HS"){
                    hs.push({itemid:id,...val[i].data()})
                }else{
                    joint.push({itemid:id,...val[i].data()})
                }
            }
            return{
                status:200,
                hs,
                joint
            }
        }else{
            return{
                status:400,
                message:"No data found"
            }
        }
    }catch(err){
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    }
}

export const updateMarks=async(id,marks)=>{
    try{
        await firebaseapp.firestore().collection('results').doc(id).update({
            marks:marks
        })
        return{
            status:200,
            message:"Successfully updated"
        }
    }catch(err){
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    }
}

export const FairCopyFetch=async(uid)=>{
    try{
        let val=await firebaseapp.firestore().collection('faircopy').where("id","==",uid).get()
        if(!val.empty){
            let docs=val.docs
            let hs=[]
            let joint=[]
            for(let i=0;i<docs.length;i++){
                let temp=docs[i].data()
                let id=docs[i].id
                if(temp.filter==="HS"){
                    hs.push({fairid:id,...temp})
                }else{
                    joint.push({fairid:id,...temp})
                }
            }
            return{
                status:200,
                hs,
                joint
            }
        }else{
            return{
                status:400,
                message:"No data found"
            }
        }
    }catch(err){
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    }
}

export const DeleteFairCopy=async(id)=>{
    try{    
        await firebaseapp.firestore().collection('faircopy').doc(id).delete()
        return{
            status:200,
            message:"Successfully deleted"
        }
    }catch(err){
        return{
            status:400,
            message:"Error occured: "+err.message
        }
    }
}