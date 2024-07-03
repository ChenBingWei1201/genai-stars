"use client";

import CommentSection from "@/components/CommentSection";
import EmptyState from "@/components/EmptyState";
import LoaderSpiner from "@/components/LoaderSpinner";
import Searchbar from "@/components/Searchbar";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

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
        // console.log(JSON.parse(response!));
        setVideo(JSON.parse(response!));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVideos = async () => {
      try {
        const response = await getVideos({ indexId: indexId });
        console.log(JSON.parse(response!)?.data);
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

  const post = {
    id: `${videoId}`,
    title: `${video?.metadata.filename.split(".mp4")[0]}`,
  };

  return (
    <>
      <div className="w-11/12 mx-auto">
        <Searchbar />
      </div>
      {loading ? (
        <LoaderSpiner />
      ) : (
        <>
          {video ? (
            <div className="flex mt-5 border-transparent w-7/12">
              <div className="flex flex-col w-11/12">
                <ReactPlayer
                  key={videoId}
                  url={video?.source?.url || video?.hls?.video_url}
                  controls
                  width="100%"
                  className="rounded-3xl border-2 border-transparent"
                />
                <h1 className="text-24 font-bold">{post.title}</h1>
                <CommentSection post={post} />
              </div>
            </div>
          ) : (
            // <EmptyState title="video not found" />  todo: fix it
            <LoaderSpiner />
          )}
        </>
      )}
    </>
  );
}

export default VideoPage;
