import React from 'react'
const recordStyle={color:"rgba(194,21,0,1)"}
export default function ParentDetails(props){
    return(
        <div className="col-md-4">
        <div className="profile-work">
            <p>FATHER DETAILS</p>
            {props.fathername?<a style={recordStyle}>{props.fathername}</a>:<a style={recordStyle}>No record found</a>}
            <br/>
            {props.fatheroccupation?<a style={recordStyle}>{props.fatheroccupation}</a>:
            <a style={recordStyle}>No records found</a>}
            <br/>
            {props.fatherphno?<a style={recordStyle}>{props.fatherphno}</a>:
            <a style={recordStyle}>No records found</a>}
            <p>MOTHER DETAILS</p>
            {props.mothername?<a style={recordStyle}>{props.mothername}</a>:
            <a style={recordStyle}>No records found</a>}
            <br/>
            {props.motheroccupation?<a style={recordStyle}>{props.motheroccupation}</a>:
            <a style={recordStyle}>No records found</a>}
            <br/>
            {props.motherphno?<a style={recordStyle}>{props.motherphno}</a>:
            <a style={recordStyle}>No records found</a>}
            <br/>
        </div>
        </div>
    );
}