import { firebaseapp } from "../../init";

export const galleryUploadSingle=async(gtitle,gdesc,gimage,gpurpose,gdate)=>{
    if(gimage.name)
    {
        const res=await fileUpload(gimage,`${gpurpose}Gallery/${gtitle}`)
        if(res.status==200)
        {
            try{
            await firebaseapp.firestore().collection(gpurpose+"Gallery").add({
                galleryTitle:gtitle,
                galleryImageUrl:res.url,
                galleryImagePath:res.urlpath,
                galleryDescription:gdesc,
                galleryDate:gdate,
                uploadDate:Date.now()
            })
            return{
                status:200,
                message:"Successfully added to database"
            }
        }catch(err)
        {
            return{
                status:400,
                message:err.message
            }
        }
        }else{
            return{
                status:400,
                message:res.message
            }
        }
    }else{
        return{
            status:400,
            message:"Image feild is required"
        }
    }
}
const fileUpload=async(noticeDocs,str)=>{
    let response=await firebaseapp.storage().ref(`/${str}/${noticeDocs.name}`)
    .put(noticeDocs).then(async res=>{
            let url=await res.ref.getDownloadURL().then(url=>{
            return url
        }).catch(err=>{
            return null
        })
        if(url==null)
        {
            return {
                status:400,
                message:"Something went wrong in uploading the file"
            }
        }else{
            return {
                status:200,
                url:url,
                urlpath:`/${str}/${noticeDocs.name}`
            }
        }
    }).catch(err=>{
        return {
            status:400,
            message:err.message
        }
    })
    return response
}