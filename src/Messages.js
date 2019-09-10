import React from "react";

export default function Messages(props) { 
    return (
        props.data.map(m => m[0] !=="" ?
            (<li><strong>{m[0]}</strong> :
            <div className="innerMsg">{m[1]}</div></li>) :
            (<li className="update">{m[1]}</li>))
    );
}