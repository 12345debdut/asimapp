import React from 'react'
import './404page.css'
import BaseLayout from './baseLayout';
export default function NotFound404(){
    return(
        <div>
        <BaseLayout/>
        <div id="notfound404">
		<div class="notfound404">
			<div class="notfound-404-2">
				<div></div>
				<h1>404</h1>
			</div>
			<h2>Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
		</div>
	</div>
    </div>
    );
}