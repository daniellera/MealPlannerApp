import React from 'react';
import { Redirect, Link } from 'react-router-dom'

export default function Footer(props) {
    return(
        <footer>
            {props.login !== undefined &&
                <div>
                    <Link to='/home'>Home</Link>
                    <Link to='/login' onClick={props.handleClick}>logout</Link>
                    <Redirect to='/home' />
                </div>
            }
        </footer>
    );
}