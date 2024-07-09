/* eslint-disable no-unused-vars */
import { Id } from "@/convex/_generated/dataModel";

export interface UserType {
  _id: Id<"users">;
  email: string;
  imageUrl: string;
  clerkId: string;
  name: string;
}

export interface ProfileCardProps {
  imageUrl: string;
  userFirstName: string;
}

export interface ChapterType {
  chapter_number: number;
  start: number;
  end: number;
  chapter_title: string;
  chapter_summary: string;
}

export interface HighlightType {
  start: number;
  end: number;
  highlight: string;
  highlight_summary: string;
  highlight_index: number;
}

export interface VideoType {
  _id: Id<"videos">;
  _creationTime: number;
  twelvelabsId: string;
  filename: string;
  videoUrl: string;
  thumbnailUrl: string;
  class: string;
  title: string;
  topics: string[];
  hashtags: string[];
  summary: string;
  chapters: ChapterType[];
  highlights: HighlightType[];
}

export interface SimilarVideoType {
  twelvelabsId: string;
  filename: string;
  videoUrl: string;
  thumbnailUrl: string;
  score: number;
  start: number;
  end: number;
  confidence: string;
}

export interface SimilarVideoItemProps {
  similarVideo: SimilarVideoType;
}

export interface RecommendVideoListProps {
  similarVideos: SimilarVideoType[];
}

export interface ClassFolderProps {
  classId: string;
  title: string;
  imgUrl: string;
}

export interface VideoListProps {
  videos: VideoType[];
}

export interface ClipType {
  score: number;
  start: number;
  end: number;
  metadata: {
    type: string;
    text?: string;
  }[];
  video_id: string;
  confidence: string;
  thumbnail_url: string;
  modules: {
    type: string;
    confidence: string;
  }[];
}

export interface CommentSectionProps {
  id: string;
  title: string;
}

export interface SectionIdsType {
  Home: string;
  Baseball: string;
  Basketball: string;
  Football: string;
  Badminton: string;
  Tennis: string;
}

export interface SectionClassMapType {
  Baseball: string[];
  Basketball: string[];
  Football: string[];
  Badminton: string[];
  Tennis: string[];
}

export interface ImagesType {
  MLB: string;
  CPBL: string;
  WBC: string;
  NBA: string;
  "Olympic Basketball": string;
  "FIBA Basketball World Cup": string;
  "FIFA World Cup": string;
  "Premier League": string;
  "UEFA EURO": string;
  "Olympic Badminton": string;
  "BWF World Championships": string;
  Wimbledon: string;
  "The US Open (Tennis)": string;
}

export interface AdType {
  id: string;
  imageUrl: string;
  name: string;
}

export interface CarouselProps {
  ads: AdType[];
}

export interface IconType {
  href: string;
  src: string;
  alt: string;
}

export interface VideoProps {
  url: string;
  start: number;
  end: number;
  width: string;
  height: string;
}
