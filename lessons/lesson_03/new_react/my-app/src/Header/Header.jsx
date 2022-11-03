import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <div className="title">Luca Ziegler</div>
            <div className="actions-container">
                <CustomButton name="About Me" />
                <CustomButton name="Portfolio" />
                <CustomButton />
            </div>
        </header>
    )
}
