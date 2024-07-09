"use client";

import { useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { Col, Row } from "antd";
import { VideoListProps } from "@/types";

function VideoList({ videos }: VideoListProps) {
  const router = useRouter();

  const numVideos = videos?.length;
  const handleClick = useCallback(
    (videoId: string) => {
      router.push(`/video/${videoId}`);
    },
    [router],
  );

  return (
    <>
      <div className="flex flex-row flex-wrap justify-start w-full my-10 sm:justify-center md:justify-start lg:justify-start xl:justify-start">
        {videos?.map((video, index) => {
          const title = video.filename.replace(".mp4", "");
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
                  <div onClick={() => handleClick(`${video.twelvelabsId}`)}>
                    <img
                      src={video.thumbnailUrl}
                      alt={title}
                      className="border-3 rounded-xl border-transparent"
                      loading="lazy"
                    />
                    <h1 className="text-16 font-bold ml-1 my-1">{title}</h1>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default memo(VideoList);
