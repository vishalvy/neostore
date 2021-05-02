import { LOGIN_USER } from '../actiontype/actiontypes'
import { LOGOUT_USER } from '../actiontype/actiontypes'


export const loginUser = () => ({
    type: LOGIN_USER
})
export const logoutUser = () => ({
    type: LOGOUT_USER
})