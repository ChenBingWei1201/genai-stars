"use client";

// import { useState, useEffect, use } from "react";
// import { useAction, useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
import LoaderSpiner from "./LoaderSpinner";
import { useRouter } from "next/navigation";

type RecommedVideoListProps = {
  similarVideos: any;
  // indexId: string; // replace
};

function RecommendVideoList({ similarVideos }: RecommedVideoListProps) {
  const router = useRouter();
  console.log("similarVideos", similarVideos);

  const handleClick = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <>
      {!similarVideos ? (
        <LoaderSpiner />
      ) : (
        <>
          {similarVideos && (
            <div className="p-2 mt-5 w-11/12 mx-auto">
              <div className="flex flex-col space-y-8">
                {similarVideos.map((videoInfo: any, index: number) => {
                  // const video_title: string = videoInfo?.metadata.video_title; // replace
                  const video_title: string =
                    videoInfo.clips[0].metadata[0].text;
                  const title =
                    video_title.length < 50
                      ? video_title.split(".mp4")[0]
                      : video_title.split(".mp4")[0].slice(0, 50) + "...";
                  // const video_thumbnails = videoInfo?.hls.thumbnail_urls; // replace
                  // const thumbnail = video_thumbnails[0]; // replace
                  const thumbnail = videoInfo.clips[0].thumbnail_url;
                  return (
                    <div
                      className="flex items-start space-x-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                      key={index}
                      // onClick={() => handleClick(`${videoInfo._id}.${indexId}`)}
                      onClick={() => handleClick(`${videoInfo.id}`)}
                    >
                      <img
                        src={thumbnail}
                        alt={title}
                        className="w-7/12 h-auto bg-cover bg-center rounded sm:w-6/12 lg:w-6/12 xl:w-6/12"
                      />
                      <div className="flex-1">
                        <h1 className="text-base mb-2 font-semibold sm:text-2xl md:text-2xl lg:text-lg xl:text-base">
                          {title}
                        </h1>
                        {/* <p className="text-sm text-gray-600">{article.date}</p> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default RecommendVideoList;
