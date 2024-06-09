import React,{useEffect,useState,useContext} from 'react'
import BaseLayout from '../../../component/shared/baseLayout'
import {Table} from 'reactstrap'
import { FetchDetails } from '../../../firebase/admin/payment/monthlyDone'
import { AuthContext } from '../../../context/authContext'
import NotAuthorizeAdmin from '../../../component/admin/shared/notAuthorize'
import BottomNavBar from '../../../component/shared/bottomNavbar'
const month=["april","may","jun","july","aug","sept","oct","nov","dec","jan","feb","march"]
export default function MonthLyDone(){
    useEffect(()=>{
        fetch()
    },[])
    const [error,setError]=useState("")
    const [monthSum,setMonthSum]=useState("")
    const [auth,_]=useContext(AuthContext)
    const fetch=async()=>{
        let res=await FetchDetails()
        if(res.status==200){
            setMonthSum(res.data)
        }else{
            setError(res.message)
        }
    }
    if(!auth.isAdmin){
        return(
            <>
            <NotAuthorizeAdmin/>
            </>
        );
    }
    return(
        <div>
            <BaseLayout/>
            <Table striped>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Month</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {monthSum!==""&&month.map((item,index)=>{
                        return <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item}</td>
                        <td>{monthSum[item]}</td>
                        </tr>
                    })}
                </tbody>
                </Table>
                <BottomNavBar/>
        </div>
    );
}