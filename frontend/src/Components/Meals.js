import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';
import MealPlanCard from './MealPlanCard';

export default function Meals(props) {
    
    const dispatch = useDispatch();
    const meals = useSelector(state => state.mealList)

    React.useEffect(() => {
        props ? 
        dispatch(actions.fetchMealsByMealPlan(props.mealPlanId)) :
        dispatch(actions.fetchMealList(1)); //TODO: remove parameters and use headers to determine user
        console.log(meals);
    }, [])

    const mealList = meals.length ? (
        meals.map(meal => (
        <div key={meal.id}>
            <h5>{meal.title}</h5>
            <Link
                to={`/meal/${meal.id}`}
                className='button muted-button'
                > View Meal Details
            </Link>
            {console.log(meal.id)}
            <br /><br />

        </div>
        
    ))) : (
        <p>No meals yet</p>

    )

    return(
        <div>
            {mealList}
        </div>
    );
}