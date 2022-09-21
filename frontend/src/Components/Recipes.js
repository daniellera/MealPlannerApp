import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../Redux/actionCreators"
import { Link } from 'react-router-dom';
import recipeImage from '../images/meal_image.png'
import {BsFillTrashFill, AiFillPlusCircle} from 'react-icons/all'
import ReactTooltip from "react-tooltip";
import Dropdown from './Dropdown';

export default function Recipes(props) {

    const dispatch = useDispatch();
    const recipeList = useSelector(state => state.recipeList)
    const meals = useSelector(state => state.mealList)
    const token = useSelector(state => state.token);
    const [value, setValue] = React.useState(1)
    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const recipes = useSelector(state => state.recipeList)
    let renderToggle = false;
    let inMeal = false;

    props.mealId ? inMeal = true : inMeal = false;

    let mealOptions = meals.length ? meals.map((meal => {
        return {
            value: meal.id,
            label: meal.title
        }
    })) : {value: "test", label: "test"};


    useEffect(() => {
        dispatch(actions.fetchMealList());

        inMeal ? 
        dispatch(actions.fetchMealRecipes(props.mealId)) :
        dispatch(actions.fetchUserRecipes());

        switch (props.recipes) {
            case "user":
                return dispatch(actions.fetchUserRecipes(token)); //TODO: remove parameters and use headers to determine user;

            case "meal":
                return dispatch(actions.fetchMealRecipes(props.mealId));

            default:
                return null;
        }

    }, [renderToggle])
    
    const deleteRecipe = (recipeId) => {
        //todo
    }

    function deleteRecipeFromMeal(recipeId) {
        dispatch(actions.deleteRecipeFromMeal(props.mealId, recipeId))
        renderToggle ? renderToggle = false : renderToggle = true;
    }

    function addRecipeToMeal(recipeId) {
        dispatch(actions.addRecipeToMeal(recipeId, value));
        renderToggle ? renderToggle = false : renderToggle = true;

    }


    const recipeDisplay = recipeList.length ? (
        recipeList.map(recipe => (
            <div key={recipe.id} className='list-item'>

                <Link
                    to={`/recipe/${recipe.id}`}
                    className='button muted-button recipe-button'
                >
                    <img src={recipeImage} alt="Recipe image" />
                    <div>
                        <h3 className='meal-recipe-li-title'>{recipe.title}</h3>
                        <p>{recipe.dishType}</p>
                    </div>
                </Link>

                {inMeal ?
                    <div>
                        <BsFillTrashFill
                            data-tip data-for="deleteTip"
                            onClick={() => deleteRecipeFromMeal(recipe.id)}
                        />
                        <ReactTooltip id="deleteTip">
                            Delete recipe from meal
                        </ReactTooltip>
                    </div> :
                    <div>
                        <AiFillPlusCircle
                            data-tip data-for="addTip"
                            onClick={() => addRecipeToMeal(recipe.id)}
                        />

                        <ReactTooltip id="addTip">
                            Add recipe to a meal
                        </ReactTooltip>

                        <Dropdown
                            label="Add to:"
                            options={mealOptions}
                            value={value}
                            onChange={handleChange}
                        />

                    </div>
                }
                {console.log(recipe.id)}

            </div>

        ))) : (
        <p>No recipes yet</p>

    )

    return (
        <div className="list-card-container">
            {recipeDisplay}
            <Link
                to='/addrecipe'
                className='add-button'
            ><p>+ add</p>
            </Link>
        </div>
    );

}