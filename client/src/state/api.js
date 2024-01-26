import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = window.document.cookie.split("=")[1];
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Client", "Coustomers", "Transaction", "Login","GETLIST"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => ({
                url: "client/products",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token ? token : null,
                },
                providesTags: ["Client"],
            }),
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
        addData: build.query({
            query: ({payload}) => ({
                url: "app/create",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     token:token
                },
                body: payload,
                providesTags: ["Dashbord"],
            }),
        }),
        getListData: build.query({
            query: ({payload}) => ({
                url: "app/getList",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     token:token
                },
                body:payload,
                providesTags: ["GETLIST"],
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
    useAddDataQuery,
    useGetListDataQuery
} = api;
