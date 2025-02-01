import { baseApi } from "../../redux/api/baseApi";
import { ApiResponse, TProduct } from "../../types";


const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (productData) => ({
                url: "/products",
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["products"]
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: "/products",
                method: "GET",
            }),
            providesTags: ["products"],
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
        }),
        updateProduct: builder.mutation({
            query: (args) => ({
                url: `/products/${args.id}`,
                method: "PATCH",
                body: args.data,
            }),
            invalidatesTags: ["products"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: ["products"]
        }),

    })
})

export const { useGetAllProductsQuery, useGetProductQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi;