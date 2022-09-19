import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';
import Recipes from './Recipes';

export default function UserRecipes(props) {

    return(
        <div className='list-card-container' id='user-recipes-container'>
            <h1 className='page-title'>My Recipes</h1>
            <Recipes
                recipes={"user"}
            />
        </div>
    );
}