import { groq } from "next-sanity";
import { client, urlFor } from "./sanity";

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

export const fetchProjects = async (): Promise<Project[]> => {
  const data = await client.fetch<ProjectQueryResult[]>(projectsQuery);

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((project) => ({
    ...project,
    videoUrl:
      typeof project.video === "string"
        ? project.video
        : project.video?.asset?.url ?? null,
    thumbnailUrl: project.thumbnail?.asset
      ? urlFor(project.thumbnail).width(1200).height(800).fit("crop").auto("format").url()
      : null,
  }));
};