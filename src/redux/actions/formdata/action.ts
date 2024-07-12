import { Form, FormType } from '../../../screens/forms';
import { addData, updateData } from '../actionType';

export const addFormData = (data: FormType) => ({
    type: addData,
    payload: data
})

export const updateFormData = (data:any) => ({
    type: updateData,
    payload: data
})