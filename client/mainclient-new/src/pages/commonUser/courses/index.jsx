import React from 'react'
import {Card,CardBody,CardFooter} from 'reactstrap'
import BaseLayout from '../../../component/shared/baseLayout';
import BottomNavBar from '../../../component/shared/bottomNavbar';
const links=[{link:"https://firebasestorage.googleapis.com/v0/b/asimmath.appspot.com/o/courses%2FISC%20Mathematics%20Syllabus.pdf?alt=media&token=a19b69aa-5f4b-4f53-949d-3a64e1a6881e",text:"ISC Mathematics syllabus"}
    ,{link:"https://firebasestorage.googleapis.com/v0/b/asimmath.appspot.com/o/courses%2Fcbse%20maths.pdf?alt=media&token=392cbfa6-3c5e-4213-8f83-619dfd75fa6d",text:"CBSE Mathematics syllabus"},
    {link:"https://firebasestorage.googleapis.com/v0/b/asimmath.appspot.com/o/courses%2Fjee%20mains.pdf?alt=media&token=7dadbd03-f86f-42c7-b11a-52b893b138a7",text:"JEE Mains syllabus"},
    {link:"https://firebasestorage.googleapis.com/v0/b/asimmath.appspot.com/o/courses%2Fwb%2011.pdf?alt=media&token=832aef99-e1b8-4679-a7bb-c957e01b20cd",text:"West bengal board 11 syllabus"},
    {link:"https://firebasestorage.googleapis.com/v0/b/asimmath.appspot.com/o/courses%2Fwb%2012.pdf?alt=media&token=d2bfb748-8d33-4a15-99bf-ec31ee53d275",text:"West bengal board 12 syllabus"},
    {link:"https://firebasestorage.googleapis.com/v0/b/asimmath.appspot.com/o/courses%2Fwb%20jee.pdf?alt=media&token=cd58b76e-aaa0-4969-b989-e47f7d8c6687",text:"WBJEE syllabus"}
]
export default function Courses(){
    return(
        <div>
            <BaseLayout/>
            <div className="row">
                {links.map((item,index)=>{
                    return(
                    <div className="col-lg-6 col-md-12 col-sm-12" key={index}>
                    <Card>
                        <CardBody>
                            <iframe src={item.link} width="100%" height={450}/>
                        </CardBody>
                        <CardFooter>
                            <p style={{fontSize:20,color:"gray"}}>{item.text}</p>
                        </CardFooter>
                    </Card>
                    </div>
                    );
                })}
            </div>
            <BottomNavBar/>
        </div>
    );
}