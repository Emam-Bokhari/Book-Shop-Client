import { baseApi } from "../../redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addOrder: builder.mutation({
            query: (orderData) => ({
                url: "/orders",
                method: "POST",
                body: orderData,
            })
        }),
        getUserOrderHistory: builder.query({
            query: () => ({
                url: "orders/order-history",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        })
    })
})

export const { useAddOrderMutation, useGetUserOrderHistoryQuery } = orderApi;