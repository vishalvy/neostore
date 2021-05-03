import { createStore,combineReducers } from 'redux';
import Authreducer from '../reducer/Authreducer'
import cartReducer from '../reducer/cartReducer'
// import IdReducer from '../reducer/IDReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const perReducer = persistReducer(persistConfig, Authreducer)
const CartPerReducer = persistReducer(persistConfig, cartReducer)
// const IdPerReducer = persistReducer(persistConfig,IdReducer)

export const store = createStore(combineReducers({perReducer,CartPerReducer}))

export const perStore = persistStore(store)
