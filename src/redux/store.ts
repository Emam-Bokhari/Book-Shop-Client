import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import cartReducer from "../features/cart/redux/cartSlice"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/redux/authSlice"


// persist configure for auth
const persistConfig = {
    key: "auth",
    storage
}

// persist reducer for auth
const persistedAuthReducer = persistReducer(persistConfig, authReducer)

// persist configure for cart
const cartPersistConfig = {
    key: "cart",
    storage,
};

// persist reducer for cart
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer)



export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
        cart: persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);
