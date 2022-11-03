import React from 'react';
import "./CustomButton.css";

export default function CustomButton(props) {
    console.log(props);
    return (
        <button>{props.name ?? "default"}</button>
    )
}
