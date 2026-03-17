import { NextResponse } from "next/server";
import { client, sanityRuntimeConfig } from "../../../../lib/sanity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  if (!sanityRuntimeConfig.isConfigured) {
    return NextResponse.json(
      {
        error:
          "Sanity environment variables are missing. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
      },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const query = typeof body?.query === "string" ? body.query : "";
    const params =
      body?.params && typeof body.params === "object" && !Array.isArray(body.params)
        ? body.params
        : {};
    const debugLabel =
      typeof body?.debugLabel === "string" && body.debugLabel.trim().length > 0
        ? body.debugLabel.trim()
        : "query";

    if (!query) {
      return NextResponse.json({ error: "Query is required." }, { status: 400 });
    }

    const result = await client.fetch(query, params);

    if (process.env.NODE_ENV === "production") {
      console.info(`[Sanity API:${debugLabel}] Query executed`, {
        projectId: sanityRuntimeConfig.projectId,
        dataset: sanityRuntimeConfig.dataset,
        useCdn: sanityRuntimeConfig.useCdn,
        hasReadToken: sanityRuntimeConfig.hasReadToken,
        resultType: Array.isArray(result) ? "array" : typeof result,
        count: Array.isArray(result) ? result.length : result ? 1 : 0,
      });
    }

    return NextResponse.json(
      {
        result,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Sanity query error.";

    console.error("[Sanity API] Query failed", {
      message,
      projectId: sanityRuntimeConfig.projectId,
      dataset: sanityRuntimeConfig.dataset,
    });

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
