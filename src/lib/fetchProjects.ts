import { groq } from "next-sanity";
import { sanityFetch, sanityRuntimeConfig, urlFor } from "./sanity";

type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
  };
};

type SanityFile = {
  asset?: {
    url?: string;
  };
};

type SanitySlug =
  | string
  | {
      current?: string;
    };

export type Project = {
  _id: string;
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  video: string | SanityFile | null;
  thumbnail: SanityImage | null;
  clientName: string;
  industry: string;
  technologies: string[];
  updated: string;
   results: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  extraVideoUrls: string[];
  galleryImageUrls: string[];
};

type ProjectQueryResult = Omit<
  Project,
  "slug" | "metaTitle" | "metaDescription" | "tags" | "results" | "videoUrl" | "thumbnailUrl" | "extraVideoUrls" | "galleryImageUrls"
> & {
  slug?: SanitySlug;
  metaTitle?: string | null;
  metaDescription?: string | null;
  tags?: string[] | null;
  extraVideoUrls?: string[] | null;
  galleryImageUrls?: string[] | null;
};

const projectsQuery = groq`
  *[_type == "project"] | order(updated desc){
    _id,
    slug,
    title,
    shortDesc,
    longDesc,
    metaTitle,
    metaDescription,
    tags,
    "video": select(
      defined(video.asset) => {
        "asset": {
          "url": video.asset->url
        }
      },
      video
    ),
    thumbnail,
    "extraVideoUrls": videos[].asset->url,
    "galleryImageUrls": galleryImages[].asset->url,
    clientName,
    industry,
    technologies,
    updated,
    results
  }
`;

const projectBySlugQuery = groq`
  *[_type == "project" && (slug.current == $slug || _id == $slug)][0]{
    _id,
    slug,
    title,
    shortDesc,
    longDesc,
    metaTitle,
    metaDescription,
    tags,
    "video": select(
      defined(video.asset) => {
        "asset": {
          "url": video.asset->url
        }
      },
      video
    ),
    thumbnail,
    "extraVideoUrls": videos[].asset->url,
    "galleryImageUrls": galleryImages[].asset->url,
    clientName,
    industry,
    technologies,
    updated,
    results
  }
`;

const PROJECTS_CACHE_TTL_MS = 60_000;

let projectsCache: Project[] | null = null;
let projectsCacheTimestamp = 0;
let projectsInFlight: Promise<Project[]> | null = null;

const mapProject = (project: ProjectQueryResult): Project => {
  const slugValue = project.slug;

  const normalizedSlug =
    typeof slugValue === "string" ? slugValue : slugValue?.current ?? "";

  return {
    _id: project._id,
    slug: normalizedSlug,
    title: project.title,
    shortDesc: project.shortDesc,
    longDesc: project.longDesc,
    metaTitle: project.metaTitle || project.title,
    metaDescription:
      project.metaDescription || project.shortDesc || project.longDesc || "",
    tags: Array.isArray(project.tags) ? project.tags.filter(Boolean) : [],
    video: project.video ?? null,
    thumbnail: project.thumbnail ?? null,
    clientName: project.clientName,
    industry: project.industry,
    technologies: Array.isArray(project.technologies)
      ? project.technologies
      : [],
    updated: project.updated,
    results: project.results ?? null,
    videoUrl:
      typeof project.video === "string"
        ? project.video
        : project.video?.asset?.url ?? null,
    thumbnailUrl: project.thumbnail?.asset
      ? urlFor(project.thumbnail)
          .width(1200)
          .height(800)
          .fit("crop")
          .auto("format")
          .url()
      : null,
    extraVideoUrls: Array.isArray(project.extraVideoUrls)
      ? project.extraVideoUrls.filter(Boolean)
      : [],
    galleryImageUrls: Array.isArray(project.galleryImageUrls)
      ? project.galleryImageUrls.filter(Boolean)
      : [],
  } satisfies Project;
};

export const fetchProjects = async (): Promise<Project[]> => {
  if (projectsCache && Date.now() - projectsCacheTimestamp < PROJECTS_CACHE_TTL_MS) {
    return projectsCache;
  }

  if (projectsInFlight) {
    return projectsInFlight;
  }

  projectsInFlight = (async () => {
    try {
      const data = (await sanityFetch(projectsQuery, {}, "fetchProjects")) as
        | ProjectQueryResult[]
        | null;

      if (!Array.isArray(data)) {
        projectsCache = [];
        projectsCacheTimestamp = Date.now();
        return [];
      }

      const mapped = data.map((project) => mapProject(project));

      if (process.env.NODE_ENV === "production") {
        console.info("[Sanity] fetchProjects mapped results", {
          count: mapped.length,
          projectId: sanityRuntimeConfig.projectId,
          dataset: sanityRuntimeConfig.dataset,
          useCdn: sanityRuntimeConfig.useCdn,
          hasReadToken: sanityRuntimeConfig.hasReadToken,
        });
      }

      projectsCache = mapped;
      projectsCacheTimestamp = Date.now();

      return mapped;
    } catch (error) {
      console.error("[Sanity] fetchProjects failed", error);
      throw error;
    } finally {
      projectsInFlight = null;
    }
  })();

  return projectsInFlight;
};

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
  if (!slug) return null;

  // Try to resolve from cache first for performance
  if (projectsCache && Date.now() - projectsCacheTimestamp < PROJECTS_CACHE_TTL_MS) {
    const fromCache = projectsCache.find(
      (project) => project.slug === slug || project._id === slug,
    );

    if (fromCache) {
      return fromCache;
    }
  }

  const data = (await sanityFetch(projectBySlugQuery, { slug }, "fetchProjectBySlug")) as
    | ProjectQueryResult
    | null;

  if (!data) {
    return null;
  }

  return mapProject(data);
};