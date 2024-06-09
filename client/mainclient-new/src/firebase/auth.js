import { firebaseapp } from "./init"
import jscookie from 'js-cookie'
import Axios from "axios"
import { url } from "../url"
// const admin="asim123abc@gmail.com"
export const login=async(emailtemp,password)=>{
    try{
        let email=emailtemp.toLowerCase()
        let res=await firebaseapp.firestore().collection("users").where("email","==",email).get()
        if(!res.empty){
            if(res.docs[0].data().isLoggedIn){
                return{
                    status:400,
                    message:"User already logged in"
                }
            }else{
                let resp=await firebaseapp.auth().signInWithEmailAndPassword(email,password)
                if(resp.user.uid){
                    let jwt=await resp.user.getIdToken()
                    await firebaseapp.firestore().collection("users").doc(resp.user.uid).update({
                        isLoggedIn:true
                    })
                    let auth={
                        isAdmin:false,
                        isLoggedIn:true
                    }
                    jscookie.set("uid",resp.user.uid)
                    jscookie.set("email",email)
                    jscookie.set("userjwt",jwt)
                    return{
                        status:200,
                        auth
                    }
                }else{
                    return{
                        status:400,
                        message:"Something went wrong"
                    }
                }
            }
        }else{
            let resp=await firebaseapp.auth().signInWithEmailAndPassword(email,password)
            let jwt=await resp.user.getIdToken()
            if(resp.user.uid){
                let res=await Axios.get(url+"/auth/checkJWT/"+jwt)
                if(res.status===200){
                    let auth={
                        isAdmin:res.data.admin,
                        isLoggedIn:true
                    }
                    jscookie.set("uid",resp.user.uid)
                    jscookie.set("email",resp.user.email)
                    jscookie.set("userjwt",jwt)
                    return{
                        status:200,
                        auth
                    }
                }else{
                    return{
                        status:400,
                        message:"Something went wrong"
                    }
                }
            }else{
                return{
                    status:400,
                    message:"Something went wrong"
                }
            }
        }
    }catch(err){
        return{
            status:400,
            message:err.message
        }
    }
}