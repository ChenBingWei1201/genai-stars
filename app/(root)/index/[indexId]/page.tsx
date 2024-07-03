"use client";

import { useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import VideoList from "@/components/VideoList";
import EmptyState from "@/components/EmptyState";
import Searchbar from "@/components/Searchbar";

function IndexPage({
  params: { indexId },
  searchParams: { search },
}: {
  params: { indexId: string };
  searchParams: { search: string };
}) {
  const getVideos = useAction(api.twelve_labs.getVideos);
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("indexId", indexId);
    const fetchData = async () => {
      try {
        const response = await getVideos({ indexId: indexId });
        const data = JSON.parse(response!)?.data.map((video: any) => {
          return video._id;
        });
        setVideoIds(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setVideoIds]);

  if (loading) return <LoaderSpinner />;

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <Searchbar />
        {videoIds.length === 0 ? (
          <EmptyState title="no video" />
        ) : (
          <VideoList videoIds={videoIds} indexId={indexId} />
        )}
      </div>
    </div>
  );
}

export default IndexPage;
