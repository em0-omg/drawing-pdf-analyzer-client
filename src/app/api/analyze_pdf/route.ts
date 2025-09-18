import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 600;

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const splitCount = url.searchParams.get("split_count") || "4";

    console.log(`[analyze_pdf] Request received: split_count=${splitCount}`);

    const formData = await request.formData();

    const files = Array.from(formData.entries()).filter(
      ([key, value]) => value instanceof File
    );
    console.log(`[analyze_pdf] Files in form data: ${files.length} files`);
    files.forEach(([key, file]) => {
      console.log(
        `[analyze_pdf] File: ${key} = ${(file as File).name} (${
          (file as File).size
        } bytes)`
      );
    });

    const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:8080";
    const backendUrl = `${apiBaseUrl}/analyze_pdf?split_count=${splitCount}`;

    console.log(`[analyze_pdf] Forwarding to backend: ${backendUrl}`);

    const response = await fetch(backendUrl, {
      method: "POST",
      body: formData,
    });

    console.log(
      `[analyze_pdf] Backend response: ${response.status} ${response.statusText}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[analyze_pdf] Backend error: ${response.status} - ${errorText}`
      );
      return NextResponse.json(
        { error: `Backend error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(
      `[analyze_pdf] Success: returning data with keys: ${Object.keys(
        data
      ).join(", ")}`
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("[analyze_pdf] Unexpected error:", error);
    console.error("[analyze_pdf] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : typeof error,
    });
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
