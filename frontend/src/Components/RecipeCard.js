import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {useDispatch, useSelector} from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchRecipe } from "../Redux/actionCreators"
import { Link } from 'react-router-dom';

function RecipeCard(props) {

    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipe)

    useEffect(() => {
        dispatch(fetchRecipe());
        console.log(recipe)
    }, [])

    return(
        <div>
            <h3>{recipe.title}</h3>
            <h6>Category: {recipe.dishType}</h6>
            <p>{recipe.details}</p>
            <h4>Instructions: </h4>
            <p>{recipe.instructions}</p>
            <Link to='/recipes' className='home-button'>My Recipes</Link>
        </div>
    );
}

export default withRouter(connect()(RecipeCard));

//     recipe_id serial,
//     title varchar(50) NOT NULL,
//     details varchar(2000) NOT NULL,
//     instructions varchar(2000) NOT NULL,
//     dish_type varchar(50) NULL,
//     isPublic boolean NOT NULL DEFAULT FALSE,
//     CONSTRAINT PK_recipe PRIMARY KEY (recipe_id)