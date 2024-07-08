"use client";

import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import CommentSection from "@/components/CommentSection";
import LoaderSpiner from "@/components/LoaderSpinner";
import RecommendVideoList from "@/components/RecommendVideoList";
import SummarySection from "@/components/SummarySection";
import Tag from "@/components/Tag";
import HighlightSection from "@/components/HighlightSection";
import ChapterSection from "@/components/ChapterSection";

function VideoPage({ params: { videoId } }: { params: { videoId: string } }) {
  const router = useRouter();
  const video = useQuery(api.videos.getVideoById, {
    videoId: videoId,
  });
  const findSimilarVideo = useAction(api.twelve_labs.findSimilarVideo);
  const [similarVideos, setSimilarVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const prompt = video?.hashtags[4] || " "; // can be better
        const response = await findSimilarVideo({
          indexId: process.env.NEXT_PUBLIC_INDEX_ID!,
          prompt: prompt,
        });
        setSimilarVideos(response!);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
    setLoading(false);
  }, [videoId, video, findSimilarVideo]);

  return (
    <>
      <div className="bg-white">
        {loading ? (
          <LoaderSpiner />
        ) : (
          <>
            <div className="w-11/12 mx-auto">
              <button
                className="w-full text-20 font-semibold mt-5 rounded bg-white p-2 text-black border-black border-2 transform active:scale-95 transition-transform duration-200"
                onClick={() => router.push("/discover")}
              >
                Discover more videos
              </button>
            </div>
            <div className="flex flex-row gap-10 justify-between sm:flex-col md:flex-col bg:flex-row xl:flex-row ">
              <div className="flex flex-col w-8/12 ml-10 mt-5 border-transparent ">
                <div className="video-wrapper">
                  <ReactPlayer
                    key={videoId}
                    url={video?.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    className="react-player rounded-3xl border-2 border-transparent"
                  />
                </div>
                <h1 className="text-24 font-bold ml-1">{`${video?.filename.replace(".mp4", "")}`}</h1>
                <div className="flex mt-2 gap-2">
                  {video?.hashtags
                    .slice(0, 5)
                    .map((tag: string, index: number) => (
                      <Tag tag={tag} key={index} />
                    ))}
                </div>
                <SummarySection summary={video?.summary!} />
                <div className="w-full bg-gray-100 p-2 rounded-xl">
                  <h1 className="text-16 font-semibold mx-3 mb-2">
                    Highlights:
                  </h1>
                  <div className="w-10/12 mx-auto my-1">
                    <HighlightSection
                      highlights={video?.highlights!}
                      url={video?.videoUrl!}
                    />
                  </div>
                </div>
                <CommentSection
                  id={`${videoId}`}
                  title={`${video?.filename.replace(".mp4", "")}`}
                />
              </div>
              <div className="w-4/12 flex flex-col">
                <ChapterSection
                  chapters={video?.chapters!}
                  url={video?.videoUrl!}
                />
                {similarVideos && (
                  <RecommendVideoList similarVideos={similarVideos!} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default VideoPage;
