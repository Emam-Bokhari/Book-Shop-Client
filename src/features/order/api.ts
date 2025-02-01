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
            query: (email) => ({
                url: `/orders/order-history/${email}`,
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: "/orders",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),
        updateOrderStatus: builder.mutation({
            query: (args) => ({
                url: `/orders/${args.id}/status`,
                method: "PATCH",
                body: args.data,
            }),
        }),
    })
})

export const { useAddOrderMutation, useGetUserOrderHistoryQuery, useGetAllOrdersQuery, useGetOrderQuery, useUpdateOrderStatusMutation } = orderApi;