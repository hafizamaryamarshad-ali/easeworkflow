import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const fallbackProjectId = "1nesg9s4";
const fallbackDataset = "production";

const envProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
const envDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "";

const projectId = envProjectId || fallbackProjectId;
const dataset = envDataset || fallbackDataset;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";
const token = process.env.SANITY_API_READ_TOKEN;
const isProduction = process.env.NODE_ENV === "production";
const useCdnEnv = process.env.NEXT_PUBLIC_SANITY_USE_CDN;

const isConfigured = Boolean(projectId && dataset);
const useCdn = useCdnEnv ? useCdnEnv === "true" : !token;

if (!envProjectId || !envDataset) {
  console.warn(
    "[Sanity Config] NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is missing. " +
      `Using fallback values projectId='${fallbackProjectId}', dataset='${fallbackDataset}'.`
  );
}

export const sanityRuntimeConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
  isConfigured,
  hasReadToken: Boolean(token),
};

if (isProduction) {
  console.info("[Sanity Config] Runtime", {
    projectId,
    dataset,
    apiVersion,
    useCdn,
    hasReadToken: Boolean(token),
    projectIdSource: envProjectId ? "env" : "fallback",
    datasetSource: envDataset ? "env" : "fallback",
  });
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token,
  perspective: "published",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export async function sanityFetch(query, params = {}, debugLabel = "query") {
  if (!isConfigured) {
    console.error(`[Sanity:${debugLabel}] Aborted fetch due to missing Sanity env configuration.`);
    return null;
  }

  const isBrowser = typeof window !== "undefined";

  if (isBrowser) {
    const response = await fetch("/api/sanity/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, params, debugLabel }),
      cache: "no-store",
    });

    if (!response.ok) {
      let details = "";
      try {
        const payload = await response.json();
        details = payload?.error ? ` ${payload.error}` : "";
      } catch {
        details = "";
      }

      throw new Error(`[Sanity:${debugLabel}] Request failed (${response.status}).${details}`);
    }

    const payload = await response.json();
    const result = payload?.result ?? null;

    if (isProduction) {
      console.info(`[Sanity:${debugLabel}] Browser proxy response`, {
        resultType: Array.isArray(result) ? "array" : typeof result,
        count: Array.isArray(result) ? result.length : result ? 1 : 0,
      });
    }

    return result;
  }

  const result = await client.fetch(query, params);

  if (isProduction) {
    console.info(`[Sanity:${debugLabel}] Server response`, {
      resultType: Array.isArray(result) ? "array" : typeof result,
      count: Array.isArray(result) ? result.length : result ? 1 : 0,
    });
  }

  return result;
}