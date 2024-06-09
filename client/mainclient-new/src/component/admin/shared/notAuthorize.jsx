import React from 'react'
import BaseLayout from '../../shared/baseLayout'
import './style.css'
export default function NotAuthorizeAdmin(){
    return(
        <div>
            <BaseLayout/>
            <div id="notfound">
		<div className="notfound">
			<div>
				<div className="notfound-404">
					<h1>!</h1>
				</div>
				<h2>Error<br/>403</h2>
			</div>
			    <p>Access denied. It is for admin route so do not temper with that. 
                It will cause damage to you. We are monitoring all the activities</p>
		    </div>
	    </div>
        </div>
    );
}