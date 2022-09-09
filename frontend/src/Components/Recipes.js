import React from 'react';
import RecipeCard from './RecipeCard';

export default function Recipes(props) {
    const recipes = [
        {
            id: 1,
            title: "recipe1",
            details: "umm",
            dishType: "Vegan"
        },
        {
            id: 2,
            title: "recipe2",
            details: "yeah",
            dishType: "Vegetarian"
        },
        {
            id: 3,
            title: "recipe3",
            details: "okay",
            dishType: null
        }
    ]

    const [selected, setSelected] = React.useState({isSelected: false, recipe: null})

    React.useEffect(() => {}, [selected])

    function selectRecipe(recipe) {
        setSelected(prev => ({
            isSelected: true,
            recipe: recipe
        }))
    }

    return(
        <div>
            {   selected.isSelected ?
                <RecipeCard /> :
                recipes.map(recipe => <p onClick={() => selectRecipe(recipe)}>{recipe.title}</p>)
            }
        </div>
    );
}