import { firebaseapp } from "../../init"

export const SubmitReview=async(name,passoutyear,image,phonenumber,proffession,comments)=>{
    try{
    if(name&&passoutyear&&image&&phonenumber&&proffession&&comments){
        if(image){
            let val=await firebaseapp.storage().ref("reviews/"+image.name).put(image)
            let url=await val.ref.getDownloadURL()
            await firebaseapp.firestore().collection('reviews').add({
                name,
                proffession,
                imageurl:url,
                phonenumber,
                passoutyear,
                comments,
                flag:false,
                imagepath:`reviews/${image.name}`
            })
            return{
                status:200,
                message:"Uploaded successfully"
            }
        }else{
            return{
                status:400,
                message:"Image feild is required"
            }
        }
    }else{
        return{
            status:400,
            message:"All feilds are required"
        }
    }
}catch(err){
    return{
        status:400,
        message:err.message
    }
}
}

export const fetchReviews=async(setData)=>{
    try{
        let val=await firebaseapp.firestore().collection("reviews").get()
        if(!val.empty){
            let temp=[]
            for(let i=0;i<val.docs.length;i++){
                if(val.docs[i].data().flag){
                    temp.push(val.docs[i].data())
                }
            }
            shuffleArray(temp)
            if(temp.length>3){
              temp=temp.slice(0,3)   
            }
            setData(temp)
        }else{
            setData([])
        }
    }catch(err){
        setData([])
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}