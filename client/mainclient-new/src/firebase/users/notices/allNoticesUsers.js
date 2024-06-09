import { firebaseapp } from "../../init";
import jscookie from 'js-cookie'

export const fetchAllNoticesUser=async()=>{
    const uid=jscookie.get('uid')
    const resp=await firebaseapp.firestore().collection('users').doc(uid).get()
    .then(doc=>{
        return{
            status:200,
            data:doc.data()
        }
    }).catch(err=>{
        return {
            status:400,
            message:err.message
        }
    })
    if(resp.status==200)
    {
        const grant=resp.data.grantStatus
        if(grant==="11hs")
        {
            const resp1=await fetchNoticeByGrant('HsNotice11')
            return resp1
        }else if(grant==="12hs")
        {
            const resp2=await fetchNoticeByGrant('HsNotice12')
            return resp2
        }else if(grant==="11joint")
        {
            const resp3=await fetchNoticeByGrant('JointNotice11')
            return resp3
        }else if(grant==="12joint")
        {
            const resp4=await fetchNoticeByGrant('JointNotice12')
            return resp4
        }else{
            const resp5=await fetchNoticeByGrant('JointNotice11')
            const resp6=await fetchNoticeByGrant('JointNotice12')
            if(resp5.status==200 && resp6.status==200)
            {
                return {
                    status:200,
                    data:[...resp5.data,...resp6.data]
                }
            }else{
                return {
                    status:400,
                    message:resp5.message
                }
            } 
        }
    }else{
        return resp
    }
}


const fetchNoticeByGrant=async(str)=>{
    const resp=await firebaseapp.firestore().collection(str)
    .get().then(docs=>{
        if(!docs.empty)
        {
            let temp1=[]
            for(let i=0;i<docs.docs.length;i++)
            {
                temp1.push({
                    id:docs.docs[i].id,
                    data:docs.docs[i].data()
                })
            }
            return {
                status:200,
                data:temp1
            }
        }else{
            return{
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
    return resp
}
