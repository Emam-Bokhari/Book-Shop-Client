import { baseApi } from "../../redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),
        updateUserRole: builder.mutation({
            query: (args) => ({
                url: `/users/${args.id}/role`,
                method: "PATCH",
                body: args.data,
            })
        })
    })
})

export const { useGetAllUsersQuery, useUpdateUserRoleMutation } = userApi;