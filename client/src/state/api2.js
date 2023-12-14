import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      providesTags: (result) => [{ type: 'Job', id: result.id }],
    }),
    // ... other endpoints for API service 2
  }),
});

// Export the query hook for the mutation endpoint
export const useGetUser2Query = api2.endpoints.getUser2.useQuery;
