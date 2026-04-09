export async function POST(request: Request): Promise<Response> {
  try {
    const payload = await request.json();

    const upstreamResponse = await fetch("https://api.easeworkflow.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const rawText = await upstreamResponse.text();
    let responseBody: unknown = null;

    try {
      responseBody = rawText ? JSON.parse(rawText) : null;
    } catch {
      responseBody = rawText;
    }

    if (!upstreamResponse.ok) {
      console.error("Contact upstream API error:", upstreamResponse.status, responseBody);

      const upstreamMessage =
        (responseBody &&
          typeof responseBody === "object" &&
          responseBody !== null &&
          // @ts-expect-error - runtime shape from upstream API
          (responseBody.message || responseBody.error)) ||
        (typeof responseBody === "string" && responseBody) ||
        `Request failed with status ${upstreamResponse.status}`;

      return new Response(
        JSON.stringify({
          error: "Contact service error",
          message: upstreamMessage,
          status: upstreamResponse.status,
          details: responseBody,
        }),
        {
          status: upstreamResponse.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: responseBody ?? null }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("/api/contact route error", error);

    return new Response(
      JSON.stringify({ error: "Failed to reach contact service" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
