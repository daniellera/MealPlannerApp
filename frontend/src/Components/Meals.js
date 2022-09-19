import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';
import MealPlanCard from './MealPlanCard';
import mealImage from "../images/meal_plan_image.png";



export default function Meals(props) {
    
    const dispatch = useDispatch();
    const meals = useSelector(state => state.mealList)

    React.useEffect(() => {
        props.mealPlanId ? 
        dispatch(actions.fetchMealsByMealPlan(props.mealPlanId)) :
        dispatch(actions.fetchMealList()); //TODO: remove parameters and use headers to determine user
        console.log(meals);
    }, [])

    const mealList = meals.length ? (
        meals.map(meal => (
        <div key={meal.id} className='list-item'>
            <Link
                to={`/meal/${meal.id}`}
                className='button muted-button meal-button'
                >
                    <img src={mealImage} alt="Meal image" />
                    <h5 className='meal-recipe-li-title'>{meal.title}</h5>
            </Link>
            {console.log(meal.id)}
            <br /><br />

        </div>
        
    ))) : (
        <p>No meals yet</p>

    )

    return(
        <div className="list-card-container">
            {!props.mealPlanId && <h4 className='page-title'>Meals</h4>}
            {mealList}
        </div>
    );
}