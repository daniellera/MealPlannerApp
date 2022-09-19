import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function RecipeCard({match}) {

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
        <div className="list-card-container">
            <h3 className='card-title'>{recipe.title}</h3>
            <h6>Category: {recipe.dishType}</h6>
            <p>{recipe.details}</p>
            <h4>Instructions: </h4>
            <p>{recipe.instructions}</p>
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