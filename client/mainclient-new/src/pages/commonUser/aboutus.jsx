import React from 'react'
import AboutHome from '../../component/home/about'
import BaseLayout from '../../component/shared/baseLayout';
import BottomNavBar from '../../component/shared/bottomNavbar';

const AboutUs=(props)=>{
    return(
        <div>
            <BaseLayout/>
            <main className="site-main">
                <AboutHome/>
            </main>
            <BottomNavBar/>
        </div>
    );
}
export default AboutUs