import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function POST(request: NextRequest) {
  try {
    // Get token from frontend cookies
    const token = request.cookies.get("token")?.value;

    // Forward logout request to backend
    const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: token ? `token=${token}` : "",
      },
    });

    const data = await response.json();

    // Create response and clear the frontend cookie
    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });

    // Clear the cookie on the frontend
    nextResponse.cookies.delete("token");

    return nextResponse;
  } catch (error) {
    console.error("Proxy logout error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
