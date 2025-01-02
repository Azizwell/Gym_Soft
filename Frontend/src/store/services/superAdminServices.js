import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axios";
const baseUrl = import.meta.env.VITE_API_URL;
export const superAdminApi = createApi({
  reducerPath: "superAdminApi",
  baseQuery: axiosBaseQuery({ baseUrl: baseUrl + "auth/super_admin" }),
  endpoints: (builder) => ({
    getGym: builder.query({
      query: () => ({
        url: "/gym",
        method: "GET",
      }),
    }),

    // getMyQuery: builder.query({
    //   query: (data) => ({
    //     url: `applicant?${data.type != "" ? `type=${data.type}` : ""}${
    //       data.status != "" ? `&status=${data.status}` : ""
    //     }${data.miniType != "" ? `&miniType=${data.miniType}` : ""}${
    //       data.region != "" ? `&region=${data.region}` : ""
    //     }${data.district != "" ? `&district=${data.district}` : ""}${
    //       data.serialNumber != "" ? `&serialNumber=${data.serialNumber}` : ""
    //     }`,
    //     method: "GET",
    //   }),
    // }),

    addGym: builder.mutation({
      query: (data) => ({
        url: "/gym",
        method: "post",
        data,
      }),
    }),

    deleteGym: builder.mutation({
      query: (data) => ({
        url: `?gymId=${data}`,
        method: "DELETE",
      }),
    }),
    updateGym: builder.mutation({
      query: (data) => ({
        url: "/gym",
        method: "PUT",
        data,
      }),
    }),

    getGymAdmin: builder.mutation({
      query: (data) => ({
        url: `/gym_admin?gymId=${data}`,
        method: "PATCH",
      }),
    }),

    addGymAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin`,
        method: "POST",
        data,
      }),
    }),
    updateAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin`,
        method: "PUT",
        data,
      }),
    }),
    updateSuperAdmin: builder.mutation({
      query: (data) => ({
        url: "",
        method: "PUT",
        data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateGymMutation,
  useAddGymMutation,
  useGetGymQuery,
  useDeleteGymMutation,
  useGetGymAdminMutation,
  useAddGymAdminMutation,
  useUpdateAdminMutation,
  useUpdateSuperAdminMutation
} = superAdminApi;
