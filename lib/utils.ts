import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateTitle = (title: string) => {
  const cleanTitle = title.replace(".mp4", "");
  return cleanTitle.length < 35 ? cleanTitle : cleanTitle.slice(0, 35) + "...";
};

export const getClassNameByConfidence = (confidence: string) => {
  switch (confidence) {
    case "high":
      return "bg-[#2EC29F]";
    case "medium":
      return "bg-[#FDC14E]";
    default:
      return "bg-[#B7B9B4]";
  }
};

export const formatTime = (timeInSeconds: number) => {
  // const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
};
