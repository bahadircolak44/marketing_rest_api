import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import facebookReducer from './facebook/reducer';

const rootReducer = combineReducers({facebook: facebookReducer})
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({}),
})
export default store