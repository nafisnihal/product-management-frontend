import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentials, AuthResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/auth`,
    credentials: "include", // Important: Include cookies
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    verifyAuth: builder.query<AuthResponse, void>({
      query: () => "/verify",
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useVerifyAuthQuery } =
  authApi;
