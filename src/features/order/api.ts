/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../redux/api/baseApi";
import { TQueryParam } from "../../types/global";

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
            query: (args) => {

                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    })
                }

                return {
                    url: "/orders",
                    method: "GET",
                    params: params
                }
            },
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