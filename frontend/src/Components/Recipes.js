import React from 'react';

export default function Recipes(props) {
    const dummy = ["recipe", "recipe", "recipe"]

    return(
        <div>
            {dummy.map(recipe => <p>{recipe}</p>)}
        </div>
    );
}