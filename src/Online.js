import React from "react";

export default function Online(props) {
    return ( 
    props.data.map(m => {
        console.log('m0:', m[0], 'm1:', m[1]);
    return <li className='users' id={m[0]}>{m[1]}</li>
    })
    );
}