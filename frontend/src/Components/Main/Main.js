import {Component} from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import Header from '../Header'
import Footer from '../Footer'
import Meals from '../Meals'
import Recipes from '../Recipes'
import RecipeCard from '../RecipeCard'
import MealPlans from '../MealPlans'
import GroceryList from '../GroceryList'
import {addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'

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
                    <Route path='/recipes' component={this.props.token.token !== undefined ? () => <RecipeCard userId = {this.props.user.id} /> : null}/>
                    <Route path='/mealplans' component={this.props.token.token !== undefined ? () => <MealPlans/> : null}/>
                    <Route path='/grocerylist' component={this.props.token.token !== undefined ? () => <GroceryList/> : null}/>
                    <Redirect to='/login'/>
                </Switch>
                <Footer />
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));