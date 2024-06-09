import {firebaseapp} from '../../init'
import {toast} from 'react-toastify'
export const createHsQuestion=async(text,image,examcatagory,answer)=>{
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
            let val=await firebaseapp.storage().ref("hsquestions/"+image.name).put(image)
            let name=image.name
            image=await val.ref.getDownloadURL()
            imagepath="hsquestions/"+name
        }
       
        let obj={
            text,
            image,
            examcatagory,
            answer:[answer],
            imagepath
        }
        await firebaseapp.firestore().collection("hsquestions").add(obj)
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

export const fetchHsQuestion=(examcatagory,setData)=>{
    firebaseapp.firestore().collection("hsquestions")
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

export const deleteQuestionHs=async(id)=>{
    try{
        await firebaseapp.firestore().collection("hsquestions").doc(id).delete()
    }catch(Err){
        toast.error(Err.message)
    }
}