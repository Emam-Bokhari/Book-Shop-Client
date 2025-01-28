import { ApiResponse, TProduct } from "../../types";
import { baseApi } from "./baseApi";


const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: "/products",
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<TProduct[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),

    })
})

export const { useGetAllProductsQuery } = productsApi;