import { configureStore } from "@reduxjs/toolkit";
import themReducer from "./Them"
import adminReducer from "./Admin"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    them: themReducer,
    admin: adminReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
})