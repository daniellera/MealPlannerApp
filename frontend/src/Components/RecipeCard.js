import React from 'react';

export default function RecipeCard(props) {
    const dummy = {
        id: 1,
        title: "recipe",
        details: "agliehf jsoifhnail osdfhilauhj",
        instructions: "Recipe 1 Instructions (Amounts, 1., 2., 3.)",
        dish_type: "entree"
    }
    return(
        <div>
            <h3>{dummy.title}</h3>
            <h6>Category: {dummy.dish_type}</h6>
            <p>{dummy.details}</p>
            <h4>Instructions: </h4>
            <p>{dummy.instructions}</p>
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