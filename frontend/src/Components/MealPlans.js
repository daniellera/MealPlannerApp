import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';
import mealPlanBubble from '../images/meal_plan_bubble.png'

export default function MealPlans(props) {
    
    const dispatch = useDispatch();
    const mealPlans = useSelector(state => state.mealPlanList)

    React.useEffect(() => {
        dispatch(actions.fetchMealPlanList());
        console.log(mealPlans);
    }, [])

    const mealPlanList = mealPlans.length ? (
        mealPlans.map(mealPlan => (
        <div key={mealPlan.id} className='list-item'>
            <img src={mealPlanBubble} alt="" className='meal-plan-bubble'/>
            <Link
                to={`/mealplan/${mealPlan.id}`}
                className='button muted-button'
                ><h5 className="mp-li-title">{mealPlan.name}</h5>
            </Link>
            {console.log(mealPlan.id)}
            <br /><br />

        </div>
        
    ))) : (
        <p>No mealPlans yet</p>

    )

    return(
        <div className="list-card-container">
            <h5 className='page-title'>Meal Plans</h5>
            {mealPlanList}
        </div>
    );
}