import { firebaseapp } from "../../init";

export const fetchAllNoticesGroup=async(grant)=>{
    if(grant==="11hs")
    {
        const resp1=await fetchNoticeHelper('HsNotice11')
        return resp1
    }else if(grant==="12hs")
    {
        const resp2=await fetchNoticeHelper('HsNotice12')
        return resp2
    }else if(grant==="11joint")
    {
        const resp3=await fetchNoticeHelper('JointNotice11')
        return resp3
    }else
    {
        const resp4=await fetchNoticeHelper('JointNotice12')
        return resp4
    }
}
export const noticeDecodeHelper=(grant)=>{
    if(grant==="11hs")
    {
        return 'HsNotice11'
    }else if(grant==="12hs")
    {
        return 'HsNotice12'
    }else if(grant==="11joint")
    {
        return 'JointNotice11'
    }else
    {
        return 'JointNotice12'
    }
}
const fetchNoticeHelper=async(str)=>{
    let resp1=firebaseapp.firestore().collection(str).get().then(res=>{
        if(!res.empty)
        {
            let temp1=[]
            for(let i=0;i<res.docs.length;i++)
            {
                temp1.push({
                    id:res.docs[i].id,
                    data:res.docs[i].data()
                })
            }
            return{
                status:200,
                data:temp1
            }
        }else{
            return {
                status:400,
                message:"No data found"
            }
        }
    }).catch(err=>{
        return {
            status:400,
            message:err.message
        }
    })
    return resp1
}

export const DeleteNoticeSingle=async(id,grant,imageurl="")=>{
    if(imageurl!=="")
    {
        let res=await firebaseapp.storage().ref(imageurl).delete().then(()=>{
            return{
                status:200,
                message:"Successfully deleted"
            }
        }).catch(err=>{
            if(err.message.split(" ").join("").includes("doesnotexist"))
            {
                return {
                    status:200,
                    message:"Successfully deleted"
                }
            }
            return {
                status:400,
                message:err.message
            }
        })
        if(res.status==400)
        {
            return res
        }
    }
    if(grant==="11hs")
    {
        const resp1=await DeleteNoticeByGrant(id,'HsNotice11')
        return resp1
    }else if(grant==="12hs")
    {
        const resp2=await DeleteNoticeByGrant(id,'HsNotice12')
        return resp2
    }else if(grant==="11joint")
    {
        const resp3=await DeleteNoticeByGrant(id,'JointNotice11')
        return resp3
    }else
    {
        const resp4=await DeleteNoticeByGrant(id,'JointNotice12')
        return resp4
    }
}
const DeleteNoticeByGrant=async(id,str)=>{
    let response=await firebaseapp.firestore().collection(str).doc(id)
    .delete().then(res=>{
        return {
            status:200,
            message:"Successfully deleted"
        }
    }).catch(err=>{
        return{
            status:400,
            message:err.message
        }
    })
    return response
}

export const updateNoticeEnable=async(id,grant,noticeEnable)=>{
    if(grant==="11hs")
    {
        const resp1=await UpdateNoticeByGrant(id,'HsNotice11',noticeEnable)
        return resp1
    }else if(grant==="12hs")
    {
        const resp2=await UpdateNoticeByGrant(id,'HsNotice12',noticeEnable)
        return resp2
    }else if(grant==="11joint")
    {
        const resp3=await UpdateNoticeByGrant(id,'JointNotice11',noticeEnable)
        return resp3
    }else
    {
        const resp4=await UpdateNoticeByGrant(id,'JointNotice12',noticeEnable)
        return resp4
    }
}

const UpdateNoticeByGrant=async(id,str,noticeEnable)=>{
    const res=await firebaseapp.firestore().collection(str).doc(id).update({
        noticeEnable:noticeEnable==0?1:0
    }).then(_=>{
        return {
            status:200
        }
    }).catch(err=>{
        return {status:400,message:err.message}
    })
    return res
}
