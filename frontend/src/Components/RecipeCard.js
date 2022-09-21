import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import thisRecipeImage from '../images/this_recipe_image.png';

export default function RecipeCard({match}) {

    const noAddCss = ".add-button {display: none}"

    const recipeId = Number(match.params.recipeId);

    const recipeList = useSelector(state =>
        state.recipeList)

    const recipe = recipeList.find(recipe => recipe.id === recipeId);


    if (!recipe) {
        return (
            <div>
                <h2>Recipe not found!</h2>
            </div>
        )
    }

    return(
        <div className="list-card-container recipe-container">
            <img src={thisRecipeImage} alt="Recipe image" className='recipe-image'/>
            <h3 className='recipe-title'>{recipe.title}</h3>
            <h6 className='recipe-type'>{recipe.dishType}</h6>
            <h4 className='recipe-subtitle'>Description: </h4>
            <p className='recipe-details'>{recipe.details}</p>
            <br></br>
            <h4 className='recipe-subtitle'>Instructions: </h4>
            <p className='recipe-instructions'>{recipe.instructions}</p>
            <style>{noAddCss}</style>
        </div>
    );
}

//     recipe_id serial,
//     title varchar(50) NOT NULL,
//     details varchar(2000) NOT NULL,
//     instructions varchar(2000) NOT NULL,
//     dish_type varchar(50) NULL,
//     isPublic boolean NOT NULL DEFAULT FALSE,
//     CONSTRAINT PK_recipe PRIMARY KEY (recipe_id)