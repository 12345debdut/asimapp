import { firebaseapp } from "../../init";
import Axios from "axios";
import {url} from '../../../url'

export const CreateUser=async(email,password,grant,batchno,fees)=>{
    const response=await firebaseapp.auth().createUserWithEmailAndPassword(email,password)
    .then(async(res)=>{
       let uid=res.user.uid
       let email=res.user.email
       await Axios.post(url+"/cloud/create/user",{uid,preff:grant,email,batchno,fees})
       return {
           status:200,
           uid,
           email
       }
    }).catch(err=>{
        return {
            status:500,
            message:err.message
        }
    })
    if(response.status==200)
    {

        let addData=await firebaseapp.firestore().collection('users').doc(response.uid).set({
            name:"",
            email:response.email,
            class:"",
            oldschool:"",
            newschool:"",
            total10:"",
            total12:"",
            subjectcombination:"",
            address:"",
            fathername:"",
            mothername:"",
            fatherphno:"",
            motherphno:"",
            fatheroccupation:"",
            motheroccupation:"",
            batchtime:"",
            phonenumber:0,
            grantStatus:grant,
            wbjeeoutof:0,
            wbjeescore:0,
            jeeoutof:0,
            jeescore:0,
            imageurl:"",
            imageurlpath:"",
            password:password,
            batchno:batchno,
            examenable:false,
            wpnumber:"",
            useremail:"",
            fees:fees,
            isLoggedIn:false
        }).then(()=>{
            return {
                status:200,
                message:"Successfully created user"
            }
        }).catch(err=>{
            return {
                status:500,
                message:err.message
            }
        })
        return addData
    }else{
        return response
    }
}