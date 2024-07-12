import {fetchData_Pending,fetchData_Success,fetchData_Failed} from '../actionType'

export const fetchDataAction_Pending = () => ({
    type: fetchData_Pending,
})

export const fetchDataAction_Success = (data: any) => ({
    type: fetchData_Success,
    payload: data
})

export const fetchDataAction_Failed = (error: any) => ({
    type: fetchData_Failed,
    payload: error
})