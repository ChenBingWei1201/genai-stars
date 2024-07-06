"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import CommentSection from "@/components/CommentSection";
import LoaderSpiner from "@/components/LoaderSpinner";
import Searchbar from "@/components/Searchbar";
import RecommendVideoList from "@/components/RecommendVideoList";
import SummarySection from "@/components/SummarySection";
import Tag from "@/components/Tag";
import HighlightSection from "@/components/HighlightSection";
import ChapterSection from "@/components/ChapterSection";
import { chapters, highlights, summary, tags } from "@/constants/dummyData";

function VideoPage({ params }: { params: { videoId: string } }) {
  const getVideo = useAction(api.twelve_labs.getVideo);
  const getVideos = useAction(api.twelve_labs.getVideos);
  const [video, setVideo] = useState<any>();
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const videoId = params.videoId.split(".")[0];
  const indexId = params.videoId.split(".")[1];

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideo({
          videoId: videoId,
          indexId: indexId,
        });
        setVideo(JSON.parse(response!));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVideos = async () => {
      try {
        const response = await getVideos({ indexId: indexId });
        const data = JSON.parse(response!)?.data.map((video: any) => {
          return video._id;
        });
        setVideoIds(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
    fetchVideos();
    setLoading(false);
  }, [setVideo, setVideoIds, setLoading]);

  const videoInfo = {
    id: `${videoId}`,
    title: `${video?.metadata.filename.split(".mp4")[0]}`,
  };

  return (
    <div className="bg-white max-w-max">
      {video && videoIds && !loading ? (
        <>
          <div className="w-11/12 mx-auto">
            <Searchbar />
          </div>
          <div className="flex flex-row gap-10 justify-between sm:flex-col md:flex-col bg:flex-row xl:flex-row ">
            <div className="flex flex-col w-8/12 ml-20 mt-5 border-transparent ">
              <div className="video-wrapper">
                <ReactPlayer
                  key={videoId}
                  url={video?.source?.url || video?.hls?.video_url}
                  width="100%"
                  height="100%"
                  controls
                  className="react-player rounded-3xl border-2 border-transparent"
                />
              </div>
              <h1 className="text-24 font-bold ml-1">{videoInfo.title}</h1>
              <div className="flex mt-2 gap-2">
                {tags.map((tag: string) => (
                  <Tag tag={tag} />
                ))}
              </div>
              <SummarySection summary={summary} />
              <div className="w-full bg-gray-100 p-2 rounded-xl">
                <h1 className="text-16 font-semibold mx-3 mb-2">Highlights:</h1>
                <div className="w-10/12 mx-auto my-1">
                  <HighlightSection
                    highlights={highlights}
                    url={video?.source?.url || video?.hls?.video_url}
                  />
                </div>
              </div>
              <CommentSection videoInfo={videoInfo} />
            </div>
            <div className="w-4/12 flex flex-col">
              <ChapterSection
                chapters={chapters}
                url={video?.source?.url || video?.hls?.video_url}
              />
              <RecommendVideoList videoIds={videoIds} indexId={indexId} />
            </div>
          </div>
        </>
      ) : (
        <LoaderSpiner />
      )}
    </div>
  );
}

export default VideoPage;
