import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/usersSlice'


const rootReducer = combineReducers({
  user: userReducer
})
export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}