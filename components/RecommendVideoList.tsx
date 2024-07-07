"use client";

import { formatTime } from "@/lib/formatTime";
import LoaderSpiner from "./LoaderSpinner";
import { useRouter } from "next/navigation";

type RecommedVideoListProps = {
  similarVideos: any;
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
                  const video_title: string = videoInfo.filename;
                  const title =
                    video_title.length < 35
                      ? video_title.split(".mp4")[0]
                      : video_title.split(".mp4")[0].slice(0, 35) + "...";
                  const thumbnail = videoInfo.thumbnailUrl;
                  return (
                    <div
                      className="flex items-start space-x-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                      key={index}
                      onClick={() => handleClick(`${videoInfo.twelvelabsId}`)}
                    >
                      <img
                        src={thumbnail}
                        alt={title}
                        className="w-7/12 h-auto bg-cover bg-center rounded sm:w-6/12 lg:w-6/12 xl:w-6/12"
                      />
                      <div className="flex-1">
                        <h1 className="text-sm font-semibold sm:text-2xl md:text-2xl lg:text-sm xl:text-sm">
                          {title}
                        </h1>
                        <div className="resultDescription">
                          Start {formatTime(videoInfo.start)} | End{" "}
                          {formatTime(videoInfo.end)} |{" "}
                          <span>
                            Condidence: {""}
                            <span
                              className="confidence"
                              style={{
                                backgroundColor:
                                  videoInfo.confidence === "high"
                                    ? "#2EC29F"
                                    : videoInfo.confidence === "medium"
                                      ? "#FDC14E"
                                      : "#B7B9B4",
                              }}
                            >
                              {videoInfo.confidence}
                            </span>
                          </span>
                        </div>
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
