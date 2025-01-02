import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axios";

const baseApi = import.meta.env.VITE_API_URL;

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: axiosBaseQuery({ baseUrl: baseApi + "auth/admin" }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (keyword) => ({
        url: `/users${keyword ? `?keyword=${keyword}` : ""}`,
        method: "GET",
      }),
    }),
    getRate: builder.query({
      query: () => ({
        url: "/rate",
        method: "GET",
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "",
        method: "post",
        data,
      }),
    }),
    addRateDay: builder.mutation({
      query: (userRateId) => ({
        url: `/user_rate_day?user_rate_id=${userRateId}`,
        method: "POST",
      }),
    }),
    addRateQuery: builder.mutation({
      query: (data) => ({
        url: "/rate",
        method: "POST",
        data,
      }),
    }),
    addRateToUser: builder.mutation({
      query: (data) => ({
        url: `/user_rate?rateId=${data.rateId}&userId=${data.userId}`,
        method: "POST",
      }),
    }),
    getUsersRate: builder.query({
      query: (data) => ({
        url: "/user_rate",
        method: "GET",
        data,
      }),
    }),
    getRateHistory: builder.query({
      query: (data) => ({
        url: `/user_rate_day?userRateId=${data.rateId}`,
        method: "GET",
      }),
    }),
    deleteUserRate: builder.mutation({
      query: (userRateId) => ({
        url: `/user_rate_rate_history?userRateId=${userRateId}`,
        method: "DELETE",
      }),
    }),
    getUserRatePaymentHistory: builder.query({
      query: (userId) => ({
        url: `/rate_history?userId=${userId}`,
        method: "GET",
      }),
    }),
    getReport: builder.query({
      query: () => ({
        url: `/report`,
        method: "GET",
      }),
    }),
    deleteRate: builder.mutation({
      query: (rateId) => ({
        url: `/dalete_rate?rateId=${rateId}`,
        method: "DELETE",
      }),
    }),
    startUserRate: builder.mutation({
      query: (userRateId) => ({
        url: `/start_user_rate?userRateId=${userRateId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useRegisterUserMutation,
  useGetRateQuery,
  useAddRateDayMutation,
  useAddRateQueryMutation,
  useAddRateToUserMutation,
  useGetUsersRateQuery,
  useGetRateHistoryQuery,
  useDeleteUserRateMutation,
  useGetUserRatePaymentHistoryQuery,
  useGetReportQuery,
  useDeleteRateMutation,
  useStartUserRateMutation,
} = adminApi;
