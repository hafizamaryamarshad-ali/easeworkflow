export async function POST(request: Request): Promise<Response> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY environment variable" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();
    const messages = body?.messages as { role: "user" | "assistant"; content: string }[] | undefined;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Request body must include a non-empty messages array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI assistant for a healthcare workflow platform called EaseWorkflow. Answer clearly and concisely, in a professional but friendly tone. You can explain features, services, and processes, but never provide personal medical advice.",
          },
          ...messages,
        ],
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("OpenAI API error", errorData || response.statusText);
      return new Response(
        JSON.stringify({ error: "Upstream AI service error" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return new Response(
        JSON.stringify({ error: "No response generated from the AI" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("/api/chat error", error);

    return new Response(
      JSON.stringify({ error: "Failed to generate a response" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
