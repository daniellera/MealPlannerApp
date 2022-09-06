import {Link} from 'react-router-dom'

function Home(props) {
    return(
        <div>
            <Link to='/mealplans'>My Meal Plans | </Link>
            <Link to='/meals'>My Meals | </Link>
            <Link to='/recipes'>My Recipes</Link>

            {/* My Meal Plans 
            My Meals
            My Recipes */}
        </div>
    )
}

export default Home;