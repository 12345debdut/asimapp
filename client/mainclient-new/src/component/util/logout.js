import jscookie from 'js-cookie'
import {firebaseapp} from '../../firebase/init'
export const logout=async(setAuth)=>{
    let uid=jscookie.get('uid')
    jscookie.remove('admin')
    jscookie.remove('email')
    jscookie.remove('uid')
    jscookie.remove('userjwt')
    const authTemp={
        isAdmin:false,
        isLoggedIn:false
    }
    try{
      await firebaseapp.firestore().collection('users').doc(uid).update({
        isLoggedIn:false
      })
    }catch(Err){
  
    }
    setAuth(authTemp)
}