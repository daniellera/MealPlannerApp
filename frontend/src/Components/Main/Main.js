import {Component} from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import Header from '../Header'
import Footer from '../Footer'
import Meals from '../Meals'
import MealCard from '../MealCard'
import Recipes from '../Recipes'
import RecipeCard from '../RecipeCard'
import MealPlans from '../MealPlans'
import MealPlanCard from '../MealPlanCard'
import GroceryList from '../GroceryList'
import {addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())}
});

class Main extends Component {
    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render(){
        return(
            <div>
                <Header login={this.props.token.token} handleClick={this.handleLogout}/>
                {/* {this.props.token.token !== undefined ?
                        <div>
                            <Link to='/home'>Home | </Link>
                            <Link to='/login' onClick={this.handleLogout}>logout</Link> 
                            <Redirect to='/home'/>
                        </div>  
                    : 
                        <Link to='/login'>Home | </Link>
                } */}
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : null}/>
                    <Route path='/meals' component={this.props.token.token !== undefined ? () => <Meals/> : null}/>
                    <Route path='/meal/:mealId' component={({match}) => <MealCard match={match}/>}/>
                    <Route path='/recipes' component={this.props.token.token !== undefined ? () => <Recipes /> : null}/>
                    <Route path='/recipe/:recipeId' component={({match}) => <RecipeCard match={match}/>}/>
                    <Route path='/mealplans' component={this.props.token.token !== undefined ? () => <MealPlans/> : null}/>
                    <Route path='/mealplan/:mealPlanId' component={({match}) => <MealPlanCard match={match}/>}/>
                    <Route path='/grocerylist' component={this.props.token.token !== undefined ? () => <GroceryList/> : null}/>
                    {/* <Redirect to='/login'/> */}
                </Switch>
                <Footer />
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));