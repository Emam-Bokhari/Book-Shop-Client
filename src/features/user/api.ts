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
        }),
        updateUserStatus: builder.mutation({
            query: (args) => ({
                url: `/users/${args.id}/status`,
                method: "PATCH",
                body: args.data,
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            })
        }),
    })
})

export const { useGetAllUsersQuery, useUpdateUserRoleMutation, useUpdateUserStatusMutation, useDeleteUserMutation } = userApi;