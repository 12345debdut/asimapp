import { firebaseapp } from "../../init"

export const galleryDelete=async(id,imagepath,catagory)=>{
    try{
        let resdel=await firebaseapp.storage().ref(imagepath).delete()
    }catch(err){
        if(err.message.split(" ").join("").includes("doesnotexist"))
        {
            
        }else{
            return{
                status:400,
                message:err.message
            }
        }
    }
    try{
        let resdeldb=await firebaseapp.firestore().collection(catagory+"Gallery").doc(id).delete()
        return{
            status:200,
            message:"Successfully deleted"
        }
    }catch(err)
    {
        return{
            status:400,
            message:err.message
        }
    }
}
