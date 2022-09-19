import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';
import recipeImage from '../images/meal_image.png'

export default function Recipes(props) {

    const dispatch = useDispatch();
    const recipeList = useSelector(state => state.recipeList)
    const token = useSelector(state => state.token);

    useEffect(() => {
        switch (props.recipes) {
            case "user":
                return dispatch(actions.fetchUserRecipes(token)); //TODO: remove parameters and use headers to determine user;

            case "meal":
                return dispatch(actions.fetchMealRecipes(props.mealId));

            default:
                return null;
        }

    }, [])

    const recipeDisplay = recipeList.length ? (
        recipeList.map(recipe => (
            <div key={recipe.id} className='list-item'>

                <Link
                    to={`/recipe/${recipe.id}`}
                    className='button muted-button recipe-button'
                >
                    <img src={recipeImage} alt="Recipe image" />
                    <div>
                        <h3 className='meal-recipe-li-title'>{recipe.title}</h3>
                        <p>{recipe.dishType}</p>
                    </div>
                </Link>
                {console.log(recipe.id)}

            </div>

        ))) : (
        <p>No recipes yet</p>

    )

    return (
        <div className="list-card-container">
            {recipeDisplay}
        </div>
    );

}