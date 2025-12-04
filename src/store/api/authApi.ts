import { AuthResponse, LoginCredentials } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use local API routes which proxy to backend
// This solves cross-origin cookie issues by making requests same-origin
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth", // Use local Next.js API routes
    credentials: "include", // Include cookies (same-origin now)
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
