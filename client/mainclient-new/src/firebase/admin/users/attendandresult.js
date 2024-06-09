import { firebaseapp } from "../../init"

export const attendenceUpdate=async(id,date,filter,email)=>{
    try{    
    await firebaseapp.firestore().collection('attendence').add({
        id,
        date,
        filter,
        email
    })
    return {
        status:200,
        message:"Data successfully inserted"
    }
    }catch(err){
        return {
            status:400,
            message:"Error occured: "+err.message 
        }
    }
}
export const resultUpdate=async(id,date,filter,marks,outof,email)=>{
    try{
        await firebaseapp.firestore().collection('results').add({
            id,
            date,
            marks,
            outof,
            filter,
            email
        })
        return{
            status:200,
            message:"Successfully inserted"
        }
    }catch(Err){
        return{
            status:400,
            message:"Error occured: "+Err.message
        }
    }   
}

export const faircopyUpdate=async(id,email,chapters,date,filter)=>{
    try{
    for(let i=0;i<chapters.length;i++){
        await firebaseapp.firestore().collection('faircopy').add({
            id,
            email,
            chapter:chapters[i].toLowerCase().trim(),
            date,
            filter
        })
        
    }
    return{
        status:200,
        message:"successfully inserted all "+chapters.length+" chapters"
    }
}catch(err){
    return{
        status:400,
        message:err.message
    }
}
}