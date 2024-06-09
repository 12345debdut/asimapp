import {firebaseapp} from '../../init'
import {toast} from 'react-toastify'
export const createJeeMainQuestion=async(text,image,examcatagory,answer)=>{
    try{
        let imagepath=[]
        if(answer.length>1){
            return{
                status:400,
                message:"Please follow the answer"
            }
        }
        if(!answer){
            return{
                status:400,
                message:"Answer feild required"
            }
        }
        if(image){
            let val=await firebaseapp.storage().ref("jeemainquestions/"+image.name).put(image)
            let name=image.name
            image=await val.ref.getDownloadURL()
            imagepath="jeemainquestions/"+name
        }
       
        let obj={
            text,
            image,
            examcatagory,
            answer:[answer],
            imagepath
        }
        await firebaseapp.firestore().collection("jeemainquestions").add(obj)
        return{
            status:200,
            message:"Successfully uploaded"
        }
    }catch(err){
        return{
            status:400,
            message:err.message
        }
    }
}

export const fetchJeemainQuestion=(examcatagory,setData)=>{
    firebaseapp.firestore().collection("jeemainquestions")
    .where("examcatagory","==",examcatagory)
    .onSnapshot((snapshot)=>{
        if(!snapshot.empty){
            let docs=snapshot.docs
            let temp=[]
            for(let i=0;i<docs.length;i++){
                temp.push({id:docs[i].id,...docs[i].data()})
            }
            setData(temp)
        }else{
            setData([])
        }
    },(err)=>{
        console.log(err)
        toast.error(err.message)
    })
}

export const deleteQuestionJee=async(id)=>{
    try{
        await firebaseapp.firestore().collection("jeemainquestions").doc(id).delete()
    }catch(Err){
        toast.error(Err.message)
    }
}