import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl:process.env.REACT_APP_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts:build.query({
            query:()=> `client/products`,
            providesTags:["Client"]
        })
    }),
});

export const api2 = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL1 }),
    reducerPath: 'jobApi',
    tagTypes: ['Job'],
    endpoints: (builder) => ({
      // Define endpoints for API service 2
      getUser2: builder.mutation({
        query: (reqData) => ({
          url: 'autobot/getAllBets',
          method: 'POST',
          body: reqData,
        }),
        // Optionally, you can include providesTags, onSettled, and other options as needed
        providesTags: ['Job'],
      }),
      // ... other endpoints for API service 2
    }),
  });


export const {
  useGetUserQuery,
  useGetProductsQuery
} = api;
