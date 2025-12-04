"use client";

import { useVerifyAuthQuery } from "@/store/api/authApi";

export function CookieDebugger() {
  const { data, isLoading, isError, error } = useVerifyAuthQuery();

  const testDirectFetch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      console.log("Direct fetch result:", result);
      console.log("Response headers:", response.headers);
    } catch (err) {
      console.error("Direct fetch error:", err);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold mb-2">Authentication Debug</h3>

      <div className="space-y-2 text-sm">
        <p>
          <strong>RTK Query Loading:</strong> {isLoading.toString()}
        </p>
        <p>
          <strong>RTK Query Error:</strong> {isError.toString()}
        </p>
        <p>
          <strong>RTK Query Data:</strong> {JSON.stringify(data)}
        </p>
        <p>
          <strong>RTK Query Error Details:</strong> {JSON.stringify(error)}
        </p>
      </div>

      <button
        onClick={testDirectFetch}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Test Direct Fetch
      </button>
    </div>
  );
}
