import { firebaseapp } from "../../init"

export const FetchDetails=async()=>{
    try{
        let val=await firebaseapp.firestore().collection('payments').get()
        if(val.empty){
            return{
                status:400,
                message:"No data found"
            }
        }else{
            let valarr=val.docs
            let tempval=[]
            let i=0
            let monthsum={
                april:0,
                may:0,
                jun:0,
                july:0,
                aug:0,
                sept:0,
                oct:0,
                nov:0,
                dec:0,
                jan:0,
                feb:0,
                march:0
            }
            for(i=0;i<valarr.length;i++){
                tempval.push(valarr[i].data())
            }
            for(i=0;i<tempval.length;i++){
                monthsum.april+=parseInt(tempval[i].april.amount)
                monthsum.may+=parseInt(tempval[i].may.amount)
                monthsum.jun+=parseInt(tempval[i].jun.amount)
                monthsum.july+=parseInt(tempval[i].july.amount)
                monthsum.aug+=parseInt(tempval[i].aug.amount)
                monthsum.sept+=parseInt(tempval[i].sept.amount)
                monthsum.oct+=parseInt(tempval[i].oct.amount)
                monthsum.nov+=parseInt(tempval[i].nov.amount)
                monthsum.dec+=parseInt(tempval[i].dec.amount)
                monthsum.jan+=parseInt(tempval[i].jan.amount)
                monthsum.feb+=parseInt(tempval[i].feb.amount)
                monthsum.march+=parseInt(tempval[i].march.amount)
            }
            return{
                status:200,
                data:monthsum
            }
        }
    }catch(err){
        return {
            status:400,
            message:"Error occured: "+err.message
        }
    }
} 