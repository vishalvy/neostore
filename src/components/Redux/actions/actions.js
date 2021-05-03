import { LOGIN_USER } from '../actiontype/actiontypes'
import { LOGOUT_USER } from '../actiontype/actiontypes'
import { ADD_CART } from '../actiontype/actiontypes'
import { REMOVE_CART } from '../actiontype/actiontypes'
import { ID_ARRAY } from '../actiontype/actiontypes'



export const loginUser = () => ({
    type: LOGIN_USER
})
export const logoutUser = () => ({
    type: LOGOUT_USER
})


export const addCart = () => ({
    type: ADD_CART
})

export const removeCart = () => ({
    type: REMOVE_CART
})

export const IdArray = IDs => ({
    type: ID_ARRAY,
    payload: IDs
})