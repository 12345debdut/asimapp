import { firebaseapp } from "../../init"

export const PaymentInfoData=async(setTempInfo,setInfo,setError,batchno,globalBatch)=>{
    try{
        firebaseapp.firestore().collection('payments')
        .where("batchno","==",`${batchno}`)
        .orderBy("email").onSnapshot(async(res)=>{
            if(!res.empty){
                console.log("Global Batch: ",globalBatch)
                if(res.docChanges()[0].doc.data().batchno===globalBatch.toString()){
                let val=res.docs
                let info=[]
                for(let i=0;i<val.length;i++){
                    let id=val[i].id
                    let tempval={id:id,...val[i].data()}
                    info.push(tempval)
                }
                setTempInfo(info)
                setInfo(info)
            }
            }else{
                setError("No document found")
            }
        },err=>{
            setError(err.message)
        })
    }catch(err){
        console.error(err)
        setError(err.message)
    }
}

export const UpdatePaymentInfo=async(str,id,isDone,amount)=>{
    try{
        let obj={}
        if(isDone){
            obj[str]={
                amount,
                flag:isDone
            }
        }else{
            obj[str]={
                amount:0,
                flag:isDone
            }
        }
        await firebaseapp.firestore().collection('payments').doc(id).update(obj)
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