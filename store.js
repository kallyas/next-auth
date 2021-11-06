import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./features";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let store = configureStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }