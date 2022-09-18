import React from 'react';
import {Link} from 'react-router-dom';

export default function GroceryList(props) {
    const [ingredientsList, setIngredientsList] = React.useState([{
        toBePurchased: true,
        name: "ingredient",
        amount: "1 pinch"
    }, {
        toBePurchased: true,
        name: "ingredient2",
        amount: "2 pinches"
    }]);

    React.useEffect(() => {}, [ingredientsList])

    // Toggles in array, not database!
    function toggleToBePurchased(ingredient) {
        setIngredientsList(prev => ingredientsList.map(element => {
            if (element.name === ingredient.name) {
                return {
                    ...element,
                    toBePurchased: !element.toBePurchased
                }
            } else {
                return element
            }
        }))
    }

    return(
        <div>
            {ingredientsList.map(ingredient => {
                return (
                    <div className="grocery-list-item">
                        <p onClick={() => toggleToBePurchased(ingredient)}>{ingredient.toBePurchased ? "Y" : "N"}</p>
                        <p>{ingredient.amount} </p>
                        <p>{ingredient.name}</p>
                    </div>
                )
            })}
            <Link to='/mealplans'>My Meal Plans</Link>
        </div>
    );
}