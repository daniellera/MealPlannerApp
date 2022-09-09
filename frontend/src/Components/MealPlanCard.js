import React from 'react';
import { Link } from 'react-router-dom';

export default function MealPlanCard(props) {

    // TODO: fetch recipes by mealplan
    

    return(
        <div>
            <Link to='/grocerylist'>GroceryList</Link>
            <p>{props.mealPlan.name}</p>
            <Link to='/mealplans' className='home-button'>Back</Link>
        </div>
    );
}