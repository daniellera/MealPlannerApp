import {Link} from 'react-router-dom';
import './Home.css';
import user from "../../images/defualt_user_image.png";
import LoginPhoto from "../../images/logo_next_to_name.png";
function Home(props) {
    return(
        <div>
            <div className='theHead'>
                <img src={user} className="userphoto"/>
                <img src={LoginPhoto} className="loginPhoto"/>
                <p>{props.user}</p>
               
            </div>
            <div className='bubbles'>
            <div className="something">   <Link to='/mealplans' className='home-button'>My Meal Plans</Link></div>
            <div className="something">  <Link to='/meals' className='home-button'>My Meals</Link></div>
            <div className="something">  <Link to='/recipes' className='home-button'>My Recipes</Link></div>
            </div>
            {/* My Meal Plans 
            My Meals
            My Recipes */}
        </div>
    )
}

export default Home;