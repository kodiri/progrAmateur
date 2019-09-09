import React from "react";

export default function Online(props) {
    props.data.map(m => <li id={m[0]}>{m[1]}</li>);
}