import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  try {
    // Forward the request to backend with cookies
    const response = await fetch(`${backendUrl}/api/debug/cookies`, {
      method: "GET",
      headers: {
        Cookie: request.headers.get("cookie") || "",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      frontendCookies: request.cookies.getAll(),
      backendResponse: data,
      headers: {
        cookie: request.headers.get("cookie"),
        userAgent: request.headers.get("user-agent"),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        frontendCookies: request.cookies.getAll(),
      },
      { status: 500 }
    );
  }
}
