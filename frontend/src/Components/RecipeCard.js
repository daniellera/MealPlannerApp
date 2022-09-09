import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {useDispatch, useSelector} from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchIngredients, fetchRecipe } from "../Redux/actionCreators"

const mapDispatchToProps = {
    fetchIngredients,
    fetchRecipe
}

function RecipeCard(props) {

    

    

    const id = props.userId
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipe)
    const ingredient = useSelector(state => state.ingredients)

    useEffect(() => {
        dispatch(fetchRecipe(id));
        dispatch(fetchIngredients(id));
        console.log(recipe)
        console.log(ingredient)
    }, [])
    


    const dummy = {
        id: 1,
        title: "recipe",
        details: "agliehf jsoifhnail osdfhilauhj",
        instructions: "Recipe 1 Instructions (Amounts, 1., 2., 3.)",
        dish_type: "entree"
    }
    return(
        <div>
            <h3>{recipe.title}</h3>
            <h6>Category: {recipe.dishType}</h6>
            <p>{recipe.details}</p>
            <h4>Instructions: </h4>
            <p>{recipe.instructions}</p>
            
        </div>
    );
}

export default withRouter(connect(null, mapDispatchToProps)(RecipeCard));

//     recipe_id serial,
//     title varchar(50) NOT NULL,
//     details varchar(2000) NOT NULL,
//     instructions varchar(2000) NOT NULL,
//     dish_type varchar(50) NULL,
//     isPublic boolean NOT NULL DEFAULT FALSE,
//     CONSTRAINT PK_recipe PRIMARY KEY (recipe_id)