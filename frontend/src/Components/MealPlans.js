import React from 'react';
import { Link } from 'react-router-dom'

export default function MealPlans(props) {
    const dummy = ["mealplan", "mealplan", "mealplan"]

    return(
        <div>
            <Link to='/grocerylist'>GroceryList </Link>
            {dummy.map(mealplan => <p>{mealplan}</p>)}
        </div>
    );
}