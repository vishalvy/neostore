import { createStore,combineReducers } from 'redux';
import Authreducer from '../reducer/reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const perReducer = persistReducer(persistConfig, Authreducer)

export const store = createStore(combineReducers({perReducer}))

export const perStore = persistStore(store)

