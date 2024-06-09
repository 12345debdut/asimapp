import { firebaseapp } from '../../init'
export const fetchProfile=(uid,setProfile)=>{
    return firebaseapp.firestore().collection('users').doc(uid).onSnapshot((doc)=>{
        if(doc.exists)
        {
            let temp={uid:uid,...doc.data()}
            setProfile(temp)
        }else{
            
        }
    },(err)=>{
        
    })
}

export const fetchUserPrefference=async(grant)=>{
    if(grant==="11hs")
    {
        return await fetch11hs()
    }else if(grant==="12hs")
    {
        return await fetch12hs()
    }else if(grant==="11joint")
    {
        return await fetch11joint()
    }else if(grant==="12joint")
    {
        return await fetch12joint()
    }else{
        return await fetch11and12joint()
    }
}
const fetch11hs=async()=>{
    return await fetchForAll('HS11Prefference')
}
const fetch12hs=async()=>{
    return await fetchForAll('HS12Prefference')
}
const fetch11joint=async()=>{
    return await fetchForAll('JOINT11Prefference')
}
const fetch12joint=async()=>{
    return await fetchForAll('JOINT12Prefference')
}
const fetch11and12joint=async()=>{
    return await fetchForAll('JOINT1112Prefference')
}
const fetchForAll=async(str)=>{
    let resp=await firebaseapp.firestore().collection(str).doc(str+"doc")
    .get().then(res=>{
        if(res.exists)
        {
            return{
                status:200,
                preffer:res.data().isEnabled
            }
        }else{
            return {
                status:400,
                preffer:false
            }
        }
    }).catch(err=>{
        return {
            status:400,
            preffer:false
        }
    })
    return resp
}