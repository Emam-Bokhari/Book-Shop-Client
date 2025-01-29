import { baseApi } from "../../redux/api/baseApi";
import { ApiResponse, TProduct } from "../../types";


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
        getProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<TProduct>) => {
                return {
                    data: response?.data
                }
            }
        })

    })
})

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;