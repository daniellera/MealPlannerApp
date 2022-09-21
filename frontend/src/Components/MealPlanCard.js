import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Meals from './Meals';

export default function MealPlanCard({match}) {
    const noAddCss = ".add-button {display: none}"

    const mealPlanId = Number(match.params.mealPlanId);

    const mealPlanList = useSelector(state =>
        state.mealPlanList);

    const mealPlan = mealPlanList.find(mealPlan => mealPlan.id === mealPlanId);

    

    if (!mealPlan) {
        return (
            <div>
                <h2>MealPlan not found!</h2>
            </div>
        )
    }

    return(
        <div className="list-card-container">
            <h3 className='card-title'>{mealPlan.name}</h3>
            <Meals mealPlanId={mealPlanId} />
            <style>{noAddCss}</style>
        </div>
    );
}

//     recipe_id serial,
//     title varchar(50) NOT NULL,
//     details varchar(2000) NOT NULL,
//     instructions varchar(2000) NOT NULL,
//     dish_type varchar(50) NULL,
//     isPublic boolean NOT NULL DEFAULT FALSE,
//     CONSTRAINT PK_recipe PRIMARY KEY (recipe_id)
           