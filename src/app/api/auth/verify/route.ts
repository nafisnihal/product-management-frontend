import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function GET(request: NextRequest) {
  try {
    // Get token from frontend cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // Forward verify request to backend with token
    const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Proxy verify error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 401 }
    );
  }
}
