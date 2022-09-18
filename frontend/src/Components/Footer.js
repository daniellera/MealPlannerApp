import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import backArrow from '../images/back_arrow.png'
import logoutButton from '../images/logout_button.png'

export default function Footer(props) {
    return(
        <footer>
            {props.login !== undefined &&
                <div>
                    <Link to='/home'><img src={backArrow} alt="Back to home" className="back-arrow"/></Link>
                    <Link to='/login' onClick={props.handleClick}><img src={logoutButton} alt="Back to home" className="logout-button"/></Link>
                </div>
            }
        </footer>
    );
}