"use client";

import { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpiner from "./LoaderSpinner";
import { Col, Row } from "antd";
import { useRouter } from "next/navigation";

type VideoListProps = {
  videoIds: string[];
  indexId: string;
};

function VideoList({ videoIds, indexId }: VideoListProps) {
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
        <div className="flex flex-row flex-wrap justify-start w-full my-10 sm:justify-center md:justify-start lg:justify-start xl:justify-start">
          {filteredVideosInfo?.map((videoInfo, index) => {
            const video_title = videoInfo?.metadata.video_title;
            const title = video_title.split(".mp4")[0];
            const video_thumbnails = videoInfo?.hls.thumbnail_urls;
            const thumbnail = video_thumbnails[0];
            // console.log(videoInfo);
            return (
              <div
                className="w-9/12 sm:w-full md:10/12 lg:w-8/12 xl:w-4/12 px-4 py-2 cursor-pointer flex flex-row transition-transform duration-300 ease-in-out transform hover:scale-105"
                key={index}
              >
                <Row
                  gutter={{
                    sm: 24,
                    md: numVideos > 1 ? 12 : 24,
                    lg: numVideos > 1 ? 8 : 24,
                    xl: numVideos > 1 ? 6 : 24,
                  }}
                >
                  <Col className="gutter-row" span={24}>
                    <div
                      onClick={() => handleClick(`${videoInfo._id}.${indexId}`)}
                    >
                      <img
                        src={thumbnail}
                        alt={title}
                        className="border-3 rounded-xl border-transparent"
                      />
                      <h1 className="text-16 font-bold ml-1 my-1">{title}</h1>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default VideoList;
