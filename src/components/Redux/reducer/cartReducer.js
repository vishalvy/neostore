import { ADD_CART } from '../actiontype/actiontypes'
import { REMOVE_CART } from '../actiontype/actiontypes'
import {ID_ARRAY} from '../actiontype/actiontypes'

const initialState = {
    cartValue: 0,
    Idarr: []
}

function cartReducer(state = initialState,action) {
    switch (action.type) {
        case ADD_CART:
            return {...state,cartValue: state.cartValue + 1}
    
        case REMOVE_CART:
            return { ...state, cartValue: state.cartValue - 1 }
        
        case ID_ARRAY:
            // console.log(action.payload,"Reducer",action,"Action",state,"State")
            return { ...state, Idarr: [...action.payload] }
        
        default:
            return state
    }
}

export default cartReducer