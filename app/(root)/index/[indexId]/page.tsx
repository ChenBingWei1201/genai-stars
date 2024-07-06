"use client";

import { useEffect, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import VideoList from "@/components/VideoList";
import EmptyState from "@/components/EmptyState";

// function ClassPage({ params: { classId } }: { params: { classId: string } }) {

function IndexPage({ params: { indexId } }: { params: { indexId: string } }) {
  // const getVideoByClass = useQuery(api.videos.getVideoByClass);
  const getVideos = useAction(api.twelve_labs.getVideos); // replace
  // const [videos, setVideos] = useState<any[]>([]);
  const [videoIds, setVideoIds] = useState<string[]>([]); // replace
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVideos({ indexId: indexId });
        const data: string[] = JSON.parse(response!)?.data.map((video: any) => {
          return video._id;
        });
        setVideoIds(data);
        // const response = await getVideoByClass({classId: classId});
        // setVideos(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setVideoIds]); // setVideos, getAllVideos

  if (loading) return <LoaderSpinner />;

  return (
    <div className="w-11/12 mx-auto">
      {videoIds.length === 0 ? (
        <EmptyState title="no video" />
      ) : (
        <VideoList videoIds={videoIds} indexId={indexId} />
        // <VideoList videos={videos} />
      )}
    </div>
  );
}

// export default ClassPage;
export default IndexPage;
