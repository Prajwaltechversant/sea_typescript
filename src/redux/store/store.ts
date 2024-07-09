// import { createStore } from 'redux'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userDataReducer from '../reducers/userDataReducer'

const reducers = combineReducers({
    data:userDataReducer
})



export const store =configureStore({
    reducer:reducers
})