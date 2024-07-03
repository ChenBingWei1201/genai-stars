"use client";

import { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpiner from "./LoaderSpinner";
import { Col, Row } from "antd";
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
        // console.log(fetchedVideosInfo);
        setVideosInfo(fetchedVideosInfo);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideosInfo();
  }, [setVideosInfo]);

  const filteredVideosInfo = videosInfo.filter(
    (videoInfo) => videoInfo?.indexed_at,
  );

  const numVideos = videosInfo.length;

  const handleClick = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <>
      {loading ? (
        <LoaderSpiner />
      ) : (
        <div className="w-3/12 ml-5">
          {filteredVideosInfo?.map((videoInfo, index) => {
            const video_title = videoInfo?.metadata.video_title;
            const title = video_title.split(".mp4")[0];
            const video_thumbnails = videoInfo?.hls.thumbnail_urls;
            const thumbnail = video_thumbnails[0];
            // console.log(videoInfo);
            return (
              <div
                className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                key={index}
              >
                <div
                  onClick={() => handleClick(`${videoInfo._id}.${indexId}`)}
                  className="cursor-pointer flex flex-row flex-center"
                >
                  <img
                    src={thumbnail}
                    alt={title}
                    className="border-2 rounded-xl border-transparent my-1"
                  />
                  <h1 className="text-12 font-bold ml-1 my-1">{title}</h1>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default RecommendVideoList;
