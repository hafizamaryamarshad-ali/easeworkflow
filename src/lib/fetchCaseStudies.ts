import { groq } from "next-sanity";
import { client, urlFor } from "./sanity";

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
  summary: string;
  featuredImage: SanityImage | string | null;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  tools: string[] | null;
  results: string[] | null;
};

export type CaseStudy = {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  featuredImage: SanityImage | string | null;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  tools: string[];
  results: string[];
  featuredImageUrl: string | null;
};

const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(_createdAt desc){
    _id,
    slug,
    title,
    summary,
    featuredImage,
    client,
    industry,
    problem,
    solution,
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

export const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  const data = await client.fetch<CaseStudyQueryResult[]>(caseStudiesQuery);

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((study) => ({
    _id: study._id,
    slug: resolveSlug(study.slug),
    title: study.title,
    summary: study.summary,
    featuredImage: study.featuredImage,
    client: study.client,
    industry: study.industry,
    problem: study.problem,
    solution: study.solution,
    tools: Array.isArray(study.tools) ? study.tools : [],
    results: Array.isArray(study.results) ? study.results : [],
    featuredImageUrl: resolveFeaturedImageUrl(study.featuredImage),
  }));
};
