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
    })
})

export const { useAddOrderMutation } = orderApi;