"use client";

import { useEffect } from "react";
import { useVerifyAuthQuery } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setUser, setLoading } from "@/store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useVerifyAuthQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else if (data?.success) {
      dispatch(setUser(data.user));
    } else if (isError) {
      dispatch(setUser(null));
    }
  }, [data, isLoading, isError, dispatch]);

  return { isLoading };
};
