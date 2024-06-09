import React,{useEffect,useState,useContext,Suspense,lazy} from 'react'
import BaseLayout from '../../../component/shared/baseLayout'
import Footer from '../../../component/shared/footer'
import { fetchAllNoticesUser } from '../../../firebase/users/notices/allNoticesUsers'
import {AuthContext} from '../../../context/authContext'
import LazyLoaded from '../../../component/util/lazyloaded'
import BottomNavBar from '../../../component/shared/bottomNavbar'
const SingleNotice=lazy(()=>
    import('../../../component/users/notices/singleNotice')
)
const NotAuthorizedUser=lazy(()=>
    import('../../../component/users/shared/notAuthorize')
)
const Loading=lazy(()=>
    import('../../../component/shared/Loading')
)
const AllNoticesUsers=()=>{
    const [notices,setNotices]=useState([])
    const [loading,setLoading]=useState(false)
    const [auth,setAuth]=useContext(AuthContext)
    useEffect(()=>{
        fetchNotices()
    },[])
    const fetchNotices=async()=>{
        setLoading(true)
        const resp=await fetchAllNoticesUser()
        setNotices(resp.data)
        console.log(resp.data)
        setLoading(false)
    }
    if(loading)
    {
        return(
            <div>
                <BaseLayout/>
            <Suspense fallback={<LazyLoaded/>}>
                <Loading/>
            </Suspense>
                <Footer/>
            </div>
        )
    }
    if(!auth.isLoggedIn){
        return(
          <NotAuthorizedUser/>
        )
      }
    return(
        <div>
            <BaseLayout/>
                <br/>
                <div className="row">
                {notices?.length>0?notices?.map((item,index)=>{
                        if(item.data.noticeEnable==1)
                        {
                            return(
                            <Suspense fallback={<LazyLoaded/>}>
                            <SingleNotice
                                key={index}
                                id={item.id} 
                                text={item.data.noticeText} 
                                docs={item.data.noticeDocs} 
                                time={item.data.timestamp}
                                urlpath={item.data.urlpath}
                            />
                            </Suspense>
                        );
                        } 
                    })
                :<p style={{marginLeft:20}}>No data found</p>}
                </div>
            <BottomNavBar/>
        </div>
    );
}
export default AllNoticesUsers