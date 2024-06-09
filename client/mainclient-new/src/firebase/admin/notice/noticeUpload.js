import { firebaseapp } from "../../init";

export const NoticeUploadFirebase=async(noticeText,noticeDocs,grant)=>{
    if(grant==="11hs")
    {
        const res=await HsUpload11(noticeText,noticeDocs)
        return res
    }else if(grant==="12hs")
    {
        const res1=await HsUpload12(noticeText,noticeDocs)
        return res1
    }else if(grant==="11joint")
    {
        const res2=await Joint11(noticeText,noticeDocs)
        return res2
    }else{
        const res3=await Joint12(noticeText,noticeDocs)
        return res3
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
const HsUpload11=async(noticeText,noticeDocs)=>{
    let response={
        status:200
    }
    if(noticeDocs!=="")
    response=await fileUpload(noticeDocs,'hsnotice11')
    if(response.status==200)
    {
        let notice=await firebaseapp.firestore().collection('HsNotice11').add({
            noticeText,
            noticeDocs:response.url?response.url:"",
            urlpath:response.urlpath?response.urlpath:"",
            timestamp:Date.now(),
            noticeEnable:1
        }).then(res=>{
            return {
                status:200,
                message:"Successfully uploaded notice"
            }
        }).catch(err=>{
            return {
                status:400,
                message:err.message
            }
        })
        return notice
    }else{
        return response
    }
}
const HsUpload12=async(noticeText,noticeDocs)=>{
    let response={
        status:200
    }
    if(noticeDocs!=="")
    response=await fileUpload(noticeDocs,'hsnotice12')
    if(response.status==200)
    {
        let notice=await firebaseapp.firestore().collection('HsNotice12').add({
            noticeText,
            noticeDocs:response.url?response.url:"",
            urlpath:response.urlpath?response.urlpath:"",
            timestamp:Date.now(),
            noticeEnable:1
        }).then(res=>{
            return {
                status:200,
                message:"Successfully uploaded notice"
            }
        }).catch(err=>{
            return {
                status:400,
                message:err.message
            }
        })
        return notice
    }else{
        return response
    }

}
const Joint11=async(noticeText,noticeDocs)=>{
    let response={
        status:200
    }
    if(noticeDocs!=="")
    response=await fileUpload(noticeDocs,'jointnotice11')
    if(response.status==200)
    {
        let notice=await firebaseapp.firestore().collection('JointNotice11').add({
            noticeText,
            noticeDocs:response.url?response.url:"",
            urlpath:response.urlpath?response.urlpath:"",
            timestamp:Date.now(),
            noticeEnable:1
        }).then(res=>{
            return {
                status:200,
                message:"Successfully uploaded notice"
            }
        }).catch(err=>{
            return {
                status:400,
                message:err.message
            }
        })
        return notice
    }else{
        return response
    }

}
const Joint12=async(noticeText,noticeDocs)=>{
    let response={
        status:200
    }
    if(noticeDocs!=="")
    response=await fileUpload(noticeDocs,'jointnotice12')
    if(response.status==200)
    {
        let notice=await firebaseapp.firestore().collection('JointNotice12').add({
            noticeText,
            noticeDocs:response.url?response.url:"",
            urlpath:response.urlpath?response.urlpath:"",
            timestamp:Date.now(),
            noticeEnable:1
        }).then(res=>{
            return {
                status:200,
                message:"Successfully uploaded notice"
            }
        }).catch(err=>{
            return {
                status:400,
                message:err.message
            }
        })
        return notice
    }else{
        return response
    }

}