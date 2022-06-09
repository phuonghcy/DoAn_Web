import userReducer from "./user";
import cartReducer from "./cart";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default rootReducer