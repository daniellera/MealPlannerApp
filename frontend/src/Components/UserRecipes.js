import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';
import Recipes from './Recipes';

export default function UserRecipes(props) {

    return(
        <div>
            <h1>My Recipes</h1>
            <Recipes
                recipes={"user"}
            />
        </div>
    );
}