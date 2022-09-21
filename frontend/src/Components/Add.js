import React from 'react'

export default function Add(props) {

    let element;

    const recipe =
        <div className="list-card-container">
            <h1 className='card-title'>Add New Recipe</h1>
            <form action="/action_page.php">
                <label for="fname" className='add-label'>Recipe Name</label>
                <input type="text" id="fname" className='add-input' />

                <label for="sujet" className='add-label'>Recipe Type</label>
                <input type="text" id="sujet" className='add-input' />

                <label for="subject" className='add-label'>Ingredients</label>
                <textarea id="subject" name="subject" className='addta add-input'></textarea>

                <label for="subject" className='add-label'>Description</label>
                <textarea id="subject" name="subject" className='addta add-input'></textarea>

                <label for="subject" className='add-label'>Instructions</label>
                <textarea id="subject" name="subject" className='addta add-input'></textarea>

                <input type="submit" value="Submit" className='add-submit' />
            </form>
        </div>

    const mealplan =
        <div className="list-card-container">
            <h1 className='card-title'>New Meal Plan</h1>
            <form action="/action_page.php">
                <label for="fname" className='add-label'>Plan Name:</label>
                <input type="text" id="fname" className='add-input' />
                <input type="submit" value="Submit" className='add-submit' />
            </form>
        </div>

    const meal =
        <div className="list-card-container">
            <h1 className='card-title'>New Meal</h1>
            <form action="/action_page.php">
                <label for="fname" className='add-label'>Meal Name:</label>
                <input type="text" id="fname" className='add-input' />
                <label for="sujet" className='add-label'>Meal Description:</label>
                <input type="text" id="subjet" className='add-input'/>
                <input type="submit" value="Submit" className='add-submit'/>
            </form>
        </div>

    switch (props.page) {
        case "recipe":
            element = recipe;
            break;
        case "meal":
            element = meal;
            break;
        case "mealplan":
            element = mealplan;
            break;
        default:
            element = recipe;
            break;
    }

    return (
        <div>{element}</div>  
    )
}