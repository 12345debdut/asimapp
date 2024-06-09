import React from 'react'
import './lazyloaded.css'
export default function LazyLoaded(){
    return(
        <div style={{display:"flex",justifyContent:"center",height:300}}>
            <div className="loader"></div>
        </div>
    );
}