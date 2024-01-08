import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Client", "Coustomers", "Transaction", "Login"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => `client/products`,
            providesTags: ["Client"],
        }),
        getCoustomers: build.query({
            query: () => "client/coustomers",
            providesTags: ["Coustomers"],
        }),
        getTransaction: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transaction",
                method: "POST",
                params: { page, pageSize, sort, search },
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                },
                credentials: "include",
                providesTags: ["Transaction"],
            }),
        }),
        getUserLogin: build.query({
            query: ({ login }) => ({
                url: "auth/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                },
                body: login,
                providesTags: ["Login"],
            }),
        }),
        getDashbordData: build.query({
            query: () => ({
                url: "auth/dashbordData",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                },
                body: {},
                providesTags: ["Dashbord"],
            }),
        }),
    }),
});




export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCoustomersQuery,
  useGetTransactionQuery,
  useGetUserLoginQuery,
  useGetDashbordDataQuery
} = api;
