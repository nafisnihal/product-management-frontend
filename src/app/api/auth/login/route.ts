import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward login request to backend
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Create response
    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });

    // Extract and forward the Set-Cookie header from backend
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      // Parse and modify the cookie for same-origin
      const cookieValue = setCookieHeader.split(";")[0].split("=")[1];

      // Set the cookie for the frontend domain
      nextResponse.cookies.set("token", cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", // Can use lax since it's same-origin now
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/",
      });
    }

    return nextResponse;
  } catch (error) {
    console.error("Proxy login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
