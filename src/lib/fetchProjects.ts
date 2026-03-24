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

export type Project = {
  _id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  video: string | SanityFile | null;
  thumbnail: SanityImage | null;
  clientName: string;
  industry: string;
  technologies: string[];
  updated: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
};

type ProjectQueryResult = Omit<Project, "videoUrl" | "thumbnailUrl">;

const projectsQuery = groq`
  *[_type == "project"] | order(updated desc){
    _id,
    title,
    shortDesc,
    longDesc,
    "video": select(
      defined(video.asset) => {
        "asset": {
          "url": video.asset->url
        }
      },
      video
    ),
    thumbnail,
    clientName,
    industry,
    technologies,
    updated
  }
`;

const PROJECTS_CACHE_TTL_MS = 60_000;

let projectsCache: Project[] | null = null;
let projectsCacheTimestamp = 0;
let projectsInFlight: Promise<Project[]> | null = null;

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

      const mapped = data.map((project) => ({
        ...project,
        videoUrl:
          typeof project.video === "string"
            ? project.video
            : project.video?.asset?.url ?? null,
        thumbnailUrl: project.thumbnail?.asset
          ? urlFor(project.thumbnail).width(1200).height(800).fit("crop").auto("format").url()
          : null,
      }));

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