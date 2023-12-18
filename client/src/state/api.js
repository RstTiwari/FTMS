import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl:process.env.REACT_APP_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User","Client","Coustomers"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts:build.query({
            query:()=> `client/products`,
            providesTags:["Client"]
        }),
        getCoustomers:build.query({
          query:()=> "client/coustomers",
          providesTags:["Coustomers"]
        })
    }),
});




export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCoustomersQuery
} = api;
