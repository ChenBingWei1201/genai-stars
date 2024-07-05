"use client";

import { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpiner from "./LoaderSpinner";
import { useRouter } from "next/navigation";

type RecommedVideoListProps = {
  videoIds: string[];
  indexId: string;
};

function RecommendVideoList({ videoIds, indexId }: RecommedVideoListProps) {
  const router = useRouter();
  const [videosInfo, setVideosInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const getVideo = useAction(api.twelve_labs.getVideo);

  useEffect(() => {
    const fetchVideosInfo = async () => {
      try {
        const fetchedVideosInfo = await Promise.all(
          videoIds.map(async (videoId) => {
            const response = await getVideo({ indexId, videoId });
            return JSON.parse(response!);
          }),
        );
        setVideosInfo(fetchedVideosInfo);
        setLoading(false);
        console.log(fetchedVideosInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideosInfo();
  }, [setVideosInfo, setLoading, videoIds, indexId]);

  const filteredVideosInfo = videosInfo.filter(
    (videoInfo) => videoInfo?.indexed_at,
  );

  // const numVideos = videosInfo.length;

  const handleClick = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <>
      {!videosInfo ? (
        <LoaderSpiner />
      ) : (
        <>
          {videosInfo && (
            <div className="p-2 mt-5 w-11/12 mx-auto">
              <div className="flex flex-col space-y-8">
                {filteredVideosInfo?.map((videoInfo, index) => {
                  const video_title: string = videoInfo?.metadata.video_title;
                  const title =
                    video_title.length < 50
                      ? video_title.split(".mp4")[0]
                      : video_title.split(".mp4")[0].slice(0, 50) + "...";
                  const video_thumbnails = videoInfo?.hls.thumbnail_urls;
                  const thumbnail = video_thumbnails[0];
                  return (
                    <div
                      className="flex items-start space-x-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                      key={index}
                      onClick={() => handleClick(`${videoInfo._id}.${indexId}`)}
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
