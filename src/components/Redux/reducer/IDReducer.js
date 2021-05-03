import { ID_ARRAY } from '../actiontype/actiontypes'

const initialState = {
    Idarr: []
}

function IdReducer(state = initialState, action) {
    switch (action.type) {
        case ID_ARRAY:
            // console.log(action.payload,"Reducer",action,"Action",state,"State")
            return {...state,Idarr: [...action.payload]}
    
        default:
            return state
    }
}

export default IdReducer