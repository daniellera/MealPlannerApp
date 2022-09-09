import React from 'react';
import MealPlanCard from './MealPlanCard';

export default function MealPlans(props) {

    // replace with fetched data
    const mealPlanList = [{name: "mealplan1", id: 1}, {name: "mealplan2", id: 2}, {name: "mealplan3", id: 3}]

    const [selected, setSelected] = React.useState({isSelected: false, mealPlan: null})

    React.useEffect(() => {}, [selected])

    function selectMealPlan(mealPlan) {
        setSelected(prev => ({
            isSelected: true,
            mealPlan: mealPlan
        }))
    }

    return(
        <div>
            {   selected.isSelected ?
                <MealPlanCard mealPlan={selected.mealPlan} /> :
                mealPlanList.map(mealplan => <p onClick={() => selectMealPlan(mealplan)}>{mealplan.name}</p>)
            }
        </div>
    );
}