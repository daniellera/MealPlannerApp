import {Link} from 'react-router-dom'

function Home(props) {
    return(
        <div>
            <Link to='/mealplans' className='home-button'>My Meal Plans</Link>
            <Link to='/meals' className='home-button'>My Meals</Link>
            <Link to='/recipes' className='home-button'>My Recipes</Link>

            {/* My Meal Plans 
            My Meals
            My Recipes */}
        </div>
    )
}

export default Home;