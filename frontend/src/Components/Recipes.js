import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';

export default function Recipes(props) {
    // const recipes = [
    //     {
    //         id: 1,
    //         title: "recipe1",
    //         details: "umm",
    //         dishType: "Vegan"
    //     },
    //     {
    //         id: 2,
    //         title: "recipe2",
    //         details: "yeah",
    //         dishType: "Vegetarian"
    //     },
    //     {
    //         id: 3,
    //         title: "recipe3",
    //         details: "okay",
    //         dishType: null
    //     }
    // ]

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipeList)

    React.useEffect(() => {
        dispatch(actions.fetchUserRecipes(1)); //TODO: remove parameters and use headers to determine user
        console.log(recipes);
    }, [])

    const recipeList = recipes.length ? (
        recipes.map(recipe => (
        <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.dishType}</p>
            <Link
                to={`/recipe/${recipe.id}`}
                className='button muted-button'
                > View Recipe
            </Link>
            {console.log(recipe.id)}
            <br /><br />

        </div>
        
    ))) : (
        <p>No recipes yet</p>

    )

    return(
        <div>
            {recipeList}
        </div>
    );
}