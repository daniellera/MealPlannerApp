import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import {Recipe} from './recipe'
import {RecipeList} from './recipeList'
import {MealList} from './mealList'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            recipe: Recipe,
            recipeList: RecipeList,
            mealList: MealList

        }),
        applyMiddleware(thunk)
    );

    return store;
}