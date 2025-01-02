import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axios";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "post",
        data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "post",
        data,
      }),
    }),
    control: builder.query({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useControlQuery } =
  userApi;
