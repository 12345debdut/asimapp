import { firebaseapp } from "../../init";
import _ from 'underscore'
export const fetchGalleryByTitle=async(str)=>{
    try{
        const res=await firebaseapp.firestore().collection(str+"Gallery").orderBy('galleryDate',"desc").get()
        if(res.empty)
        {
            return{
                status:400,
                message:"No data found"
            }
        }
        else{
            let res1=[]
            for(let i=0;i<res.docs.length;i++)
            {
                res1.push({
                    id:res.docs[i].id,
                    ...res.docs[i].data()
                })
            }
            let val=_.groupBy(res1,function(val){
                return val.galleryTitle
            })
            return{
                status:200,
                data:val
            }
        }
    }catch(err)
    {
        return{
            status:400,
            message:err.message
        }
    }
}