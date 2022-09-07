import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'

export default function Header(props) {
    return (
        <div>
            {props.login !== undefined ?
                <div>
                    <Link to='/home'>Home | </Link>
                    <Link to='/login' onClick={props.handleClick}>logout</Link>
                    <Redirect to='/home' />
                </div>
                :
                <Link to='/login'>Home | </Link>
            }
        {/* TODO: Add Nav depending on current page
            <Link to='/mealplans'>My Meal Plans | </Link>
            <Link to='/meals'>My Meals | </Link>
            <Link to='/recipes'>My Recipes</Link> 

            ++Add recipe button on My Recipes page?
            
            */}
        </div>
    );
}