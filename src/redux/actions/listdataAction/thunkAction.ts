
import { fetchDataAction_Failed, fetchDataAction_Pending, fetchDataAction_Success } from './action'


export default function thunkAcion() {

    return async (dispatch:any) => {
        dispatch(fetchDataAction_Pending())

        try {
            const response  = await fetch('https://dummyjson.com/quotes')
            const data = await response.json();
            dispatch(fetchDataAction_Success(data))
            
        } catch (error) {
            dispatch(fetchDataAction_Failed(error))
            console.log(error);
        }
    }

}


