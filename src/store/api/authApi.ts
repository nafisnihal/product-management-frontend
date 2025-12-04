import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentials, AuthResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Custom base query with enhanced cookie handling
const baseQueryWithCookies = fetchBaseQuery({
  baseUrl: `${API_URL}/api/auth`,
  credentials: "include", // Important: Include cookies
  prepareHeaders: (headers, { getState }) => {
    // Ensure cookies are sent with all requests
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  // Add fetch options to ensure cookies are always included
  fetchFn: async (input, init) => {
    return fetch(input, {
      ...init,
      credentials: 'include', // Force include credentials
      mode: 'cors', // Ensure CORS mode
    });
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithCookies,
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
