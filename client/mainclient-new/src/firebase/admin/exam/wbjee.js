import { firebaseapp } from "../../init"
import {toast} from 'react-toastify'
const arr=["a","b","c","d"]
export const createWbQuestion=async(text="",image="",catagory=1,examcatagory,answer="")=>{
    try{
        let imagepath=""
        if(answer===""){
            return{
                status:400,
                message:"Answer feild required"
            }
        }

        let tempanswer=answer.split(',')
        if(catagory!==3&&tempanswer.length>1){
            return{
                status:400,message:"Please folow the answer pattern"
            }
        }
        
        if(tempanswer.length>4){
            return{
                status:400,message:"Please follow the answer format"
            }
        }

        for(let i=0;i<tempanswer.length;i++){
           if(!arr.includes(tempanswer[i])){
                return{
                    status:400,message:"Please follow the answer format"
                }
           }
        }
        if(image){
            let val=await firebaseapp.storage().ref("wbjeequestions/"+image.name).put(image)
            let name=val.name
            image=await val.ref.getDownloadURL()
            imagepath="wbjeequestions/"+name
        }

        let obj={
            text,
            image,
            catagory,
            examcatagory,
            answer:[...tempanswer],
            imagepath
        }
        await firebaseapp.firestore().collection("wbjeequestions").add(obj)
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

export const fetchWbjeeQuestion=(examcatagory,setData)=>{
        firebaseapp.firestore().collection("wbjeequestions")
        .where("examcatagory","==",examcatagory)
        .orderBy('catagory')
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

export const deleteQuestionWb=async(id)=>{
    try{
        await firebaseapp.firestore().collection("wbjeequestions").doc(id).delete()
    }catch(Err){
        toast.error(Err.message)
    }
}