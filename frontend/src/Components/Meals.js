import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';
import MealPlanCard from './MealPlanCard';
import mealImage from "../images/meal_plan_image.png";
import {BsFillTrashFill, AiFillPlusCircle} from 'react-icons/all'
import ReactTooltip from "react-tooltip";
import Dropdown from './Dropdown';



export default function Meals(props) {

    const [value, setValue] = React.useState(1)

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    
    const dispatch = useDispatch();
    const meals = useSelector(state => state.mealList)
    const mealPlans = useSelector(state => state.mealPlanList)
    let renderToggle = false;
    let inMealPlan = false;

    props.mealPlanId ? inMealPlan = true : inMealPlan = false;

    let mealPlanOptions = mealPlans.length ? mealPlans.map((mealPlan => {
        return {
            value: mealPlan.id,
            label: mealPlan.name
        }
    })) : {value: "test", label: "test"};

    React.useEffect(() => {
        dispatch(actions.fetchMealPlanList());

        inMealPlan ? 
        dispatch(actions.fetchMealsByMealPlan(props.mealPlanId)) :
        dispatch(actions.fetchMealList());
        console.log(meals);
        

    }, [renderToggle])

    const deleteMeal = (mealId) => {
        //todo
    }

    function deleteMealFromMealPlan(mealId) {
        dispatch(actions.deleteMealFromMealPlan(props.mealPlanId, mealId))
        renderToggle ? renderToggle = false : renderToggle = true;
    }

    function addMealToMealPlan(mealId) {
        dispatch(actions.addMealToMealPlan(mealId, value));
        renderToggle ? renderToggle = false : renderToggle = true;

    }

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

            { inMealPlan ? 
            <div>
                <BsFillTrashFill
                    data-tip data-for="deleteTip"
                    onClick={() => deleteMealFromMealPlan(meal.id)}
                />
                <ReactTooltip id="deleteTip">
                    Delete meal from meal plan
                </ReactTooltip>
            </div> :
            <div>
                <AiFillPlusCircle
                data-tip data-for="addTip"
                onClick={() => addMealToMealPlan(meal.id)}
                />

                <ReactTooltip id="addTip">
                    Add meal to a meal plan
                </ReactTooltip>

                <Dropdown 
                    label="Add to:"
                    options={mealPlanOptions}
                    value={value}
                    onChange={handleChange}
                />
                
            </div>
            }
            {console.log("dropdown test", mealPlanOptions)}
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