import { groq } from "next-sanity";
import { sanityFetch, sanityRuntimeConfig, urlFor } from "./sanity";

type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
  };
};

type SanitySlug =
  | string
  | {
      current?: string;
    };

type CaseStudyQueryResult = {
  _id: string;
  slug: SanitySlug;
  title: string;
  summary: string | any[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  tags?: string[] | null;
  featuredImage: SanityImage | string | null;
  client: string;
  industry: string;
  problem: string | any[];
  solution: string | any[];
  explanation?: any[] | null;
  tools: string[] | null;
  results: (string | any)[] | null;
  galleryImageUrls?: string[] | null;
  videoUrls?: string[] | null;
};

export type CaseStudy = {
  _id: string;
  slug: string;
  title: string;
  summary: any[];
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  featuredImage: SanityImage | string | null;
  client: string;
  industry: string;
  problem: any[];
  solution: any[];
  explanation: any[];
  tools: string[];
  results: any[];
  featuredImageUrl: string | null;
  galleryImageUrls: string[];
  videoUrls: string[];
};

const toBlocks = (value: unknown): any[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    return [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: value,
            marks: [],
          },
        ],
        markDefs: [],
      },
    ];
  }
  return [];
};

const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(_createdAt desc){
    _id,
    slug,
    title,
    summary,
    metaTitle,
    metaDescription,
    tags,
    featuredImage,
    "galleryImageUrls": galleryImages[].asset->url,
    "videoUrls": videos[].asset->url,
    client,
    industry,
    problem,
    solution,
    explanation,
    tools,
    results
  }
`;

const resolveFeaturedImageUrl = (
  featuredImage: CaseStudyQueryResult["featuredImage"]
): string | null => {
  if (typeof featuredImage === "string") {
    return featuredImage || null;
  }

  if (featuredImage?.asset) {
    return urlFor(featuredImage).width(1200).height(800).fit("crop").auto("format").url();
  }

  return null;
};

const resolveSlug = (slug: SanitySlug): string => {
  if (typeof slug === "string") {
    return slug;
  }

  return slug?.current ?? "";
};

const CASE_STUDIES_CACHE_TTL_MS = 60_000;

let caseStudiesCache: CaseStudy[] | null = null;
let caseStudiesCacheTimestamp = 0;
let caseStudiesInFlight: Promise<CaseStudy[]> | null = null;

export const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  if (caseStudiesCache && Date.now() - caseStudiesCacheTimestamp < CASE_STUDIES_CACHE_TTL_MS) {
    return caseStudiesCache;
  }

  if (caseStudiesInFlight) {
    return caseStudiesInFlight;
  }

  caseStudiesInFlight = (async () => {
    try {
      const data = (await sanityFetch(caseStudiesQuery, {}, "fetchCaseStudies")) as
        | CaseStudyQueryResult[]
        | null;

      if (!Array.isArray(data)) {
        caseStudiesCache = [];
        caseStudiesCacheTimestamp = Date.now();
        return [];
      }

      const mapped = data.map((study) => ({
        _id: study._id,
        slug: resolveSlug(study.slug),
        title: study.title,
        summary: toBlocks(study.summary),
        metaTitle: study.metaTitle || study.title,
        metaDescription: study.metaDescription || String(study.summary ?? ""),
        tags: Array.isArray(study.tags) ? study.tags.filter(Boolean) : [],
        featuredImage: study.featuredImage,
        client: study.client,
        industry: study.industry,
        problem: toBlocks(study.problem),
        solution: toBlocks(study.solution),
        explanation: Array.isArray(study.explanation) ? study.explanation : [],
        tools: Array.isArray(study.tools) ? study.tools : [],
        results: Array.isArray(study.results)
          ? study.results.flatMap((item) => toBlocks(item))
          : [],
        featuredImageUrl: resolveFeaturedImageUrl(study.featuredImage),
        galleryImageUrls: Array.isArray(study.galleryImageUrls)
          ? study.galleryImageUrls.filter(Boolean)
          : [],
        videoUrls: Array.isArray(study.videoUrls)
          ? study.videoUrls.filter(Boolean)
          : [],
      }));

      if (process.env.NODE_ENV === "production") {
        console.info("[Sanity] fetchCaseStudies mapped results", {
          count: mapped.length,
          projectId: sanityRuntimeConfig.projectId,
          dataset: sanityRuntimeConfig.dataset,
          useCdn: sanityRuntimeConfig.useCdn,
          hasReadToken: sanityRuntimeConfig.hasReadToken,
        });
      }

      caseStudiesCache = mapped;
      caseStudiesCacheTimestamp = Date.now();

      return mapped;
    } catch (error) {
      console.error("[Sanity] fetchCaseStudies failed", error);
      throw error;
    } finally {
      caseStudiesInFlight = null;
    }
  })();

  return caseStudiesInFlight;
};
