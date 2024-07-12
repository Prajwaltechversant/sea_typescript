
import { addData, updateData } from '../actions/actionType'


const initialState = {}

export default function userDataReducer(state = initialState, action:any) {

    switch (action.type) {

        case addData:
            return { ...state, ...action.payload };
        case updateData:
            return { ...state, ...action.payload };

        default: return state;

    }

}