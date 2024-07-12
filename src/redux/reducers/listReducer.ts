import { fetchData_Pending, fetchData_Failed, fetchData_Success } from '../actions/actionType';
import {  PayloadAction } from '@reduxjs/toolkit'


const initialState = {

    loading: false,
    data: {},
    error: null
}



export default function fetchDataFromAPI(state = initialState, action: PayloadAction<any>) {

    switch (action.type) {
        case fetchData_Pending:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fetchData_Success:
            return {
                ...state,
                loading: false,
                data: action.payload
            };

        case fetchData_Failed:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default: return state;
    }

}