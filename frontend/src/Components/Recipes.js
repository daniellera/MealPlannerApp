import React from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';

export default function Recipes(props) {

    const dispatch = useDispatch();
    const recipeList = useSelector(state => state.recipeList)

    useEffect(() => {
        switch (props.recipes) {
            case "user":
                return dispatch(actions.fetchUserRecipes(1)); //TODO: remove parameters and use headers to determine user;
            
            case "meal":
                return dispatch(actions.fetchMealRecipes(props.mealId)); 

            default:
                return null;
        }

    }, [])

    const recipeDisplay = recipeList.length ? (
        recipeList.map(recipe => (
        <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.dishType}</p>
            <Link
                to={`/recipe/${recipe.id}`}
                className='button muted-button'
                > View Recipe
            </Link>
            {console.log(recipe.id)}

        </div>
        
    ))) : (
        <p>No recipes yet</p>

    )

    return(
        <div>
            {recipeDisplay}
        </div>
    );

}