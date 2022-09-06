import React from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom'

export default function Header(props) {
    return(
        <div>
            {props.login !== undefined ?
                        <div>
                            <Link to='/home'>Home | </Link>
                            <Link to='/login' onClick={props.handleClick}>logout</Link> 
                            <Redirect to='/home'/>
                        </div>  
                    : 
                        <Link to='/login'>Home | </Link>
            }
        </div>
    );
}