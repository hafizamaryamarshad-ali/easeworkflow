const DEFAULT_CONTACT_API_BASE_URL =
  "https://easeworkflow-backend-bcbbccd0hdfjd6bh.polandcentral-01.azurewebsites.net";

function getContactEndpoint(): string {
  const configuredBaseUrl =
    process.env.CONTACT_API_BASE_URL?.trim() || DEFAULT_CONTACT_API_BASE_URL;
  const normalizedBaseUrl = configuredBaseUrl.endsWith("/")
    ? configuredBaseUrl
    : `${configuredBaseUrl}/`;

  return new URL("api/contact", normalizedBaseUrl).toString();
}

export async function POST(request: Request): Promise<Response> {
  try {
    let payload: unknown;

    try {
      payload = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          message: "Invalid JSON request body",
          errors: { body: ["A valid JSON request body is required."] },
        },
        { status: 400 }
      );
    }

    const upstreamResponse = await fetch(getContactEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });

    const rawText = await upstreamResponse.text();
    const contentType =
      upstreamResponse.headers.get("content-type") || "application/json";

    return new Response(rawText || null, {
      status: upstreamResponse.status,
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    console.error("/api/contact route error", error);

    const isTimeout = error instanceof Error && error.name === "TimeoutError";

    return Response.json(
      {
        success: false,
        message: isTimeout
          ? "The contact service timed out. Please try again."
          : "The contact service is temporarily unavailable. Please try again.",
      },
      { status: isTimeout ? 504 : 502 }
    );
  }
}
