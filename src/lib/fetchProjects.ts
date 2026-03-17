import { groq } from "next-sanity";
import { client, urlFor } from "./sanity";

type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
  };
};

export type Project = {
  _id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  video: string;
  thumbnail: SanityImage | null;
  clientName: string;
  industry: string;
  technologies: string[];
  updated: string;
  thumbnailUrl: string | null;
};

type ProjectQueryResult = Omit<Project, "thumbnailUrl">;

const projectsQuery = groq`
  *[_type == "project"] | order(updated desc){
    _id,
    title,
    shortDesc,
    longDesc,
    video,
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
    thumbnailUrl: project.thumbnail?.asset
      ? urlFor(project.thumbnail).width(1200).height(800).fit("crop").auto("format").url()
      : null,
  }));
};