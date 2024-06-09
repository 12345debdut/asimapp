import { firebaseapp } from "../../init"

export const fetchScoreWbjee=async(wbjeeGrant="11joint")=>{
    try{
        let res1=await firebaseapp.firestore()
        .collection("users")
        .where("grantStatus","==",wbjeeGrant)
        .orderBy("wbjeeper",'desc')
        .get()
        let wbjee=[]
        if(!res1.empty){
            for(let i=0;i<res1.docs.length;i++){
                wbjee.push({...res1.docs[i].data(),position:i+1})
            }
        }
        return{
            status:200,
            wbjee
        }
    }catch(err){
        console.log(`ERROR1: ${err.message}`)
        return{
            status:400,
            message:err.message
        }
    }
}

export const fetchScoreJeemain=async(jeemainGrant)=>{
    try{
        let jeemain=[]
        let res2=await firebaseapp.firestore()
        .collection("users")
        .where("grantStatus","==",jeemainGrant)
        .orderBy("jeeper",'desc')
        .get()
        if(!res2.empty){
            for(let j=0;j<res2.docs.length;j++){
                jeemain.push({...res2.docs[j].data(),position:j+1})
            }
        }
        return{
            status:200,
            jeemain
        }
    }catch(err){
        console.log(`ERROR2: ${err.message}`)
        return{
            status:400,
            message:err.message
        }
    }
}

export const fetchScoreHs=async(hsGrant)=>{
    try{
        let hs=[]
        let res2=await firebaseapp.firestore()
        .collection("users")
        .where("grantStatus","==",hsGrant)
        .orderBy("hsper",'desc')
        .get()
        if(!res2.empty){
            for(let j=0;j<res2.docs.length;j++){
                hs.push({...res2.docs[j].data(),position:j+1})
            }
        }
        return{
            status:200,
            hs
        }
    }catch(err){
        console.log(`ERROR3: ${err.message}`)
        return{
            status:400,
            message:err.message
        }
    }
}