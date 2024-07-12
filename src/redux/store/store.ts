// import { createStore } from 'redux'
import {applyMiddleware, combineReducers, configureStore,} from '@reduxjs/toolkit'
import userDataReducer from '../reducers/userDataReducer'
import fetchDataFromAPI from '../reducers/listReducer'
import thunk from 'redux-thunk';

const reducers = combineReducers({
    data:userDataReducer,
    fetchData:fetchDataFromAPI
})



export const store =configureStore({
    reducer:reducers,

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch