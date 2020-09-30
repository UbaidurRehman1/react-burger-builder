import React from "react";
import burgerLogo from '../../assests/images/logo.png';
import classes from './Logo.module.css'

const Logo = props => {
    return (
        <div className={classes.Logo} style={{
            height: props.height
        }}>
            <img src={burgerLogo} alt="My Burger"/>
        </div>
    );
}

export default Logo;
