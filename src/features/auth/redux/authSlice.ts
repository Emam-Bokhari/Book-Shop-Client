import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { persistor, RootState } from "../../../redux/store";
import { TUser } from "../../../types/users";
import { clearCart } from "../../cart/redux/cartSlice";




type TAuthState = {
    user: null | TUser;
    token: null | string;
}

const initialState: TAuthState = {
    user: null,
    token: null,
}

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { dispatch }) => {
    dispatch(clearCart());
    persistor.purge();
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;

        }
    }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;