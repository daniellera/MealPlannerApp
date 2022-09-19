import { Link } from 'react-router-dom';
import './Home.css';
import user from "../../images/defualt_user_image.png";
import LoginPhoto from "../../images/logo_next_to_name.png";
import mealPlanImage from "../../images/meal_plan_image.png";
import mealImage from "../../images/meal_image.png";
import recipeImage from "../../images/recipe_image.png";
import logoutButton from '../../images/logout_button.png'


function Home(props) {

    const css = 'footer {display: none;} '
    return (
        <div>
            <div className='theHead'>
                <div className='logo-user'>
                    <img src={user} className="userphoto" />
                    <div>
                        <div>
                            <img src={LoginPhoto} className="loginPhoto" />
                        </div>
                        <p>{`@${props.user}`}</p>
                    </div>
                    <Link to='/login' onClick={props.handleClick}><img src={logoutButton} alt="Back to home" className="logout-button home-logout-button" /></Link>
                </div>
            </div>
            <hr />
            <div className='bubbles'>
                <div className="something">

                    <Link to='/mealplans' className='home-button'><div>
                        <img src={mealPlanImage} alt="Meal plan image" className="home-image" />
                    </div><strong>Meal Plans</strong></Link>
                </div>
                <div className="something">

                    <Link to='/meals' className='home-button'><div>
                        <img src={mealImage} alt="Meal image" className="home-image" />
                    </div><strong>Meals</strong></Link>
                </div>
                <div className="something">

                    <Link to='/recipes' className='home-button'><div>
                        <img src={recipeImage} alt="Recipe image" className="home-image" />
                    </div><strong>Recipes</strong></Link>
                </div>
            </div>
            <style>{css}</style>
        </div>

    )
}

export default Home;