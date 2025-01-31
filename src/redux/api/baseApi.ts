import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token as { token: string } | null;

        if (token && token.token) {
            headers.set("Authorization", `${token.token}`);
        }
        // console.log(token)
        return headers;
    }
})

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
})